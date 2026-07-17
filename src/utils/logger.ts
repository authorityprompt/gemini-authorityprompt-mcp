import type { LogLevel } from "../config.js";

const LEVELS: Record<LogLevel, number> = { debug: 10, info: 20, warn: 30, error: 40 };

export class Logger {
  constructor(private readonly level: LogLevel = "info") {}
  private enabled(level: LogLevel): boolean { return LEVELS[level] >= LEVELS[this.level]; }
  log(level: LogLevel, event: string, data: Record<string, unknown> = {}): void {
    if (!this.enabled(level)) return;
    const safe = { ...data };
    delete safe.apiKey;
    process.stderr.write(`${JSON.stringify({ event, level, ...safe, timestamp: new Date().toISOString() })}
`);
  }
}
