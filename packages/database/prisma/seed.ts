const PRO_KEYS = ["pro.packages.access", "pro.docs.access", "registry.tokens.create", "templates.pro.access"];

type SeedPrisma = {
  user: { upsert: (args: any) => Promise<any> };
  subscription: { upsert: (args: any) => Promise<any> };
  license: { upsert: (args: any) => Promise<any> };
  entitlement: { upsert: (args: any) => Promise<any> };
  package: { upsert: (args: any) => Promise<any> };
  $disconnect?: () => Promise<void>;
};

export async function runSeed(prisma: SeedPrisma) {
  const free = await prisma.user.upsert({
    where: { email: "free@example.com" },
    update: {},
    create: { email: "free@example.com", name: "Free User" },
  });

  const pro = await prisma.user.upsert({
    where: { email: "pro@example.com" },
    update: {},
    create: { email: "pro@example.com", name: "Pro User" },
  });

  const lifetime = await prisma.user.upsert({
    where: { email: "lifetime@example.com" },
    update: {},
    create: { email: "lifetime@example.com", name: "Lifetime User" },
  });

  await prisma.subscription.upsert({
    where: { providerRef: "seed_pro_subscription" },
    update: { status: "active", plan: "PRO_MONTHLY" },
    create: { userId: pro.id, provider: "stripe", providerRef: "seed_pro_subscription", status: "active", plan: "PRO_MONTHLY" },
  });

  await prisma.license.upsert({
    where: { id: "seed_lifetime_license" },
    update: { active: true },
    create: { id: "seed_lifetime_license", userId: lifetime.id, plan: "LIFETIME", active: true },
  });

  for (const userId of [pro.id, lifetime.id]) {
    for (const key of PRO_KEYS) {
      await prisma.entitlement.upsert({
        where: { userId_key: { userId, key } },
        update: { status: "ACTIVE", source: "seed" },
        create: { userId, key, status: "ACTIVE", source: "seed" },
      });
    }
  }

  const packages = [
    { name: "@sua-marca-ui/react", scope: "@sua-marca-ui", visibility: "PUBLIC", framework: "react", tier: "FREE" },
    { name: "@sua-marca-ui/vue", scope: "@sua-marca-ui", visibility: "PUBLIC", framework: "vue", tier: "FREE" },
    { name: "@sua-marca-ui-pro/react", scope: "@sua-marca-ui-pro", visibility: "PRIVATE", framework: "react", tier: "PRO" },
    { name: "@sua-marca-ui-pro/vue", scope: "@sua-marca-ui-pro", visibility: "PRIVATE", framework: "vue", tier: "PRO" },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({ where: { name: pkg.name }, update: pkg, create: pkg });
  }

  return { users: { free: free.email, pro: pro.email, lifetime: lifetime.email }, packages: packages.map((pkg) => pkg.name) };
}

async function main() {
  const { PrismaClient } = await import("@prisma/client");
  const prisma = new PrismaClient();
  try {
    const seeded = await runSeed(prisma as SeedPrisma);
    console.log("Seeded users:", seeded.users);
    console.log("Seeded packages:", seeded.packages);
  } finally {
    await prisma.$disconnect();
  }
}

if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1]}`).href) {
  main();
}
