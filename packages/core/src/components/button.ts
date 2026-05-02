export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export function getButtonClass({ variant = "solid", size = "md", loading = false }: { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean } = {}) {
  return ["sm-btn", `sm-btn--${variant}`, `sm-btn--${size}`, loading ? "sm-btn--loading" : ""].filter(Boolean).join(" ");
}
