import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import ErrorBoundary from "../components/ErrorBoundary";

describe("ErrorBoundary component", function () {
  const mockStore = createStore(function () {
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

  test("should render fallback UI when an error occurs", function () {
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
  });

  test("should render children if no error occurs", function () {
    renderWithProvider(
      <ErrorBoundary>
        <div>Children</div>
      </ErrorBoundary>
    );
    expect(screen.getByText("Children")).toBeInTheDocument();
  });
});
