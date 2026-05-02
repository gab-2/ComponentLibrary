import * as React from "react";
import { getAlertClass } from "@sua-marca-ui/core";

type AlertProps = React.HTMLAttributes<HTMLDivElement>;

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={[getAlertClass(), className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
});
