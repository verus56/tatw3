'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ApplicationModal } from '@/components/opportunities/ApplicationModal';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Trophy,
  Heart,
  Share2,
  CheckCircle,
  Building2,
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { opportunities, savedOpportunityIds, toggleSaveOpportunity, applications, showToast } = useApp();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const oppId = params.id as string;
  const opportunity = opportunities.find((o) => o.id === oppId);

  if (!opportunity) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-slate-800">الفرصة المطلوبة غير موجودة</h2>
        <p className="text-sm text-slate-500">قد تكون هذه الفرصة قد انتهت أو تم حذفها.</p>
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى قائمة الفرص</span>
        </Link>
      </div>
    );
  }

  const isSaved = savedOpportunityIds.includes(opportunity.id);
  const userApp = applications.find((a) => a.opportunityId === opportunity.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: opportunity.title,
        text: opportunity.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ الرابط ✓', 'تم نسخ رابط الفرصة إلى الحافظة', 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumb / Back */}
      <div className="flex items-center justify-between">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرجوع إلى جميع الفرص</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة</span>
          </button>
          <button
            onClick={() => toggleSaveOpportunity(opportunity.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
              isSaved
                ? 'border-rose-200 bg-rose-50 text-rose-600'
                : 'border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'محفوظة' : 'حفظ'}</span>
          </button>
        </div>
      </div>

      {/* Main Cover Image */}
      <div className="relative aspect-21/9 w-full rounded-3xl overflow-hidden shadow-md">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
        <div className="absolute bottom-6 right-6 left-6 text-white space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-600 text-white shadow-xs">
              {opportunity.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-md flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>فرصة موثوقة ومعتمدة</span>
            </span>
            {opportunity.urgent && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500 text-white">
                عاجل
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">{opportunity.title}</h1>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left/Main Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Organization Bar */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <img
                src={opportunity.organizationLogo}
                alt={opportunity.organizationName}
                className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-100"
              />
              <div>
                <p className="text-xs text-slate-500">الجهة المنظمة</p>
                <Link
                  href={`/organizations/${opportunity.organizationId}`}
                  className="text-sm font-bold text-slate-900 hover:text-teal-700 transition-colors"
                >
                  {opportunity.organizationName}
                </Link>
              </div>
            </div>
            <Link
              href={`/organizations/${opportunity.organizationId}`}
              className="text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-3.5 py-2 rounded-xl transition-colors"
            >
              عرض الجمعية
            </Link>
          </div>

          {/* Section: About */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-700" />
              <span>عن الفرصة التطوعية</span>
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
              {opportunity.detailedDescription}
            </p>
          </div>

          {/* Section: Tasks / Duties */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">ماذا ستقوم به؟</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              {opportunity.duties.map((duty, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{duty}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Requirements */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">المتطلبات والشروط</h3>
            <ul className="space-y-2.5 text-sm text-slate-700">
              {opportunity.requirements.map((req, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Benefits */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 p-6 sm:p-8 rounded-2xl border border-teal-100 space-y-4">
            <h3 className="text-lg font-black text-teal-950 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>ماذا ستحصل عليه؟ (المزايا والمكافآت)</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {opportunity.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 p-3.5 rounded-xl border border-teal-100 flex items-center gap-3 font-semibold text-xs text-slate-800"
                >
                  <span className="text-lg">✨</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Sidebar: Quick Summary & CTA */}
        <aside className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md space-y-6">
            <div className="text-center pb-4 border-b border-slate-100">
              <p className="text-xs text-slate-500">مكافأة المشاركة</p>
              <div className="flex items-center justify-center gap-2 text-amber-500 font-black text-3xl mt-1">
                <Trophy className="w-8 h-8" />
                <span>+{opportunity.points}</span>
                <span className="text-sm font-bold text-slate-600">نقطة</span>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">الولاية:</span>
                <span className="font-bold text-slate-800">{opportunity.wilaya} ({opportunity.commune})</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">نوع التطوع:</span>
                <span className="font-bold text-slate-800">{opportunity.type}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">المدة:</span>
                <span className="font-bold text-slate-800">{opportunity.duration}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-400">التاريخ:</span>
                <span className="font-bold text-slate-800">{opportunity.startDate}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-slate-400">المقاعد المتبقية:</span>
                <span className="font-bold text-teal-700">
                  {opportunity.volunteersNeeded - opportunity.volunteersRegistered} من {opportunity.volunteersNeeded}
                </span>
              </div>
            </div>

            {/* Application button */}
            {userApp ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
                <p className="text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>تم إرسال طلبك سابقاً</span>
                </p>
                <p className="text-[11px] text-emerald-600">الحالة الحالية: {userApp.status}</p>
                <Link
                  href="/profile/applications"
                  className="text-xs text-teal-800 underline block pt-1 font-semibold"
                >
                  عرض في صفحة طلباتي
                </Link>
              </div>
            ) : (
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-sm shadow-md hover:shadow-teal-700/30 transition-all flex items-center justify-center gap-2"
              >
                <span>التقدم لهذه الفرصة</span>
              </button>
            )}

            <button
              onClick={() => toggleSaveOpportunity(opportunity.id)}
              className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'text-rose-500 fill-rose-500' : ''}`} />
              <span>{isSaved ? 'إلغاء الحفظ' : 'حفظ الفرصة للرجوع لاحقاً'}</span>
            </button>
          </div>
        </aside>
      </div>

      {/* Modal */}
      <ApplicationModal
        opportunity={opportunity}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </div>
  );
}
