export interface CacheEntry<T> {
    expiresAt: number;
    value: T;
}
export declare class TTLCache<T> {
    private readonly ttlSeconds;
    private entries;
    constructor(ttlSeconds: number);
    get(key: string): T | undefined;
    set(key: string, value: T): void;
    clear(): void;
}
