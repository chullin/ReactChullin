import type { StorageEstimateInfo } from '../protocol/types';

export async function getStorageEstimate(): Promise<StorageEstimateInfo> {
  if (typeof navigator === 'undefined' || !navigator.storage?.estimate) {
    return {};
  }

  const [estimate, persisted] = await Promise.all([
    navigator.storage.estimate(),
    navigator.storage.persisted?.() ?? Promise.resolve(undefined),
  ]);

  return {
    usage: estimate.usage,
    quota: estimate.quota,
    persisted,
  };
}

export async function requestPersistentStorage(): Promise<boolean | undefined> {
  if (typeof navigator === 'undefined' || !navigator.storage?.persist) {
    return undefined;
  }

  return navigator.storage.persist();
}
