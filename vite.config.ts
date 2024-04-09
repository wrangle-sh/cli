import tsconfigPaths from "vite-tsconfig-paths";
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    // @ts-expect-error -- Weird vitest + pnpm + Vite issue that I don't caare to triage right now
    tsconfigPaths(),
  ],
  test: {
    passWithNoTests: true,
  },
});
