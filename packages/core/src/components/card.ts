export function getCardClass({
  hover = false,
  interactive = false,
}: { hover?: boolean; interactive?: boolean } = {}) {
  return [
    "sm-card",
    hover ? "sm-card--hover" : "",
    interactive ? "sm-card--interactive" : "",
  ]
    .filter(Boolean)
    .join(" ");
}
