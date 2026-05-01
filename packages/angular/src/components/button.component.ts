export interface SmButtonProps { variant?: "primary" | "secondary"; size?: "sm" | "md" | "lg"; disabled?: boolean; }

export class SmButtonComponent {
  variant: SmButtonProps["variant"] = "primary";
  size: SmButtonProps["size"] = "md";
  disabled = false;
  get classes() { return `sm-button sm-button--${this.variant} sm-button--${this.size}`; }
}
