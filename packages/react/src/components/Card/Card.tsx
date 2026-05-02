import * as React from "react";
import { getCardClass } from "@sua-marca-ui/core";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={getCardClass()}>{children}</div>;
}
