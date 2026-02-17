import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createPathsPlugin() {
  return tsconfigPaths({
    projects: [resolve(__dirname, "tsconfig.vitest.json")],
    loose: true,
  });
}

export default defineConfig({
  plugins: [createPathsPlugin()],
  test: {
    projects: [
      {
        plugins: [createPathsPlugin()],
        test: {
          include: ["**/*.unit.spec.ts"],
          name: "unit",
          environment: "node",
        },
      },
      {
        plugins: [createPathsPlugin()],
        envPrefix: ["VITE_", "PUBLIC_"],
        test: {
          include: ["**/*.integration.spec.tsx"],
          name: "jsdom",
          environment: "jsdom",
          setupFiles: ["src/test/setup.jsdom.ts"],
        },
      },
    ],
  },
});
