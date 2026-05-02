import * as React from "react";
import { getCardClass } from "@sua-marca-ui/core";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  hover?: boolean;
  interactive?: boolean;
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    className,
    children,
    hover = false,
    interactive = false,
    onClick,
    ...props
  },
  ref,
) {
  const resolvedInteractive = interactive || Boolean(onClick);
  return (
    <div
      ref={ref}
      onClick={onClick}
      className={[
        getCardClass({ hover, interactive: resolvedInteractive }),
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  );
});
