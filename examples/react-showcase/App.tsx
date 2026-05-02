import { Alert, Badge, Button, Card, Input, Modal } from "@sua-marca-ui/react";

export default function App() {
  return (
    <main style={{ padding: 24, display: "grid", gap: 16 }}>
      <h1>Showcase de Componentes React</h1>

      <section style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button variant="primary">Button Primary</Button>
        <Button variant="ghost">Button Ghost</Button>
      </section>

      <section>
        <Input placeholder="Digite algo aqui..." />
      </section>

      <section>
        <Card>
          <h2 style={{ marginTop: 0 }}>Card</h2>
          <p>Este é um exemplo de conteúdo dentro do Card.</p>
          <Badge>Novo</Badge>
        </Card>
      </section>

      <section>
        <Alert>Este é um alerta de exemplo.</Alert>
      </section>

      <section>
        <h2>Modal</h2>
        <Modal open>
          <h3 style={{ marginTop: 0 }}>Título do Modal</h3>
          <p>Conteúdo do modal para visualização.</p>
          <Button variant="primary">Ação</Button>
        </Modal>
      </section>
    </main>
  );
}
