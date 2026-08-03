const getAuthBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    process.env.BETTER_AUTH_URL ||
    "/api/auth"
  )
    .trim()
    .replace(/\/$/, "");
};

const getDataBaseUrl = () => {
  return (
    process.env.NEXT_PUBLIC_DATA_URI ||
    process.env.DATA_URI ||
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "/api/proxy"
  )
    .trim()
    .replace(/\/$/, "");
};

const getJwtToken = async () => {
  if (typeof window === "undefined") return null;

  try {
    let authBase = getAuthBaseUrl();

    // Ensure the path includes /api/auth so fetch hits /api/auth/token
    if (!authBase.includes("/api/auth")) {
      authBase = `${authBase}/api/auth`;
    }

    const res = await fetch(`${authBase}/token`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    return data?.token || null;
  } catch (error) {
    console.warn("Failed to get Better Auth JWT:", error);
    return null;
  }
};

export async function apiFetch(endpoint, options = {}) {
  const headers = new Headers(options.headers || {});

  // Default to JSON unless sending FormData
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Auto-attach client token if not provided manually in options
  const clientToken = await getJwtToken();
  if (clientToken && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${clientToken}`);
  }

  const baseUrl = getDataBaseUrl();
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });

  const rawText = await response.text();
  let parsedData = rawText;

  try {
    parsedData = JSON.parse(rawText);
  } catch {
    // Keep as text if response is not JSON
  }

  // Throw simplified errors for non-2xx responses
  if (!response.ok) {
    throw new Error(
      parsedData?.message || parsedData?.error || `HTTP ${response.status}`,
    );
  }

  return parsedData;
}
