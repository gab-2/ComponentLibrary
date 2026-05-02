export default { title: "Vue/Card" };

export const Default = {
  args: { hover: false, interactive: false },
};

export const HoverEnabled = {
  args: { hover: true },
};

export const Interactive = {
  args: { hover: true, interactive: true },
};

export const DarkMode = {
  args: { hover: true },
  parameters: { backgrounds: { default: "dark" } },
};
