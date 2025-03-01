import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import CTA from "@/components/CTA";

describe("CTA component", () => {
  test("renders a button element by default", () => {
    render(<CTA>Click me</CTA>);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  test('renders an anchor element when "as" prop is "anchor"', () => {
    render(
      <CTA as="anchor" href="#">
        Click me
      </CTA>
    );
    const anchor = screen.getByRole("link");
    expect(anchor).toBeInTheDocument();
    expect(anchor).toHaveTextContent("Click me");
    expect(anchor).toHaveAttribute("href", "#");
  });

  test('renders a router-link element when "as" prop is "router-link"', () => {
    render(
      <MemoryRouter>
        <CTA as="router-link" to="/home">
          Home
        </CTA>
      </MemoryRouter>
    );
    const routerLink = screen.getByRole("link");
    expect(routerLink).toBeInTheDocument();
    expect(routerLink).toHaveTextContent("Home");
    expect(routerLink).toHaveAttribute("href", "/home");
  });

  test('renders a router-nav-link element when "as" prop is "router-nav-link"', () => {
    render(
      <MemoryRouter>
        <CTA as="router-nav-link" to="/home">
          Home
        </CTA>
      </MemoryRouter>
    );
    const routerNavLink = screen.getByRole("link");
    expect(routerNavLink).toBeInTheDocument();
    expect(routerNavLink).toHaveTextContent("Home");
    expect(routerNavLink).toHaveAttribute("href", "/home");
  });

  test('logs an error for invalid "as" prop value', () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    // @ts-expect-error Invalid "as" prop for testing purposes
    render(<CTA as="invalid">Click me</CTA>);
    expect(consoleSpy).toHaveBeenCalledWith('Invalid "as" prop value: invalid');
    consoleSpy.mockRestore();
  });

  test('renders a button with type="submit"', () => {
    render(<CTA type="submit">Submit</CTA>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });

  test("applies custom className", () => {
    render(<CTA className="custom-class">Click me</CTA>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  test("handles onClick event", async () => {
    const handleClick = vi.fn();
    render(<CTA onClick={handleClick}>Click me</CTA>);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
