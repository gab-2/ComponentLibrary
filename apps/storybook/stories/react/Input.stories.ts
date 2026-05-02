export default { title: "React/Input" };

export const Default = {
  args: { size: "md", placeholder: "Digite seu e-mail" },
};
export const Small = { args: { size: "sm", placeholder: "Nome" } };
export const Large = { args: { size: "lg", placeholder: "Busca" } };
export const Invalid = {
  args: { size: "md", invalid: true, defaultValue: "valor inválido" },
};
export const Disabled = {
  args: { size: "md", disabled: true, value: "desabilitado" },
};
