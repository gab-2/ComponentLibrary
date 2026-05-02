import * as React from "react";
import { getModalClass, getModalContentClass } from "@sua-marca-ui/core";

type ModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
  closeOnBackdropClick?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  restoreFocus?: boolean;
  ariaLabel?: string;
};

export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
  contentClassName,
  closeOnBackdropClick = true,
  initialFocusRef,
  restoreFocus = true,
  ariaLabel = "Dialog",
}: ModalProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = typeof open === "boolean";
  const isOpen = isControlled ? open : uncontrolledOpen;
  const contentRef = React.useRef<HTMLDivElement>(null);
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  React.useEffect(() => {
    if (!isOpen) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;

    const target = initialFocusRef?.current ?? contentRef.current;
    target?.focus();

    return () => {
      if (restoreFocus) {
        lastFocusedRef.current?.focus?.();
      }
    };
  }, [initialFocusRef, isOpen, restoreFocus]);

  if (!isOpen) return null;

  return (
    <div
      className={[getModalClass(), className].filter(Boolean).join(" ")}
      role="presentation"
      onClick={() => {
        if (closeOnBackdropClick) setOpen(false);
      }}
    >
      <div
        ref={contentRef}
        className={[getModalContentClass(), contentClassName].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            setOpen(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
