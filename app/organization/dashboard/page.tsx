'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ParticipationModal } from '@/components/organization/ParticipationModal';
import { Application } from '@/lib/types';
import {
  Building2,
  CalendarCheck,
  Users,
  Clock,
  PlusCircle,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Eye,
  Star,
  ArrowLeft
} from 'lucide-react';

export default function OrganizationDashboardPage() {
  const { currentOrg, opportunities, applications, updateApplicationStatus } = useApp();
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orgOpps = opportunities.filter((o) => o.organizationId === currentOrg.id);
  const pendingApps = applications.filter((a) => a.status === 'pending');
  const acceptedApps = applications.filter((a) => a.status === 'accepted');

  const handleEvaluate = (app: Application) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-teal-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentOrg.logo}
            alt={currentOrg.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-teal-500/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/20 px-2.5 py-0.5 rounded-full">
                لوحة الإدارة
              </span>
              <span className="text-xs text-teal-200">مؤسسة معتمدة ✓</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              مرحبًا، {currentOrg.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              تابع نشاطات جمعيتك، أدر الفرص التطوعية، وتحقق من مساهمات المتطوعين.
            </p>
          </div>
        </div>

        <Link
          href="/organization/opportunities/new"
          className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ نشر فرصة جديدة</span>
        </Link>
      </div>

      {/* 4 Stats Cards (Section 62) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-3">
            <CalendarCheck className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900">{orgOpps.length || currentOrg.opportunitiesCount}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">الفرص المنشورة</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <Users className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900">{applications.length}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">طلبات التطوع</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900">{currentOrg.volunteersCount}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">المتطوعون النشطون</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black text-slate-900">{currentOrg.hoursCount}</p>
          <p className="text-xs font-semibold text-slate-500 mt-1">ساعات التطوع</p>
        </div>
      </div>

      {/* Pending Applications Queue */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              طلبات الانضمام الجديدة ({pendingApps.length})
            </h3>
            <p className="text-xs text-slate-500">
              متطوعون بانتظار الموافقة للمشاركة في أنشطتك
            </p>
          </div>
          <Link
            href="/organization/volunteers"
            className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
          >
            <span>عرض كل المتطوعين</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingApps.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 font-bold">المتطوع</th>
                  <th className="py-3 px-4 font-bold">الفرصة</th>
                  <th className="py-3 px-4 font-bold">الولاية</th>
                  <th className="py-3 px-4 font-bold">التاريخ</th>
                  <th className="py-3 px-4 font-bold text-center">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pendingApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{app.volunteerName}</td>
                    <td className="py-3 px-4 text-slate-700">{app.opportunityTitle}</td>
                    <td className="py-3 px-4 text-slate-600">{app.volunteerWilaya}</td>
                    <td className="py-3 px-4 text-slate-500">{app.appliedDate}</td>
                    <td className="py-3 px-4 text-center">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">
            لا توجد طلبات معلقة حالياً.
          </div>
        )}
      </div>

      {/* Ongoing / Accepted Volunteers awaiting Confirmation (Section 66 & 67) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              تأكيد المشاركة وتوزيع النقاط
            </h3>
            <p className="text-xs text-slate-500">
              قم بتأكيد حضور المتطوعين لمنحهم النقاط والشهادات
            </p>
          </div>
        </div>

        {acceptedApps.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {acceptedApps.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-3"
              >
                <div>
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
                    مقبول للمشاركة
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 mt-2">{app.volunteerName}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{app.opportunityTitle}</p>
                  <p className="text-[11px] text-slate-400 mt-1">الهاتف: {app.volunteerPhone}</p>
                </div>

                <button
                  onClick={() => handleEvaluate(app)}
                  className="w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>تأكيد المشاركة ومنح النقاط</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-slate-400">
            لا يوجد متطوعون قيد الانتظار للتأكيد.
          </div>
        )}
      </div>

      <ParticipationModal
        application={selectedApp}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
