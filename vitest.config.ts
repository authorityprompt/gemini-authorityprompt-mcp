import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
    pool: "forks",
    fileParallelism: false,
  },
});
