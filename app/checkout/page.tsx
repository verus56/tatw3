'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CreditCard, Award, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Coins, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get('courseId') || 'course-001';
  const { courses, currentUser, purchaseCertificate } = useApp();

  const course = courses.find((c) => c.id === courseId) || courses[0];

  const [paymentMethod, setPaymentMethod] = useState<'edahabia' | 'points'>('points');
  const [cardNumber, setCardNumber] = useState('2456 •••• •••• 8910');
  const [expiry, setExpiry] = useState('08/28');
  const [cvv, setCvv] = useState('892');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newCertCode, setNewCertCode] = useState('');

  const pointsCost = course.certificatePricePoints || 100;
  const dzdCost = course.certificatePriceDzd || 1500;
  const hasEnoughPoints = currentUser.points >= pointsCost;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const res = purchaseCertificate(course.id, paymentMethod);
      setIsProcessing(false);
      if (res.success) {
        setNewCertCode(res.certificate?.certificateCode || 'TW-2026-00000');
        setSuccess(true);
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back button */}
      <Link
        href={`/courses/${course.id}`}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة لصفحة الدورة</span>
      </Link>

      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
          الدفع وإصدار الشهادة
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          الحصول على الشهادة المعتمدة
        </h1>
        <p className="text-sm text-slate-500">
          دورة: <strong className="text-slate-800">{course.title}</strong>
        </p>
      </div>

      {success ? (
        /* Success Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">تم الدفع بنجاح!</h2>
            <p className="text-sm text-slate-600">
              تم إصدار شهادتك الرسمية وإضافتها إلى ملفك الشخصي.
            </p>
            <p className="text-xs font-mono text-teal-700 font-bold bg-teal-50 inline-block px-3 py-1 rounded-lg border border-teal-200">
              رقم الشهادة: {newCertCode}
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/profile/certificates"
              className="px-6 py-3 bg-teal-700 text-white text-xs font-bold rounded-xl hover:bg-teal-800 transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>مشاهدة وتحميل الشهادة</span>
            </Link>
            <Link
              href="/courses"
              className="px-6 py-3 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              استكشاف دورات أخرى
            </Link>
          </div>
        </div>
      ) : (
        /* Checkout Box */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
          {/* Method selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-3">اختر وسيلة الدفع</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Points */}
              <button
                type="button"
                onClick={() => setPaymentMethod('points')}
                className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start justify-between ${
                  paymentMethod === 'points'
                    ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-amber-500" />
                    <span className="font-bold text-sm text-slate-900">نقاط التطوع</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    استبدل {pointsCost} نقطة من رصيدك
                  </p>
                  <p className="text-[11px] font-semibold text-teal-700">
                    رصيدك الحالي: {currentUser.points} نقطة
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'points' ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                  }`}
                >
                  {paymentMethod === 'points' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>

              {/* Option 2: Edahabia Card */}
              <button
                type="button"
                onClick={() => setPaymentMethod('edahabia')}
                className={`p-4 rounded-2xl border-2 text-right transition-all flex items-start justify-between ${
                  paymentMethod === 'edahabia'
                    ? 'border-teal-600 bg-teal-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="font-bold text-sm text-slate-900">البطاقة الذهبية / CIB</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    دفع إلكتروني آمن ومباشر
                  </p>
                  <p className="text-[11px] font-bold text-slate-800">
                    المبلغ: {dzdCost.toLocaleString('ar-DZ')} دج
                  </p>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === 'edahabia' ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                  }`}
                >
                  {paymentMethod === 'edahabia' && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </button>
            </div>
          </div>

          {/* Points Breakdown or Edahabia form */}
          {paymentMethod === 'points' ? (
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-sm text-slate-900">تفاصيل رصيد النقاط</h4>
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>الرصيد الحالي:</span>
                  <span className="font-bold text-slate-900">{currentUser.points} نقطة</span>
                </div>
                <div className="flex justify-between text-rose-600">
                  <span>تكلفة الشهادة:</span>
                  <span className="font-bold">-{pointsCost} نقطة</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-teal-800">
                  <span>الرصيد المتبقي بعد الشراء:</span>
                  <span>{currentUser.points - pointsCost} نقطة</span>
                </div>
              </div>

              {!hasEnoughPoints && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>عذراً، رصيدك الحالي لا يكفي. يمكنك الدفع بواسطة البطاقة الذهبية أو جمع المزيد من النقاط عبر التطوع.</span>
                </div>
              )}
            </div>
          ) : (
            /* Edahabia Card Form */
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 rounded-2xl text-white shadow-md relative overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-black text-sm tracking-wider">EDAHABIA</span>
                  <span className="text-xs bg-black/20 px-2 py-0.5 rounded-sm">بريد الجزائر</span>
                </div>
                <div className="font-mono text-lg tracking-widest mb-4">
                  {cardNumber || '•••• •••• •••• ••••'}
                </div>
                <div className="flex justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-amber-200 block">صاحب البطاقة</span>
                    <span className="font-bold uppercase">{currentUser.firstName} {currentUser.lastName}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-200 block">تنتهي في</span>
                    <span className="font-mono">{expiry || 'MM/YY'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">رقم البطاقة الذهبية</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="6280 0000 0000 0000"
                    maxLength={19}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-left"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ الانتهاء</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      maxLength={5}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">رمز الأمان (CVV)</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="•••"
                      maxLength={3}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                🔒 عملية دفع تجريبية آمنة ومحاكاة لنظام بريد الجزائر (Edahabia)
              </p>
            </div>
          )}

          {/* Action button */}
          <button
            onClick={handlePay}
            disabled={isProcessing || (paymentMethod === 'points' && !hasEnoughPoints)}
            className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-sm shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span>جاري تأكيد العملية...</span>
            ) : paymentMethod === 'points' ? (
              <span>تأكيد واستخدام {pointsCost} نقطة</span>
            ) : (
              <span>دفع {dzdCost.toLocaleString('ar-DZ')} دج بالبطاقة الذهبية</span>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">جاري التحميل...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

