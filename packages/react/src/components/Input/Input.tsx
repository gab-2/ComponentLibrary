import * as React from "react";
import { getInputClass, type InputSize } from "@sua-marca-ui/core";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  size?: InputSize;
  invalid?: boolean;
};

export function Input({ size = "md", invalid = false, className, ...props }: InputProps) {
  return <input {...props} aria-invalid={invalid || undefined} className={[getInputClass({ size, invalid }), className].filter(Boolean).join(" ")} />;
}
