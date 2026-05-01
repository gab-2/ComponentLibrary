import * as React from "react";

export interface CommandMenuItem {
  id: string;
  label: string;
}

export interface CommandMenuProps {
  items: CommandMenuItem[];
  query?: string;
  onQueryChange?: (query: string) => void;
}

export function CommandMenu({ items, query = "", onQueryChange }: CommandMenuProps) {
  const filtered = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="sm-card">
      <input
        className="sm-input"
        value={query}
        onChange={(event) => onQueryChange?.(event.target.value)}
        placeholder="Type a command..."
      />
      <ul>
        {filtered.map((item) => (
          <li key={item.id}>{item.label}</li>
        ))}
      </ul>
    </div>
  );
}
