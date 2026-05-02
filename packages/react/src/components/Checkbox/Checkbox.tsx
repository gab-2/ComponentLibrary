import * as React from "react";
import { getCheckboxClass } from "@sua-marca-ui/core";
export function Checkbox(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input type="checkbox" {...props} className={[getCheckboxClass(), props.className].filter(Boolean).join(" ")} />; }
