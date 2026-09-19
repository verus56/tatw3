'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Trophy, ArrowDownLeft, ArrowUpRight, ArrowRight, Sparkles, HelpCircle, Award } from 'lucide-react';

export default function PointsPage() {
  const { currentUser, pointTransactions } = useApp();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/profile"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للملف الشخصي</span>
      </Link>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 rounded-3xl p-8 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold text-amber-100 uppercase tracking-widest bg-black/15 px-3 py-1 rounded-full">
            محفظة النقاط
          </span>
          <p className="text-sm text-amber-100 mt-2">رصيدك الحالي المتاح للاستخدام</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-4xl sm:text-5xl font-black">{currentUser.points.toLocaleString('ar-DZ')}</span>
            <span className="text-lg font-bold text-amber-100">نقطة</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Link
            href="/courses"
            className="px-5 py-3 bg-white text-slate-950 rounded-xl text-xs font-bold hover:bg-amber-50 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span>استبدال النقاط بشهادات</span>
          </Link>
          <Link
            href="/opportunities"
            className="px-5 py-3 bg-black/20 text-white rounded-xl text-xs font-bold hover:bg-black/30 transition-all flex items-center justify-center gap-2"
          >
            <span>جمع المزيد من النقاط</span>
          </Link>
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-teal-700 font-bold text-xs">
            <Sparkles className="w-4 h-4" />
            <span>كيف تكسب النقاط؟</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            عند التقديم والمشاركة الفعلية في أنشطة التطوع وتأكيد المنظمة لحضورك، يتم إيداع النقاط المحددة لكل فرصة مباشرة في رصيدك.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs">
            <Award className="w-4 h-4" />
            <span>فيمَ تستخدم النقاط؟</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            تتيح لك النقاط الترقية في رتب المتطوعين على لوحة الشرف، والحصول على شهادات الدورات التدريبية مجاناً بدل الدفع بالبطاقة الذهبية.
          </p>
        </div>
      </div>

      {/* Transactions History (Section 43) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <h3 className="font-black text-base text-slate-900">سجل المعاملات والنقاط</h3>

        <div className="divide-y divide-slate-100">
          {pointTransactions.map((tx) => (
            <div key={tx.id} className="py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    tx.type === 'credit'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {tx.type === 'credit' ? (
                    <ArrowDownLeft className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">{tx.title}</h4>
                  <p className="text-[11px] text-slate-400">
                    {tx.category} • {tx.date}
                  </p>
                </div>
              </div>

              <div
                className={`font-black text-sm ${
                  tx.type === 'credit' ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {tx.type === 'credit' ? `+${tx.points}` : `-${tx.points}`} نقطة
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
