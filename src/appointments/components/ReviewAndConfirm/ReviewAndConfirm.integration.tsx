import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TestI18nProvider, TestQueryProvider, TestRouterProvider } from "src/test/testProvider";
import { ReviewAndConfirm } from "./ReviewAndConfirm";
import { describe, expect, it } from "vitest";

describe("review and confirm the appointment", () => {
  it("patient can read the terms of service", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <ReviewAndConfirm />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Terms of Service (opens in dialog)" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Terms of Service")).toBeInTheDocument();
    expect(screen.getByText("Please review our terms before confirming your appointment.")).toBeInTheDocument();
  });

  it("patient can read the cancellation policy", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <ReviewAndConfirm />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Cancellation Policy (opens in dialog)" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText("Cancellation Policy")).toBeInTheDocument();
    expect(screen.getByText("Please review our cancellation and rescheduling policy.")).toBeInTheDocument();
  });
});
