import { describe, expect, it } from "vitest";
import { getAlertClass, getBadgeClass, getButtonClass, getCellValue, getDataTableClass } from "../src";

describe("core classes", () => {
  it("returns expected classes", () => {
    expect(getButtonClass()).toBe("sm-btn");
    expect(getBadgeClass()).toBe("sm-badge");
    expect(getAlertClass()).toBe("sm-alert");
    expect(getDataTableClass()).toBe("sm-data-table");
    expect(getDataTableClass({ dense: true, striped: true })).toBe("sm-data-table sm-data-table--dense sm-data-table--striped");
  });

  it("normalizes data table cell values", () => {
    expect(getCellValue({ price: 10 }, "price")).toBe("10");
    expect(getCellValue({ price: null }, "price")).toBe("");
    expect(getCellValue({}, "price")).toBe("");
  });
});
