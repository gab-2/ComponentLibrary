import { redirect } from 'next/navigation';
import { requireEmail } from '../lib/api';

export function ensureDashboardAccess(email?: string) {
  if (!requireEmail(email)) redirect('/login');
}
