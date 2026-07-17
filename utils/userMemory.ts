export type MemoryCategory =
  | 'preference'
  | 'learning'
  | 'workflow'
  | 'interest'
  | 'system';

export type MemorySource = 'manual' | 'inferred' | 'imported';

export type MemoryRecord = {
  id: string;
  title: string;
  detail: string;
  category: MemoryCategory;
  source: MemorySource;
  confidence: number;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MemoryEvent = {
  id: string;
  type: 'page_view' | 'search' | 'tool_use' | 'preference_change';
  label: string;
  category: string;
  path?: string;
  createdAt: string;
};

export type MemoryProfile = {
  version: 1;
  enabled: boolean;
  memories: MemoryRecord[];
  events: MemoryEvent[];
};

export type MemoryDraft = {
  title: string;
  detail: string;
  category: MemoryCategory;
};

export const USER_MEMORY_STORAGE_KEY = 'reactchullin-user-memory:v1';

const MAX_EVENTS = 240;
const MAX_MEMORIES = 80;

const DEFAULT_PROFILE: MemoryProfile = {
  version: 1,
  enabled: true,
  memories: [],
  events: [],
};

const categoryLabels: Record<MemoryCategory, string> = {
  preference: '偏好',
  learning: '學習',
  workflow: '工作流',
  interest: '興趣',
  system: '系統',
};

export function getMemoryCategoryLabel(category: MemoryCategory) {
  return categoryLabels[category];
}

function nowIso() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }

  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function normalizeProfile(value: unknown): MemoryProfile {
  if (!value || typeof value !== 'object') {
    return { ...DEFAULT_PROFILE };
  }

  const source = value as Partial<MemoryProfile>;

  return {
    version: 1,
    enabled: source.enabled !== false,
    memories: Array.isArray(source.memories) ? source.memories.slice(0, MAX_MEMORIES) : [],
    events: Array.isArray(source.events) ? source.events.slice(0, MAX_EVENTS) : [],
  };
}

export function loadMemoryProfile(): MemoryProfile {
  if (!canUseStorage()) {
    return { ...DEFAULT_PROFILE };
  }

  try {
    const raw = window.localStorage.getItem(USER_MEMORY_STORAGE_KEY);
    return raw ? normalizeProfile(JSON.parse(raw)) : { ...DEFAULT_PROFILE };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveMemoryProfile(profile: MemoryProfile) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(USER_MEMORY_STORAGE_KEY, JSON.stringify(normalizeProfile(profile)));
}

export function setMemoryEnabled(enabled: boolean) {
  const profile = loadMemoryProfile();
  saveMemoryProfile({ ...profile, enabled });
  return enabled;
}

export function addManualMemory(draft: MemoryDraft) {
  const profile = loadMemoryProfile();
  const timestamp = nowIso();
  const memory: MemoryRecord = {
    id: createId('mem'),
    ...draft,
    source: 'manual',
    confidence: 1,
    pinned: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  saveMemoryProfile({
    ...profile,
    memories: [memory, ...profile.memories].slice(0, MAX_MEMORIES),
  });

  return memory;
}

export function updateMemory(id: string, patch: Partial<Pick<MemoryRecord, 'title' | 'detail' | 'category' | 'pinned'>>) {
  const profile = loadMemoryProfile();
  const updatedAt = nowIso();
  const memories = profile.memories.map((memory) =>
    memory.id === id ? { ...memory, ...patch, updatedAt } : memory,
  );

  saveMemoryProfile({ ...profile, memories });
}

export function deleteMemory(id: string) {
  const profile = loadMemoryProfile();
  saveMemoryProfile({
    ...profile,
    memories: profile.memories.filter((memory) => memory.id !== id),
  });
}

export function clearMemoryProfile() {
  saveMemoryProfile({ ...DEFAULT_PROFILE });
}

function upsertInferredMemory(profile: MemoryProfile, memory: Omit<MemoryRecord, 'id' | 'source' | 'createdAt' | 'updatedAt' | 'pinned'>) {
  const timestamp = nowIso();
  const existingIndex = profile.memories.findIndex(
    (item) => item.source === 'inferred' && item.title === memory.title,
  );

  if (existingIndex >= 0) {
    const next = [...profile.memories];
    next[existingIndex] = {
      ...next[existingIndex],
      ...memory,
      updatedAt: timestamp,
    };
    return next;
  }

  return [
    {
      id: createId('mem'),
      ...memory,
      source: 'inferred' as const,
      pinned: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
    ...profile.memories,
  ].slice(0, MAX_MEMORIES);
}

function inferMemories(profile: MemoryProfile): MemoryRecord[] {
  const pageEvents = profile.events.filter((event) => event.type === 'page_view');
  const byCategory = pageEvents.reduce<Record<string, number>>((acc, event) => {
    acc[event.category] = (acc[event.category] ?? 0) + 1;
    return acc;
  }, {});

  let memories = profile.memories;

  const blogViews = byCategory.blog ?? 0;
  if (blogViews >= 3) {
    memories = upsertInferredMemory({ ...profile, memories }, {
      title: '常閱讀技術文章',
      detail: `最近累積 ${blogViews} 次文章瀏覽，可優先推薦 Blog 與學習筆記內容。`,
      category: 'interest',
      confidence: Math.min(0.95, 0.55 + blogViews * 0.06),
    });
  }

  const toolViews = byCategory.tool ?? 0;
  if (toolViews >= 2) {
    memories = upsertInferredMemory({ ...profile, memories }, {
      title: '偏好互動工具',
      detail: `最近累積 ${toolViews} 次工具頁瀏覽，適合保留上次使用的工具狀態與快速入口。`,
      category: 'workflow',
      confidence: Math.min(0.92, 0.5 + toolViews * 0.08),
    });
  }

  const vocabViews = pageEvents.filter((event) => event.path?.includes('vocab') || event.path?.includes('flashcards')).length;
  if (vocabViews >= 2) {
    memories = upsertInferredMemory({ ...profile, memories }, {
      title: '正在累積英文與單字學習',
      detail: `偵測到 ${vocabViews} 次單字或 flashcard 相關操作，可優先保留學習進度與錯題回顧。`,
      category: 'learning',
      confidence: Math.min(0.9, 0.5 + vocabViews * 0.08),
    });
  }

  return memories;
}

export function trackMemoryEvent(event: Omit<MemoryEvent, 'id' | 'createdAt'>) {
  const profile = loadMemoryProfile();
  if (!profile.enabled) return profile;

  const timestamp = nowIso();
  const nextEvent: MemoryEvent = {
    id: createId('evt'),
    createdAt: timestamp,
    ...event,
  };

  const events = [nextEvent, ...profile.events].slice(0, MAX_EVENTS);
  const nextProfile = {
    ...profile,
    events,
  };

  saveMemoryProfile({
    ...nextProfile,
    memories: inferMemories(nextProfile),
  });

  return loadMemoryProfile();
}

export function exportMemoryProfile() {
  return JSON.stringify(loadMemoryProfile(), null, 2);
}
