'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Heart,
  Users,
  Clock,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DonationDetailPage() {
  const params = useParams();
  const { donations, makeDonation } = useApp();
  const donationId = params.id as string;
  const donation = donations.find((d) => d.id === donationId);

  const presetAmounts = [500, 1000, 2000, 5000];
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [donatedSuccess, setDonatedSuccess] = useState(false);

  if (!donation) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">المشروع غير موجود</h2>
        <Link href="/donations" className="btn-primary text-xs">
          العودة للتبرعات
        </Link>
      </div>
    );
  }

  const finalAmount = customAmount ? parseInt(customAmount, 10) || 0 : selectedAmount;
  const percentage = Math.min(
    100,
    Math.round((donation.raisedAmount / donation.targetAmount) * 100)
  );

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (finalAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      makeDonation(donation.id, finalAmount);
      setIsProcessing(false);
      setDonatedSuccess(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back link */}
      <Link
        href="/donations"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>الرجوع إلى قائمة التبرعات</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative aspect-16/9 rounded-3xl overflow-hidden shadow-md">
            <img
              src={donation.image}
              alt={donation.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/90 text-slate-900 shadow-md">
                {donation.category}
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-teal-700 font-semibold mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>مبادرة تابعة لـ: {donation.organizationName}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {donation.title}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="font-bold text-base text-slate-900">عن المشروع والهدف</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {donation.detailedDescription || donation.description}
            </p>
          </div>

          {/* Project Updates */}
          {donation.updates && donation.updates.length > 0 && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="font-bold text-base text-slate-900">مستجدات وتقدم المشروع</h3>
              <div className="space-y-4">
                {donation.updates.map((update, idx) => (
                  <div key={idx} className="border-r-2 border-teal-600 pr-4 space-y-1">
                    <span className="text-xs text-teal-700 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {update.date}
                    </span>
                    <h4 className="text-sm font-bold text-slate-800">{update.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{update.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Donate Card */}
        <aside className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-lg space-y-6">
            {/* Progress status */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-teal-800">
                  {donation.raisedAmount.toLocaleString('ar-DZ')} دج
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  من {donation.targetAmount.toLocaleString('ar-DZ')} دج
                </span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-600 to-amber-500 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-slate-500 pt-1">
                <span>{percentage}% محقق</span>
                <span>{donation.donorsCount} مساهمة</span>
              </div>
            </div>

            {donatedSuccess ? (
              <div className="p-5 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-900">شكراً جزيلاً لدعمك!</h4>
                <p className="text-xs text-emerald-700">
                  تم استلام مساهمتك بنجاح وسيتم توجيهها مباشرة للمشروع.
                </p>
                <button
                  onClick={() => setDonatedSuccess(false)}
                  className="text-xs text-emerald-800 font-bold underline"
                >
                  تبرع مرة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleDonate} className="space-y-4">
                <label className="block text-xs font-bold text-slate-700">
                  اختر قيمة التبرع (دينار جزائري)
                </label>

                <div className="grid grid-cols-2 gap-2">
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedAmount === amt && !customAmount
                          ? 'bg-amber-500 border-amber-500 text-slate-950 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {amt.toLocaleString('ar-DZ')} دج
                    </button>
                  ))}
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">
                    أو أدخل مبلغاً مخصصاً:
                  </label>
                  <input
                    type="number"
                    min={100}
                    placeholder="مبلغ مخصص بالدينار"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 text-[11px] text-slate-600">
                  <CreditCard className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>دفع مباشر وآمن عبر البطاقة الذهبية أو CIB</span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing || finalAmount <= 0}
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Heart className="w-4 h-4 fill-current" />
                  <span>
                    {isProcessing
                      ? 'جاري تأكيد التبرع...'
                      : `تبرع بمبلغ ${finalAmount.toLocaleString('ar-DZ')} دج`}
                  </span>
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
