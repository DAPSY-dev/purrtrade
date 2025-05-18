import { describe, expect, test, afterEach, vi } from "vitest";
import { screen, cleanup } from "@testing-library/react";
import { createNextNavigationMock } from "@tests/mocks/nextNavigationMock";
import { renderWithLocales } from "@tests/utils/locales";
import Page from "@app/[locale]/page";
import "@/envConfig.ts";

vi.mock("next/navigation", () => createNextNavigationMock());

describe("Page", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  test("Renders welcome message as level 1 heading", () => {
    renderWithLocales(<Page />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Welcome" })
    ).toBeDefined();
  });
});
