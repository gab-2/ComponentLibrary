import * as React from "react";
import { getBadgeClass } from "@sua-marca-ui/core";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(function Badge({ className, children, ...props }, ref) {
  return (
    <span ref={ref} className={[getBadgeClass(), className].filter(Boolean).join(" ")} {...props}>
      {children}
    </span>
  );
});
