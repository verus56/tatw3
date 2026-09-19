'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { FileText, ArrowRight, Clock, CheckCircle2, XCircle, Trophy, Star } from 'lucide-react';
import { ApplicationStatus } from '@/lib/types';

export default function ApplicationsPage() {
  const { applications } = useApp();
  const [filterTab, setFilterTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'الكل' },
    { id: 'pending', label: 'قيد المراجعة' },
    { id: 'accepted', label: 'مقبول' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'rejected', label: 'مرفوض' },
  ];

  const filteredApps = applications.filter((app) => {
    if (filterTab === 'all') return true;
    return app.status === filterTab;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>✓ مكتمل</span>
          </span>
        );
      case 'accepted':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>مقبول للمشاركة</span>
          </span>
        );
      case 'pending':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>قيد المراجعة</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>مرفوض</span>
          </span>
        );
    }
  };

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

      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          طلبات التطوع
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          متابعة وتفاصيل كل الفرص التي تقدمت للمشاركة فيها.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterTab === tab.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-4">
          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={app.opportunityImage}
                  alt={app.opportunityTitle}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-slate-900">
                    <Link
                      href={`/opportunities/${app.opportunityId}`}
                      className="hover:text-teal-700 transition-colors"
                    >
                      {app.opportunityTitle}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {app.organizationName}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    تاريخ التقديم: {app.appliedDate}
                  </p>

                  {app.note && (
                    <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg mt-2 italic">
                      &quot;{app.note}&quot;
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-row sm:flex-col items-end justify-between w-full sm:w-auto gap-3">
                {getStatusBadge(app.status)}

                {app.status === 'completed' && app.pointsAwarded && (
                  <div className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>+{app.pointsAwarded} نقطة</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            لا توجد طلبات بعد
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            لم تقم بتقديم أي طلب تطوع في هذه الفئة. استكشف الفرص التطوعية المتاحة الآن!
          </p>
          <Link
            href="/opportunities"
            className="inline-block px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
          >
            اكتشف فرص التطوع
          </Link>
        </div>
      )}
    </div>
  );
}
