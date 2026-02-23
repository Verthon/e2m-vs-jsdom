import { beforeAll, afterEach, afterAll } from "vitest";
import "@testing-library/jest-dom/vitest";
import { setupServer } from "msw/node";
import { createAuthHandlers } from "src/core/auth/mocks/authHandlers";
import { setViewport, resetViewport } from "./viewport";
import { createAppointmentHandlers } from "src/appointments/mocks/appointmentHandlers";

const authApiBase = import.meta.env.PUBLIC_AUTH_API;
const appointmentsApiBase = import.meta.env.PUBLIC_APPOINTMENTS_API;

const server = setupServer(
  ...createAuthHandlers(authApiBase),
  ...createAppointmentHandlers(appointmentsApiBase),
);

beforeAll(() => {
  server.listen();
  setViewport("mobile");
});
afterEach(() => {
  server.resetHandlers();
  resetViewport();
});
afterAll(() => server.close());
