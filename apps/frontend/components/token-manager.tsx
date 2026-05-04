'use client';

import { useState } from 'react';

type TokenRow = { id: string; name: string; prefix: string; revokedAt: string | null };

export default function TokenManager({ email }: { email: string }) {
  const [tokens, setTokens] = useState<TokenRow[]>([]);
  const [name, setName] = useState('default');
  const [createdToken, setCreatedToken] = useState<string>('');
  const [error, setError] = useState<string>('');

  async function listTokens() {
    setError('');
    const res = await fetch(`/api/dashboard/tokens?email=${encodeURIComponent(email)}`);
    const body = await res.json();
    setTokens(body.tokens ?? []);
  }

  async function createToken() {
    setError('');
    const res = await fetch('/api/dashboard/tokens', {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, name }),
    });
    const body = await res.json();
    if (!res.ok) return setError(body.error ?? 'create_failed');
    setCreatedToken(body.token ?? '');
    await listTokens();
  }

  async function revokeToken(id: string) {
    setError('');
    const res = await fetch(`/api/dashboard/tokens/${id}`, {
      method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email }),
    });
    if (!res.ok) {
      const body = await res.json();
      return setError(body.error ?? 'revoke_failed');
    }
    await listTokens();
  }

  return (
    <section className="space-y-3 rounded border bg-white p-4">
      <h2 className="text-xl font-semibold">Registry Tokens</h2>
      <button className="rounded border px-3 py-1" onClick={listTokens}>List tokens</button>
      <div className="flex gap-2">
        <input className="rounded border px-2 py-1" value={name} onChange={(e) => setName(e.target.value)} />
        <button className="rounded bg-slate-900 px-3 py-1 text-white" onClick={createToken}>Create token</button>
      </div>
      {createdToken ? <p className="rounded bg-emerald-50 p-2 text-sm">Raw token (shown once): <code>{createdToken}</code></p> : null}
      {error ? <p className="rounded bg-rose-50 p-2 text-sm text-rose-700">{error}</p> : null}
      <ul className="space-y-2 text-sm">{tokens.map((t) => <li className="rounded border p-2" key={t.id}>{t.name} ({t.prefix}) {t.revokedAt ? 'revoked' : 'active'} <button className="ml-2 underline" onClick={() => revokeToken(t.id)}>revoke</button></li>)}</ul>
    </section>
  );
}
