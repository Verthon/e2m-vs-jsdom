import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import {
  TestRouterProvider,
  TestI18nProvider,
  TestQueryProvider,
} from "src/test/testProvider";
import CreateAppointment from "./CreateAppointment";

const getStep = (label: string) => screen.getByRole("region", { name: label });

const FAKE_NOW = new Date("2026-03-12T10:00:00");

describe("patient appointment booking process", () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(FAKE_NOW);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("patient books an appointment by selecting specialty, doctor then time slot", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <CreateAppointment />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    await screen.findByRole("heading", { name: "Choose Specialty", level: 2 });
    const step1 = getStep("Choose Specialty");
    const specialties = await within(step1).findAllByRole("radio");

    await user.click(specialties[0]);
    await user.click(within(step1).getByRole("button", { name: "Next" }));

    await screen.findByRole("heading", {
      name: "Recommended Doctors",
      level: 2,
    });
    const step2 = getStep("Choose a Doctor");
    const doctors = await within(step2).findAllByRole("radio");

    await user.click(doctors[0]);
    await user.click(within(step2).getByRole("button", { name: "Next" }));

    await screen.findByRole("heading", {
      name: "Pick a Time",
      level: 2,
    });
    const step3 = getStep("Pick a Time");

    const today = new Date();
    const todayDay = today.getDate().toString();
    const calendarDay = within(step3).getByRole("gridcell", { name: new RegExp(`${todayDay}`) });
    await user.click(calendarDay);

    const timeSlotButtons = await within(step3).findAllByRole("button", { name: /^\d{2}:\d{2}$/ });
    await user.click(timeSlotButtons[0]);

    expect(timeSlotButtons[0]).toHaveAttribute("aria-pressed", "true");
    expect(within(step3).getByRole("button", { name: "Next" })).not.toHaveAttribute("aria-disabled");
  });

  it("should not persist the chosen doctor when user go back and change the specialty", async () => {
    const user = userEvent.setup();

    render(
      <TestRouterProvider>
        <TestI18nProvider>
          <TestQueryProvider>
            <CreateAppointment />
          </TestQueryProvider>
        </TestI18nProvider>
      </TestRouterProvider>,
    );

    await screen.findByRole("heading", { name: "Choose Specialty", level: 2 });
    const step1 = getStep("Choose Specialty");
    const specialties = await within(step1).findAllByRole("radio");

    await user.click(specialties[0]);
    await user.click(within(step1).getByRole("button", { name: "Next" }));

    await screen.findByRole("heading", {
      name: "Recommended Doctors",
      level: 2,
    });
    const step2 = getStep("Choose a Doctor");
    const doctors = await within(step2).findAllByRole("radio");

    await user.click(doctors[0]);
    expect(within(step2).getByRole("button", { name: "Next" })).not.toHaveAttribute("aria-disabled");

    await user.click(within(step2).getByRole("button", { name: "Back" }));

    await screen.findByRole("heading", { name: "Choose Specialty", level: 2 });
    const step1Again = getStep("Choose Specialty");
    const specialtiesAgain = await within(step1Again).findAllByRole("radio");

    await user.click(specialtiesAgain[1]);
    await user.click(within(step1Again).getByRole("button", { name: "Next" }));

    await screen.findByRole("heading", {
      name: "Recommended Doctors",
      level: 2,
    });
    const step2Again = getStep("Choose a Doctor");

    expect(within(step2Again).getByRole("button", { name: "Next" })).toHaveAttribute("aria-disabled", "true");
  });
});
