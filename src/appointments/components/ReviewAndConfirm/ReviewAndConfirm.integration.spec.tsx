import { render, screen, act } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import {
  TestI18nProvider,
  TestQueryProvider,
  TestRouterProvider,
} from "src/test/testProvider";
import { ReviewAndConfirm } from "./ReviewAndConfirm";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

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

    await user.click(
      screen.getByRole("button", {
        name: "Terms of Service (opens in dialog)",
      }),
    );

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: "Terms of Service" }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Please review our terms before confirming your appointment.",
      ),
    ).toBeInTheDocument();
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

    await user.click(
      screen.getByRole("button", {
        name: "Cancellation Policy (opens in dialog)",
      }),
    );

    expect(await screen.findByRole("dialog")).toBeVisible();
    expect(
      await screen.findByRole("heading", { name: "Cancellation Policy" }),
    ).toBeVisible();
    expect(
      screen.getByText(
        "Please review our cancellation and rescheduling policy.",
      ),
    ).toBeVisible();
  });

  describe("slot timer", () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it("patient is informed that timeslot expired and have option to start over or go homepage", async () => {
      render(
        <TestRouterProvider>
          <TestI18nProvider>
            <TestQueryProvider>
              <ReviewAndConfirm />
            </TestQueryProvider>
          </TestI18nProvider>
        </TestRouterProvider>,
      );

      act(() => {
        vi.advanceTimersByTime(5 * 60 * 1000);
      });

      expect(screen.getByRole("dialog")).toBeVisible();
      expect(
        screen.getByRole("heading", { name: "Your timeslot has expired" }),
      ).toBeVisible();
      expect(
        screen.getByRole("button", { name: "Start over" }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Go to homepage" }),
      ).toBeInTheDocument();
    });

    it("patient is informed how much time left", async () => {
      render(
        <TestRouterProvider>
          <TestI18nProvider>
            <TestQueryProvider>
              <ReviewAndConfirm />
            </TestQueryProvider>
          </TestI18nProvider>
        </TestRouterProvider>,
      );

      expect(screen.getByRole("timer")).toBeInTheDocument();
      expect(screen.getByRole("timer")).toHaveTextContent("04:59");

      act(() => {
        vi.advanceTimersByTime(60 * 1000);
      });

      expect(screen.getByRole("timer")).toHaveTextContent("03:59");
    });
  });
});
