import { PrismaClient, EntitlementStatus, PlanCode } from "@prisma/client";

const prisma = new PrismaClient();

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

  await prisma.entitlement.upsert({ where: { userId_key: { userId: pro.id, key: "pro:packages" } }, update: { status: EntitlementStatus.ACTIVE }, create: { userId: pro.id, key: "pro:packages", status: EntitlementStatus.ACTIVE } });
  await prisma.entitlement.upsert({ where: { userId_key: { userId: lifetime.id, key: "pro:packages" } }, update: { status: EntitlementStatus.ACTIVE }, create: { userId: lifetime.id, key: "pro:packages", status: EntitlementStatus.ACTIVE } });

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

  console.log("Seeded users:", { free: free.email, pro: pro.email, lifetime: lifetime.email });
}

main().finally(async () => prisma.$disconnect());
