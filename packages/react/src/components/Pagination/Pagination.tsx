import * as React from "react";
import { getPaginationClass } from "@sua-marca-ui/core";
export function Pagination(props: React.HTMLAttributes<HTMLElement>) { return <nav aria-label="Pagination" {...props} className={[getPaginationClass(), props.className].filter(Boolean).join(" ")} />; }
