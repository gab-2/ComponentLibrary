import { describe, expect, it } from "vitest";
import { getButtonClass, getBadgeClass, getAlertClass } from "../src";

describe("core classes", () => {
  it("returns expected classes", () => {
    expect(getButtonClass()).toBe("sm-btn");
    expect(getBadgeClass()).toBe("sm-badge");
    expect(getAlertClass()).toBe("sm-alert");
  });
});
