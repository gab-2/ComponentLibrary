export interface RegistryAuthorizePayload { token: string; packageName: string; action: 'install' }
export async function authorizeRegistryInstall(payload: RegistryAuthorizePayload) {
  return { allowed: Boolean(payload.token), reason: payload.token ? null : 'MISSING_TOKEN' };
}
