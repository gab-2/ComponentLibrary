export class SmInputComponent {
  value = "";
  placeholder = "";
  disabled = false;
  onValueChange(next: string): string { this.value = next; return this.value; }
}
