import { describe, expect, it, vi } from "vitest";
import { TTLCache } from "../src/utils/cache.js";

describe("TTLCache", () => {
  it("expires entries", () => {
    vi.useFakeTimers();
    const cache = new TTLCache<string>(1);
    cache.set("authorityprompt.com:facts", "ok");
    expect(cache.get("authorityprompt.com:facts")).toBe("ok");
    vi.advanceTimersByTime(1001);
    expect(cache.get("authorityprompt.com:facts")).toBeUndefined();
    vi.useRealTimers();
  });
});
