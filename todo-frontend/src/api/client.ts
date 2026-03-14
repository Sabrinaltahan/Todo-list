const BASE_URL = import.meta.env.VITE_API_URL || "https://todo-list-rrqd.onrender.com";

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let message = "Something went wrong";

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      const text = await response.text();
      message = text || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}