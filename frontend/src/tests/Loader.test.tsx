import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Loader from "@/components/Loader";

vi.mock("react-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-dom");
  return {
    ...actual,
    createPortal: actual.createPortal,
  };
});

describe("Loader component", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="portal-loader"></div>';
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
  });

  test("renders the Loader component", () => {
    render(<Loader />);
    expect(screen.getByTestId("loader-img")).toBeInTheDocument();
  });

  test("does not render inside the portal by default", () => {
    render(<Loader fullPage={false} />);
    const portalElement = document.getElementById("portal-loader");
    expect(portalElement?.childElementCount).toBe(0);
  });

  test('renders inside the portal when "fullPage" is "true"', () => {
    render(<Loader fullPage />);
    const portalElement = document.getElementById("portal-loader");
    expect(portalElement?.childElementCount).toBeGreaterThan(0);
  });

  test("applies provided className", () => {
    render(<Loader className="custom-class" />);
    const loaderElement = screen.getByTestId("loader-img").parentElement;
    expect(loaderElement).toHaveClass("custom-class");
  });
});
