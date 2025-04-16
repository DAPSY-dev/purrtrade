import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import ErrorBoundary from "@/components/ErrorBoundary";

describe("ErrorBoundary component", () => {
  function renderWithRouter(ui: ReactNode) {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  }

  test("should render fallback UI when an error occurs", () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    function ProblemComponent() {
      throw new Error("Test error");
      return <></>;
    }
    renderWithRouter(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });

  test("should render children if no error occurs", () => {
    renderWithRouter(
      <ErrorBoundary>
        <div>Children</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
