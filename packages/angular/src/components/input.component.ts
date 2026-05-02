type InputSize = "sm" | "md" | "lg";
type InputFocusOrigin = "keyboard" | "pointer" | "programmatic";

export class SmInputComponent {
  id = "sm-input";
  label?: string;
  error?: string;
  size: InputSize = "md";
  invalid = false;
  value = "";
  placeholder = "";
  disabled = false;
  focused = false;
  focusOrigin: InputFocusOrigin = "programmatic";
  private lastFocusOrigin: InputFocusOrigin = "programmatic";

  get classes(): string {
    return [
      "sm-input",
      `sm-input--${this.size}`,
      this.invalid || Boolean(this.error) ? "sm-input--invalid" : "",
      this.focused ? "sm-input--focused" : "",
      this.focused && this.focusOrigin === "keyboard"
        ? "sm-input--focus-keyboard"
        : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  get ariaInvalid(): true | undefined {
    return this.invalid || Boolean(this.error) ? true : undefined;
  }

  onPointerDown(): void {
    this.lastFocusOrigin = "pointer";
  }

  onKeyDown(key: string): void {
    if (key === "Tab") this.lastFocusOrigin = "keyboard";
  }

  onFocus(): void {
    this.focused = true;
    this.focusOrigin = this.lastFocusOrigin;
  }

  onBlur(): void {
    this.focused = false;
  }

  onValueChange(next: string): string {
    this.value = next;
    return this.value;
  }
}
