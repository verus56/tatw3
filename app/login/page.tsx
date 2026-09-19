'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Mail, Lock, Sparkles, User, Building2, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole, showToast } = useApp();

  const [email, setEmail] = useState('mohamed@example.com');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('volunteer');
    showToast('مرحباً بك مجدداً!', 'تم تسجيل الدخول بنجاح كمتطوع', 'success');
    router.push('/profile');
  };

  const handleQuickLogin = (asRole: 'volunteer' | 'organization') => {
    setRole(asRole);
    if (asRole === 'volunteer') {
      showToast('مرحباً بك!', 'تم الدخول بحساب المتطوع التجريبي', 'success');
      router.push('/profile');
    } else {
      showToast('مرحباً بك!', 'تم الدخول بحساب الجمعية التجريبي', 'success');
      router.push('/organization/dashboard');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Right side in RTL - Form */}
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
          <div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
              بوابة الدخول
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              مرحباً بك مجدداً 👋
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              سجّل الدخول لمتابعة مساهماتك التطوعية وتكويناتك.
            </p>
          </div>

          {/* Quick Demo Logins Bar */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2">
            <span className="text-[11px] font-bold text-amber-900 block">
              ⚡ تجربة سريعة بدون إدخال بيانات:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('volunteer')}
                className="py-2 px-3 bg-white hover:bg-amber-100/50 border border-amber-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <User className="w-3.5 h-3.5 text-teal-700" />
                <span>دخول كمتطوع</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin('organization')}
                className="py-2 px-3 bg-white hover:bg-amber-100/50 border border-amber-200 rounded-xl text-xs font-bold text-slate-800 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>دخول كجمعية</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                البريد الإلكتروني
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white text-left outline-hidden"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white text-left outline-hidden"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                />
                <span className="text-slate-600 font-medium">تذكرني</span>
              </label>
              <a href="#" className="text-teal-700 font-semibold hover:underline">
                نسيت كلمة المرور؟
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-xs shadow-md transition-all"
            >
              تسجيل الدخول
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500">
              ليس لديك حساب بعد؟{' '}
              <Link href="/register" className="text-teal-700 font-bold hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>
          </div>
        </div>

        {/* Left side in RTL - Decorative Branding */}
        <div className="lg:col-span-5 bg-gradient-to-br from-teal-800 via-teal-900 to-slate-900 p-8 sm:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10 space-y-4">
            <img
              src="/logo.png"
              alt="تطوع TAWTOU3"
              className="h-16 w-auto object-contain bg-white rounded-2xl p-2 shadow-lg"
            />
            <h3 className="text-2xl font-black">منصة تطوّع</h3>
            <p className="text-xs text-teal-200 leading-relaxed">
              شارك. تعلّم. ساعد. واصنع أثرًا في مختلف أنحاء الوطن الجزائري.
            </p>

            <ul className="space-y-3 pt-6 text-xs text-teal-100">
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center text-teal-300">✓</div>
                <span>الوصول لأكثر من 850 فرصة تطوع</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center text-teal-300">✓</div>
                <span>دورات تدريبية وشهادات إتمام</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-teal-500/30 flex items-center justify-center text-teal-300">✓</div>
                <span>نظام نقاط ومكافآت للمتطوعين</span>
              </li>
            </ul>
          </div>

          <div className="relative z-10 pt-8 text-[11px] text-teal-300/70">
            انضم الآن إلى مجتمع صانعي التغيير.
          </div>
        </div>
      </div>
    </div>
  );
}
