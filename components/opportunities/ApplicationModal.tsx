'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Opportunity } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { ALGERIA_WILAYAS } from '@/lib/constants';
import { X, CheckCircle2, AlertCircle, LogIn, Send } from 'lucide-react';

interface ApplicationModalProps {
  opportunity: Opportunity;
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationModal({ opportunity, isOpen, onClose }: ApplicationModalProps) {
  const { role, currentUser, applyToOpportunity } = useApp();

  const [phone, setPhone] = useState(currentUser.phone || '');
  const [wilaya, setWilaya] = useState(currentUser.wilaya || 'الجزائر');
  const [commune, setCommune] = useState(currentUser.commune || 'الجزائر الوسطى');
  const [educationLevel, setEducationLevel] = useState(currentUser.educationLevel || 'جامعي');
  const [specialty, setSpecialty] = useState(currentUser.specialty || '');
  const [skills, setSkills] = useState(currentUser.skills.join(', ') || '');
  const [bio, setBio] = useState(currentUser.bio || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);
      const ok = applyToOpportunity(opportunity.id, {
        phone,
        wilaya,
        skills: skillsArray,
      });

      setIsSubmitting(false);
      if (ok) {
        setIsSuccess(true);
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/70">
          <div>
            <h3 className="text-lg font-black text-slate-900">
              {role === 'guest' ? 'تسجيل الدخول مطلوب' : 'التقدم لفرصة التطوع'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs sm:max-w-sm">
              {opportunity.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Guest prompt */}
        {role === 'guest' ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <LogIn className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                عليك تسجيل الدخول لمتابعة طلبك
              </h4>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs mx-auto">
                للمشاركة في فرص التطوع، بناء سجلك وتجميع نقاط التطوع المعتمدة، يرجى تسجيل الدخول أو إنشاء حساب جديد.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                تسجيل الدخول
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
              >
                إنشاء حساب مجاني
              </Link>
            </div>
          </div>
        ) : isSuccess ? (
          /* Success Screen */
          <div className="p-8 text-center space-y-6 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <h4 className="text-lg font-black text-slate-900">
                تم إرسال طلبك بنجاح 🎉
              </h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm mx-auto">
                تم إرسال ملفك إلى <span className="font-bold text-slate-800">{opportunity.organizationName}</span>. ستصلك إشعارات فور تحديث حالة قبول طلبك.
              </p>
            </div>
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3 justify-center">
              <Link
                href="/profile/applications"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold hover:bg-teal-800 transition-colors"
              >
                متابعة طلباتي
              </Link>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                إغلاق
              </button>
            </div>
          </div>
        ) : (
          /* Profile Confirmation / Application Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            <div className="bg-teal-50/70 border border-teal-100 p-3 rounded-2xl flex items-start gap-2.5 text-xs text-teal-900">
              <AlertCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
              <p>
                تأكد من صحة معلوماتك. ستطلع المنظمة المنظمة للفرصة على هذا الملف للتواصل معك.
              </p>
            </div>

            {/* Readonly Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الاسم الكامل
                </label>
                <input
                  type="text"
                  disabled
                  value={`${currentUser.firstName} ${currentUser.lastName}`}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  disabled
                  value={currentUser.email}
                  className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 cursor-not-allowed text-left"
                />
              </div>
            </div>

            {/* Phone & Wilaya */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رقم الهاتف *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0550 12 34 56"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-left"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الولاية *
                </label>
                <select
                  value={wilaya}
                  onChange={(e) => setWilaya(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  {ALGERIA_WILAYAS.map((w) => (
                    <option key={w} value={w.split(' - ')[1]}>
                      {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Commune & Education */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  البلدية
                </label>
                <input
                  type="text"
                  value={commune}
                  onChange={(e) => setCommune(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المستوى الدراسي
                </label>
                <input
                  type="text"
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  placeholder="مثال: ليسانس، ماستر، ثانوي"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </div>

            {/* Specialty */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                التخصص الدراسي أو المهني
              </label>
              <input
                type="text"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="مثال: إعلام آلي، طب، لغات، إدارة أعمال..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                المهارات (مفصولة بفواصل)
              </label>
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="تنظيم، تواصل، تصميم، إسعاف، لغات..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Bio / Motivation */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                دوافع المشاركة ونبذة عنك
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="لماذا ترغب في المشاركة في هذه الفرصة التطوعية بالذات؟"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 flex items-center gap-2 shadow-md hover:shadow-teal-700/25 transition-all disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'جاري الإرسال...' : 'تأكيد وإرسال الطلب'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
