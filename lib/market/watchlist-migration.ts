type WatchlistDefinition = { id: string; name: string };

/** Older browser versions saved list contents before list definitions existed. */
export function recoverWatchlistDefinitions(
  defaults: WatchlistDefinition[],
  storedDefinitions: unknown,
  storedWatchlists: unknown,
): WatchlistDefinition[] {
  const definitions = Array.isArray(storedDefinitions) ? storedDefinitions.filter((item): item is WatchlistDefinition =>
    typeof item?.id === 'string' && typeof item?.name === 'string',
  ) : [];
  const recovered = storedWatchlists && typeof storedWatchlists === 'object' && !Array.isArray(storedWatchlists)
    ? Object.entries(storedWatchlists).filter(([, items]) => Array.isArray(items)).map(([id]) => ({ id, name: id }))
    : [];
  const seen = new Set<string>();
  return [...defaults, ...definitions, ...recovered].filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}
