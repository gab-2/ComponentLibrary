import TokenManager from '../../../components/token-manager';
import { ensureDashboardAccess } from '../../../components/auth-guard';

export default async function TokensPage({ searchParams }: { searchParams?: Promise<{ email?: string }> }) {
  const params = (await searchParams) ?? {};
  ensureDashboardAccess(params.email);
  return <TokenManager email={params.email!} />;
}
