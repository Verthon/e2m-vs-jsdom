import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/index.tsx"],
  vitest: true,
  rsbuild: true,
  storybook: true,
  playwright: true,
  tailwind: true,
  project: ["**/*.{tsx,ts}"],
};

export default config;
