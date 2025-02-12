import ky, { Options } from "ky";

export function classNames(
  classList: (string | null | undefined | false)[]
): string {
  return classList.filter(Boolean).join(" ");
}

export function createAbortError(message = "Request aborted") {
  return {
    name: "AbortError",
    message: message,
  };
}

export async function apiRequest<T>(
  url: string,
  options: Options = {}
): Promise<T> {
  // eslint-disable-next-line no-useless-catch
  try {
    return await ky(url, {
      retry: 3,
      ...options,
      headers: {
        "Content-Type": "application/json",
        "api-key": import.meta.env.VITE_API_KEY,
        ...options.headers,
      },
    }).json<T>();
  } catch (error) {
    throw error;
  }
}
