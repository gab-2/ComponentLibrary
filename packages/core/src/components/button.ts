export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonClassOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
}

export function getButtonClasses(options: ButtonClassOptions = {}): string {
  const variant = options.variant ?? 'primary';
  const size = options.size ?? 'md';

  return [
    'sm-button',
    `sm-button--${variant}`,
    `sm-button--${size}`,
    options.disabled ? 'sm-button--disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');
}
