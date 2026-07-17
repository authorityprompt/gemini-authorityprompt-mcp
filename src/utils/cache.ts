export interface CacheEntry<T> { expiresAt: number; value: T; }

export class TTLCache<T> {
  private entries = new Map<string, CacheEntry<T>>();
  constructor(private readonly ttlSeconds: number) {}
  get(key: string): T | undefined {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.entries.delete(key);
      return undefined;
    }
    return entry.value;
  }
  set(key: string, value: T): void {
    this.entries.set(key, { value, expiresAt: Date.now() + this.ttlSeconds * 1000 });
  }
  clear(): void { this.entries.clear(); }
}
