export default { title: "React/Modal" };

export const Open = {
  args: { open: true, ariaLabel: "Confirmação", children: "Conteúdo do modal" },
};
export const Controlled = {
  args: {
    open: true,
    closeOnBackdropClick: false,
    children: "Fluxo controlado",
  },
};
