export default { title: "Vue/Input" };

export const Default = {
  args: { placeholder: "Digite seu e-mail", modelValue: "" },
};

export const WithLabel = {
  args: { label: "E-mail", placeholder: "nome@empresa.com" },
};

export const Invalid = {
  args: {
    label: "E-mail",
    error: "Formato inválido",
    invalid: true,
    modelValue: "valor",
  },
};

export const Disabled = {
  args: { label: "Nome", disabled: true, modelValue: "desabilitado" },
};

export const DarkMode = {
  args: { label: "Buscar", placeholder: "Pesquisar..." },
  parameters: { backgrounds: { default: "dark" } },
};
