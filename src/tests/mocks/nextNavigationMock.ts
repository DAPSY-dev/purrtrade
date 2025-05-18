import { vi } from "vitest";

export function createNextNavigationMock(
  options: {
    useRouter?: Partial<{
      push: ReturnType<typeof vi.fn>;
      replace: ReturnType<typeof vi.fn>;
      prefetch: ReturnType<typeof vi.fn>;
      back: ReturnType<typeof vi.fn>;
      forward: ReturnType<typeof vi.fn>;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  } = {}
) {
  return {
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
    useParams: () => ({}),
    useSegments: () => [],
    redirect: vi.fn(),
    permanentRedirect: vi.fn(),
    notFound: vi.fn(),
    ...options,
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      ...options.useRouter,
    }),
  };
}
