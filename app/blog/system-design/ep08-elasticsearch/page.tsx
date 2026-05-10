'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowLeft,
  ArrowRight,
  Clock,
  Search,
  Database,
  Code2,
  BarChart3,
  Layers,
  Server,
  AlertCircle
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function SysDesignEP08() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">

      {/* ─── Hero ─── */}
      <div className="bg-gradient-to-br from-yellow-700 via-amber-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">
                EP.08
              </span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">
                系統設計系列
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              搜尋系統：Elasticsearch 入門與全文搜尋設計
              <br />
              <span className="text-amber-200">
                Inverted Index、Mapping、Query DSL、Relevance Score
              </span>
            </h1>
            <p className="text-amber-100 text-lg mb-8 max-w-2xl">
              從 SQL LIKE 到真正的搜尋引擎 — 理解倒排索引如何讓搜尋從 O(n) 變成 O(1)，
              掌握 Query DSL 與 Aggregation，最後整合到 Node.js 生產環境。
            </p>
            <div className="flex items-center gap-6 text-amber-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <User size={14} /> Joseph Chen
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> 17 min read
              </span>
              <span className="flex items-center gap-1.5">
                <Search size={14} /> Elasticsearch · Inverted Index · Query DSL
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ─── Section 1: 為什麼 SQL LIKE 不夠用 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">為什麼 SQL LIKE 不夠用？</h2>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            大部分開發者在初期都用 SQL 的 <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono text-sm">LIKE</code> 語法做搜尋功能。
            這在資料量小的時候看起來沒問題，但當用戶數據量成長、或搜尋需求變得稍微複雜，
            就會遇到一系列根本無法用 SQL 解決的問題。
          </p>

          <CodeBlock language="sql">
{`   -- 用戶搜尋「JavaScript 入門」
SELECT * FROM articles WHERE title LIKE '%JavaScript 入門%';

-- 問題 1：必須完全匹配「JavaScript 入門」這個字串
-- 找不到「入門 JavaScript」、「JS 基礎入門」、「Learn JavaScript」
-- 因為 LIKE 只做字串包含判斷，不理解語意

-- 問題 2：沒有相關度排序
-- 假設有 100 筆結果，你不知道哪篇更「符合」
-- SQL 只能按 id、time 排序，無法按「相關度」排

-- 問題 3：Full table scan — 10 萬筆資料慢到不行
-- LIKE '%keyword%' 無法使用 B-Tree Index（因為前面有 %）
-- 每次查詢都要掃描整張表，O(n) 複雜度

-- 問題 4：不支援中文分詞
-- 搜尋「機器學習」應該要能找到「機器」、「學習」分開出現的文章
-- LIKE 只能做字面匹配，完全不懂語言結構   `}
</CodeBlock>

          <p className="text-gray-600 leading-relaxed">
            Elasticsearch 對以上每個問題都有針對性的解法，而且這些解法是在架構層面設計的，不是打補丁：
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                problem: 'O(n) 全表掃描',
                solution: '倒排索引（Inverted Index）',
                detail: '搜尋複雜度從 O(n) 降為接近 O(1)，10 萬筆和 1 億筆的搜尋速度差距極小。',
                color: 'bg-amber-50 border-amber-200',
                titleColor: 'text-amber-800',
              },
              {
                problem: '沒有相關度排序',
                solution: 'TF-IDF / BM25 算法',
                detail: '根據詞頻、文件頻率、文件長度自動計算每個結果的相關度分數（_score）。',
                color: 'bg-orange-50 border-orange-200',
                titleColor: 'text-orange-800',
              },
              {
                problem: '不理解語意',
                solution: 'Analyzer（分析器）',
                detail: '分詞、去除停用詞（的、了、是）、同義詞展開、詞幹提取，讓搜尋理解語言。',
                color: 'bg-yellow-50 border-yellow-200',
                titleColor: 'text-yellow-800',
              },
              {
                problem: '字串精確匹配',
                solution: '模糊搜尋 + 多欄位加權',
                detail: '支援 fuzziness（typo 容錯）、phonetic（發音相似）、跨欄位搜尋並設定不同權重。',
                color: 'bg-red-50 border-red-200',
                titleColor: 'text-red-800',
              },
            ].map((item, i) => (
              <Card key={i} className={`border ${item.color}`}>
                <CardBody className="p-5">
                  <p className="text-xs text-gray-400 font-mono mb-1">SQL 的問題</p>
                  <p className="text-sm text-gray-600 mb-3 line-through">{item.problem}</p>
                  <p className={`font-black text-sm mb-2 ${item.titleColor}`}>
                    ES 解法：{item.solution}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">{item.detail}</p>
                </CardBody>
              </Card>
            ))}
          </div>

          <Card className="border-0 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <CardBody className="p-6">
              <p className="font-black mb-2">什麼時候該考慮引入 Elasticsearch？</p>
              <ul className="text-slate-300 text-sm leading-relaxed space-y-1.5">
                <li className="flex gap-2">
                  <span className="text-amber-400 font-black shrink-0">→</span>
                  搜尋功能是產品核心（電商、文件系統、部落格、Log 分析）
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400 font-black shrink-0">→</span>
                  需要模糊搜尋、高亮顯示、同義詞、中文分詞等進階功能
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400 font-black shrink-0">→</span>
                  資料量超過 10 萬筆，SQL LIKE 查詢已明顯變慢
                </li>
                <li className="flex gap-2">
                  <span className="text-amber-400 font-black shrink-0">→</span>
                  需要聚合統計（各分類文章數、平均評分、時間序列分布）
                </li>
              </ul>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 2: 核心概念 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Database className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Elasticsearch 核心概念</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            第一步是建立 Elasticsearch 與傳統 SQL 資料庫的概念對應關係。
            這不是完美的類比（兩者設計哲學不同），但能幫助你快速建立心智模型。
          </p>

          <Card className="border-0 shadow-md">
            <CardBody className="p-0 overflow-hidden">
              <div className="bg-amber-700 text-white px-6 py-3">
                <p className="font-black">SQL vs Elasticsearch 概念對照</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[480px]">
                  <thead>
                    <tr className="bg-amber-50">
                      <th className="px-6 py-3 text-left font-black text-gray-700">SQL（關聯式資料庫）</th>
                      <th className="px-6 py-3 text-left font-black text-gray-700">Elasticsearch</th>
                      <th className="px-6 py-3 text-left font-black text-gray-700">說明</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Database', 'Index', '資料的最頂層容器，通常一個服務對應一個或多個 Index'],
                      ['Table', '（廢棄）', 'ES 7.x 後移除 Type 概念，Index 直接對應 Table'],
                      ['Row', 'Document（JSON）', '最小資料單位，ES 中以 JSON 格式儲存'],
                      ['Column', 'Field', 'Document 的每個 JSON 欄位'],
                      ['Schema', 'Mapping', '定義每個 Field 的資料型別和分析方式'],
                      ['SELECT', 'GET / Search API', '查詢資料，ES 用 HTTP REST API'],
                      ['INSERT / UPDATE', 'Index a Document', '寫入文件，自動建立倒排索引'],
                      ['Primary Key', '_id', '每個 Document 的唯一識別碼'],
                      ['SQL JOIN', '（不支援）', 'ES 是文件型，需在應用層做 JOIN 或用 nested/parent-child'],
                    ].map(([sql, es, desc], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-amber-50/30'}>
                        <td className="px-6 py-3 font-mono text-xs text-amber-700 font-bold border-b border-amber-100">
                          {sql}
                        </td>
                        <td className="px-6 py-3 font-mono text-xs text-blue-700 font-bold border-b border-amber-100">
                          {es}
                        </td>
                        <td className="px-6 py-3 text-xs text-gray-500 border-b border-amber-100">
                          {desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>

          <h3 className="text-xl font-black text-gray-800 pt-2">
            倒排索引（Inverted Index）— 最重要的概念
          </h3>
          <p className="text-gray-600 leading-relaxed">
            倒排索引是 Elasticsearch 高效搜尋的根本原因。傳統資料庫是「文件 → 詞彙」的正向索引，
            而倒排索引反過來，建立「詞彙 → 文件列表」的映射。
          </p>

          <CodeBlock language="text">
{`   文章 1: "React 入門教學"
文章 2: "入門 JavaScript 指南"
文章 3: "React 與 Vue 比較"

─── Analyzer 分詞處理 ────────────────────────────────────────
文章 1 → ["react", "入門", "教學"]
文章 2 → ["入門", "javascript", "指南"]
文章 3 → ["react", "vue", "比較"]

─── 建立倒排索引（Inverted Index）────────────────────────────
Term          │ Documents（包含此詞的文章）
──────────────┼──────────────────────────────────
"react"       │ [文章1, 文章3]
"入門"         │ [文章1, 文章2]
"教學"         │ [文章1]
"javascript"  │ [文章2]
"指南"         │ [文章2]
"vue"         │ [文章3]
"比較"         │ [文章3]

─── 搜尋 "react 入門" 的過程 ─────────────────────────────────
1. Analyzer 分詞：["react", "入門"]
2. 查倒排索引：
   - "react"  → [文章1, 文章3]
   - "入門"    → [文章1, 文章2]
3. 交集 / 聯集計算：
   - 文章1 同時包含 "react" 和 "入門" → score 最高
   - 文章2 只有 "入門" → score 次之
   - 文章3 只有 "react" → score 最低
4. 結果排序：文章1 > 文章3 > 文章2（依 BM25 分數）   `}
</CodeBlock>

          <Card className="border-0 bg-blue-50 border-l-4 border-blue-400">
            <CardBody className="p-5">
              <p className="font-black text-blue-800 mb-2">為什麼倒排索引這麼快？</p>
              <p className="text-blue-700 text-sm leading-relaxed">
                傳統 SQL LIKE 必須逐一掃描每筆資料（O(n)）。倒排索引預先建立「詞彙 → 文件」的映射，
                搜尋時直接查表找到包含此詞的文件列表（接近 O(1)）。代價是寫入時需要額外建立索引，
                但搜尋系統通常「讀多寫少」，這個取捨非常值得。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 3: Mapping 定義 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Layers className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Mapping 定義（Schema）</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Mapping 相當於 SQL 的 Schema，定義每個欄位的資料型別和分析方式。
            Elasticsearch 有「Dynamic Mapping」（自動推斷型別），但生產環境強烈建議手動定義 Mapping，
            避免型別推斷錯誤導致後續無法修改（Mapping 一旦建立就不能修改，只能 reindex）。
          </p>

          <CodeBlock language="javascript">
{`   // PUT /articles
// 創建 Index 並定義 Mapping（相當於 CREATE TABLE）
{
  "mappings": {
    "properties": {

      // text 型別：會被 Analyzer 分詞，用於全文搜尋
      // keyword 子欄位：不分詞，用於精確匹配、排序、聚合
      "title": {
        "type": "text",
        "analyzer": "ik_max_word",          // 中文分詞（需安裝 IK Analyzer 插件）
        "search_analyzer": "ik_smart",      // 搜尋時用更保守的分詞策略
        "fields": {
          "keyword": {
            "type": "keyword",              // title.keyword = 精確匹配
            "ignore_above": 256             // 超過 256 字元的不建索引
          }
        }
      },

      "content": {
        "type": "text",
        "analyzer": "ik_max_word",
        "index_options": "offsets"          // 儲存詞位置，支援高亮顯示
      },

      // keyword 型別：不分詞，精確匹配
      // 適合 tags、category、status 等枚舉值
      "tags": {
        "type": "keyword"
      },

      "author": {
        "type": "keyword"
      },

      "category": {
        "type": "keyword"
      },

      // date 型別：支援日期範圍查詢和排序
      "publishedAt": {
        "type": "date",
        "format": "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"
      },

      // 數值型別：支援範圍查詢和聚合統計
      "viewCount": {
        "type": "integer"
      },

      "score": {
        "type": "float"
      },

      // boolean 型別
      "isPublished": {
        "type": "boolean"
      },

      // nested 型別：處理一對多關係（文章的多個評論）
      "comments": {
        "type": "nested",
        "properties": {
          "userId": { "type": "keyword" },
          "content": { "type": "text", "analyzer": "ik_max_word" },
          "createdAt": { "type": "date" }
        }
      }
    }
  },

  // Index 設定：分片數量、副本數量
  "settings": {
    "number_of_shards": 3,     // 主分片數（影響搜尋並行度，建立後不能修改）
    "number_of_replicas": 1,   // 副本數（可動態修改，提升讀取吞吐量和高可用）
    "analysis": {
      "analyzer": {
        "my_custom_analyzer": {
          "type": "custom",
          "tokenizer": "ik_max_word",
          "filter": ["lowercase", "stop"]  // 小寫 + 去除停用詞
        }
      }
    }
  }
}   `}
</CodeBlock>

          <Card className="border-0 bg-amber-50">
            <CardBody className="p-5">
              <p className="font-black text-amber-800 mb-3">text vs keyword — 最常搞混的概念</p>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-black text-gray-700 mb-2">text（全文搜尋）</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 寫入時會被 Analyzer 分詞</li>
                    <li>• 支援模糊搜尋、相關度排序</li>
                    <li>• 無法精確匹配、排序、聚合</li>
                    <li>• 適合：title、content、description</li>
                  </ul>
                </div>
                <div>
                  <p className="font-black text-gray-700 mb-2">keyword（精確匹配）</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• 整個字串作為一個詞彙</li>
                    <li>• 支援精確匹配、排序、聚合</li>
                    <li>• 無法全文搜尋</li>
                    <li>• 適合：tags、status、author ID</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-amber-700 mt-3 font-medium">
                最佳實踐：重要的文字欄位同時設定 text 和 keyword（用 fields 子欄位），
                如 title.keyword 可用於排序，title 本身用於全文搜尋。
              </p>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 4: Query DSL ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Code2 className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Query DSL — 查詢語言</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Query DSL（Domain Specific Language）是 Elasticsearch 的查詢語法，
            透過 JSON 格式描述查詢邏輯。掌握以下幾種核心 Query 類型，
            就能應對 90% 的搜尋需求。
          </p>

          <CodeBlock language="javascript">
{`   // ─── 1. Match Query（全文搜尋，最常用）──────────────────────────────
// 先把 query 字串分詞，再搜尋包含這些詞的文件
GET /articles/_search
{
  "query": {
    "match": {
      "title": "React 入門"
      // 分詞後：["react", "入門"]
      // 預設 operator 是 OR，找到 react 或 入門 的都算
      // 可改為 AND：確保兩個詞都出現
    }
  }
}

// 使用 AND operator（更嚴格）
{
  "query": {
    "match": {
      "title": {
        "query": "React 入門",
        "operator": "and"         // title 中必須同時包含 react 和 入門
      }
    }
  }
}   `}
</CodeBlock>

          <CodeBlock language="javascript">
{`   // ─── 2. Multi-match Query（搜尋多個欄位）──────────────────────────
// 同時在 title、content、tags 中搜尋，並設定不同欄位的相關度權重
{
  "query": {
    "multi_match": {
      "query": "React 入門",
      "fields": [
        "title^3",      // title 中的匹配相關度 x3（最重要）
        "tags^2",       // tags 中的匹配相關度 x2
        "content"       // content 中的匹配相關度 x1（預設）
      ],
      "type": "best_fields",        // 取得分最高的欄位的 score
      // "type": "most_fields"      // 累加各欄位 score
      // "type": "cross_fields"     // 把所有欄位當成一個整體
      "fuzziness": "AUTO"           // 模糊搜尋（容錯打字錯誤）
    }
  }
}   `}
</CodeBlock>

          <CodeBlock language="javascript">
{`   // ─── 3. Bool Query（組合查詢）— 最強大，實際專案用最多 ──────────
{
  "query": {
    "bool": {

      // must：必須符合，影響相關度分數（_score）
      "must": [
        {
          "match": { "title": "React" }
        }
      ],

      // filter：必須符合，不影響相關度（效能更好）
      // filter 的結果會被快取，適合固定條件的過濾
      "filter": [
        { "term":  { "tags": "javascript" } },
        { "term":  { "isPublished": true } },
        {
          "range": {
            "publishedAt": {
              "gte": "2024-01-01",      // 大於等於
              "lte": "2024-12-31"       // 小於等於
            }
          }
        },
        {
          "range": {
            "viewCount": { "gte": 100 }
          }
        }
      ],

      // should：最好符合，若匹配會提升 _score（非必要）
      // minimum_should_match 可設定至少要符合幾個 should
      "should": [
        { "match":  { "content": "hooks" } },
        { "match":  { "content": "useState" } }
      ],
      "minimum_should_match": 0,       // 0 = should 純粹加分，不是必要條件

      // must_not：絕對不能符合（不影響 _score）
      "must_not": [
        { "term": { "tags": "deprecated" } },
        { "term": { "category": "draft" } }
      ]
    }
  },

  // 排序：可以按相關度（預設）或特定欄位排序
  "sort": [
    { "_score": { "order": "desc" } },   // 先按相關度
    { "publishedAt": { "order": "desc" } } // 相同分數時按時間
  ],

  // 分頁
  "from": 0,
  "size": 20
}   `}
</CodeBlock>

          <CodeBlock language="javascript">
{`   // ─── 4. 高亮顯示（Highlight）─────────────────────────────────────
// 在搜尋結果中標記匹配到的關鍵詞，顯示給用戶
{
  "query": {
    "match": { "content": "React hooks" }
  },
  "highlight": {
    "fields": {
      "title": {},                        // 高亮 title 欄位
      "content": {
        "fragment_size": 150,             // 每個片段最多 150 個字元
        "number_of_fragments": 3,         // 最多回傳 3 個片段
        "pre_tags":  ["<mark>"],          // 匹配詞的前標籤
        "post_tags": ["</mark>"]          // 匹配詞的後標籤
      }
    }
  }
}

// 回傳結果範例：
// {
//   "_source": { "content": "React hooks 是 React 16.8 引入的..." },
//   "highlight": {
//     "content": [
//       "...學習 <mark>React</mark> <mark>hooks</mark> 之前，你需要先了解...",
//       "...useEffect 是 <mark>React</mark> 最常用的 <mark>hooks</mark> 之一..."
//     ]
//   }
// }   `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 5: Aggregation ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <BarChart3 className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Aggregation — 統計分析</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            Aggregation 是 Elasticsearch 的統計分析功能，相當於 SQL 的 GROUP BY + 聚合函數。
            它可以在搜尋的同時做統計，非常適合做 Dashboard、Filter Facets（電商的側邊篩選器）、
            Log 分析等需求。
          </p>

          <CodeBlock language="javascript">
{`   // ─── 統計每個 tag 的文章數 + 平均觀看數 ────────────────────────
GET /articles/_search
{
  // size: 0 表示只要聚合結果，不要回傳文章本身
  // 節省網路傳輸，效能更好
  "size": 0,

  "aggs": {

    // by_tag：按 tag 分組（Bucket Aggregation）
    "by_tag": {
      "terms": {
        "field": "tags",          // keyword 型別才能聚合
        "size": 10,               // 只回傳前 10 個 tag
        "order": { "_count": "desc" }  // 按文章數降序
      },

      // 在每個 tag 的 bucket 內，再做子聚合
      "aggs": {
        "avg_views": {
          "avg": { "field": "viewCount" }   // 平均觀看數
        },
        "max_views": {
          "max": { "field": "viewCount" }   // 最高觀看數
        }
      }
    },

    // 觀看數分布（Histogram）：每 1000 次一個區間
    "views_histogram": {
      "histogram": {
        "field": "viewCount",
        "interval": 1000
      }
    },

    // 每月發文趨勢（Date Histogram）
    "monthly_posts": {
      "date_histogram": {
        "field": "publishedAt",
        "calendar_interval": "month",
        "format": "yyyy-MM"
      },
      "aggs": {
        "total_views": {
          "sum": { "field": "viewCount" }
        }
      }
    }
  }
}

// 回傳結果範例：
// {
//   "aggregations": {
//     "by_tag": {
//       "buckets": [
//         { "key": "javascript", "doc_count": 45, "avg_views": { "value": 1230.5 } },
//         { "key": "react",      "doc_count": 38, "avg_views": { "value": 2150.0 } },
//         ...
//       ]
//     },
//     "monthly_posts": {
//       "buckets": [
//         { "key_as_string": "2024-01", "doc_count": 12, "total_views": { "value": 45320 } },
//         ...
//       ]
//     }
//   }
// }   `}
</CodeBlock>

          <Card className="border-0 bg-slate-50">
            <CardBody className="p-5">
              <p className="font-black text-gray-800 mb-3">三大 Aggregation 類型速查</p>
              <div className="space-y-3 text-sm">
                {[
                  {
                    type: 'Bucket Aggregation',
                    desc: '將文件分組（類似 GROUP BY）',
                    examples: 'terms（按欄位值分組）、range（按數值範圍）、date_histogram（按時間區間）',
                    color: 'bg-blue-100 text-blue-700',
                  },
                  {
                    type: 'Metric Aggregation',
                    desc: '計算統計數值',
                    examples: 'avg（平均）、sum（總和）、min/max（最小/最大）、cardinality（去重計數）',
                    color: 'bg-green-100 text-green-700',
                  },
                  {
                    type: 'Pipeline Aggregation',
                    desc: '對其他聚合的結果再做計算',
                    examples: 'moving_avg（移動平均）、derivative（環比變化）、cumulative_sum（累計值）',
                    color: 'bg-purple-100 text-purple-700',
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className={`font-black text-xs px-2 py-1 rounded-full shrink-0 ${item.color}`}>
                      {item.type}
                    </span>
                    <div>
                      <p className="font-medium text-gray-700">{item.desc}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{item.examples}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Section 6: Node.js 整合 ─── */}
        <motion.section
          className="space-y-6"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3">
            <Server className="text-amber-600" size={28} />
            <h2 className="text-3xl font-black text-gray-900">Node.js 整合實戰</h2>
          </div>

          <p className="text-gray-600 leading-relaxed">
            官方提供 <code className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-mono text-sm">@elastic/elasticsearch</code> Node.js client，
            API 設計與 REST API 結構一致，上手非常快。
          </p>

          <CodeBlock language="typescript">
{`   // npm install @elastic/elasticsearch
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: process.env.ES_URL ?? 'http://localhost:9200',
  auth: {
    username: process.env.ES_USERNAME ?? 'elastic',
    password: process.env.ES_PASSWORD ?? '',
  },
  // 生產環境建議啟用 TLS
  // tls: { ca: fs.readFileSync('./http_ca.crt') }
});

// ─── 搜尋文章 ─────────────────────────────────────────────────────
interface SearchOptions {
  query: string;
  tags?: string[];
  from?: number;
  size?: number;
}

async function searchArticles(options: SearchOptions) {
  const { query, tags, from = 0, size = 20 } = options;

  const { hits } = await client.search({
    index: 'articles',
    body: {
      query: {
        bool: {
          must: [
            {
              multi_match: {
                query,
                fields: ['title^3', 'content', 'tags^2'],
                fuzziness: 'AUTO',      // 自動調整容錯距離（1~2 個字元）
                operator: 'or',
              },
            },
          ],
          filter: [
            { term: { isPublished: true } },
            ...(tags?.length ? [{ terms: { tags } }] : []),
          ],
        },
      },

      // 高亮顯示搜尋關鍵詞
      highlight: {
        fields: {
          title:   {},
          content: { fragment_size: 200, number_of_fragments: 2 },
        },
        pre_tags:  ['<mark>'],
        post_tags: ['</mark>'],
      },

      // 排序：相關度優先，相同時按時間
      sort: [
        { _score:       { order: 'desc' } },
        { publishedAt:  { order: 'desc' } },
      ],

      from,
      size,
    },
  });

  return {
    total: typeof hits.total === 'number' ? hits.total : hits.total?.value ?? 0,
    results: hits.hits.map((hit) => ({
      ...hit._source,
      id:         hit._id,
      score:      hit._score,
      highlights: hit.highlight,
    })),
  };
}   `}
</CodeBlock>

          <CodeBlock language="typescript">
{`   // ─── 寫入 / 更新文章到 ES ─────────────────────────────────────────
interface Article {
  id:          string;
  title:       string;
  content:     string;
  tags:        string[];
  author:      string;
  publishedAt: string;
  viewCount:   number;
  isPublished: boolean;
}

async function indexArticle(article: Article) {
  await client.index({
    index: 'articles',
    id:    article.id,         // 指定 _id，相同 id 會覆蓋（Upsert 語意）
    body:  article,
    // refresh: 'wait_for'    // 等索引完成才回傳（測試用，生產環境不建議）
  });
}

// ─── 批次寫入（Bulk API）— 大量資料時效能遠優於逐筆寫入 ──────────
async function bulkIndexArticles(articles: Article[]) {
  const operations = articles.flatMap((article) => [
    { index: { _index: 'articles', _id: article.id } },
    article,
  ]);

  const { errors, items } = await client.bulk({ body: operations });

  if (errors) {
    const failedItems = items.filter(
      (item) => item.index?.error
    );
    console.error('[ES Bulk] 部分文件寫入失敗：', failedItems);
  }
}

// ─── 刪除文章 ─────────────────────────────────────────────────────
async function deleteArticle(articleId: string) {
  await client.delete({
    index: 'articles',
    id:    articleId,
  });
}

// ─── 同步 PostgreSQL → Elasticsearch ─────────────────────────────
// 策略 1：應用層雙寫（簡單但可能不一致）
async function createArticle(data: CreateArticleDto) {
  // 先寫入 PostgreSQL（主資料庫）
  const article = await prisma.article.create({ data });

  // 再寫入 Elasticsearch（搜尋索引）
  // 注意：這裡可能失敗，需要有 retry 或補償機制
  await indexArticle(article).catch((err) => {
    console.error('[ES Sync] 寫入失敗，將在背景重試：', err);
    // 加入重試隊列（可用 Redis Queue 或 DB 任務表）
    syncQueue.add({ type: 'index', articleId: article.id });
  });

  return article;
}

// 策略 2：CDC（Change Data Capture）— 生產環境推薦
// 使用 Debezium 監聽 PostgreSQL WAL（Write-Ahead Log）
// 每次 INSERT/UPDATE/DELETE 都會自動觸發 Kafka 事件
// Kafka Consumer 消費事件並同步到 Elasticsearch
// 優點：解耦、可靠、最終一致性保證   `}
</CodeBlock>

          <Card className="border-0 bg-gradient-to-br from-amber-800 to-orange-800 text-white">
            <CardBody className="p-6">
              <p className="font-black text-lg mb-3">架構建議：Elasticsearch 是搜尋加速層，不是主資料庫</p>
              <p className="text-amber-100 text-sm leading-relaxed mb-4">
                Elasticsearch 不應該是你的主要資料庫。它不支援完整的 ACID 交易、
                JOIN 操作受限、且資料可能在節點重啟後有短暫不一致。
                正確的架構是：主資料存在 PostgreSQL，搜尋索引同步到 Elasticsearch。
                PostgreSQL 是 Source of Truth，ES 只是搜尋的加速層。
              </p>
              <div className="bg-black/20 rounded-xl p-4 font-mono text-sm text-amber-100">
                <p className="text-amber-300 mb-2"># 推薦的資料同步架構</p>
                <p>用戶寫入  →  PostgreSQL（主資料庫）</p>
                <p>         →  Debezium CDC 監聽 WAL</p>
                <p>         →  Kafka 事件佇列</p>
                <p>         →  ES Sync Consumer</p>
                <p>         →  Elasticsearch（搜尋索引）</p>
                <p className="text-amber-300 mt-2"># 用戶搜尋  →  直接查 Elasticsearch</p>
                <p className="text-amber-300"># 用戶讀取文章  →  查 PostgreSQL 或 Redis Cache</p>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        {/* ─── 總結 ─── */}
        <motion.section
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-yellow-700 via-amber-700 to-orange-700 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-black mb-6">本篇重點回顧</h2>
            <div className="space-y-3">
              {[
                {
                  icon: '🔍',
                  text: 'SQL LIKE 的四大問題：Full table scan（O(n)）、無相關度排序、不支援語意搜尋、不支援中文分詞。Elasticsearch 在架構層面解決這些問題。',
                },
                {
                  icon: '📖',
                  text: '倒排索引（Inverted Index）是 ES 高效搜尋的核心。建立「詞彙 → 文件列表」的映射，搜尋複雜度從 O(n) 降為接近 O(1)。',
                },
                {
                  icon: '📐',
                  text: 'Mapping 需手動定義。text 型別用於全文搜尋（會分詞），keyword 型別用於精確匹配、排序、聚合（不分詞）。重要欄位通常同時保留兩種。',
                },
                {
                  icon: '🔎',
                  text: 'Query DSL 四個核心：match（全文搜尋）、multi_match（多欄位加權搜尋）、bool（must/filter/should/must_not 組合）、highlight（高亮顯示）。',
                },
                {
                  icon: '📊',
                  text: 'Aggregation 是 Elasticsearch 的統計分析引擎，可以在搜尋的同時做 GROUP BY、平均值、直方圖、時間序列分析，非常適合做 Dashboard。',
                },
                {
                  icon: '🏗️',
                  text: 'ES 是搜尋加速層，不是主資料庫。主資料存 PostgreSQL，透過 CDC（Debezium）或應用層雙寫同步到 ES，確保 PostgreSQL 是 Source of Truth。',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <span className="text-white/90 font-medium leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ─── Navigation ─── */}
        <div className="grid grid-cols-2 gap-4">
          <Link
            href="/blog/system-design/ep07-rate-limiting"
            className="group block bg-gray-50 hover:bg-amber-50 transition-colors rounded-2xl p-6"
          >
            <ArrowLeft
              size={18}
              className="mb-3 text-gray-400 group-hover:text-amber-500 transition-colors"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-amber-600 transition-colors">
              EP.07 — 限流設計
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Token Bucket、Redis 分散式限流實作
            </p>
          </Link>
          <Link
            href="/blog/system-design/ep01-intro"
            className="group block bg-gray-50 hover:bg-amber-50 transition-colors rounded-2xl p-6 text-right"
          >
            <ArrowRight
              size={18}
              className="mb-3 text-gray-400 group-hover:text-amber-500 transition-colors ml-auto"
            />
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">回到起點</p>
            <p className="font-black text-gray-900 group-hover:text-amber-600 transition-colors">
              EP.01 — 分散式系統入門
            </p>
            <p className="text-sm text-gray-500 mt-1">
              CAP 定理、一致性模型與系統設計思維
            </p>
          </Link>
        </div>

        {/* ─── Tags ─── */}
        <div className="flex items-center gap-3 flex-wrap pt-4">
          {[
            'Elasticsearch',
            'Full-Text Search',
            'Inverted Index',
            'Query DSL',
            'System Design',
            'Search Engine',
          ].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">
              {tag}
            </Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
