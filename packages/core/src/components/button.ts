export type ButtonVariant = "primary" | "ghost";

export function getButtonClass(variant: ButtonVariant = "primary") {
  return variant === "ghost" ? "sm-btn sm-btn--ghost" : "sm-btn";
}
