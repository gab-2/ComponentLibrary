import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { getButtonClasses, type ButtonSize, type ButtonVariant } from '@sua-marca/core';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({ variant = 'primary', size = 'md', disabled = false, children, className, ...props }: ButtonProps) {
  const classes = [getButtonClasses({ variant, size, disabled }), className].filter(Boolean).join(' ');
  return <button className={classes} disabled={disabled} {...props}>{children}</button>;
}
