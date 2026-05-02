import * as React from "react";
import { createFocusOriginTracker, getInputAriaInvalid, getInputClass, type InputSize } from "@sua-marca-ui/core";

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> & {
  label?: string;
  error?: string;
  size?: InputSize;
  invalid?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, id, size = "md", invalid = false, className, onFocus, onBlur, onPointerDown, onKeyDown, ...props },
  ref,
) {
  const trackerRef = React.useRef(createFocusOriginTracker());
  const [focused, setFocused] = React.useState(false);
  const [focusOrigin, setFocusOrigin] = React.useState<"keyboard" | "pointer" | "programmatic">("programmatic");

  const resolvedInvalid = invalid || Boolean(error);
  const inputId = id ?? React.useId();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Tab") {
      trackerRef.current.onKeyboardNavigation();
    }
    onKeyDown?.(event);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLInputElement>) => {
    trackerRef.current.onPointerInteraction();
    onPointerDown?.(event);
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    setFocusOrigin(trackerRef.current.getOrigin());
    onFocus?.(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(event);
  };

  return (
    <div>
      {label ? (
        <label className="sm-input-label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <input
        {...props}
        id={inputId}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPointerDown={handlePointerDown}
        onKeyDown={handleKeyDown}
        aria-invalid={getInputAriaInvalid({ invalid, error })}
        className={[getInputClass({ size, invalid: resolvedInvalid, focused, focusOrigin }), className].filter(Boolean).join(" ")}
      />
      {error ? <p className="sm-input-error">{error}</p> : null}
    </div>
  );
});
