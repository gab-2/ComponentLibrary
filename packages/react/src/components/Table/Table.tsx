import * as React from "react";
import { getTableClass } from "@sua-marca-ui/core";
export function Table(props: React.TableHTMLAttributes<HTMLTableElement>) { return <table {...props} className={[getTableClass(), props.className].filter(Boolean).join(" ")} />; }
