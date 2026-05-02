import * as React from "react";
import { getAlertClass } from "@sua-marca-ui/core";
export function Alert({ children }: { children: React.ReactNode }) { return <div className={getAlertClass()}>{children}</div>; }
