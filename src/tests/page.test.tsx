import "@/envConfig.ts";
import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "@app/page";

describe("Page", () => {
  test("Renders app name as level 1 heading", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", { level: 1, name: process.env.APP_NAME })
    ).toBeDefined();
  });
});
