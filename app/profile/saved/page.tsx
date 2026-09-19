'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Bookmark, ArrowRight } from 'lucide-react';

export default function SavedOpportunitiesPage() {
  const { opportunities, savedOpportunityIds } = useApp();

  const savedList = opportunities.filter((opp) =>
    savedOpportunityIds.includes(opp.id)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
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
          الفرص المحفوظة
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          قائمتك المفضلة من المبادرات والفرص التطوعية للعودة إليها لاحقاً.
        </p>
      </div>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            لم تحفظ أي فرصة بعد
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            تصفح الفرص التطوعية واضغط على أيقونة القلب لحفظ الفرص التي تهمك هنا.
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
