import { marketAccountSchema, type MarketAccountSnapshot } from './account-schema';

const KEY = 'market-watch:pending-google-login:v1';
const MAX_AGE = 60 * 60 * 1000;
type Storage = Pick<globalThis.Storage, 'getItem' | 'setItem' | 'removeItem'>;

// A tab-local handoff preserves even edits that have not reached localStorage yet.
export function storeLoginSnapshot(storage: Storage, snapshot: MarketAccountSnapshot) {
  const data = marketAccountSchema.parse(snapshot);
  storage.setItem(KEY, JSON.stringify({ savedAt: Date.now(), snapshot: data }));
}

export function readLoginSnapshot(storage: Storage): MarketAccountSnapshot | null {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return null;
    const pending = JSON.parse(raw);
    const age = Date.now() - pending.savedAt;
    if (!Number.isFinite(age) || age < 0 || age > MAX_AGE) return null;
    const result = marketAccountSchema.safeParse(pending.snapshot);
    return result.success ? result.data : null;
  } catch { return null; }
}

export function clearLoginSnapshot(storage: Storage) {
  // A browser storage failure must not turn a successful cloud save into an error.
  try { storage.removeItem(KEY); } catch { /* Cleared by tab closure or expiry. */ }
}
