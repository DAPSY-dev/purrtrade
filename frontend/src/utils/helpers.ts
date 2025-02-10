import ky, { Options } from "ky";

export function classNames(
  classList: (string | null | undefined | false)[]
): string {
  return classList.filter(Boolean).join(" ");
}

export async function apiRequest<T>(
  url: string,
  options: Options = {}
): Promise<T> {
  return ky(url, {
    retry: 3,
    ...options,
    headers: {
      "Content-Type": "application/json",
      "api-key": import.meta.env.VITE_API_KEY,
      ...options.headers,
    },
  }).json<T>();
}
