'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { OpportunityForm } from '@/components/organization/OpportunityForm';
import { ArrowRight, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function NewOpportunityPage() {
  const router = useRouter();
  const { addOpportunity } = useApp();

  const handleCreate = (formData: any) => {
    addOpportunity(formData);
    router.push('/organization/opportunities');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <Link
        href="/organization/opportunities"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للفرص المنشورة</span>
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
          <PlusCircle className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">نشر فرصة تطوعية جديدة</h1>
          <p className="text-xs text-slate-500">
            أدخل تفاصيل النشاط التطوعي لاستقطاب المتطوعين من كامل أنحاء الولاية أو الوطن.
          </p>
        </div>
      </div>

      <OpportunityForm
        onSubmit={handleCreate}
        submitLabel="نشر الفرصة الآن"
      />
    </div>
  );
}
