import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import {
  TestI18nProvider,
  TestQueryProvider,
  TestRouterProvider,
} from "src/test/testProvider";

import RegisterPage from "./RegisterPage";

describe("RegisterPage", () => {
  it("redirects to homepage after successful registration", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <RegisterPage />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getAllByRole("button", { name: /sign up/i }).find(
      (btn) => btn.getAttribute("type") === "submit",
    )!;

    await user.type(usernameInput, "johndoe");
    await user.type(emailInput, "john@example.com");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    expect(globalThis.location.pathname).toBe("/");
  });

  it("displays validation error for invalid email", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <RegisterPage />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
    const submitButton = screen.getAllByRole("button", { name: /sign up/i }).find(
      (btn) => btn.getAttribute("type") === "submit",
    )!;

    await user.type(usernameInput, "johndoe");
    await user.type(emailInput, "invalidemail");
    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password123");
    await user.click(submitButton);

    expect(
      screen.getByText(/please enter a valid email address/i),
    ).toBeDefined();
  });

  it("displays validation error for missing required fields", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <RegisterPage />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    const submitButton = screen.getAllByRole("button", { name: /sign up/i }).find(
      (btn) => btn.getAttribute("type") === "submit",
    )!;

    await user.click(submitButton);

    expect(screen.getByText(/username is required/i)).toBeDefined();
    expect(screen.getByText(/email is required/i)).toBeDefined();
    expect(screen.getByText(/password is required/i)).toBeDefined();
  });
});
