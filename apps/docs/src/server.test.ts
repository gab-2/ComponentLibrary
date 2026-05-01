import { beforeEach, describe, expect, it, vi } from "vitest";
import { docsServer } from "./server";

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);

describe("docs server", () => {
  beforeEach(() => vi.clearAllMocks());

  it("serves public docs", async () => {
    const response = await docsServer.inject({ method: "GET", url: "/docs/public" });
    expect(response.statusCode).toBe(200);
  });

  it("gates pro docs when missing entitlement", async () => {
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({ access: { canAccessPro: false } }) });
    const response = await docsServer.inject({ method: "GET", url: "/docs/pro/react?email=free@example.com" });
    expect(response.statusCode).toBe(403);
  });
});
