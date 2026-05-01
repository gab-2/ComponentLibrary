import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("migration contains core tables", () => {
  const sql = readFileSync(new URL("../prisma/migrations/202605010730_init/migration.sql", import.meta.url), "utf8");
  for (const table of ["User", "Subscription", "License", "Entitlement", "RegistryToken", "Package", "AuditLog", "WebhookEvent"]) {
    assert.ok(sql.includes(`CREATE TABLE \"${table}\"`));
  }
});
