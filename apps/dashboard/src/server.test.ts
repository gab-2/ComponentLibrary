import { beforeEach, describe, expect, it, vi } from "vitest";
import { dashboardServer } from "./server";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

describe("dashboard server", () => {
  beforeEach(() => vi.clearAllMocks());

  it("returns npmrc setup", async () => {
    fetchMock.mockResolvedValue({ ok: true, status: 200, json: async () => ({ access: { canAccessPro: true } }) });
    const response = await dashboardServer.inject({ method: "GET", url: "/dashboard/install-instructions?email=pro@example.com" });
    expect(response.statusCode).toBe(200);
    const body = response.json();
    expect(body.local.npmrc).toContain("@sua-marca-ui-pro:registry=http://localhost:4873");
    expect(body.access.canAccessPro).toBe(true);
  });

  it("builds overview payload", async () => {
    fetchMock
      .mockResolvedValueOnce({ status: 200, json: async () => ({ user: { email: "pro@example.com" }, access: { canAccessPro: true } }) })
      .mockResolvedValueOnce({ status: 200, json: async () => ({ subscriptions: [], licenses: [] }) });

    const response = await dashboardServer.inject({ method: "GET", url: "/dashboard/overview?email=pro@example.com" });
    expect(response.statusCode).toBe(200);
    expect(response.json().access.canAccessPro).toBe(true);
  });
});
