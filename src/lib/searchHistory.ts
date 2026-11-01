const STORAGE_KEY = 'medicare-recent-searches';
const MAX_RECENT = 5;

export function loadRecentSearches(): string[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
    return Array.isArray(parsed) ? parsed.filter((term): term is string => typeof term === 'string').slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(term: string): void {
  const trimmed = term.trim();
  if (trimmed.length < 2) return;
  const next = [trimmed, ...loadRecentSearches().filter((existing) => existing !== trimmed)].slice(0, MAX_RECENT);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    return;
  }
}

export function clearRecentSearches(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}
