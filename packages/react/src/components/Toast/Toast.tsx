import * as React from "react";
import { getToastClass } from "@sua-marca-ui/core";
export function Toast(props: React.HTMLAttributes<HTMLDivElement>) { return <div role="status" aria-live="polite" {...props} className={[getToastClass(), props.className].filter(Boolean).join(" ")} />; }
