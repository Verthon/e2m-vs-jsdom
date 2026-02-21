import { render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it } from "vitest";

import {
  TestRouterProvider,
  TestI18nProvider,
  TestQueryProvider,
} from "src/test/testProvider";
import CreateAppointment from "./CreateAppointment";

const grabSpecialtiesWrapper = () => screen.findByRole("radiogroup");
const grabNextButton = () => screen.getByRole("button", { name: /next/i });

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

    const specialtiesWrapper = await grabSpecialtiesWrapper();
    const specialties = await within(specialtiesWrapper).findAllByRole("radio");
    const generalSpecialty = specialties[0];

    await user.click(generalSpecialty);

    const goToDoctorSelection = grabNextButton();

    await user.click(goToDoctorSelection);

    
  });
});
