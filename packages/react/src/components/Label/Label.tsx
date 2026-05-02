import * as React from "react";
import { getLabelClass } from "@sua-marca-ui/core";
export function Label(props: React.LabelHTMLAttributes<HTMLLabelElement>) { return <label {...props} className={[getLabelClass(), props.className].filter(Boolean).join(" ")} />; }
