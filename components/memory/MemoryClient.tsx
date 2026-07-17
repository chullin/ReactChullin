'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  Brain,
  Download,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Plus,
  RotateCcw,
  Sparkles,
  Trash2,
} from 'lucide-react';
import {
  addManualMemory,
  clearMemoryProfile,
  deleteMemory,
  exportMemoryProfile,
  getMemoryCategoryLabel,
  loadMemoryProfile,
  MemoryCategory,
  MemoryProfile,
  setMemoryEnabled,
  updateMemory,
} from '@/utils/userMemory';

const categoryOptions: MemoryCategory[] = ['preference', 'learning', 'workflow', 'interest', 'system'];

function formatDate(value: string) {
  return new Intl.DateTimeFormat('zh-TW', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));
}

function getSourceLabel(source: string) {
  if (source === 'manual') return '你明確新增';
  if (source === 'inferred') return '系統推論';
  return '匯入';
}

export default function MemoryClient() {
  const [profile, setProfile] = useState<MemoryProfile>(() => loadMemoryProfile());
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [category, setCategory] = useState<MemoryCategory>('preference');
  const [copied, setCopied] = useState(false);

  const pinnedMemories = useMemo(
    () => profile.memories.filter((memory) => memory.pinned),
    [profile.memories],
  );
  const inferredMemories = useMemo(
    () => profile.memories.filter((memory) => memory.source === 'inferred'),
    [profile.memories],
  );

  const refresh = () => setProfile(loadMemoryProfile());

  useEffect(() => {
    refresh();
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedTitle = title.trim();
    const normalizedDetail = detail.trim();

    if (!normalizedTitle || !normalizedDetail) {
      return;
    }

    addManualMemory({
      title: normalizedTitle,
      detail: normalizedDetail,
      category,
    });
    setTitle('');
    setDetail('');
    setCategory('preference');
    refresh();
  };

  const handleToggleEnabled = () => {
    setMemoryEnabled(!profile.enabled);
    refresh();
  };

  const handleExport = async () => {
    const data = exportMemoryProfile();
    await navigator.clipboard.writeText(data);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  const handleClear = () => {
    const confirmed = window.confirm('確定要清除所有記憶與操作事件嗎？這個動作無法復原。');
    if (!confirmed) return;
    clearMemoryProfile();
    refresh();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-14">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">
              <Brain size={14} />
              Long-term Memory
            </div>
            <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              個人化記憶中心
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
              這裡會保存你明確新增的偏好，以及系統從網站操作中推論出的習慣。資料目前只存在這台瀏覽器的 localStorage，
              可隨時關閉、匯出或清除。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Status</p>
              <p className="mt-2 text-xl font-black text-slate-950">{profile.enabled ? '啟用中' : '已暫停'}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Memories</p>
              <p className="mt-2 text-xl font-black text-slate-950">{profile.memories.length}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Inferred</p>
              <p className="mt-2 text-xl font-black text-slate-950">{inferredMemories.length}</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold uppercase text-slate-400">Events</p>
              <p className="mt-2 text-xl font-black text-slate-950">{profile.events.length}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-8 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="space-y-6">
          <form onSubmit={handleSubmit} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2">
              <Plus size={18} className="text-orange-700" />
              <h2 className="text-lg font-black text-slate-950">新增明確記憶</h2>
            </div>

            <label className="mt-5 block text-sm font-bold text-slate-700" htmlFor="memory-title">
              標題
            </label>
            <input
              id="memory-title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              placeholder="例如：偏好繁體中文回答"
            />

            <label className="mt-4 block text-sm font-bold text-slate-700" htmlFor="memory-category">
              分類
            </label>
            <select
              id="memory-category"
              value={category}
              onChange={(event) => setCategory(event.target.value as MemoryCategory)}
              className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
            >
              {categoryOptions.map((item) => (
                <option key={item} value={item}>
                  {getMemoryCategoryLabel(item)}
                </option>
              ))}
            </select>

            <label className="mt-4 block text-sm font-bold text-slate-700" htmlFor="memory-detail">
              內容
            </label>
            <textarea
              id="memory-detail"
              value={detail}
              onChange={(event) => setDetail(event.target.value)}
              className="mt-2 min-h-28 w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
              placeholder="寫下未來希望網站或助理記住的偏好、工作流或學習狀態。"
            />

            <button
              type="submit"
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange-700 px-4 text-sm font-black text-white transition hover:bg-orange-800"
            >
              <Plus size={16} />
              加入記憶
            </button>
          </form>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">控制權</h2>
            <div className="mt-4 grid gap-3">
              <button
                type="button"
                onClick={handleToggleEnabled}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
              >
                {profile.enabled ? <EyeOff size={16} /> : <Eye size={16} />}
                {profile.enabled ? '暫停記憶' : '重新啟用記憶'}
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
              >
                <Download size={16} />
                {copied ? '已複製 JSON' : '匯出記憶 JSON'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
              >
                <RotateCcw size={16} />
                清除所有記憶
              </button>
            </div>
          </div>
        </aside>

        <main className="space-y-6">
          {pinnedMemories.length > 0 && (
            <section className="rounded-lg border border-orange-200 bg-orange-50 p-5">
              <div className="flex items-center gap-2">
                <Pin size={18} className="text-orange-700" />
                <h2 className="text-lg font-black text-slate-950">釘選記憶</h2>
              </div>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {pinnedMemories.map((memory) => (
                  <article key={memory.id} className="rounded-lg border border-orange-100 bg-white p-4">
                    <p className="text-sm font-black text-slate-950">{memory.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{memory.detail}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-5">
              <div>
                <h2 className="text-lg font-black text-slate-950">所有記憶</h2>
                <p className="mt-1 text-sm text-slate-500">手動新增的可信度最高；推論記憶會標示信心分數。</p>
              </div>
              <Sparkles size={20} className="shrink-0 text-orange-700" />
            </div>

            {profile.memories.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-base font-bold text-slate-700">目前還沒有記憶。</p>
                <p className="mt-2 text-sm text-slate-500">新增一筆明確記憶，或多瀏覽幾個頁面後讓系統開始推論。</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {profile.memories.map((memory) => (
                  <article key={memory.id} className="grid gap-4 p-5 md:grid-cols-[1fr_auto]">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                          {getMemoryCategoryLabel(memory.category)}
                        </span>
                        <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
                          {getSourceLabel(memory.source)}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          信心 {Math.round(memory.confidence * 100)}% · 更新 {formatDate(memory.updatedAt)}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-black text-slate-950">{memory.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{memory.detail}</p>
                    </div>

                    <div className="flex items-start gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          updateMemory(memory.id, { pinned: !memory.pinned });
                          refresh();
                        }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700"
                        aria-label={memory.pinned ? '取消釘選' : '釘選'}
                      >
                        {memory.pinned ? <PinOff size={16} /> : <Pin size={16} />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteMemory(memory.id);
                          refresh();
                        }}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-700"
                        aria-label="刪除"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">最近操作事件</h2>
            <div className="mt-4 grid gap-2">
              {profile.events.slice(0, 10).map((event) => (
                <div key={event.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
                  <span className="text-sm font-semibold text-slate-700">
                    {event.label}
                    <span className="ml-2 text-xs text-slate-400">{event.path}</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">{formatDate(event.createdAt)}</span>
                </div>
              ))}
              {profile.events.length === 0 && (
                <p className="text-sm text-slate-500">尚未記錄操作事件。</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
