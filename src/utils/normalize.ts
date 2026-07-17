export function compactJson(value: unknown): string { return JSON.stringify(value, null, 2); }

export function firstArray(value: unknown, keys: string[]): unknown[] {
  if (Array.isArray(value)) return value;
  if (!value || typeof value !== "object") return [];
  const record = value as Record<string, unknown>;
  for (const key of keys) {
    const item = record[key];
    if (Array.isArray(item)) return item;
  }
  return [];
}
