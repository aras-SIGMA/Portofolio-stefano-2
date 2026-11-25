/**
 * Allowlist-validates external URLs at the boundary so untrusted API values
 * (e.g. GitHub repo `html_url` / `homepage`) can never inject `javascript:` or `data:` URIs.
 */
export function safeHttpUrl(raw: unknown): string | undefined {
  if (typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "https:" || parsed.protocol === "http:") {
      return parsed.href;
    }
    return undefined;
  } catch {
    return undefined;
  }
}
