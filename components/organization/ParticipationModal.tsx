'use client';

import React, { useState } from 'react';
import { Application } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { X, Star, CheckCircle2, Award } from 'lucide-react';

interface ParticipationModalProps {
  application: Application | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ParticipationModal({ application, isOpen, onClose }: ParticipationModalProps) {
  const { confirmParticipation } = useApp();
  const [completed, setCompleted] = useState<'yes' | 'no'>('yes');
  const [points, setPoints] = useState<number>(50);
  const [rating, setRating] = useState<number>(5);
  const [note, setNote] = useState('أداء رائع والتزام كامل بالمواعيد والمهام.');

  if (!isOpen || !application) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (completed === 'yes') {
      confirmParticipation(application.id, points, rating, note);
    } else {
      confirmParticipation(application.id, 0, rating, 'لم يكتمل النشاط بنجاح.');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 text-right space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-base text-slate-900">تأكيد مشاركة المتطوع</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-500">المتطوع:</p>
          <p className="text-sm font-black text-slate-900">{application.volunteerName}</p>
          <p className="text-xs text-slate-500 mt-1">الفرصة: {application.opportunityTitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              هل أتم المتطوع المهمة بنجاح؟
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCompleted('yes')}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                  completed === 'yes'
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                ✓ نعم، أتم المهمة
              </button>
              <button
                type="button"
                onClick={() => setCompleted('no')}
                className={`py-2 px-4 rounded-xl text-xs font-bold border transition-all ${
                  completed === 'no'
                    ? 'bg-rose-50 border-rose-500 text-rose-800'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                ✕ لم يتم المهمة
              </button>
            </div>
          </div>

          {completed === 'yes' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                النقاط الممنوحة (تضاف لرصيد المتطوع)
              </label>
              <input
                type="number"
                min={10}
                max={200}
                value={points}
                onChange={(e) => setPoints(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-teal-800 focus:ring-2 focus:ring-teal-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              تقييم أداء المتطوع
            </label>
            <div className="flex gap-2 items-center py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              ملاحظات أو توصية (اختياري)
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-md"
            >
              تأكيد وإرسال
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
