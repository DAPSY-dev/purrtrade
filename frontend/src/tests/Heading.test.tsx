import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Heading from "@/components/Heading";

describe("Heading component", () => {
  test("renders with default tag h1", () => {
    render(<Heading>Test Heading</Heading>);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Heading");
  });

  test("renders with specified heading tag", () => {
    render(<Heading as="h3">Test H3</Heading>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe("H3");
  });

  test("applies custom class names", () => {
    render(<Heading className="text-red-500">Styled Heading</Heading>);
    const heading = screen.getByText("Styled Heading");
    expect(heading).toHaveClass("text-red-500");
  });

  test("does not render invalid heading tags", () => {
    const consoleErrorMock = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    // @ts-expect-error Invalid "as" prop for testing purposes
    render(<Heading as="h7">Invalid Heading</Heading>);
    expect(screen.queryByText("Invalid Heading")).not.toBeInTheDocument();
    expect(consoleErrorMock).toHaveBeenCalledWith(
      'Invalid "as" prop value: h7'
    );
    consoleErrorMock.mockRestore();
  });
});
