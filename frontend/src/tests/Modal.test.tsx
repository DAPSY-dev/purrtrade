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

  test('calls "onRequestClose" when requested', async () => {
    const user = userEvent.setup();
    const onRequestClose = vi.fn();
    renderWithProvider(
      <Modal isOpen={true} onRequestClose={onRequestClose}>
        <button type="button" onClick={onRequestClose}>
          Close
        </button>
        <p>Modal content</p>
      </Modal>
    );
    await user.click(screen.getByText("Close"));
    expect(onRequestClose).toHaveBeenCalled();
  });

  test('renders close button when "closeButton" is "true" and "onRequestClose" is provided', () => {
    const onRequestClose = vi.fn();
    renderWithProvider(
      <Modal isOpen={true} closeButton={true} onRequestClose={onRequestClose}>
        <p>Modal content with close button</p>
      </Modal>
    );
    expect(screen.getByLabelText("Close")).toBeInTheDocument();
  });

  test('does not render close button when "closeButton" is "true" but "onRequestClose" is not provided', () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    renderWithProvider(
      <Modal isOpen={true} closeButton={true}>
        <p>Modal content without onRequestClose</p>
      </Modal>
    );
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument();
    expect(consoleError).toHaveBeenCalledWith(
      "Modal: 'onRequestClose' is required when 'closeButton' is true\n"
    );
    consoleError.mockRestore();
  });
});
