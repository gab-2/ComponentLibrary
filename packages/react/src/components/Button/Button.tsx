import * as React from "react";
import { getButtonClass, type ButtonVariant } from "@sua-marca/core";

export function Button({ variant = "primary", children }: { variant?: ButtonVariant; children: React.ReactNode }) {
  return <button className={getButtonClass(variant)}>{children}</button>;
}
