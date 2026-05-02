export class SmCardComponent {
  hasHeader = false;
  hover = false;
  interactive = false;

  get classes(): string {
    return [
      "sm-card",
      this.hover ? "sm-card--hover" : "",
      this.interactive ? "sm-card--interactive" : "",
    ]
      .filter(Boolean)
      .join(" ");
  }
}
