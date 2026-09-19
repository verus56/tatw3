'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { ALGERIA_WILAYAS } from '@/lib/constants';
import { Building2, MapPin, Phone, Mail, FileText, CheckCircle2, ShieldCheck, Edit3, Globe } from 'lucide-react';

export default function OrganizationProfilePage() {
  const { currentOrg, setCurrentOrg, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: currentOrg.name,
    type: currentOrg.type,
    email: currentOrg.email,
    phone: currentOrg.phone,
    address: currentOrg.address,
    wilaya: currentOrg.wilaya,
    commune: currentOrg.commune,
    description: currentOrg.description,
    website: currentOrg.website || '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentOrg((prev) => ({
      ...prev,
      ...form,
    }));
    setIsEditing(false);
    showToast('تم الحفظ ✓', 'تم تحديث بيانات الجمعية بنجاح', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner with Cover and Logo */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="h-48 sm:h-64 w-full relative bg-slate-800">
          <img
            src={currentOrg.coverImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200'}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>

        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={currentOrg.logo}
                alt={currentOrg.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {currentOrg.name}
                  </h1>
                  {currentOrg.verified && (
                    <span className="p-1 bg-teal-100 text-teal-800 rounded-full" title="مؤسسة موثقة">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{currentOrg.type} • رقم الاعتماد: {currentOrg.registrationNumber}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/organizations/${currentOrg.id}`}
                className="px-4 py-2.5 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-xs font-bold transition-colors"
              >
                معاينة الملف العام
              </Link>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-4 h-4" />
                <span>{isEditing ? 'إلغاء التعديل' : 'تعديل البيانات'}</span>
              </button>
            </div>
          </div>

          {/* Org Key Stats */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div>
              <p className="text-xl font-black text-slate-900">{currentOrg.volunteersCount}</p>
              <p className="text-[11px] text-slate-500 font-medium">متطوع مسجل</p>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900">{currentOrg.opportunitiesCount}</p>
              <p className="text-[11px] text-slate-500 font-medium">فرصة أطلقت</p>
            </div>
            <div>
              <p className="text-xl font-black text-slate-900">{currentOrg.hoursCount}</p>
              <p className="text-[11px] text-slate-500 font-medium">ساعة تطوعية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Form / View */}
      {isEditing ? (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-right">
          <h3 className="font-bold text-base text-slate-900 border-b pb-3">تعديل بيانات الجمعية</h3>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">اسم الجمعية أو المنظمة</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">الولاية</label>
              <select
                value={form.wilaya}
                onChange={(e) => setForm({ ...form, wilaya: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
              >
                {ALGERIA_WILAYAS.map((w) => (
                  <option key={w} value={w.split(' - ')[1]}>
                    {w}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">البلدية والعنوان</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الموقع الإلكتروني أو صفحة التواصل</label>
            <input
              type="text"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">عن الجمعية وأهدافها</label>
            <textarea
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
            >
              حفظ التغييرات
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
            <h3 className="font-bold text-base text-slate-900">عن الجمعية</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentOrg.description}
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 text-xs text-slate-600">
            <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
              معلومات الاتصال والموقع
            </h3>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{currentOrg.address}, ولاية {currentOrg.wilaya}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{currentOrg.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-600 shrink-0" />
              <span dir="ltr">{currentOrg.phone}</span>
            </div>
            {currentOrg.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-600 shrink-0" />
                <a href={currentOrg.website} target="_blank" rel="noreferrer" className="text-teal-700 underline">
                  {currentOrg.website}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
