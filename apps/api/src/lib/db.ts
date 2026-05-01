import * as Prisma from "@prisma/client";

const PrismaClientCtor = (Prisma as { PrismaClient?: new (options?: { log?: string[] }) => any }).PrismaClient;

if (!PrismaClientCtor) {
  throw new Error("PrismaClient is not available. Ensure prisma generate ran successfully.");
}

const globalForPrisma = globalThis as { prisma?: any };

export const db =
  globalForPrisma.prisma ??
  new PrismaClientCtor({
    log: ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
