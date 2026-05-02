import * as React from "react";
import { getInputClass } from "@sua-marca-ui/core";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={getInputClass()} />;
}
