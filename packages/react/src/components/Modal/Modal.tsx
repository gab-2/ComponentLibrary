import * as React from "react";
import { getModalClass, getModalContentClass } from "@sua-marca-ui/core";
export function Modal({ open, children }: { open: boolean; children: React.ReactNode }) {
  if (!open) return null;
  return <div className={getModalClass()}><div className={getModalContentClass()}>{children}</div></div>;
}
