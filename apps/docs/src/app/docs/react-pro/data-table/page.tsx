import { canAccessPrivateDocs, getSessionFromEnv } from '@sua-marca/entitlement';

export default function ProDataTableDocsPage() {
  const session = getSessionFromEnv();
  if (!canAccessPrivateDocs(session)) {
    return <main><h1>Pro Docs Locked</h1><p>Upgrade to Pro or Lifetime to access this page.</p></main>;
  }
  return <main><h1>React Pro DataTable</h1><p>Private documentation content for entitled users.</p></main>;
}
