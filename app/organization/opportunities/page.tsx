'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { PlusCircle, Edit3, Trash2, Eye, Calendar, Users, Trophy } from 'lucide-react';
import { OpportunityStatus } from '@/lib/types';

export default function OrganizationOpportunitiesPage() {
  const { currentOrg, opportunities, deleteOpportunity } = useApp();
  const [activeTab, setActiveTab] = useState<string>('all');

  const tabs = [
    { id: 'all', label: 'الكل' },
    { id: 'open', label: 'منشورة' },
    { id: 'draft', label: 'مسودة' },
    { id: 'closed', label: 'منتهية' },
  ];

  const orgOpps = opportunities
    .filter((o) => o.organizationId === currentOrg.id)
    .filter((o) => (activeTab === 'all' ? true : o.status === activeTab));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            إدارة الفرص التطوعية
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            أنشئ، عدّل، وتابع جميع الفرص التي أطلقتها جمعيتك.
          </p>
        </div>

        <Link
          href="/organization/opportunities/new"
          className="px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>نشر فرصة جديدة</span>
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table (Desktop) & Cards (Mobile) */}
      {orgOpps.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6 font-bold">الفرصة</th>
                  <th className="py-3.5 px-4 font-bold">الحالة</th>
                  <th className="py-3.5 px-4 font-bold">التاريخ</th>
                  <th className="py-3.5 px-4 font-bold">المسجلون</th>
                  <th className="py-3.5 px-4 font-bold">النقاط</th>
                  <th className="py-3.5 px-6 font-bold text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orgOpps.map((opp) => (
                  <tr key={opp.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={opp.image}
                          alt={opp.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{opp.title}</p>
                          <p className="text-[11px] text-slate-400">
                            {opp.category} • {opp.wilaya}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          opp.status === 'open'
                            ? 'bg-emerald-100 text-emerald-800'
                            : opp.status === 'draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {opp.status === 'open' ? 'منشورة' : opp.status === 'draft' ? 'مسودة' : 'منتهية'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{opp.startDate}</td>
                    <td className="py-4 px-4 text-slate-800 font-semibold">
                      {opp.volunteersRegistered} / {opp.volunteersNeeded}
                    </td>
                    <td className="py-4 px-4 font-bold text-amber-600">+{opp.points}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/opportunities/${opp.id}`}
                          className="p-2 text-slate-600 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors"
                          title="معاينة"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/organization/opportunities/${opp.id}/edit`}
                          className="p-2 text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                          title="تعديل"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            if (confirm('هل أنت متأكد من حذف هذه الفرصة؟')) {
                              deleteOpportunity(opp.id);
                            }
                          }}
                          className="p-2 text-slate-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <p className="text-slate-500 text-sm">لا توجد فرص في هذه الفئة حالياً.</p>
          <Link
            href="/organization/opportunities/new"
            className="inline-block px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
          >
            نشر أول فرصة الآن
          </Link>
        </div>
      )}
    </div>
  );
}
