import * as React from "react";
import { getSwitchClass } from "@sua-marca-ui/core";
export function Switch({ checked = false, className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) { return <input role="switch" type="checkbox" checked={checked} {...props} className={[getSwitchClass(Boolean(checked)), className].filter(Boolean).join(" ")} />; }
