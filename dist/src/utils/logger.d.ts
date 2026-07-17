import type { LogLevel } from "../config.js";
export declare class Logger {
    private readonly level;
    constructor(level?: LogLevel);
    private enabled;
    log(level: LogLevel, event: string, data?: Record<string, unknown>): void;
}
