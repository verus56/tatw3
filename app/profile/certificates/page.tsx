'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { CertificateModal } from '@/components/courses/CertificateModal';
import { Certificate } from '@/lib/types';
import { Award, ArrowRight, Download, Eye, Calendar, ShieldCheck } from 'lucide-react';

export default function CertificatesPage() {
  const { certificates } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCertificate = (cert: Certificate) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            شهاداتي المعتمدة
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            جميع الشهادات الصادرة بعد إتمام الدورات التكوينية في منصة تطوع.
          </p>
        </div>
        <Link
          href="/courses"
          className="px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 transition-colors self-start sm:self-auto"
        >
          استكشاف دورات جديدة
        </Link>
      </div>

      {certificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>معتمدة وموثقة</span>
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-slate-900">{cert.courseTitle}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>تاريخ الإصدار: {cert.issueDate}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between items-center text-slate-600 font-mono">
                  <span>الرمز:</span>
                  <span className="font-bold text-slate-900">{cert.certificateCode}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handleOpenCertificate(cert)}
                  className="flex-1 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>معاينة الشهادة</span>
                </button>
                <button
                  onClick={() => handleOpenCertificate(cert)}
                  className="p-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl transition-colors"
                  title="تحميل"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State (Section 72) */
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            لم تحصل على أي شهادة بعد
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            أكمل إحدى دوراتنا التكوينية المجانية ثم احصل على شهادتك بنقاطك أو بالبطاقة الذهبية.
          </p>
          <Link
            href="/courses"
            className="inline-block px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800"
          >
            استكشف التكوينات
          </Link>
        </div>
      )}

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCert}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
