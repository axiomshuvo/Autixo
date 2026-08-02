const getBaseUrl = () => {
  const baseUrl = process.env.DATA_URI || "http://localhost:5001";
  return baseUrl.replace(/\/$/, "");
};

const getAuthBaseUrl = () => {
  const rawBase =
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL?.trim() || "/api/auth";
  const base = rawBase.replace(/\/$/, "");

  if (base.endsWith("/api/auth")) {
    return base;
  }

  if (base.startsWith("http://") || base.startsWith("https://")) {
    return `${base}/api/auth`;
  }

  return "/api/auth";
};

const getJwtToken = async () => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const authBase = getAuthBaseUrl();
    const tokenResponse = await fetch(`${authBase}/token`, {
      method: "GET",
      credentials: "include",
    });
    const tokenData = await tokenResponse.json();

    if (tokenData?.token) {
      return tokenData.token;
    }
  } catch (error) {
    console.warn("Failed to get Better Auth JWT", error);
  }
  return null;
};

export async function apiFetch(endpoint, options = {}) {
  const headers = new Headers(options.headers || {});

  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = await getJwtToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const normalizedEndpoint =
    endpoint.startsWith("http://") || endpoint.startsWith("https://")
      ? endpoint
      : `${getBaseUrl()}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(normalizedEndpoint, {
    ...options,
    headers,
    credentials: "omit",
  });

  const rawText = await response.text();
  let parsedData = rawText;

  try {
    parsedData = JSON.parse(rawText);
  } catch {
    // Keep as text if the response is not JSON.
  }

  if (!response.ok) {
    const message =
      (parsedData && parsedData.message) ||
      parsedData?.error ||
      `HTTP ${response.status}`;
    throw new Error(message);
  }

  return parsedData;
}
