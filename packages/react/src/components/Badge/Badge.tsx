import * as React from "react";
import { getBadgeClass } from "@sua-marca-ui/core";
export function Badge({ children }: { children: React.ReactNode }) { return <span className={getBadgeClass()}>{children}</span>; }
