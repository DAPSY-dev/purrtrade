import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import ErrorBoundary from "@/components/ErrorBoundary";

describe("ErrorBoundary component", () => {
  const mockStore = createStore(() => {
    return {
      strings: {
        strings: {
          GO_BACK_HOME: "Go back home",
          OOPS: "Oops!",
          SOMETHING_WENT_WRONG: "Something went wrong.",
          PLEASE_TRY_AGAIN_LATER: "Please try again later.",
        },
        loading: false,
        error: null,
      },
    };
  });

  function renderWithProvider(ui: ReactNode) {
    return render(
      <Provider store={mockStore}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  }

  test("should render fallback UI when an error occurs", () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    function ProblemComponent() {
      throw new Error("Test error");
      return <></>;
    }
    renderWithProvider(
      <ErrorBoundary>
        <ProblemComponent />
      </ErrorBoundary>
    );
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    consoleErrorMock.mockRestore();
  });

  test("should render children if no error occurs", () => {
    renderWithProvider(
      <ErrorBoundary>
        <div>Children</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
