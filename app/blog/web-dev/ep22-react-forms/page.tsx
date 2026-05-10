'use client';

import { Card, CardBody, Chip, Divider } from '@heroui/react';
import {
  Calendar,
  User,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Zap,
  BookOpen,
  Code2,
  Shield,
  Layers,
  RefreshCw,
  Server,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CodeBlock from '@/components/blog/CodeBlock';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function WebDevEP22() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-fuchsia-50">

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-rose-700 via-pink-700 to-fuchsia-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-white/20 backdrop-blur text-white font-black px-4 py-1.5 rounded-full text-sm">EP.22</span>
              <span className="bg-white/10 text-white/80 px-3 py-1 rounded-full text-xs">Web Development Bootcamp</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
              React 表單實戰：<br />
              <span className="text-pink-200">從 useState 到 react-hook-form</span>
            </h1>
            <p className="text-rose-100 text-lg mb-8 max-w-2xl">
              非同步驗證、Zod Schema、Server Action — 讓表單開發不再痛苦的完整解法
            </p>
            <div className="flex items-center gap-6 text-pink-200 text-sm flex-wrap">
              <span className="flex items-center gap-1.5"><User size={14} /> Joseph Chen</span>
              <span className="flex items-center gap-1.5"><Calendar size={14} /> 2026</span>
              <span className="flex items-center gap-1.5"><Clock size={14} /> 15 min read</span>
              <span className="flex items-center gap-1.5"><Eye size={14} /> react-hook-form · Zod · Server Action</span>
            </div>
          </motion.div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-6 py-16 space-y-16">

        {/* ── Section 1：痛點 ────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <AlertTriangle size={20} className="text-rose-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 1：痛點 — 用 useState 寫表單有多痛苦</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            想像你接到一個需求：「幫我做一個會員註冊表單，要有姓名、Email、密碼、確認密碼、個人簡介。」
            聽起來很普通，對吧？但當你真的動手寫，才發現…
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            <strong className="text-rose-600">5 個欄位 × 3 個 state（值、錯誤、是否 touched）= 15 個 useState。</strong>
            這還沒算 isSubmitting、isLoading、serverError… 這不是你的錯，這是純 React 表單的原罪。
          </p>

          <CodeBlock language="tsx">
{` // 5 個欄位 × 3 個 state = 15 個 useState 😱
const [name, setName] = useState('');
const [nameError, setNameError] = useState('');
const [nameTouched, setNameTouched] = useState(false);

const [email, setEmail] = useState('');
const [emailError, setEmailError] = useState('');
const [emailTouched, setEmailTouched] = useState(false);

const [password, setPassword] = useState('');
const [passwordError, setPasswordError] = useState('');
const [passwordTouched, setPasswordTouched] = useState(false);

const [confirmPassword, setConfirmPassword] = useState('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');
const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

const [bio, setBio] = useState('');
const [bioError, setBioError] = useState('');
const [bioTouched, setBioTouched] = useState(false);

// 還需要全域狀態...
const [isSubmitting, setIsSubmitting] = useState(false);
const [serverError, setServerError] = useState('');

// ── 手動驗證函式（每個欄位都要寫）──────────────────────────────
const validateName = (value: string) => {
  if (!value) return '姓名必填';
  if (value.length < 2) return '姓名至少 2 個字';
  return '';
};

const validateEmail = (value: string) => {
  if (!value) return 'Email 必填';
  if (!value.includes('@')) return 'Email 格式錯誤';
  return '';
};

const validatePassword = (value: string) => {
  if (!value) return '密碼必填';
  if (value.length < 8) return '密碼至少 8 個字元';
  if (!/[A-Z]/.test(value)) return '需包含至少一個大寫字母';
  if (!/[0-9]/.test(value)) return '需包含至少一個數字';
  return '';
};

// ... 繼續為每個欄位寫 validate 函式

// ── handleSubmit 本人（又臭又長）────────────────────────────────
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // 手動觸發所有欄位驗證
  const nameErr = validateName(name);
  const emailErr = validateEmail(email);
  const passwordErr = validatePassword(password);
  const confirmPasswordErr =
    password !== confirmPassword ? '兩次密碼不一致' : '';
  const bioErr = bio.length > 200 ? '簡介不得超過 200 字' : '';

  // 手動 set 每個 error state
  setNameError(nameErr);
  setEmailError(emailErr);
  setPasswordError(passwordErr);
  setConfirmPasswordError(confirmPasswordErr);
  setBioError(bioErr);

  // 如果有任何一個錯誤就中止
  if (nameErr || emailErr || passwordErr || confirmPasswordErr || bioErr) return;

  setIsSubmitting(true);
  try {
    await registerUser({ name, email, password, bio });
  } catch (err) {
    setServerError('伺服器錯誤，請稍後再試');
  } finally {
    setIsSubmitting(false);
  }
};

// ── JSX（更長…）────────────────────────────────────────────────
return (
  <form onSubmit={handleSubmit}>
    <input
      value={name}
      onChange={(e) => {
        setName(e.target.value);
        if (nameTouched) setNameError(validateName(e.target.value));
      }}
      onBlur={() => {
        setNameTouched(true);
        setNameError(validateName(name));
      }}
      placeholder="姓名"
    />
    {nameTouched && nameError && <p className="text-red-500">{nameError}</p>}

    {/* 每個欄位都要重複同樣的模式... */}
  </form>
); `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-8 border-l-4 border-rose-500">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle size={28} className="text-rose-500 shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">這樣寫有什麼問題？</h3>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">1.</span>
                      <span><strong>極度冗長：</strong>10 個欄位的表單，光 state 宣告就要寫 30+ 行，整個元件輕鬆突破 200 行。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">2.</span>
                      <span><strong>驗證邏輯分散：</strong>驗證規則散落在 validate 函式、onChange、onBlur、handleSubmit 四個地方，改一個規則要改四處。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">3.</span>
                      <span><strong>效能問題：</strong>每次輸入一個字，整個元件 re-render，因為每個 setState 都觸發更新。</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold shrink-0">4.</span>
                      <span><strong>型別不安全：</strong>沒有辦法靜態保證送出的資料結構符合後端期待，type mismatch 只能在執行期才發現。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 2：react-hook-form 核心概念 ─────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
              <Zap size={20} className="text-pink-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 2：解法 — react-hook-form 的核心概念</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            react-hook-form 的核心思路是：<strong className="text-pink-600">把表單狀態從 React 的 state 裡移出來，改由 DOM 本身管理（Uncontrolled Inputs）</strong>，只在需要的時候（submit、驗證）才讀取值。這讓 re-render 次數大幅減少。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            類比：傳統的 useState 表單像是每次有人在紙上寫字，你都要抄一份備份放在另一個房間。react-hook-form 則是等他寫完、要交出去的時候，你才去讀那張紙。省了很多來回跑的力氣。
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">安裝套件</h3>
          <CodeBlock language="bash">
{` npm install react-hook-form zod @hookform/resolvers `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">三個核心 API</h3>
          <CodeBlock language="tsx">
{` import { useForm } from 'react-hook-form';

const {
  register,           // 把 input 「登記」給 react-hook-form 管理
  handleSubmit,       // 只有在驗證通過時才呼叫你的 submit 函式
  formState: {
    errors,           // 驗證錯誤物件，{ fieldName: { message: '...' } }
    isSubmitting,     // 送出中的 loading 狀態（自動管理）
    isDirty,          // 有沒有被修改過
    isValid,          // 目前表單是否通過所有驗證
  },
  watch,              // 即時監看欄位值
  setValue,           // 程式設定欄位值
  control,            // 給 Controller 用，控制第三方元件
} = useForm(); `}
</CodeBlock>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center mb-3">
                  <Code2 size={16} className="text-rose-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 font-mono text-sm">register()</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  用 <code className="bg-gray-100 px-1 rounded">{'...register("fieldName")'}</code> 展開到 input 上，自動綁定 ref、onChange、onBlur、name。不需要任何 useState。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle size={16} className="text-pink-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 font-mono text-sm">handleSubmit()</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  包裹你的 onSubmit 函式。它會先跑所有驗證，只有全部通過才呼叫你的函式，並自動管理 isSubmitting 狀態。
                </p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md">
              <CardBody className="p-5">
                <div className="w-8 h-8 bg-fuchsia-100 rounded-lg flex items-center justify-center mb-3">
                  <AlertTriangle size={16} className="text-fuchsia-600" />
                </div>
                <h4 className="font-bold text-gray-800 mb-2 font-mono text-sm">errors</h4>
                <p className="text-gray-500 text-xs leading-relaxed">
                  驗證錯誤物件。用 <code className="bg-gray-100 px-1 rounded">errors.fieldName?.message</code> 取得對應欄位的錯誤訊息，沒有錯誤時是 undefined。
                </p>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 3：Zod Schema ────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-fuchsia-100 rounded-xl flex items-center justify-center">
              <Shield size={20} className="text-fuchsia-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 3：Zod Schema 驗證</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            react-hook-form 負責「管理狀態」，Zod 負責「定義規則」。兩者分工明確，各司其職。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            為什麼用 Zod 而不是直接在 register 裡寫 validate 函式？三個理由：
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="border-0 shadow-md bg-fuchsia-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-fuchsia-800 mb-2">1. 宣告式</h4>
                <p className="text-fuchsia-700 text-sm">用 schema 描述「資料長什麼樣」，規則集中在一個地方，不是散落在各個 validate 函式裡。</p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-pink-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-pink-800 mb-2">2. 型別推導</h4>
                <p className="text-pink-700 text-sm">用 <code className="bg-white/70 px-1 rounded">z.infer&lt;typeof schema&gt;</code> 直接產生 TypeScript 型別，不需要另外手寫 interface，schema 和型別永遠同步。</p>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md bg-rose-50">
              <CardBody className="p-5">
                <h4 className="font-bold text-rose-800 mb-2">3. 前後端共用</h4>
                <p className="text-rose-700 text-sm">同一個 schema 可以在前端表單驗證，也可以在 API handler / Server Action 裡驗證傳入資料。寫一次，兩邊都安全。</p>
              </CardBody>
            </Card>
          </div>

          <CodeBlock language="tsx">
{` import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// ── 定義驗證 Schema ───────────────────────────────────────────────
const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, '姓名必填')
      .min(2, '姓名至少 2 個字')
      .max(50, '姓名不得超過 50 個字'),

    email: z
      .string()
      .min(1, 'Email 必填')
      .email('請輸入有效的 Email 格式'),

    password: z
      .string()
      .min(1, '密碼必填')
      .min(8, '密碼至少 8 個字元')
      .regex(/[A-Z]/, '需包含至少一個大寫字母')
      .regex(/[0-9]/, '需包含至少一個數字')
      .regex(/[^A-Za-z0-9]/, '需包含至少一個特殊符號'),

    confirmPassword: z.string().min(1, '請再次輸入密碼'),

    bio: z
      .string()
      .max(200, '個人簡介不得超過 200 字')
      .optional(),
  })
  // ── 跨欄位驗證（.refine）──────────────────────────────────────
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次密碼不一致',
    path: ['confirmPassword'], // 錯誤會出現在 errors.confirmPassword
  });

// ── 自動從 Schema 推導 TypeScript 型別 ──────────────────────────
// 不需要另外寫 interface！schema 改了，型別自動跟著改。
type RegisterFormData = z.infer<typeof registerSchema>;
// 等同於：
// type RegisterFormData = {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   bio?: string | undefined;
// }

// ── 把 Zod Schema 接上 react-hook-form ──────────────────────────
const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
  resolver: zodResolver(registerSchema), // 這一行連接兩者
  mode: 'onBlur', // onSubmit | onBlur | onChange | onTouched | all
}); `}
</CodeBlock>

          <Card className="border-0 shadow-md mt-6 bg-gradient-to-r from-fuchsia-50 to-pink-50">
            <CardBody className="p-6">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-fuchsia-600" />
                mode 的差別
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <div><code className="bg-white px-2 py-0.5 rounded border text-xs">onSubmit</code> — 預設值，只在按送出時驗證</div>
                <div><code className="bg-white px-2 py-0.5 rounded border text-xs">onBlur</code> — 離開欄位時驗證，體驗較佳</div>
                <div><code className="bg-white px-2 py-0.5 rounded border text-xs">onChange</code> — 每次輸入都驗證，最即時但最多 re-render</div>
                <div><code className="bg-white px-2 py-0.5 rounded border text-xs">onTouched</code> — 第一次 blur 後改用 onChange 模式</div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 4：完整表單實作 ──────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Code2 size={20} className="text-rose-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 4：完整表單實作</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            現在把 Section 1 那個「30 個 useState 的怪物」改寫成 react-hook-form 版本。
            注意對比行數和可讀性的差異。
          </p>

          <CodeBlock language="tsx">
{` 'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// ── Schema（定義一次，到處複用）──────────────────────────────────
const registerSchema = z
  .object({
    name: z.string().min(2, '姓名至少 2 個字'),
    email: z.string().email('請輸入有效的 Email'),
    password: z
      .string()
      .min(8, '密碼至少 8 個字元')
      .regex(/[A-Z]/, '需包含至少一個大寫字母')
      .regex(/[0-9]/, '需包含至少一個數字'),
    confirmPassword: z.string(),
    bio: z.string().max(200).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '兩次密碼不一致',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

// ── 元件本體 ────────────────────────────────────────────────────
export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    // data 已經是完整通過驗證的型別安全資料
    await registerUser(data);
    // handleSubmit 會自動管理 isSubmitting，不需要 try/finally
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">

      {/* 姓名 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
        <input
          {...register('name')}
          className={\\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500
            \\${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}\\`}
          placeholder="請輸入姓名"
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          {...register('email')}
          type="email"
          className={\\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500
            \\${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}\\`}
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* 密碼 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">密碼</label>
        <input
          {...register('password')}
          type="password"
          className={\\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500
            \\${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}\\`}
          placeholder="至少 8 碼，含大寫與數字"
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* 確認密碼 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">確認密碼</label>
        <input
          {...register('confirmPassword')}
          type="password"
          className={\\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500
            \\${errors.confirmPassword ? 'border-red-500 bg-red-50' : 'border-gray-300'}\\`}
          placeholder="再次輸入密碼"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* 個人簡介 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">個人簡介（選填）</label>
        <textarea
          {...register('bio')}
          rows={3}
          className={\\`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500
            \\${errors.bio ? 'border-red-500 bg-red-50' : 'border-gray-300'}\\`}
          placeholder="簡短介紹自己..."
        />
        {errors.bio && (
          <p className="text-red-500 text-xs mt-1">{errors.bio.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rose-600 text-white py-2.5 rounded-lg font-medium
          hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors"
      >
        {isSubmitting ? '送出中...' : '建立帳號'}
      </button>
    </form>
  );
} `}
</CodeBlock>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className="border-0 shadow-md border-l-4 border-red-400">
              <CardBody className="p-5">
                <h4 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  useState 版本
                </h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• 15+ 個 useState 宣告</li>
                  <li>• 5 個手動 validate 函式</li>
                  <li>• handleSubmit 內手動 set 5 個 error</li>
                  <li>• onChange / onBlur 各自處理</li>
                  <li>• isSubmitting 要自己管理</li>
                  <li className="font-bold text-red-600 mt-2">合計約 150–200 行</li>
                </ul>
              </CardBody>
            </Card>
            <Card className="border-0 shadow-md border-l-4 border-green-400">
              <CardBody className="p-5">
                <h4 className="font-bold text-green-600 mb-3 flex items-center gap-2">
                  <CheckCircle size={16} />
                  react-hook-form 版本
                </h4>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  <li>• 0 個 useState（表單狀態）</li>
                  <li>• 1 個 Zod schema 集中管理規則</li>
                  <li>• handleSubmit 自動驗證攔截</li>
                  <li>• mode: 'onBlur' 統一處理時機</li>
                  <li>• isSubmitting 自動管理</li>
                  <li className="font-bold text-green-600 mt-2">合計約 70–80 行</li>
                </ul>
              </CardBody>
            </Card>
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 5：進階 API ──────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
              <Layers size={20} className="text-pink-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 5：進階 — watch、setValue、Controller</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-8 text-lg">
            react-hook-form 的基本用法已經讓你減少了大量樣板程式碼。但它還有三個進階 API，
            對應三個實際開發中常見的情境。
          </p>

          {/* watch */}
          <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
            <RefreshCw size={18} className="text-pink-600" />
            1. watch — 即時監看欄位值
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            情境：你想在用戶輸入密碼的同時，即時顯示「密碼強度」指示器（弱/中/強）。
            這需要即時讀取密碼欄位的值，但又不想用 useState 引入不必要的 re-render。
          </p>
          <CodeBlock language="tsx">
{` const { register, handleSubmit, watch } = useForm<RegisterFormData>();

// watch('password') 會在 password 欄位改變時觸發 re-render
// 傳入第二個參數作為初始值，避免 undefined
const passwordValue = watch('password', '');

// 根據密碼強度計算分數
const getPasswordStrength = (pwd: string): { score: number; label: string; color: string } => {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score, label: '弱', color: 'bg-red-500' };
  if (score <= 2) return { score, label: '中', color: 'bg-yellow-500' };
  if (score <= 3) return { score, label: '強', color: 'bg-green-500' };
  return { score, label: '非常強', color: 'bg-emerald-600' };
};

const strength = getPasswordStrength(passwordValue);

// JSX 中顯示強度指示器
return (
  <div>
    <input {...register('password')} type="password" />

    {/* 密碼強度指示器 */}
    {passwordValue && (
      <div className="mt-2">
        <div className="flex gap-1 mb-1">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={\\`h-1 flex-1 rounded-full transition-colors \\${
                i <= strength.score ? strength.color : 'bg-gray-200'
              }\\`}
            />
          ))}
        </div>
        <p className="text-xs text-gray-500">密碼強度：{strength.label}</p>
      </div>
    )}
  </div>
);

// 也可以 watch 多個欄位或整個表單
const allValues = watch();                    // 監看所有欄位
const [name, email] = watch(['name', 'email']); // 監看指定多個欄位 `}
</CodeBlock>

          {/* setValue */}
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-3 flex items-center gap-2">
            <Code2 size={18} className="text-fuchsia-600" />
            2. setValue — 程式設定欄位值
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            情境：用郵遞區號 API 自動填入縣市、地址欄位。用戶只需輸入郵遞區號，其他欄位自動完成。
            這類「程式驅動的欄位更新」就是 setValue 的用武之地。
          </p>
          <CodeBlock language="tsx">
{` const { register, handleSubmit, setValue } = useForm<AddressFormData>();

// 當用戶輸入郵遞區號，自動查詢並填入城市
const handleZipCodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const zip = e.target.value;

  // 台灣郵遞區號為 3 或 5 碼
  if (zip.length === 3 || zip.length === 5) {
    try {
      const result = await fetchAddressByZip(zip);
      // 自動填入多個相關欄位
      setValue('city', result.city, { shouldValidate: true });      // 觸發驗證
      setValue('district', result.district, { shouldDirty: true }); // 標記為已修改
      setValue('fullAddress', result.address);
    } catch {
      // 查詢失敗，讓用戶手動填
    }
  }
};

return (
  <form>
    <input
      {...register('zipCode')}
      onChange={handleZipCodeChange}
      placeholder="郵遞區號"
      maxLength={5}
    />
    {/* 這些欄位會被 setValue 自動填入 */}
    <input {...register('city')} placeholder="縣市" readOnly />
    <input {...register('district')} placeholder="鄉鎮市區" readOnly />
    <input {...register('fullAddress')} placeholder="詳細地址" />
  </form>
);

// setValue 的第三個參數（options）：
// shouldValidate: true  → 設定後立即觸發驗證
// shouldDirty: true     → 標記為「已被修改」（影響 isDirty）
// shouldTouch: true     → 標記為「已被觸碰」（影響 isTouched） `}
</CodeBlock>

          {/* Controller */}
          <h3 className="text-xl font-bold text-gray-800 mt-10 mb-3 flex items-center gap-2">
            <Layers size={18} className="text-rose-600" />
            3. Controller — 整合第三方 UI 元件
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            情境：你的設計系統用了 Radix UI 的 Select、React DatePicker、或 HeroUI 的 Select 元件。
            這些第三方元件不是原生的 input，所以沒辦法用 <code className="bg-gray-100 px-1 rounded text-sm">...register()</code> 直接接上。
            這時候就需要 Controller 作為橋接器。
          </p>
          <CodeBlock language="tsx">
{` import { useForm, Controller } from 'react-hook-form';
import { Select, SelectItem } from '@heroui/react'; // HeroUI 的 Select

type CategoryFormData = {
  title: string;
  category: 'frontend' | 'backend' | 'devops' | 'mobile';
  publishDate: Date;
};

export default function ArticleForm() {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CategoryFormData>();

  return (
    <form onSubmit={handleSubmit(console.log)}>
      {/* 一般 input 還是用 register */}
      <input {...register('title')} placeholder="文章標題" />

      {/* ── Controller 包裹第三方元件 ───────────────────── */}
      <Controller
        name="category"           // 欄位名稱
        control={control}         // 傳入 control
        rules={{ required: '請選擇分類' }} // 也可以在這裡寫驗證規則（或用 zodResolver）
        render={({ field, fieldState }) => (
          <Select
            // Controller 提供的 field 物件包含 onChange、onBlur、value、ref
            selectedKeys={field.value ? [field.value] : []}
            onSelectionChange={(keys) => field.onChange(Array.from(keys)[0])}
            onBlur={field.onBlur}
            isInvalid={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            label="文章分類"
          >
            <SelectItem key="frontend">前端開發</SelectItem>
            <SelectItem key="backend">後端開發</SelectItem>
            <SelectItem key="devops">DevOps</SelectItem>
            <SelectItem key="mobile">行動開發</SelectItem>
          </Select>
        )}
      />

      {/* DatePicker 也是同樣模式 */}
      <Controller
        name="publishDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            dateFormat="yyyy/MM/dd"
          />
        )}
      />

      <button type="submit">發布</button>
    </form>
  );
} `}
</CodeBlock>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Section 6：Server Action ─────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center">
              <Server size={20} className="text-rose-600" />
            </div>
            <h2 className="text-3xl font-black text-gray-900">Section 6：Server Action 整合（Next.js 14+）</h2>
          </div>

          <p className="text-gray-600 leading-relaxed mb-4 text-lg">
            傳統做法是前端表單送出後，發一個 fetch 到 <code className="bg-gray-100 px-1 rounded">/api/register</code>，
            後端 API route 再處理資料。Next.js 14 的 Server Action 讓你可以<strong className="text-rose-600">省掉這個 API route</strong>，
            直接從客戶端元件呼叫在伺服器上執行的函式。
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-lg">
            更重要的是：Zod schema 可以在前端和 Server Action 兩層都用。
            <strong> 前端 Zod 防呆（使用者操作失誤）、後端 Zod 防攻擊（惡意 API 呼叫）— 兩層驗證，缺一不可。</strong>
          </p>

          <h3 className="text-xl font-bold text-gray-800 mb-4">步驟一：建立 Server Action</h3>
          <CodeBlock language="tsx">
{` // app/actions/register.ts
'use server'; // ← 這個指令讓這個檔案的所有函式在伺服器上執行

import { redirect } from 'next/navigation';
import { registerSchema } from '@/lib/schemas'; // 共用同一個 Zod schema

// 模擬資料庫操作（實際用 Prisma / Drizzle ORM）
import { db } from '@/lib/db';
import { hash } from 'bcryptjs';

// RegisterFormData 型別從 schema 推導，前後端完全一致
type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  bio?: string;
};

export async function registerAction(formData: RegisterFormData) {
  // ── 第二層驗證：後端用 Zod 再驗一次 ─────────────────────────
  // 就算有人繞過前端直接打 API，這裡也會擋下來
  const validated = registerSchema.safeParse(formData);

  if (!validated.success) {
    // 回傳結構化的錯誤讓前端可以對應到欄位
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { name, email, password, bio } = validated.data;

  // ── 檢查 email 是否重複 ───────────────────────────────────────
  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return {
      success: false,
      errors: { email: ['此 Email 已被使用'] },
    };
  }

  // ── 密碼加密後存入資料庫 ──────────────────────────────────────
  const hashedPassword = await hash(password, 12);
  await db.user.create({
    data: { name, email, password: hashedPassword, bio },
  });

  // ── 成功後重導向（Server-side redirect）──────────────────────
  redirect('/dashboard');
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">步驟二：在表單元件呼叫 Server Action</h3>
          <CodeBlock language="tsx">
{` 'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { registerAction } from '@/app/actions/register';
import { registerSchema } from '@/lib/schemas';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,                    // 可以把 Server 回傳的錯誤設回對應欄位
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);

    // 直接呼叫 Server Action，不需要 fetch('/api/register')
    const result = await registerAction(data);

    // Server Action 回傳的欄位錯誤，設回對應欄位
    if (result?.errors) {
      Object.entries(result.errors).forEach(([field, messages]) => {
        setError(field as keyof RegisterFormData, {
          message: messages[0],
        });
      });
      return;
    }

    // 如果是全域錯誤
    if (result && !result.success) {
      setServerError('註冊失敗，請稍後再試');
    }

    // 成功：Server Action 的 redirect() 會自動處理跳轉
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {serverError}
        </div>
      )}

      {/* ...欄位 JSX 同 Section 4... */}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-rose-600 text-white py-2.5 rounded-lg"
      >
        {isSubmitting ? '建立帳號中...' : '建立帳號'}
      </button>
    </form>
  );
} `}
</CodeBlock>

          <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">共用 Schema 的最佳實踐</h3>
          <CodeBlock language="tsx">
{` // lib/schemas/register.ts ← 單一來源，前後端共用
import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().min(2, '姓名至少 2 個字'),
    email: z.string().email('請輸入有效的 Email'),
    password: z.string().min(8).regex(/[A-Z]/).regex(/[0-9]/),
    confirmPassword: z.string(),
    bio: z.string().max(200).optional(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: '兩次密碼不一致',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// 前端：import { registerSchema } from '@/lib/schemas/register'
// 後端：import { registerSchema } from '@/lib/schemas/register'
// 同一份 schema，兩邊都用 → 規則永遠一致 `}
</CodeBlock>

          <Card className="border-0 shadow-lg mt-6 bg-gradient-to-r from-rose-600 to-fuchsia-600 text-white">
            <CardBody className="p-6">
              <div className="flex items-start gap-4">
                <Shield size={28} className="shrink-0 mt-1 text-pink-200" />
                <div>
                  <h4 className="font-bold text-lg mb-2">兩層驗證：為什麼都必要？</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-pink-200 mb-1">前端 Zod（防呆）</p>
                      <p className="text-white/80">提升使用者體驗 — 即時回饋，不需等待伺服器。但前端驗證可以被繞過（關掉 JavaScript、直接打 API）。</p>
                    </div>
                    <div>
                      <p className="font-semibold text-pink-200 mb-1">後端 Zod（防攻擊）</p>
                      <p className="text-white/80">安全性保障 — 就算攻擊者繞過前端直接呼叫 Server Action，後端的 safeParse 仍會擋下格式不符的資料。</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Tags ──────────────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">本篇涵蓋技術</h3>
          <div className="flex flex-wrap gap-2">
            {['react-hook-form', 'Zod', 'Form Validation', 'Server Action', 'TypeScript', 'React'].map((tag) => (
              <Chip
                key={tag}
                variant="flat"
                classNames={{
                  base: 'bg-rose-100 text-rose-700',
                  content: 'font-medium text-xs',
                }}
              >
                {tag}
              </Chip>
            ))}
          </div>
        </motion.section>

        <Divider className="my-8" />

        {/* ── Navigation ───────────────────────────────────────────── */}
        <motion.section {...fadeInUp}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/blog/web-dev/ep21-context">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
                    <ArrowLeft size={14} />
                    <span>上一篇</span>
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">
                    EP.21 Context API
                  </p>
                  <p className="text-gray-400 text-xs mt-1">跨元件的狀態共享解法</p>
                </CardBody>
              </Card>
            </Link>

            <Link href="/blog/web-dev/ep05-tailwind">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow cursor-pointer group">
                <CardBody className="p-5 text-right">
                  <div className="flex items-center justify-end gap-2 text-gray-400 text-xs mb-2">
                    <span>下一篇</span>
                    <ArrowRight size={14} />
                  </div>
                  <p className="font-bold text-gray-800 group-hover:text-rose-600 transition-colors">
                    EP.05 Tailwind CSS
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Utility-First CSS 完整指南</p>
                </CardBody>
              </Card>
            </Link>
          </div>
        </motion.section>

      </article>
    </div>
  );
}
