import * as React from "react";
import { getTabsClass } from "@sua-marca-ui/core";
export function Tabs(props: React.HTMLAttributes<HTMLDivElement>) { return <div role="tablist" {...props} className={[getTabsClass(), props.className].filter(Boolean).join(" ")} />; }
