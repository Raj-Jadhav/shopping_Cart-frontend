// web/src/lib/api.ts

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

function getCSRFToken(): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const csrfToken = getCSRFToken();

  //  Use a plain object
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> | undefined),
  };

  // Only set JSON headers if NOT FormData
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // CSRF for unsafe methods
  if (
    csrfToken &&
    ["POST", "PUT", "PATCH", "DELETE"].includes(
      options.method?.toUpperCase() || ""
    )
  ) {
    headers["X-CSRFToken"] = csrfToken;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "API request failed");
  }

  return res.json();
}

// Helpers
export const apiGet = <T>(endpoint: string) =>
  apiFetch<T>(endpoint, { method: "GET" });

export const apiPost = <T, B = unknown>(endpoint: string, body: B) =>
  apiFetch<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(body),
  });

export const apiPostForm = <T>(endpoint: string, formData: FormData) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    body: formData,                 // FormData handles files and text
    credentials: "include",         // send cookies/session
  }).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  });

export const apiDelete = <T = unknown>(endpoint: string) =>
  apiFetch<T>(endpoint, { method: "DELETE" });

export const apiUpdateForm = <T>(endpoint: string, formData: FormData) =>
  fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    body: formData,                 // FormData handles files and text
    credentials: "include",         // send cookies/session
  }).then(async (res) => {
    if (!res.ok) throw new Error(await res.text());
    return res.json() as Promise<T>;
  });