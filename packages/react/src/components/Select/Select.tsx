import * as React from "react";
import { getSelectClass } from "@sua-marca-ui/core";
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) { return <select {...props} className={[getSelectClass(), props.className].filter(Boolean).join(" ")} />; }
