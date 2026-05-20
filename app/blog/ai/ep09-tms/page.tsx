import { FadeIn } from '@/components/blog/ScrollAnimation';
import { Calendar,
  User,
  Clock,
  Eye,
  Quote,
  ArrowRight,
  Database,
  Code2,
  AlertTriangle,
  CheckCircle2,
  Settings,
  Paintbrush,
  Rocket,
  ShieldCheck,
  FileSpreadsheet,
  RefreshCw,
  GitBranch
} from 'lucide-react';

import Link from 'next/link';
import Script from 'next/script';
import BlogRelatedPosts from '@/components/blog/BlogRelatedPosts';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Test Management System (TMS) | Legacy System 重構實戰 | Joseph Chen',
  description: '分享如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統。',
  alternates: {
    canonical: 'https://chullin.tw/blog/ai/ep09-tms',
  },
};

const InfoBox = ({ type, children }: { type: 'tip' | 'warning' | 'info'; children: React.ReactNode }) => {
  const styles = {
    tip: 'bg-green-50 border-green-200 text-green-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };
  const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️' };
  return (
    <div className={`border rounded-2xl p-5 my-4 ${styles[type]}`}>
      <span className="mr-2">{icons[type]}</span>
      {children}
    </div>
  );
};

export default function AiEP09Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. Hero / 標題區 */}
      <div className="relative h-[52vh] min-h-[380px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 30% 50%, rgba(59,130,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(6,182,212,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <FadeIn>
            <div className="flex justify-center gap-2 mb-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase text-[10px]">
                自動化管理
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase text-[10px]">
                EP.09
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              Test Management System (TMS)<br />
              <span className="text-blue-300 text-3xl sm:text-4xl">從 Legacy Code 到實驗室核心基礎設施</span>
            </h1>
            <p className="text-blue-200 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
              從維護上萬行 legacy code，到逐步推動 Python3 與 React 現代化遷移。<br />
              這篇文章分享我如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統。
            </p>
          </FadeIn>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">
        {/* Author Metadata */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2024 - 2025</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /> <span>14 min read</span></div>
            <div className="flex items-center gap-1.5"><Database size={16} /> <span>系統開發</span></div>
          </div>
        </div>

        {/* 2. 這篇文章要解決什麼問題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">這篇文章要解決什麼問題</h2>
          <p className="text-gray-700 leading-relaxed font-medium">
            在硬體測試與手機量產實驗室中，每天都有成百上千個測試項目在同時進行。在系統化之前，這些測試計畫、執行進度、Bug 追蹤與最終測試報告，全部依賴 Excel 試算表或口頭追蹤。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            這會帶來致命的痛點：試算表在多個工程師之間被反覆複製與修改，導致版本極度混亂；測試結果丟失、機台狀態衝突、資訊更新不同步，甚至客戶與工廠的測試規格對不上。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            為了解決這些問題，工廠在幾年前上線了一套 **測試管理系統 (Test Management System, 簡稱 TMS)**。然而，隨著業務快速擴張，這套系統也積累了龐大的技術債：舊版 Python 2.7 加上幾萬行揉雜了 SQL、業務邏輯與前端網頁渲染的遺留代碼 (Legacy Code)。
          </p>
          <p className="text-gray-700 leading-relaxed font-medium">
            這篇文章要探討的是：<strong>當我們面對一套沒有任何單元測試、高耦合度、卻同時支撐著產線數百位工程師每天日常運作的核心 Legacy 系統時，要如何安全、無痛、零停機地進行漸進式重構？</strong>
          </p>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 3. 真實案例或 Joseph 的經驗 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">真實案例與 Joseph 的重構經歷</h2>
          <p className="text-gray-700 leading-relaxed">
            當我剛接手這套 TMS 系統時，心中只有四個字：「如履薄冰」。系統已經運行了四年多，資料庫 Schema 裡充斥著許多沒有外鍵約束的寬表，資料夾中甚至隨處可見 `view_backup_2023.py` 或 `helper_final_fixed.py` 這類的遺留產物。
          </p>
          <p className="text-gray-700 leading-relaxed">
            此時，實驗室的測試經理跑來跟我說：「我們下週要對接客戶最新的自動化測試排程，需要修改資料上傳的 API。但我們不能接受系統停機，因為產線 24 小時都有人在輸入 iPhone 測試數據。」
          </p>
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 text-blue-950 space-y-3">
            <p className="font-bold">💡 現場血淚經驗：接手核心系統，最重要不是炫技，而是不讓流程中斷</p>
            <p className="text-sm leading-relaxed">
              我一開始也曾想過把整套系統用 FastAPI + Next.js 全面重寫，但很快在現場理智了下來。系統背後連接著無數台自動化測試儀器、條碼掃描槍與客戶端的 API。一旦大改，任何一個接口的微小差異都可能導致整個產線的測試流程瞬間停擺，造成的產值損失是以小時計算的。
            </p>
            <p className="text-sm leading-relaxed font-semibold">
              後來，我採用了「絞殺者模式 (Strangler Pattern)」：不破壞既有舊接口的運行，但在底層引入新的 Repository 與 Service 抽象層。每當需要修改或新增某個測試階段的業務邏輯時，我們就將舊代碼逐步引導至新架構中。這樣既能逐步淘汰髒代碼，又能保證產線天天順暢運作。
            </p>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 4. 核心概念解釋 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">核心概念解釋：遺留系統診斷與重構路徑</h2>
          <p className="text-gray-700 leading-relaxed">
            在對 TMS 進行手術前，必須先理清資料與任務是如何流轉的。以下是這套現代化 TMS 的核心任務流轉與同步架構：
          </p>

          {/* Flowchart 區塊 - 使用 Tailwind 繪製 */}
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 my-6">
            <p className="text-sm font-black text-slate-400 uppercase tracking-wider mb-6 text-center">TMS 測試管理系統工作流程 (Pipeline)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                { step: '01', title: '分配排程', desc: '測試任務排程', icon: <Calendar className="text-blue-600" /> },
                { step: '02', title: '執行測試', desc: '自動化/手動測試', icon: <Rocket className="text-blue-600" /> },
                { step: '03', title: '結果匯入', desc: 'Log 提取與解析', icon: <FileSpreadsheet className="text-blue-600" /> },
                { step: '04', title: '同步驗證', desc: '客戶資料庫同步', icon: <RefreshCw className="text-blue-600" /> },
                { step: '05', title: '看板呈現', desc: 'Dashboard 可視化', icon: <Database className="text-blue-600" /> }
              ].map((item, index) => (
                <div key={item.step} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between shadow-sm relative">
                  <div>
                    <span className="text-xs font-black text-slate-400">Step {item.step}</span>
                    <div className="flex items-center gap-2 mt-1 mb-2">
                      {item.icon}
                      <h4 className="font-black text-slate-800 text-xs">{item.title}</h4>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                  {index < 4 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 text-slate-300">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">
            重構過程中，我們重點解決了三大核心技術債務：
          </p>
          <ul className="space-y-3 pl-6 text-gray-700 list-disc">
            <li><strong>解耦業務邏輯 (Decoupling)</strong>：將原本在 Controller 中直接用 Raw SQL 查詢與手動 JSON 拼裝的邏輯，抽離成獨立的 Service 層，便於未來單元測試。</li>
            <li><strong>防護性設計與例外處理 (Defensive Coding)</strong>：對機台自動上傳的非標準格式 Log 進行預先清洗，防止因單一數據異常導致整個排程線程阻塞。</li>
            <li><strong>推動運行環境升級 (Python 2 to 3)</strong>：利用 `six` 和 `2to3` 等工具，逐步將模組遷移至 Python 3.x，解除底層安全漏洞威脅。</li>
          </ul>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 5. 程式碼範例 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">程式碼實戰：重構高耦合資料操作</h2>
          <p className="text-gray-700 leading-relaxed">
            這裡我們用真實遇到的「上傳測試報告」功能為例。第一段是重構前的典型代碼，資料庫連結與格式解析混雜在一起；第二段是引入 Service 與單元測試防護後的結構。
          </p>

          <div className="space-y-4">
            <p className="font-bold text-red-600 flex items-center gap-1.5">
              <AlertTriangle size={18} /> 錯誤的寫法：高耦合、缺乏抽象、Raw SQL 拼接與無事務控制（維護極難）
            </p>
            <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto text-xs leading-relaxed font-mono">
{`# ❌ 舊 TMS legacy_views.py 中的代碼片段
import pymysql

def upload_test_report(request):
    # 直接在請求處理器中硬編碼處理業務邏輯
    project_id = request.POST.get('project_id')
    tester_name = request.POST.get('tester')
    raw_data = request.POST.get('data') # 格式例如 "test_case_1,PASS;test_case_2,FAIL"

    # 1. 直接連接資料庫，缺乏連線池管理
    conn = pymysql.connect(host='10.120.x.x', user='admin', password='password', db='tms_db')
    cursor = conn.cursor()

    # 2. 拼接 SQL，存在 SQL 注入風險，且無任何錯誤處理
    # 如果 raw_data 解析到一半失敗，前面寫入的資料會卡在髒狀態
    try:
        sql = f"INSERT INTO test_records (project_id, tester) VALUES ('{project_id}', '{tester_name}')"
        cursor.execute(sql)
        record_id = cursor.lastrowid
        
        # 3. 複雜的字串解析與高耦合插入
        for item in raw_data.split(';'):
            case_name, result = item.split(',')
            # 如果 result 格式不正確，會在這裡崩潰，但前面的 record_id 已經寫入
            cursor.execute(f"INSERT INTO case_results (record_id, name, status) VALUES ({record_id}, '{case_name}', '{result}')")
        
        conn.commit()
        return {"status": "success"}
    except Exception as e:
        # 錯誤拋出不完整，且沒有對 conn 進行 rollback，可能造成 DB Lock
        return {"status": "error", "message": str(e)}
    finally:
        cursor.close()
        conn.close()`}
            </pre>
          </div>

          <div className="space-y-4">
            <p className="font-bold text-green-600 flex items-center gap-1.5">
              <CheckCircle2 size={18} /> 改良後寫法：Repository-Service 模式，加入事務保護與強型別驗證
            </p>
            <pre className="bg-slate-950 text-slate-100 p-5 rounded-2xl overflow-x-auto text-xs leading-relaxed font-mono">
{`# 🚀 重構後的 modern_services.py
from django.db import transaction
from typing import Dict, List, Tuple

class TestRecordRepository:
    """負責資料庫存取的持久層 (Decoupled Data Layer)"""
    @staticmethod
    def create_record(project_id: int, tester: str) -> int:
        # 使用 Django ORM 或參數化 SQL，由底層連線池代管
        record = TestRecord.objects.create(project_id=project_id, tester=tester)
        return record.id

    @staticmethod
    def bulk_insert_results(record_id: int, results: List[Tuple[str, str]]):
        # 批量寫入以優化效能
        objs = [CaseResult(record_id=record_id, name=name, status=status) for name, status in results]
        CaseResult.objects.bulk_create(objs)

class TestReportService:
    """業務邏輯層 (Business Logic Layer)"""
    def __init__(self, repo=TestRecordRepository()):
        self.repo = repo

    def parse_raw_data(self, raw_data: str) -> List[Tuple[str, str]]:
        """將原始資料解析為結構化 Tuple，包含格式驗證 (Validate first)"""
        parsed = []
        if not raw_data:
            raise ValueError("數據不可為空")
            
        for index, item in enumerate(raw_data.split(';')):
            parts = item.split(',')
            if len(parts) != 2:
                raise ValueError(f"第 {index+1} 筆數據格式錯誤: '{item}'")
            name, result = parts[0].strip(), parts[1].strip()
            if result not in ['PASS', 'FAIL', 'BLOCK']:
                raise ValueError(f"無效的測試結果狀態: '{result}'")
            parsed.append((name, result))
        return parsed

    def process_report_upload(self, project_id: int, tester: str, raw_data: str) -> Dict[str, str]:
        # 使用 transaction.atomic 確保 ACID 事務完整性
        try:
            results_to_insert = self.parse_raw_data(raw_data)
            
            with transaction.atomic():
                record_id = self.repo.create_record(project_id, tester)
                self.repo.bulk_insert_results(record_id, results_to_insert)
                
            return {"status": "success", "record_id": str(record_id)}
        except ValueError as ve:
            # 捕獲型別或格式錯誤，返回清晰說明，不拋出 stack trace 洩密
            return {"status": "error", "message": f"驗證失敗: {str(ve)}"}
        except Exception as e:
            # 記錄 log 供監控系統使用
            logger.error(f"上傳測試報告時發生未知系統錯誤: {e}", exc_info=True)
            return {"status": "error", "message": "系統內部錯誤，請聯繫管理員"}`}
            </pre>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 6. 技術比較表 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">重構策略比較</h2>
          <p className="text-gray-700 leading-relaxed">
            當面對運作中的核心 Legacy System 時，選擇何種更新策略是考驗架構師技術與情商的關鍵：
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-black">重構方案</th>
                  <th className="px-6 py-4 font-black">優點</th>
                  <th className="px-6 py-4 font-black">缺點</th>
                  <th className="px-6 py-4 font-black">適合場景</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">全面推翻重寫 (Big Bang Rewrite)</td>
                  <td className="px-6 py-4 text-green-700">無歷史包袱、技術棧最新、性能上限高</td>
                  <td className="px-6 py-4 text-red-700">交付週期極長、極易丟失隱藏業務邏輯、產線停擺風險極大</td>
                  <td className="px-6 py-4 text-slate-700">舊系統邏輯簡單、或原系統代碼已完全無法編譯運行</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">漸進式重構 (Incremental Strangler)</td>
                  <td className="px-6 py-4 text-green-700">風險極低、隨時可部分上線交付、產線運作不受干擾</td>
                  <td className="px-6 py-4 text-red-700">新舊代碼會共存一段時間、開發人員需同時維護兩套邏輯</td>
                  <td className="px-6 py-4 text-slate-700">核心業務系統、產線不可中斷、邏輯複雜且文件缺失的系統</td>
                </tr>
                <tr className="hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-gray-900">僅打補丁 (Maintain Only)</td>
                  <td className="px-6 py-4 text-green-700">短期開發成本最低、不需要進行系統設計變更</td>
                  <td className="px-6 py-4 text-red-700">技術債像雪球越滾越大、隨著版本更迭維護難度指數級上升</td>
                  <td className="px-6 py-4 text-slate-700">預計在一年內會被徹底淘汰或邊緣化的輔助系統</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 7. 常見錯誤與踩坑 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">重構過程中的常見錯誤與踩坑</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">直接刪除「看似無用」的反射或動態代碼</h4>
                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                  在一次程式碼清理中，我看到幾個 Python 檔案內有定義了十幾個沒被任何地方呼叫的 helper 函數，於是順手把他們刪除了。沒想到隔天一早，某個老舊測試機台在上傳報告時報錯。排查後才發現，舊系統竟然是用字串反射方式 `globals()[dynamic_func_name]()` 來動態呼叫那些函數。
                  <br />
                  <strong>正解：</strong> 對沒有靜態依賴關係的代碼，刪除前必須在全局進行文字搜尋，並配合日誌檢索，確保無動態反射呼叫後才可移除。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="text-2xl mt-1">🔴</span>
              <div>
                <h4 className="font-bold text-gray-900 text-lg">直接變更核心資料表欄位結構 (Database Schema)</h4>
                <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                  為了優化性能，我將測試紀錄表 `test_records` 中的一個欄位從字串型別改為整數型別。本以為修改了對應的 Django Model 就大功告成，但部署後當場導致其他自動化腳本寫入報錯，因為那些腳本仍繞過 ORM 直接用 raw DB connection 寫入字串。
                  <br />
                  <strong>正解：</strong> 資料庫重構應遵循「Add, Migrate, Deprecate」三步法：先新增新欄位，同步寫入雙邊欄位，將歷史數據遷移完畢，修改所有讀取端後，最後才刪除舊欄位。
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 8. 實務建議 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">實務重構建議</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mt-0.5"><ShieldCheck size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">實施雙寫與影子測試 (Shadow Testing)</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">在將關鍵模組（如報表統計邏輯）切換到新架構前，可以在後台進行「雙寫」：同時呼叫新舊兩套代碼，並比對兩者結果是否完全一致，若有差異則發出告警，以此驗證新代碼的準確性。</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 text-blue-600 p-1.5 rounded-lg mt-0.5"><GitBranch size={16} /></div>
              <div>
                <p className="font-bold text-gray-900">建立全面邊界測試案例</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">在開始重構任何一個函數前，先為它補上最基本輸入輸出的單元測試。測試不必覆蓋 100% 邏輯，但一定要覆蓋最常見的邊界條件，這是重構時最強大的安全網。</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 9. 與本系列其他文章的關聯 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900 border-l-4 border-blue-600 pl-4">與本系列其他文章的關聯</h2>
          <p className="text-gray-700 leading-relaxed">
            這篇 TMS 系統的現代化實戰，與我們在自動化與 AI 部署的其他技術密不可分：
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Link href="/blog/ai/ep01-airgapped-intro" className="group p-5 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-blue-600 mb-1">系列前置篇 EP.01</p>
                <h4 className="font-black text-gray-900 text-sm group-hover:text-blue-600 transition-colors">Air-gapped AI 部署架構</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">了解工廠內網物理隔離對系統架構設計的硬性限制，這也是 TMS 伺服器部署時必須遵循的安全基線。</p>
              </div>
              <span className="text-[10px] font-black text-blue-500 mt-4 flex items-center gap-1">
                開始閱讀 <ArrowRight size={10} />
              </span>
            </Link>

            <Link href="/blog/ai/ep10-opencv-robot" className="group p-5 bg-slate-50 hover:bg-blue-50 rounded-2xl border border-slate-100 transition-all flex flex-col justify-between">
              <div>
                <p className="text-xs font-black text-blue-600 mb-1">系列下一篇 EP.10</p>
                <h4 className="font-black text-gray-900 text-sm group-hover:text-blue-600 transition-colors">OpenCV 視覺自動化</h4>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">看我們如何將 OpenCV 的視覺判定數據動態回傳，並透過 API 與本篇 TMS 進行測試進度與異常狀態的自動化對接。</p>
              </div>
              <span className="text-[10px] font-black text-blue-500 mt-4 flex items-center gap-1">
                開始閱讀 <ArrowRight size={10} />
              </span>
            </Link>
          </div>
        </section>

        <hr className="border-gray-100 opacity-50" />

        {/* 10. 總結 */}
        <section>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-3">
              <Quote size={24} className="text-blue-400" />
              <h2 className="text-2xl font-black text-gray-900">總結</h2>
            </div>
            <div className="space-y-4 text-gray-700 leading-relaxed font-medium">
              <p>
                重構並不是要把所有舊代碼全部重寫一遍，而是以最小的成本，讓系統具備持續演進的能力。
              </p>
              <p>
                在 TMS 重構實戰中，我們透過逐步引導、解耦 Repository-Service 層以及嚴格的格式驗證，成功在零停機的前提下，將這個曾經脆弱的 Legacy 系統轉變為支撐產線高強度測試的核心引擎。這說明了在複雜商業現場，穩健、務實的工程方法永遠重於盲目的技術追新。
              </p>
            </div>
          </div>
        </section>

        <hr className="border-gray-100 my-12 opacity-50" />

        {/* Related Posts */}
        <BlogRelatedPosts currentPostHref="/blog/ai/ep09-tms" category="ai" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4 pt-10">
          <Link href="/blog/ai/ep08-transformer-to-gpt" className="group block bg-gray-50 hover:bg-blue-50 transition-colors rounded-2xl p-6">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
            <p className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">EP.08 — 從 Transformer 到 GPT</p>
          </Link>
          <Link href="/blog/ai/ep10-opencv-robot" className="group block bg-gray-50 hover:bg-cyan-50 transition-colors rounded-2xl p-6 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-900 group-hover:text-cyan-600 transition-colors">EP.10 — OpenCV Robot Vision</p>
            <ArrowRight size={18} className="ml-auto mt-3 text-gray-400 group-hover:text-cyan-500 transition-colors" />
          </Link>
        </div>
      </article>

      {/* Structured Data for SEO */}
      <Script id="blog-json-ld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "Test Management System (TMS) | Legacy System 重構實戰",
          "description": "分享如何在不中斷實驗室運作的前提下，重構一套每天被大量使用的測試管理系統。",
          "author": {
            "@type": "Person",
            "name": "陳憲億 Joseph Chen"
          },
          "datePublished": "2025-05-10",
          "image": "https://chullin.tw/assets/profile3.webp",
          "publisher": {
            "@type": "Organization",
            "name": "Joseph Chen Portfolio",
            "logo": {
              "@type": "ImageObject",
              "url": "https://chullin.tw/favicon.ico"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://chullin.tw/blog/ai/ep09-tms"
          }
        })}
      </Script>
    </div>
  );
}
