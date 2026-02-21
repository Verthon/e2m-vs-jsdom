import { beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { createAuthHandlers } from "src/core/auth/mocks/authHandlers";
import { setViewport, resetViewport } from "./viewport";

const authApiBase = import.meta.env.PUBLIC_AUTH_API;

const server = setupServer(...createAuthHandlers(authApiBase));

beforeAll(() => {
  server.listen();
  setViewport('mobile');
});
afterEach(() => {
  server.resetHandlers();
  resetViewport();
});
afterAll(() => server.close());
