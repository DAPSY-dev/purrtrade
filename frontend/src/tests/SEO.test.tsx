import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import SEO from "@/components/SEO";

describe("SEO component", () => {
  function renderSEO(props: React.ComponentProps<typeof SEO>) {
    return render(
      <HelmetProvider>
        <SEO {...props} />
      </HelmetProvider>
    );
  }

  beforeAll(() => {
    vi.stubEnv("VITE_APP_TITLE", "Test Title");
    vi.stubEnv("VITE_APP_DESCRIPTION", "Test Description");
    vi.stubEnv("VITE_APP_KEYWORDS", "Test, Keywords");
    vi.stubEnv("VITE_FRONTEND_URL", "https://example.com");
  });

  afterAll(() => {
    vi.unstubAllEnvs();
  });

  test("renders the test title from VITE_APP_TITLE", async () => {
    renderSEO({});
    await waitFor(() => {
      const title = document.querySelector("title");
      expect(title).not.toBeNull();
    });
    const title = document.querySelector("title");
    expect(title?.textContent).toBe("Test Title");
  });

  test("renders a custom title when provided", async () => {
    renderSEO({ title: "Custom Title" });
    await waitFor(() => {
      const title = document.querySelector("title");
      expect(title).not.toBeNull();
      expect(title?.textContent).toContain("Custom Title");
    });
    const title = document.querySelector("title");
    expect(title?.textContent).toBe("Test Title - Custom Title");
  });

  test("renders the test description from VITE_APP_DESCRIPTION", async () => {
    renderSEO({});
    await waitFor(() => {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      expect(metaDescription).not.toBeNull();
    });
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("Test Description");
  });

  test("renders a custom description when provided", async () => {
    renderSEO({ description: "Custom Description" });
    await waitFor(() => {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      expect(metaDescription).not.toBeNull();
    });
    const metaDescription = document.querySelector('meta[name="description"]');
    expect(metaDescription?.getAttribute("content")).toBe("Custom Description");
  });

  test("renders the test keywords from VITE_APP_KEYWORDS", async () => {
    renderSEO({});
    await waitFor(() => {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      expect(metaKeywords).not.toBeNull();
    });
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords?.getAttribute("content")).toBe("Test, Keywords");
  });

  test("renders custom keywords when provided", async () => {
    renderSEO({ keywords: "Custom, Keywords" });
    await waitFor(() => {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      expect(metaKeywords).not.toBeNull();
    });
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    expect(metaKeywords?.getAttribute("content")).toBe("Custom, Keywords");
  });

  test("renders the test image URL from VITE_FRONTEND_URL", async () => {
    renderSEO({});
    await waitFor(() => {
      const metaImage = document.querySelector('meta[property="og:image"]');
      expect(metaImage).not.toBeNull();
    });
    const metaImage = document.querySelector('meta[property="og:image"]');
    expect(metaImage?.getAttribute("content")).toBe(
      "https://example.com/images/og/og.png"
    );
  });

  test("renders a custom image URL when provided", async () => {
    renderSEO({ image: "https://example.com/custom-image.png" });
    await waitFor(() => {
      const metaImage = document.querySelector('meta[property="og:image"]');
      expect(metaImage).not.toBeNull();
    });
    const metaImage = document.querySelector('meta[property="og:image"]');
    expect(metaImage?.getAttribute("content")).toBe(
      "https://example.com/custom-image.png"
    );
  });

  test("renders the test URL from window.location.href", async () => {
    const originalLocation = window.location.href;
    Object.defineProperty(window, "location", {
      value: { href: "https://current-url.com" },
      writable: true,
    });
    renderSEO({});
    await waitFor(() => {
      const metaUrl = document.querySelector('meta[property="og:url"]');
      expect(metaUrl).not.toBeNull();
    });
    const metaUrl = document.querySelector('meta[property="og:url"]');
    expect(metaUrl?.getAttribute("content")).toBe("https://current-url.com");
    Object.defineProperty(window, "location", {
      value: { href: originalLocation },
      writable: true,
    });
  });

  test("renders a custom URL when provided", async () => {
    renderSEO({ url: "https://custom-url.com" });
    await waitFor(() => {
      const metaUrl = document.querySelector('meta[property="og:url"]');
      expect(metaUrl).not.toBeNull();
    });
    const metaUrl = document.querySelector('meta[property="og:url"]');
    expect(metaUrl?.getAttribute("content")).toBe("https://custom-url.com");
  });
});
