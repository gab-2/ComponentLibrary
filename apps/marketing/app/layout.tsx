import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sua Marca UI - Marketing',
  description: 'Build faster with multi-framework UI components.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <a href="/" className="font-semibold">Sua Marca UI</a>
            <div className="flex gap-4 text-sm">
              <a href="/pricing" className="hover:underline">Pricing</a>
              <a href="/components" className="hover:underline">Components</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-6">{children}</main>
      </body>
    </html>
  );
}
