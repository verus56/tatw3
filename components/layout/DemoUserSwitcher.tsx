'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { User, Building2, UserX, ChevronUp, ChevronDown } from 'lucide-react';

export function DemoUserSwitcher() {
  const { role, setRole } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
      <div className="bg-slate-900/90 text-white rounded-2xl shadow-2xl backdrop-blur-md border border-slate-700/60 overflow-hidden text-xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2.5 font-medium hover:bg-slate-800 transition-colors"
          title="تبديل وضع العرض التجريبي"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>وضع العرض: </span>
          <span className="font-bold text-teal-300">
            {role === 'volunteer' && 'متطوع (محمد)'}
            {role === 'organization' && 'منظمة (جمعية الأمل)'}
            {role === 'guest' && 'زائر (غير مسجل)'}
          </span>
          {isOpen ? <ChevronDown className="w-3.5 h-3.5 mr-1 text-slate-400" /> : <ChevronUp className="w-3.5 h-3.5 mr-1 text-slate-400" />}
        </button>

        {isOpen && (
          <div className="p-2 border-t border-slate-800 flex flex-col gap-1.5 bg-slate-950/80">
            <button
              onClick={() => {
                setRole('volunteer');
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-right transition-all ${
                role === 'volunteer'
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <User className="w-4 h-4 text-teal-300" />
              <div>
                <p className="font-bold">حساب متطوع</p>
                <p className="text-[10px] text-slate-300">محمد أحمد (350 نقطة)</p>
              </div>
            </button>

            <button
              onClick={() => {
                setRole('organization');
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-right transition-all ${
                role === 'organization'
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <Building2 className="w-4 h-4 text-amber-300" />
              <div>
                <p className="font-bold">حساب منظمة</p>
                <p className="text-[10px] text-slate-300">جمعية الأمل (بجاية)</p>
              </div>
            </button>

            <button
              onClick={() => {
                setRole('guest');
                setIsOpen(false);
              }}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-right transition-all ${
                role === 'guest'
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <UserX className="w-4 h-4 text-slate-400" />
              <div>
                <p className="font-bold">زائر (Guest)</p>
                <p className="text-[10px] text-slate-300">تصفح بدون تسجيل</p>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
