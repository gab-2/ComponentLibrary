import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:4000';

function mockCreateToken(email: string) {
  if (email === 'free@example.com') {
    return NextResponse.json(
      { error: 'FREE users cannot generate Pro tokens.' },
      { status: 403 },
    );
  }

  return NextResponse.json(
    {
      token: `smui_test_${Date.now()}`,
      tokenRecord: {
        id: `tok_${Date.now()}`,
        revoked: false,
      },
    },
    { status: 201 },
  );
}

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');

  try {
    const response = await fetch(
      `${apiBaseUrl}/registry/tokens?email=${encodeURIComponent(email ?? '')}`,
      { cache: 'no-store' },
    );
    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return NextResponse.json({ tokens: [] }, { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const response = await fetch(`${apiBaseUrl}/registry/tokens`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    return NextResponse.json(await response.json(), { status: response.status });
  } catch {
    return mockCreateToken(body?.email ?? '');
  }
}
