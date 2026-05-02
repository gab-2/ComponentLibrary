import * as React from "react";
import { getTextareaClass } from "@sua-marca-ui/core";
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) { return <textarea {...props} className={[getTextareaClass(), props.className].filter(Boolean).join(" ")} />; }
