'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { OpportunityForm } from '@/components/organization/OpportunityForm';
import { ArrowRight, Edit3 } from 'lucide-react';

export default function EditOpportunityPage() {
  const params = useParams();
  const router = useRouter();
  const { opportunities, updateOpportunity } = useApp();
  const oppId = params.id as string;
  const opp = opportunities.find((o) => o.id === oppId);

  if (!opp) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">الفرصة غير موجودة</h2>
        <Link href="/organization/opportunities" className="btn-primary text-xs">
          العودة للفرص
        </Link>
      </div>
    );
  }

  const handleUpdate = (formData: any) => {
    updateOpportunity(oppId, formData);
    router.push('/organization/opportunities');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link
        href="/organization/opportunities"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للفرص</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
          <Edit3 className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">تعديل الفرصة التطوعية</h1>
          <p className="text-xs text-slate-500">تحديث شروط وتفاصيل: {opp.title}</p>
        </div>
      </div>

      <OpportunityForm
        initialData={opp}
        onSubmit={handleUpdate}
        submitLabel="حفظ التغييرات"
      />
    </div>
  );
}
