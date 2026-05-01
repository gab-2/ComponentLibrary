import { EntitlementStatus, PackageTier, PackageVisibility, PlanCode, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const PRO_KEYS = ["pro.packages.access", "pro.docs.access", "registry.tokens.create", "templates.pro.access"];

async function main() {
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
    update: { status: "active", plan: PlanCode.PRO_MONTHLY },
    create: { userId: pro.id, provider: "stripe", providerRef: "seed_pro_subscription", status: "active", plan: PlanCode.PRO_MONTHLY },
  });

  await prisma.license.upsert({
    where: { id: "seed_lifetime_license" },
    update: { active: true },
    create: { id: "seed_lifetime_license", userId: lifetime.id, plan: PlanCode.LIFETIME, active: true },
  });

  for (const userId of [pro.id, lifetime.id]) {
    for (const key of PRO_KEYS) {
      await prisma.entitlement.upsert({
        where: { userId_key: { userId, key } },
        update: { status: EntitlementStatus.ACTIVE, source: "seed" },
        create: { userId, key, status: EntitlementStatus.ACTIVE, source: "seed" },
      });
    }
  }

  const packages = [
    { name: "@sua-marca/react", scope: "@sua-marca", visibility: PackageVisibility.PUBLIC, framework: "react", tier: PackageTier.FREE },
    { name: "@sua-marca/vue", scope: "@sua-marca", visibility: PackageVisibility.PUBLIC, framework: "vue", tier: PackageTier.FREE },
    { name: "@sua-marca-pro/react", scope: "@sua-marca-pro", visibility: PackageVisibility.PRIVATE, framework: "react", tier: PackageTier.PRO },
    { name: "@sua-marca-pro/vue", scope: "@sua-marca-pro", visibility: PackageVisibility.PRIVATE, framework: "vue", tier: PackageTier.PRO },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({ where: { name: pkg.name }, update: pkg, create: pkg });
  }

  console.log("Seeded users:", { free: free.email, pro: pro.email, lifetime: lifetime.email });
  console.log("Seeded packages:", packages.map((pkg) => pkg.name));
}

main().finally(async () => prisma.$disconnect());
