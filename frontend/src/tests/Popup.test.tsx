import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Popup from "@/components/Popup";
import { useStrings } from "@/hooks/useStrings";

type ToggleEvent = Event & {
  newState: string;
  oldState: string;
};

global.HTMLElement.prototype.showPopover = vi.fn();
global.HTMLElement.prototype.hidePopover = vi.fn();

vi.mock("@/hooks/useStrings", () => ({
  useStrings: vi.fn(() => ({ strings: { CLOSE: "Close" } })),
}));

describe("Popup component", () => {
  beforeEach(() => {
    vi.spyOn(HTMLElement.prototype, "showPopover").mockImplementation(function (
      this: HTMLElement
    ) {
      const event = new Event("toggle", { bubbles: true }) as ToggleEvent;
      event.newState = "open";
      event.oldState = "closed";
      this.dispatchEvent(event);
    });
    vi.spyOn(HTMLElement.prototype, "hidePopover").mockImplementation(function (
      this: HTMLElement
    ) {
      const event = new Event("toggle", { bubbles: true }) as ToggleEvent;
      event.newState = "closed";
      event.oldState = "open";
      this.dispatchEvent(event);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('should not render if "strings" is "null"', () => {
    vi.mocked(useStrings).mockReturnValueOnce({
      strings: null,
      loading: true,
      error: null,
    });
    const { container } = render(<Popup show={true} />);
    expect(container.firstChild).toBeNull();
  });

  test("should render children when visible", () => {
    render(
      <Popup show={true}>
        <p>Popup Content</p>
      </Popup>
    );
    expect(screen.getByText("Popup Content")).toBeInTheDocument();
  });

  test('should call "onHide" when close button is clicked', async () => {
    const onHide = vi.fn();
    render(<Popup show={true} closeButton onHide={onHide} />);
    const closeButton = screen.getByLabelText("Close");
    await userEvent.click(closeButton);
    expect(onHide).toHaveBeenCalledTimes(1);
  });
});
