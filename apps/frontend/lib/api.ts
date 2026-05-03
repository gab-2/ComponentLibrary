const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:4000';

export async function apiCall(path: string, init: RequestInit = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', ...(init.headers ?? {}) },
    cache: 'no-store',
  });
  const body = await response.json();
  return { status: response.status, body };
}

export function requireEmail(email?: string) {
  return Boolean(email && email.includes('@'));
}
