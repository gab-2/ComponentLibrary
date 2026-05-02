import { Card } from "@sua-marca-ui/react";

export default {
  title: "React/Card",
  component: Card,
};

export const Default = {
  args: {
    children: "Conteúdo do card",
  },
};

export const HoverEnabled = {
  args: {
    hover: true,
    children: "Card com estado hover habilitado",
  },
};

export const Interactive = {
  args: {
    hover: true,
    interactive: true,
    onClick: () => undefined,
    children: "Card interativo",
  },
};

export const DarkMode = {
  args: {
    hover: true,
    children: "Card em modo escuro",
  },
  parameters: { backgrounds: { default: "dark" } },
};
