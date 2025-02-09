export function classNames(
  classList: (string | null | undefined | false)[]
): string {
  return classList.filter(Boolean).join(" ");
}

export async function apiRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "api-key": import.meta.env.VITE_API_KEY,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }

  return response.json();
}
