import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import Button from "../components/Button";

describe("Button component", () => {
  test("renders a button element by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  test('renders an anchor element when "as" prop is "anchor"', () => {
    render(
      <Button as="anchor" href="#">
        Click me
      </Button>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveTextContent("Click me");
    expect(anchor).toHaveAttribute("href", "#");
  });

  test('renders a router-link element when "as" prop is "router-link"', () => {
    render(
      <MemoryRouter>
        <Button as="router-link" to="/home">
          Home
        </Button>
      </MemoryRouter>
    );
    const routerLink = screen.getByRole("link");
    expect(routerLink).toBeInTheDocument();
    expect(routerLink).toHaveTextContent("Home");
    expect(routerLink).toHaveAttribute("href", "/home");
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  test("handles onClick event", async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders a button with type="submit"', () => {
    render(<Button type="submit">Submit</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  test('logs an error for invalid "as" prop value', () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // @ts-expect-error Invalid "as" prop for testing purposes
    render(<Button as="invalid">Click me</Button>);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid "as" prop value: invalid');
    consoleSpy.mockRestore();
  });
});
