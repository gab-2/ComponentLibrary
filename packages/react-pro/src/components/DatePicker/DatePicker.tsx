import type { HTMLAttributes } from 'react';

export type DatePickerProps = HTMLAttributes<HTMLDivElement>;

export function DatePicker(props: DatePickerProps) {
  return <div {...props} />;
}
