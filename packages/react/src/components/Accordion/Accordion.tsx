import * as React from "react";
import { getAccordionClass } from "@sua-marca-ui/core";
export function Accordion(props: React.HTMLAttributes<HTMLDivElement>) { return <div {...props} className={[getAccordionClass(), props.className].filter(Boolean).join(" ")} />; }
