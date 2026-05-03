import { NextRequest, NextResponse } from 'next/server';

const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:4000';

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const body = await request.json();
  const { id } = await params;
  const response = await fetch(`${apiBaseUrl}/registry/tokens/${id}`, {
    method: 'DELETE', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), cache: 'no-store',
  });
  return NextResponse.json(await response.json(), { status: response.status });
}
