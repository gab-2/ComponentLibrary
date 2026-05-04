import { NextRequest, NextResponse } from 'next/server';

const registryAuthUrl = process.env.REGISTRY_AUTH_URL ?? 'http://localhost:4873/authorize';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await fetch(registryAuthUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ error: 'Registry unavailable, access denied.' }, { status: 403 });
  }
}
