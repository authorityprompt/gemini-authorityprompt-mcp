export class TTLCache {
    ttlSeconds;
    entries = new Map();
    constructor(ttlSeconds) {
        this.ttlSeconds = ttlSeconds;
    }
    get(key) {
        const entry = this.entries.get(key);
        if (!entry)
            return undefined;
        if (Date.now() > entry.expiresAt) {
            this.entries.delete(key);
            return undefined;
        }
        return entry.value;
    }
    set(key, value) {
        this.entries.set(key, { value, expiresAt: Date.now() + this.ttlSeconds * 1000 });
    }
    clear() { this.entries.clear(); }
}
//# sourceMappingURL=cache.js.map