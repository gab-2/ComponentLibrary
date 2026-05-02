import * as React from "react";
import { getRadioClass } from "@sua-marca-ui/core";
export function Radio(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input type="radio" {...props} className={[getRadioClass(), props.className].filter(Boolean).join(" ")} />; }
