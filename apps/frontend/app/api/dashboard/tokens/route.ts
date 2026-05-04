import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:4000';

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  const response = await fetch(`${apiBaseUrl}/registry/tokens?email=${encodeURIComponent(email ?? '')}`, { cache: 'no-store' });
  return NextResponse.json(await response.json(), { status: response.status });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const response = await fetch(`${apiBaseUrl}/registry/tokens`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store',
  });
  return NextResponse.json(await response.json(), { status: response.status });
}
