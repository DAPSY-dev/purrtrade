import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import { legacy_createStore as createStore } from "redux";
import { Provider } from "react-redux";

let Modal: typeof import("@/components/Modal").default;

describe("Modal component", () => {
  const mockStore = createStore(() => {
    return {
      strings: {
        strings: {
          CLOSE: "Close",
        },
        loading: false,
        error: null,
      },
    };
  });

  function renderWithProvider(ui: ReactNode) {
    return render(<Provider store={mockStore}>{ui}</Provider>);
  }

  beforeAll(async () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    const modalComponent = await import("@/components/Modal");
    Modal = modalComponent.default;
  });

  afterAll(() => {
    cleanup();
    const root = document.getElementById("root");
    if (root) {
      root.remove();
    }
  });

  test("renders children when open", () => {
    renderWithProvider(
      <Modal isOpen={true}>
        <p>Modal content</p>
      </Modal>
    );
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  test("does not render when closed", () => {
    renderWithProvider(
      <Modal isOpen={false}>
        <p>Should not be visible</p>
      </Modal>
    );
    expect(screen.queryByText("Should not be visible")).not.toBeInTheDocument();
  });

  test("applies default and custom class names", () => {
    renderWithProvider(
      <Modal
        isOpen={true}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <p>Styled modal</p>
      </Modal>
    );
    const modal = screen.getByText("Styled modal").parentElement;
    expect(modal!.className).toContain("custom-modal");
    const overlay = modal!.parentElement;
    expect(overlay!.className).toContain("custom-overlay");
  });

  test('renders close button and triggers "onRequestClose" when clicked', async () => {
    const user = userEvent.setup();
    const onRequestClose = vi.fn();
    renderWithProvider(
      <Modal isOpen={true} onRequestClose={onRequestClose}>
        <p>Modal with close button</p>
      </Modal>
    );
    const closeButton = screen.getByRole("button", { name: "Close" });
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    expect(onRequestClose).toHaveBeenCalled();
  });

  test('does not render close button when "shouldRenderCloseButton" is "false"', () => {
    renderWithProvider(
      <Modal isOpen={true} shouldRenderCloseButton={false}>
        <p>No close button</p>
      </Modal>
    );
    expect(
      screen.queryByRole("button", { name: "Close" })
    ).not.toBeInTheDocument();
  });
});
