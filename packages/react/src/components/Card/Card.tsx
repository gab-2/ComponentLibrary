import * as React from "react";
import { getCardClass } from "@sua-marca-ui/core";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={[getCardClass(), className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
});
