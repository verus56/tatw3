'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ParticipationModal } from '@/components/organization/ParticipationModal';
import { Application, ApplicationStatus } from '@/lib/types';
import { Users, CheckCircle2, Clock, XCircle, Star, ArrowRight, Award, Search } from 'lucide-react';

export default function OrganizationVolunteersPage() {
  const { applications, updateApplicationStatus } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'pending', label: 'قيد المراجعة' },
    { id: 'accepted', label: 'مقبول' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'rejected', label: 'مرفوض' },
  ];

  const filteredApps = applications.filter((app) => {
    const matchesStatus = activeFilter === 'all' || app.status === activeFilter;
    const matchesSearch =
      app.volunteerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.opportunityTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.volunteerWilaya.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'completed':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">مكتمل</span>;
      case 'accepted':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">مقبول</span>;
      case 'pending':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">قيد المراجعة</span>;
      case 'rejected':
        return <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800">مرفوض</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            إدارة المتطوعين وطلبات المشاركة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            مراجعة الطلبات، قبول أو رفض المتقدمين، وتأكيد ساعات الحضور ومنح النقاط.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === f.id
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="بحث بالاسم أو الفرصة..."
            className="w-full pr-9 pl-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      {filteredApps.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-6 font-bold">المتطوع</th>
                  <th className="py-3.5 px-4 font-bold">الفرصة</th>
                  <th className="py-3.5 px-4 font-bold">الولاية / الهاتف</th>
                  <th className="py-3.5 px-4 font-bold">التاريخ</th>
                  <th className="py-3.5 px-4 font-bold">الحالة</th>
                  <th className="py-3.5 px-4 font-bold">النقاط</th>
                  <th className="py-3.5 px-6 font-bold text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-bold text-slate-900">{app.volunteerName}</td>
                    <td className="py-4 px-4 text-slate-700 max-w-xs truncate">{app.opportunityTitle}</td>
                    <td className="py-4 px-4 text-slate-500">
                      <div>{app.volunteerWilaya}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{app.volunteerPhone}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-500">{app.appliedDate}</td>
                    <td className="py-4 px-4">{getStatusBadge(app.status)}</td>
                    <td className="py-4 px-4 font-bold text-amber-600">
                      {app.pointsAwarded ? `+${app.pointsAwarded}` : '—'}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {app.status === 'pending' && (
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'accepted')}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold"
                          >
                            قبول
                          </button>
                          <button
                            onClick={() => updateApplicationStatus(app.id, 'rejected')}
                            className="px-3 py-1 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-bold"
                          >
                            رفض
                          </button>
                        </div>
                      )}

                      {app.status === 'accepted' && (
                        <button
                          onClick={() => {
                            setSelectedApp(app);
                            setIsModalOpen(true);
                          }}
                          className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-lg font-bold flex items-center justify-center gap-1 mx-auto"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>تقييم ومنح نقاط</span>
                        </button>
                      )}

                      {app.status === 'completed' && (
                        <div className="flex items-center justify-center gap-1 text-amber-500">
                          {Array.from({ length: app.rating || 5 }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                      )}

                      {app.status === 'rejected' && (
                        <span className="text-slate-400 text-[11px]">مرفوض</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Users className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">لا يوجد متطوعون في هذه القائمة</h3>
          <p className="text-xs text-slate-500">جرب اختيار تبويب آخر أو مسح حقل البحث.</p>
        </div>
      )}

      {/* Confirm & Award Points Modal */}
      <ParticipationModal
        application={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
