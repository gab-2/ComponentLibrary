export type InputSize = "sm" | "md" | "lg";
export type InputFocusOrigin = "keyboard" | "pointer" | "programmatic";

export type InputClassOptions = {
  size?: InputSize;
  invalid?: boolean;
  focused?: boolean;
  focusOrigin?: InputFocusOrigin;
};

export function getInputClass({
  size = "md",
  invalid = false,
  focused = false,
  focusOrigin = "programmatic",
}: InputClassOptions = {}) {
  return [
    "sm-input",
    `sm-input--${size}`,
    invalid ? "sm-input--invalid" : "",
    focused ? "sm-input--focused" : "",
    focused && focusOrigin === "keyboard" ? "sm-input--focus-keyboard" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function getInputAriaInvalid({
  invalid = false,
  error,
}: {
  invalid?: boolean;
  error?: string | null | undefined;
}) {
  return invalid || Boolean(error) ? true : undefined;
}

export function createFocusOriginTracker() {
  let origin: InputFocusOrigin = "programmatic";
  return {
    onKeyboardNavigation() {
      origin = "keyboard";
    },
    onPointerInteraction() {
      origin = "pointer";
    },
    onProgrammaticFocus() {
      origin = "programmatic";
    },
    getOrigin() {
      return origin;
    },
  };
}
