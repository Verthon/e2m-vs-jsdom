import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  TestRouterProvider,
  TestI18nProvider,
  TestQueryProvider,
} from "src/test/testProvider";
import CreateAppointment from "./CreateAppointment";

const getStep = (label: string) => screen.getByRole("region", { name: label });

describe("patient appointment booking process", () => {
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
