export default { title: "React/Button" };

export const SolidMd = {
  args: { variant: "solid", size: "md", children: "Salvar" },
};
export const OutlineLg = {
  args: { variant: "outline", size: "lg", children: "Continuar" },
};
export const GhostSm = {
  args: { variant: "ghost", size: "sm", children: "Cancelar" },
};
export const Loading = {
  args: {
    variant: "solid",
    size: "md",
    loading: true,
    children: "Carregando...",
  },
};
export const Disabled = {
  args: {
    variant: "solid",
    size: "md",
    disabled: true,
    children: "Desabilitado",
  },
};
