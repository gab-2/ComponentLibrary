export interface RegistryAuthorizeRequest {
  email?: string;
  token: string;
  packageName: string;
  action?: "install";
}

export interface RegistryAuthorizeResponse {
  allowed: boolean;
  reason: string;
}

export async function authorizeRegistryAccess(
  apiBaseUrl: string,
  payload: RegistryAuthorizeRequest,
): Promise<RegistryAuthorizeResponse> {
  const response = await fetch(`${apiBaseUrl}/registry/authorize`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return { allowed: false, reason: `api_error_${response.status}` };
  }

  return (await response.json()) as RegistryAuthorizeResponse;
}
