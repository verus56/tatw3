'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Opportunity, OpportunityType } from '@/lib/types';
import { ALGERIA_WILAYAS, OPPORTUNITY_CATEGORIES, DURATION_OPTIONS, TYPE_OPTIONS } from '@/lib/constants';

interface OpportunityFormProps {
  initialData?: Opportunity;
  onSubmit: (data: any) => void;
  submitLabel: string;
}

export function OpportunityForm({ initialData, onSubmit, submitLabel }: OpportunityFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || OPPORTUNITY_CATEGORIES[0]);
  const [description, setDescription] = useState(initialData?.description || '');
  const [detailedDescription, setDetailedDescription] = useState(initialData?.detailedDescription || '');
  const [wilaya, setWilaya] = useState(initialData?.wilaya || 'الجزائر');
  const [commune, setCommune] = useState(initialData?.commune || 'الجزائر الوسطى');
  const [duration, setDuration] = useState(initialData?.duration || DURATION_OPTIONS[0]);
  const [type, setType] = useState<OpportunityType>(initialData?.type || 'حضوري');
  const [points, setPoints] = useState(initialData?.points || 50);
  const [volunteersNeeded, setVolunteersNeeded] = useState(initialData?.volunteersNeeded || 15);
  const [startDate, setStartDate] = useState(initialData?.startDate || '2026-10-10');
  const [endDate, setEndDate] = useState(initialData?.endDate || '2026-10-10');
  const [image, setImage] = useState(
    initialData?.image ||
      'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800'
  );
  const [requirements, setRequirements] = useState(
    initialData?.requirements?.join('\n') || 'العمر 18 سنة فما فوق\nالالتزام بالمواعيد\nروح المبادرة'
  );
  const [duties, setDuties] = useState(
    initialData?.duties?.join('\n') || 'استقبال المشاركين\nالمساعدة في التنظيم اللوجستي\nتوزيع المواد'
  );
  const [benefits, setBenefits] = useState(
    initialData?.benefits?.join('\n') || 'شهادة مشاركة رسمية\nرصيد نقاط تطوعية\nوجبة وتأمين'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      category,
      description,
      detailedDescription,
      wilaya,
      commune,
      duration,
      type,
      points: Number(points),
      volunteersNeeded: Number(volunteersNeeded),
      startDate,
      endDate,
      image,
      requirements: requirements.split('\n').filter(Boolean),
      duties: duties.split('\n').filter(Boolean),
      benefits: benefits.split('\n').filter(Boolean),
      status: 'open',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-right">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-black text-base text-slate-900 border-b pb-3">المعلومات الأساسية</h3>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">عنوان الفرصة التطوعية *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="مثال: حملة تنظيف وتشجير بمنتزه الحامة"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">المجال / الفئة *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            >
              {OPPORTUNITY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">نوع التطوع</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as OpportunityType)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            >
              {TYPE_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">المدة</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            >
              {DURATION_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">الولاية *</label>
            <select
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            >
              {ALGERIA_WILAYAS.map((w) => {
                const name = w.split(' - ')[1];
                return (
                  <option key={w} value={name}>
                    {w}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">البلدية *</label>
            <input
              type="text"
              required
              value={commune}
              onChange={(e) => setCommune(e.target.value)}
              placeholder="البلدية أو الحي"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">ملخص قصير للفرصة *</label>
          <input
            type="text"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="سطرين يوضحان جوهر المبادرة"
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">الوصف التفصيلي للفرصة</label>
          <textarea
            rows={4}
            value={detailedDescription}
            onChange={(e) => setDetailedDescription(e.target.value)}
            placeholder="شرح كامل لأهداف النشاط، الجهات المشاركة، الخ..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
        <h3 className="font-black text-base text-slate-900 border-b pb-3">التوقيت والمكافآت والمهام</h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ البداية</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">تاريخ النهاية</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">عدد المتطوعين المطلوب</label>
            <input
              type="number"
              min={1}
              value={volunteersNeeded}
              onChange={(e) => setVolunteersNeeded(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">نقاط التطوع الممنوحة</label>
            <input
              type="number"
              min={10}
              step={5}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-teal-800 focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">رابط صورة الغلاف</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              المهام (سطر لكل مهمة)
            </label>
            <textarea
              rows={3}
              value={duties}
              onChange={(e) => setDuties(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              الشروط والمتطلبات (سطر لكل شرط)
            </label>
            <textarea
              rows={3}
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              المزايا الممنوحة (سطر لكل ميزة)
            </label>
            <textarea
              rows={3}
              value={benefits}
              onChange={(e) => setBenefits(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="px-8 py-3 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-xs shadow-md transition-all"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
