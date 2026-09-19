'use client';

import React from 'react';
import { Certificate } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { X, Download, Printer, CheckCircle, ShieldCheck, Award } from 'lucide-react';

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  const { showToast } = useApp();

  if (!isOpen || !certificate) return null;

  const handleDownload = () => {
    showToast('جاري التحميل...', 'يتم إعداد ملف PDF للشهادة للتحميل', 'info');
    setTimeout(() => {
      showToast('اكتمل التحميل ✓', `تم تحميل الشهادة ${certificate.certificateCode}.pdf`, 'success');
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-center flex flex-col">
        {/* Controls header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2 text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>شهادة أصلية موثقة</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors"
              title="طباعة"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-200 transition-colors"
              title="تحميل PDF"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas */}
        <div className="p-8 sm:p-12 bg-linear-to-b from-amber-50/30 via-white to-teal-50/20 border-8 border-double border-amber-600/30 m-4 rounded-2xl relative">
          {/* Watermark/Background Accent */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Award className="w-80 h-80 text-teal-800" />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-16 h-16 object-contain rounded-2xl shadow-md"
              />
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold text-teal-700 tracking-widest uppercase">
                منصة تطوّع الجزائرية — TAWTOU3
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                شهادة إتمام وتفوق
              </h2>
            </div>

            <p className="text-sm text-slate-500">يشهد القائمون على المنصة بأن المتطوع(ة):</p>

            <div className="py-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-900 underline decoration-amber-400 decoration-2 underline-offset-8">
                {certificate.recipientName}
              </h1>
            </div>

            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              قد أتم(ت) بنجاح جميع متطلبات واختبارات الدورة التدريبية المعتمدة:
            </p>

            <h3 className="text-lg sm:text-xl font-bold text-slate-900 bg-teal-50/60 py-2.5 px-4 rounded-xl border border-teal-100 max-w-md mx-auto">
              {certificate.courseTitle}
            </h3>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 text-xs text-slate-500 gap-4">
              <div className="text-right">
                <p className="font-semibold text-slate-700">تاريخ الإصدار:</p>
                <p>{certificate.issueDate}</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-amber-600 flex items-center justify-center text-amber-700 font-bold text-[10px] transform -rotate-12">
                  ختم معتمد
                </div>
                <span className="text-[10px] text-slate-400 mt-1">منصة تطوع الجزائر</span>
              </div>

              <div className="text-left">
                <p className="font-semibold text-slate-700">رقم الاعتماد:</p>
                <p className="font-mono text-teal-700 font-bold">{certificate.certificateCode}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            وسيلة السداد: {certificate.pricePaid}
          </span>
          <button
            onClick={handleDownload}
            className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>تحميل الشهادة (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
