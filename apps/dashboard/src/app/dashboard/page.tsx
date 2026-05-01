import { getSessionFromEnv } from '@sua-marca/entitlement';

export default function DashboardPage() {
  const session = getSessionFromEnv();
  return <main><h1>Dashboard</h1><p>Current plan: {session.plan}</p></main>;
}
