/**
 * Safely parse JSON from localStorage.
 * Returns null if the key doesn't exist or the value isn't valid JSON.
 */
export function getStoredJSON(key) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // If it's not an object (e.g., a plain string), treat as invalid
        return typeof parsed === "object" ? parsed : null;
    } catch {
        // Invalid JSON — clear the corrupted entry
        localStorage.removeItem(key);
        return null;
    }
}
