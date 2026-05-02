import { describe, expect, it } from "vitest";
import { registryServer } from "./server";

describe("registry server", () => {
  it("returns health ok", async () => {
    const response = await registryServer.inject({ method: "GET", url: "/health" });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });

  it("rejects authorize requests without token", async () => {
    const response = await registryServer.inject({
      method: "POST",
      url: "/authorize",
      payload: { packageName: "@sua-marca-ui-pro/react" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({ allowed: false, reason: "MISSING_TOKEN" });
  });

  it("rejects authorize requests without package name", async () => {
    const response = await registryServer.inject({
      method: "POST",
      url: "/authorize",
      payload: { token: "tok_123" },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({ allowed: false, reason: "PACKAGE_NOT_FOUND" });
  });
});
