import { NextResponse } from "next/server";

const getBackendBaseUrl = () => {
  const rawBase =
    process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.API_URL?.trim();
  return rawBase ? rawBase.replace(/\/$/, "") : "";
};

async function proxyRequest(request) {
  const backendBaseUrl = getBackendBaseUrl();

  if (!backendBaseUrl) {
    return NextResponse.json(
      {
        success: false,
        message: "Backend URL is not configured.",
      },
      { status: 500 },
    );
  }

  const path = request.nextUrl.pathname.replace(/^\/api\/proxy/, "") || "/";
  const search = request.nextUrl.search || "";
  const targetUrl = `${backendBaseUrl}${path}${search}`;

  const headers = new Headers(request.headers);
  const authHeader = headers.get("authorization");
  console.log(`[proxy] ${request.method} ${path}`, {
    targetUrl,
    hasAuthHeader: Boolean(authHeader),
  });
  headers.delete("host");
  headers.delete("content-length");

  const init = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (!["GET", "HEAD"].includes(request.method)) {
    const body = await request.text();
    if (body) {
      init.body = body;
    }
  }

  const response = await fetch(targetUrl, init);
  const responseText = await response.text();

  const responseHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (!["content-length", "transfer-encoding"].includes(key.toLowerCase())) {
      responseHeaders.set(key, value);
    }
  });

  return new NextResponse(responseText, {
    status: response.status,
    headers: responseHeaders,
  });
}

export async function GET(request) {
  return proxyRequest(request);
}

export async function POST(request) {
  return proxyRequest(request);
}

export async function PUT(request) {
  return proxyRequest(request);
}

export async function PATCH(request) {
  return proxyRequest(request);
}

export async function DELETE(request) {
  return proxyRequest(request);
}
