export type ButtonProps = { label: string; href?: string; variant?: "primary" | "secondary" };
export function Button({ label, href, variant = "primary" }: ButtonProps) {
  return { type: "Button", label, href, variant };
}

export type CardProps = { title: string; description: string };
export function Card({ title, description }: CardProps) {
  return { type: "Card", title, description };
}

export function CodeBlock(code: string) {
  return { type: "CodeBlock", code };
}

export type PricingCardProps = { plan: string; price: string; features: string[]; cta: string };
export function PricingCard({ plan, price, features, cta }: PricingCardProps) {
  return { type: "PricingCard", plan, price, features, cta };
}
