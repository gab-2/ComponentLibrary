import { Input } from "@sua-marca-ui/react";

export default {
  title: "React/Input",
  component: Input,
};

export const Default = {
  args: { size: "md", placeholder: "Digite seu e-mail" },
};
export const WithLabel = {
  args: { size: "md", label: "E-mail", placeholder: "nome@empresa.com" },
};
export const Small = { args: { size: "sm", placeholder: "Nome" } };
export const Large = { args: { size: "lg", placeholder: "Busca" } };
export const Invalid = {
  args: {
    size: "md",
    label: "E-mail",
    error: "Formato inválido",
    defaultValue: "valor inválido",
  },
};
export const Disabled = {
  args: {
    size: "md",
    label: "Nome",
    disabled: true,
    value: "desabilitado",
    readOnly: true,
  },
};
export const DarkMode = {
  args: { size: "md", label: "Buscar", placeholder: "Pesquisar..." },
  parameters: { backgrounds: { default: "dark" } },
};
