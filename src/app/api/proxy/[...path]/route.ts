import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://project-epoverse-backend.onrender.com/api";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function handler(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  const pathStr = path.join("/");
  const url = `${BACKEND_URL}/${pathStr}`;
  
  console.log(`[Proxy] ${request.method} request to: ${url}`);

  try {
    const contentType = request.headers.get("content-type");
    let body: string | FormData | undefined;

    if (request.method !== "GET" && request.method !== "HEAD") {
         if (contentType?.includes("multipart/form-data")) {
            // For file uploads, we might need more complex handling, 
            // but for login (JSON), text/json is fine.
            // Let's stick to text for now as most APIs are JSON.
             body = await request.formData();
         } else {
             body = await request.text();
         }
    }

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    
    // Pass Auth header if present
    const authHeader = request.headers.get("Authorization");
    if (authHeader) {
        headers["Authorization"] = authHeader;
    }

    const response = await fetch(url, {
      method: request.method,
      headers: headers,
      body: body instanceof FormData ? body : body,
      cache: "no-store",
    });

    console.log(`[Proxy] Response status from backend: ${response.status}`);

    const data = await response.json();
    
    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: unknown) {
    console.error("[Proxy] Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Proxy Error";
    return NextResponse.json(
        { message: errorMessage }, 
        { status: 500 }
    );
  }
}

export { 
    handler as GET, 
    handler as POST, 
    handler as PUT, 
    handler as DELETE, 
    handler as PATCH 
};
