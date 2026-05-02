import * as React from "react";
import { getMenuClass } from "@sua-marca-ui/core";
export function Menu(props: React.HTMLAttributes<HTMLUListElement>) { return <ul role="menu" {...props} className={[getMenuClass(), props.className].filter(Boolean).join(" ")} />; }
