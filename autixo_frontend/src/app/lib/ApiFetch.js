const API_URL = process.env.NEXT_PUBLIC_API_URL;
const AUTH_URL = `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth`;

async function getJwtToken() {
  if (typeof window === "undefined") return null;

  try {
    const response = await fetch(`${AUTH_URL}/token`, {
      credentials: "include",
    });

    if (!response.ok) return null;

    const { token } = await response.json();
    return token ?? null;
  } catch (error) {
    console.error("Failed to get JWT:", error);
    return null;
  }
}

export async function apiFetch(endpoint, options = {}) {
  const headers = new Headers(options.headers || {});

  // Default JSON
  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!headers.has("Authorization")) {
    const token = await getJwtToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const url = `${API_URL}${endpoint}`;

  console.log("API_URL:", API_URL);
  console.log("Endpoint:", endpoint);
  console.log("Full URL:", url);

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  console.log("Status:", response.status);
  console.log("Response:", data);

  if (!response.ok) {
    throw new Error(data.message || data.error || `HTTP ${response.status}`);
  }

  return data;
}
