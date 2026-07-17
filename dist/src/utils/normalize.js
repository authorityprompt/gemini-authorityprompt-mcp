export function compactJson(value) { return JSON.stringify(value, null, 2); }
export function firstArray(value, keys) {
    if (Array.isArray(value))
        return value;
    if (!value || typeof value !== "object")
        return [];
    const record = value;
    for (const key of keys) {
        const item = record[key];
        if (Array.isArray(item))
            return item;
    }
    return [];
}
//# sourceMappingURL=normalize.js.map