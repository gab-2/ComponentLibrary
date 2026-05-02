import * as React from "react";
import { getComboboxClass } from "@sua-marca-ui/core";
export function Combobox(props: React.InputHTMLAttributes<HTMLInputElement>) { return <input role="combobox" {...props} className={[getComboboxClass(), props.className].filter(Boolean).join(" ")} />; }
