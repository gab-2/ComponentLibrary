import { describe, expect, it } from "vitest";
import {
  createFocusOriginTracker,
  getAlertClass,
  getBadgeClass,
  getButtonClass,
  getCardClass,
  getCellValue,
  getDataTableClass,
  getInputAriaInvalid,
  getInputClass,
} from "../src";

describe("core classes", () => {
  it("returns expected classes", () => {
    expect(getButtonClass()).toBe("sm-btn sm-btn--solid sm-btn--md");
    expect(
      getButtonClass({ variant: "outline", size: "lg", loading: true }),
    ).toBe("sm-btn sm-btn--outline sm-btn--lg sm-btn--loading");
    expect(getInputClass()).toBe("sm-input sm-input--md");
    expect(getInputClass({ size: "sm", invalid: true })).toBe(
      "sm-input sm-input--sm sm-input--invalid",
    );
    expect(
      getInputClass({ size: "lg", focused: true, focusOrigin: "keyboard" }),
    ).toBe("sm-input sm-input--lg sm-input--focused sm-input--focus-keyboard");
    expect(getCardClass()).toBe("sm-card");
    expect(getCardClass({ hover: true, interactive: true })).toBe(
      "sm-card sm-card--hover sm-card--interactive",
    );
    expect(getBadgeClass()).toBe("sm-badge");
    expect(getAlertClass()).toBe("sm-alert");
    expect(getDataTableClass()).toBe("sm-data-table");
    expect(getDataTableClass({ dense: true, striped: true })).toBe(
      "sm-data-table sm-data-table--dense sm-data-table--striped",
    );
  });

  it("normalizes data table cell values", () => {
    expect(getCellValue({ price: 10 }, "price")).toBe("10");
    expect(getCellValue({ price: null }, "price")).toBe("");
    expect(getCellValue({}, "price")).toBe("");
  });

  it("resolves aria-invalid and focus origin", () => {
    expect(
      getInputAriaInvalid({ invalid: false, error: undefined }),
    ).toBeUndefined();
    expect(getInputAriaInvalid({ invalid: true })).toBe(true);
    expect(getInputAriaInvalid({ invalid: false, error: "erro" })).toBe(true);

    const tracker = createFocusOriginTracker();
    expect(tracker.getOrigin()).toBe("programmatic");
    tracker.onKeyboardNavigation();
    expect(tracker.getOrigin()).toBe("keyboard");
    tracker.onPointerInteraction();
    expect(tracker.getOrigin()).toBe("pointer");
  });
});
