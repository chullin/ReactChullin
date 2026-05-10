'use client';
import {
  Card,
  CardBody,
  Chip,
  Divider } from '@heroui/react';
import { Calendar,
  User,
  ArrowLeft,
  Quote,
  Clock,
  Eye
} from 'lucide-react';

import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

export default function LangEP02Page() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="relative h-[52vh] min-h-[360px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 40% 60%, rgba(139,92,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(192,38,211,0.4) 0%, transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex justify-center gap-2 mb-5">
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-200 border-violet-500/30 font-bold uppercase text-[10px]">
                後端語言
              </Chip>
              <Chip size="sm" variant="flat" className="bg-violet-500/20 text-violet-200 border-violet-500/30 font-bold uppercase text-[10px]">
                EP.02
              </Chip>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-4">
              C# 與 ASP.NET<br />
              <span className="text-violet-200">.NET 工程師面試題</span>
            </h1>
            <p className="text-violet-200 text-lg font-medium max-w-2xl mx-auto">
              型別系統、LINQ、Web API 設計 — C# 語法特性與後端開發核心概念
            </p>
          </motion.div>
        </div>
      </div>

      <article className="max-w-3xl mx-auto px-6 py-16 space-y-16">

        {/* Author */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-violet-100 text-violet-600 p-2.5 rounded-full">
              <User size={18} />
            </div>
            <div>
              <p className="font-black text-gray-900">Joseph Chen</p>
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar size={13} />
                <span>2026</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-gray-500 text-sm font-medium">
            <div className="flex items-center gap-1.5"><Clock size={16} /><span>15 min read</span></div>
            <div className="flex items-center gap-1.5"><Eye size={16} /><span>TMS 專案實戰</span></div>
          </div>
        </div>

        {/* Opening Quote */}
        <section>
          <Card className="border border-violet-100 bg-gradient-to-br from-violet-50 to-fuchsia-50 shadow-none">
            <CardBody className="p-7">
              <div className="flex items-start gap-4">
                <Quote size={28} className="text-violet-300 shrink-0 mt-1" />
                <p className="text-gray-700 text-lg leading-relaxed italic font-medium">
                  在鴻海的 TMS 專案裡用過 ASP.NET，第一次看到 LINQ 的時候以為在看 SQL，後來才發現它是 C# 的內建語言整合查詢——比 Python 的 list comprehension 還強大。
                </p>
              </div>
            </CardBody>
          </Card>
        </section>

        <Divider className="opacity-30" />

        {/* Section 1: C# 特色 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">C# 特色</h2>
          <p className="text-gray-700 leading-relaxed">
            C# 是 Microsoft 開發的強型別物件導向語言，2002 年隨 .NET Framework 發布。現在的 .NET Core / .NET 5+ 已跨平台支援 Windows/Linux/macOS，在企業後端開發是主流選項之一。
          </p>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">特性</th>
                  <th className="text-left px-5 py-3 font-black text-violet-700">C#</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">Java（對照）</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">Python（對照）</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['型別系統', '強型別 + 型別推斷 (var)', '強型別', '動態型別'],
                  ['記憶體管理', '垃圾回收（GC）', '垃圾回收（GC）', '垃圾回收（GC）'],
                  ['async/await', '一等公民，語言原生支援', '需要第三方框架', '原生支援（asyncio）'],
                  ['LINQ', '內建語言整合查詢', '需要 Stream API', '無直接對應'],
                  ['跨平台', '.NET Core / .NET 5+', '原生跨平台（JVM）', '原生跨平台'],
                  ['主要用途', 'Web API、企業系統、遊戲（Unity）', 'Web、Android、企業', '腳本、AI、Web'],
                ].map(([feature, cs, java, py], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-bold text-gray-700">{feature}</td>
                    <td className="px-5 py-3 text-violet-700 font-medium">{cs}</td>
                    <td className="px-5 py-3 text-gray-600">{java}</td>
                    <td className="px-5 py-3 text-gray-500">{py}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 2: C# 語法速查 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">C# 語法特色速查</h2>
          <p className="text-gray-700 leading-relaxed">
            C# 語法現代、簡潔，有幾個特色是面試常考、日常也常用的，熟悉它們能讓程式碼更安全、更易讀：
          </p>
          <CodeBlock
            lang="csharp"
            title="csharp_syntax.cs"
            code={`// ── var 型別推斷（靜態，不是動態！）────────────────────────
var name = "Joseph";      // 編譯器推斷為 string，之後不能改型別
var count = 42;           // 編譯器推斷為 int
// name = 123;            // !! 編譯錯誤，var 是靜態推斷，不是動態型別

// ── Null 安全操作符 ───────────────────────────────────────
string? maybeNull = null;           // ? 代表 nullable string

// ?. (null conditional)：maybeNull 若為 null，整個表達式返回 null
int? len = maybeNull?.Length;       // len = null（不會 NullReferenceException）

// ?? (null coalescing)：左邊為 null 時使用右邊的值
string display = maybeNull ?? "N/A";  // display = "N/A"

// ??= (null coalescing assignment)：左邊為 null 才賦值
maybeNull ??= "default";              // 等同 if(maybeNull == null) maybeNull = "default"

// ── String Interpolation ──────────────────────────────────
string firstName = "Joseph";
int age = 28;
string msg = $"Hello, {firstName}! You are {age} years old.";
// 等同舊寫法：string.Format("Hello, {0}! You are {1} years old.", firstName, age)

// ── Properties（屬性）─────────────────────────────────────
public class Person {
    // 自動屬性：編譯器自動產生 backing field
    public string Name { get; set; }           // 可讀可寫
    public int Age { get; private set; }       // 只能在類別內部修改
    public string Id { get; init; }            // 只能在初始化時設定（C# 9+）

    // 計算屬性：不儲存值，每次讀取時計算
    public bool IsAdult => Age >= 18;          // 等同 get { return Age >= 18; }
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 3: LINQ */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">LINQ（Language Integrated Query）</h2>
          <p className="text-gray-700 leading-relaxed">
            LINQ 是 C# 最強大的特性之一，讓你用類似 SQL 的語法操作任何集合（List、陣列、資料庫、XML）。一旦用習慣，寫不帶 LINQ 的 C# 會很難受。
          </p>

          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
            <p className="font-black text-violet-800 mb-2">Deferred Execution（延遲執行）</p>
            <p className="text-violet-700 text-sm leading-relaxed">
              LINQ 查詢是 <strong>lazy（懶）</strong> 的：建立查詢時不執行，只有在實際迭代（foreach、.ToList()、.Count()...）時才執行。這意味著可以先建立查詢描述，之後再決定是否執行，但也要注意多次迭代會多次執行查詢。
            </p>
          </div>

          <CodeBlock
            lang="csharp"
            title="linq_demo.cs"
            code={`using System;
using System.Collections.Generic;
using System.Linq;

var students = new List<Student> {
    new("Alice",  3.8, "CS"),
    new("Bob",    2.9, "EE"),
    new("Charlie",3.5, "CS"),
    new("Diana",  3.9, "Math"),
    new("Eve",    3.1, "CS"),
};

// ── Method Syntax（最常用）──────────────────────────────────
// Where：過濾
var csStudents = students.Where(s => s.Major == "CS");

// Select：投影（類似 map）
var names = students.Select(s => s.Name);

// OrderBy / OrderByDescending：排序
var byGpa = students.OrderByDescending(s => s.GPA);

// FirstOrDefault：取第一個符合條件的，找不到返回 null（不拋例外）
var topCS = students.FirstOrDefault(s => s.Major == "CS" && s.GPA > 3.7);

// GroupBy：分組
var byMajor = students.GroupBy(s => s.Major);
foreach (var group in byMajor) {
    Console.WriteLine($"{group.Key}: {group.Count()} 人, 平均 GPA: {group.Average(s => s.GPA):F2}");
}

// 鏈式操作（最常見的實際用法）
var result = students
    .Where(s => s.GPA >= 3.5)
    .OrderByDescending(s => s.GPA)
    .Select(s => new { s.Name, s.GPA })
    .ToList();   // ← ToList() 才真正執行查詢（觸發 deferred execution）

// ── Query Syntax（較少用，更像 SQL）──────────────────────────
var queryResult =
    from s in students
    where s.GPA >= 3.5
    orderby s.GPA descending
    select new { s.Name, s.GPA };

record Student(string Name, double GPA, string Major);`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 4: async/await */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">async / await</h2>
          <p className="text-gray-700 leading-relaxed">
            C# 的 async/await 是非同步程式設計的核心，讓非同步程式碼讀起來像同步程式碼。在 ASP.NET Web API 裡幾乎所有 I/O 操作都應該非同步。
          </p>

          <div className="space-y-3">
            {[
              {
                title: 'Task vs Task<T>',
                desc: 'Task 代表「沒有返回值的非同步操作」（等同 void）；Task<T> 代表「返回 T 型別結果的非同步操作」。',
                color: 'bg-blue-50 border-blue-100',
                tc: 'text-blue-800',
                dc: 'text-blue-700',
              },
              {
                title: '避免 async void',
                desc: 'async void 無法被 await，例外發生時無法被捕獲，會直接崩潰整個程式。唯一例外是事件處理器（event handler）。其他情況一律用 async Task。',
                color: 'bg-red-50 border-red-100',
                tc: 'text-red-800',
                dc: 'text-red-700',
              },
              {
                title: 'Deadlock 陷阱',
                desc: '在 ASP.NET 環境中，不要對 async 方法呼叫 .Result 或 .Wait()（同步阻塞），這會造成 deadlock。永遠用 await 等待。',
                color: 'bg-orange-50 border-orange-100',
                tc: 'text-orange-800',
                dc: 'text-orange-700',
              },
            ].map((item, i) => (
              <div key={i} className={`border rounded-2xl p-5 ${item.color}`}>
                <p className={`font-black mb-2 ${item.tc}`}>{item.title}</p>
                <p className={`text-sm leading-relaxed ${item.dc}`}>{item.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            lang="csharp"
            title="async_controller.cs"
            code={`using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase {
    private readonly IUserService _userService;

    // 依賴注入（DI）：不自己 new，讓框架注入
    public UsersController(IUserService userService) {
        _userService = userService;
    }

    // async Task<IActionResult>：非同步方法，有返回值
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id) {
        // await：非同步等待，不阻塞執行緒
        var user = await _userService.GetByIdAsync(id);
        if (user == null) return NotFound();
        return Ok(user);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search) {
        var users = await _userService.GetAllAsync(search);
        return Ok(users);
    }
}

// Service 層的 async 方法
public class UserService : IUserService {
    private readonly AppDbContext _db;
    public UserService(AppDbContext db) { _db = db; }

    public async Task<User?> GetByIdAsync(int id) {
        // Entity Framework 的非同步查詢
        return await _db.Users.FindAsync(id);
    }

    public async Task<List<User>> GetAllAsync(string? search) {
        return await _db.Users
            .Where(u => search == null || u.Name.Contains(search))
            .OrderBy(u => u.Name)
            .ToListAsync();  // EF Core 的非同步版 ToList()
    }
}`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 5: ASP.NET Web API */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">ASP.NET Web API 基礎</h2>
          <p className="text-gray-700 leading-relaxed">
            ASP.NET Core 的 Web API 採用 MVC 架構，Controller 負責處理 HTTP 請求。以下是一個完整的 CRUD Controller 骨架：
          </p>
          <CodeBlock
            lang="csharp"
            title="ProductsController.cs"
            code={`[ApiController]
[Route("api/[controller]")]                        // 路由：api/products
public class ProductsController : ControllerBase {
    private readonly IProductService _service;
    public ProductsController(IProductService service) => _service = service;

    // GET api/products
    // GET api/products?category=electronics
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll(
        [FromQuery] string? category) {            // [FromQuery]：從 URL query string 取值
        var items = await _service.GetAllAsync(category);
        return Ok(items);
    }

    // GET api/products/5
    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(
        [FromRoute] int id) {                      // [FromRoute]：從 URL 路由取值
        var item = await _service.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(item);
    }

    // POST api/products
    [HttpPost]
    public async Task<ActionResult<Product>> Create(
        [FromBody] CreateProductDto dto) {         // [FromBody]：從 HTTP body (JSON) 反序列化
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    // PUT api/products/5
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateProductDto dto) {
        var success = await _service.UpdateAsync(id, dto);
        return success ? NoContent() : NotFound();
    }

    // DELETE api/products/5
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id) {
        var success = await _service.DeleteAsync(id);
        return success ? NoContent() : NotFound();
    }
}

// Data Transfer Objects（DTO）：只暴露 API 需要的欄位，不直接暴露 Entity
public record CreateProductDto(string Name, decimal Price, string Category);
public record UpdateProductDto(string? Name, decimal? Price);`}
          />
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-5">
            <p className="font-black text-violet-800 mb-2">Middleware Pipeline</p>
            <p className="text-violet-700 text-sm leading-relaxed">
              ASP.NET Core 的請求依序通過 Middleware Pipeline：Authentication → Authorization → Routing → Controller。每個 Middleware 可以決定要不要繼續傳遞請求。在 Program.cs 裡用 app.UseXxx() 的順序很重要，先加的先執行。
            </p>
          </div>
        </section>

        <Divider className="opacity-30" />

        {/* Section 6: Dependency Injection */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">Dependency Injection（DI）</h2>
          <p className="text-gray-700 leading-relaxed">
            DI 是 ASP.NET Core 的核心設計：類別不自己 new 依賴，而是透過建構函數宣告需要什麼，由框架負責「注入」。好處是低耦合、易測試。
          </p>

          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-5 py-3 font-black text-gray-700">生命週期</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">說明</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">適合場景</th>
                  <th className="text-left px-5 py-3 font-black text-gray-700">注冊方式</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  ['Singleton', '整個應用程式生命週期只有一個實例，所有請求共用', '快取、設定、logging', 'AddSingleton<T>()'],
                  ['Scoped', '每個 HTTP 請求建立一個新實例，同一請求內共用', 'DbContext、業務服務', 'AddScoped<T>()'],
                  ['Transient', '每次注入都建立新實例', '輕量、無狀態的工具類', 'AddTransient<T>()'],
                ].map(([lt, desc, use, reg], i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3 font-bold text-violet-700">{lt}</td>
                    <td className="px-5 py-3 text-gray-700 text-xs leading-relaxed">{desc}</td>
                    <td className="px-5 py-3 text-gray-500 text-xs">{use}</td>
                    <td className="px-5 py-3 font-mono text-gray-600 text-xs">{reg}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <CodeBlock
            lang="csharp"
            title="Program.cs"
            code={`var builder = WebApplication.CreateBuilder(args);

// 在這裡向 DI Container 注冊服務
builder.Services.AddControllers();

// Scoped：每個 HTTP 請求一個 DbContext（標準做法）
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Scoped：業務服務（同一請求內共用同一個 UserService 實例）
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IProductService, ProductService>();

// Singleton：快取服務（整個 App 共用）
builder.Services.AddSingleton<ICacheService, MemoryCacheService>();

var app = builder.Build();

// Middleware Pipeline（順序重要！）
app.UseHttpsRedirection();
app.UseAuthentication();      // 先驗證身份
app.UseAuthorization();       // 再檢查權限
app.MapControllers();

app.Run();`}
          />
        </section>

        <Divider className="opacity-30" />

        {/* Section 7: 面試常考題 */}
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-gray-900">面試常考題</h2>
          <div className="space-y-4">
            {[
              {
                q: 'C# 的 struct 和 class 差異？',
                a: 'struct 是 Value Type，存在 Stack 上，賦值時複製整個值（互相獨立）。class 是 Reference Type，存在 Heap 上，賦值時複製的是參考（指向同一個物件）。struct 適合小型不可變資料（Point、Color）；class 適合複雜物件。',
              },
              {
                q: 'LINQ 的 deferred execution 是什麼意思？',
                a: 'LINQ 查詢在建立時不立即執行，只是描述「要怎麼查」。真正執行發生在迭代時（foreach、ToList()、Count()、First()...）。好處是可以組合多個查詢再一次執行；壞處是若資料源在查詢建立後被修改，結果會反映最新狀態。',
              },
              {
                q: 'async/await 和 Thread 的差異？',
                a: 'Thread 是 OS 層級的執行緒，佔用真實資源（~1MB stack）。async/await 是非同步模型，等待 I/O 時釋放執行緒去做其他事，I/O 完成後繼續。結果是：1000 個並發 HTTP 請求，Thread 模型需要 1000 個執行緒；async 模型可能只需幾十個執行緒，大幅提升吞吐量。',
              },
              {
                q: 'interface 和 abstract class 的使用時機？',
                a: 'interface 定義「能做什麼」（行為契約），一個 class 可以實作多個 interface。abstract class 定義「是什麼」（繼承關係），可以包含部分實作。DI 幾乎都用 interface（IUserService）。若類別之間有 is-a 關係且需共用程式碼，用 abstract class。',
              },
              {
                q: 'DI 中 Scoped 和 Singleton 的差異？',
                a: 'Singleton：整個應用程式只有一個實例，所有請求共用，必須是執行緒安全的。Scoped：每個 HTTP 請求有獨立實例，同一請求內共用（例如同一請求的 Controller 和 Service 共用同一個 DbContext），不需要執行緒安全考量。',
              },
              {
                q: '.NET 5/6/7/8 和 .NET Framework 的差異？',
                a: '.NET Framework（1.0–4.8）只能跑在 Windows，已進入維護模式。.NET Core / .NET 5+（統一品牌）是跨平台的現代版本，效能更好、更輕量。新專案全部用 .NET 8（目前 LTS），不要用舊的 .NET Framework，除非維護遺留系統。',
              },
            ].map((item, i) => (
              <Card key={i} className="border border-gray-100 shadow-none">
                <CardBody className="p-6 space-y-3">
                  <p className="font-black text-gray-900">Q{i + 1}. {item.q}</p>
                  <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <Divider className="my-12 opacity-50" />

        {/* Navigation */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/blog/lang/ep01-c">
            <div className="bg-gray-50 hover:bg-violet-50 transition-colors rounded-2xl p-6 cursor-pointer group">
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">上一篇</p>
              <p className="font-black text-gray-700 group-hover:text-violet-700 transition-colors">EP.01 — C語言</p>
              <p className="text-sm text-gray-400 mt-1">指標與記憶體管理</p>
              <ArrowLeft size={18} className="mt-3 text-gray-300 group-hover:text-violet-400 transition-colors" />
            </div>
          </Link>
          <div className="bg-gray-50 rounded-2xl p-6 opacity-50 text-right">
            <p className="text-xs font-bold text-gray-400 uppercase mb-1">下一篇</p>
            <p className="font-black text-gray-400">EP.03</p>
            <p className="text-sm text-gray-400 mt-1">即將推出</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap pt-4">
          {['C#', 'ASP.NET', 'LINQ', 'Web API', '.NET', '面試題', 'EP.02'].map((tag) => (
            <Chip key={tag} variant="flat" color="warning" className="font-bold">{tag}</Chip>
          ))}
        </div>
      </article>
    </div>
  );
}
