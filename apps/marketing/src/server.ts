import Fastify from "fastify";
import { Button, Card, PricingCard } from "@sua-marca/ui-internal";

const app = Fastify({ logger: true });

app.get("/", async () => ({
  hero: {
    title: "Build faster with multi-framework UI components",
    ctas: [Button({ label: "View Pricing", href: "/pricing" }), Button({ label: "Read Docs", href: "/components" })],
  },
  sections: [
    "component-preview",
    "free-components",
    "pro-preview-locked",
    "framework-support",
    "private-registry-access",
  ],
}));

app.get("/pricing", async () => ({
  plans: [
    PricingCard({ plan: "FREE", price: "$0", features: ["Public packages", "Public docs"], cta: "Get started" }),
    PricingCard({ plan: "PRO_MONTHLY", price: "$29/mo", features: ["Private packages", "Private docs"], cta: "Subscribe" }),
    PricingCard({ plan: "PRO_YEARLY", price: "$290/yr", features: ["Private packages", "Private docs"], cta: "Subscribe" }),
    PricingCard({ plan: "LIFETIME", price: "$899 one-time", features: ["Permanent Pro access", "Future updates", "New components"], cta: "Buy lifetime" }),
  ],
}));

app.get("/components", async () => ({
  free: [Card({ title: "Button", description: "Free component" }), Card({ title: "Card", description: "Free component" })],
  proLocked: [{ name: "DataTable", locked: true, cta: "Upgrade to Pro" }],
}));

app.get("/components/free", async () => ({ components: ["Button", "Input", "Card", "Badge"] }));
app.get("/components/pro", async () => ({ previews: [{ name: "DataTable", locked: true }, { name: "DatePicker", locked: true }] }));

if (process.env.NODE_ENV !== "test") {
  app.listen({ port: 3001, host: "0.0.0.0" }).catch((error) => {
    app.log.error(error);
    process.exit(1);
  });
}

export { app as marketingServer };
