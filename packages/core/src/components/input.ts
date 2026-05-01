export interface InputClassOptions {
  invalid?: boolean;
  disabled?: boolean;
}

export function getInputClasses(options: InputClassOptions = {}): string {
  return [
    'sm-input',
    options.invalid ? 'sm-input--invalid' : null,
    options.disabled ? 'sm-input--disabled' : null,
  ]
    .filter(Boolean)
    .join(' ');
}
