import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    tsconfigPaths({
      projects: [resolve(__dirname, "tsconfig.vitest.json")],
      loose: true,
    }),
  ],
  test: {
    projects: [
      {
        test: {
          include: ["**/*.unit.spec.ts"],
          name: "unit",
          environment: "node",
        },
      },
      {
        test: {
          include: ["**/*.integration.spec.ts"],
          name: "jsdom",
          environment: "jsdom",
        },
      },
    ],
  },
});
