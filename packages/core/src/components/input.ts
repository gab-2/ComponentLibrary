export type InputSize = "sm" | "md" | "lg";

export function getInputClass({ size = "md", invalid = false }: { size?: InputSize; invalid?: boolean } = {}) {
  return ["sm-input", `sm-input--${size}`, invalid ? "sm-input--error" : ""].filter(Boolean).join(" ");
}
