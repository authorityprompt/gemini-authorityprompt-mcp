const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 };
export class Logger {
    level;
    constructor(level = "info") {
        this.level = level;
    }
    enabled(level) { return LEVELS[level] >= LEVELS[this.level]; }
    log(level, event, data = {}) {
        if (!this.enabled(level))
            return;
        const safe = { ...data };
        delete safe.apiKey;
        process.stderr.write(`${JSON.stringify({ event, level, ...safe, timestamp: new Date().toISOString() })}
`);
    }
}
//# sourceMappingURL=logger.js.map