import * as React from "react";
import { getButtonClass, type ButtonSize, type ButtonVariant } from "@sua-marca-ui/core";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
};

export function Button({ variant = "solid", size = "md", loading = false, className, children, disabled, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      className={[getButtonClass({ variant, size, loading }), className].filter(Boolean).join(" ")}
    >
      {children}
    </button>
  );
}
