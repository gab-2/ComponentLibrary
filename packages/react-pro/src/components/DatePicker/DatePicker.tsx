import * as React from "react";

export interface DatePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
}

export function DatePicker({ value, onChange, label = "Date" }: DatePickerProps) {
  return (
    <label className="sm-input-group">
      <span>{label}</span>
      <input
        className="sm-input"
        type="date"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </label>
  );
}
