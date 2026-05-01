import * as React from "react";
import { getCardClass } from "@sua-marca/core";

export function Card({ children }: { children: React.ReactNode }) {
  return <div className={getCardClass()}>{children}</div>;
}
