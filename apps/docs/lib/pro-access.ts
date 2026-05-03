export async function canAccessPro(email?: string): Promise<boolean> {
  if (!email) return false;
  const apiBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:4000';
  const response = await fetch(`${apiBaseUrl}/me?email=${encodeURIComponent(email)}`, { cache: 'no-store' });
  if (!response.ok) return false;
  const body = (await response.json()) as { access?: { canAccessPro?: boolean } };
  return Boolean(body.access?.canAccessPro);
}
