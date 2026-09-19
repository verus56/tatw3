'use client';

import React from 'react';
import { getNextLevelInfo } from '@/lib/constants';
import { Trophy, Star, ShieldCheck } from 'lucide-react';

interface LevelProgressProps {
  points: number;
}

export function LevelProgress({ points }: LevelProgressProps) {
  const levelInfo = getNextLevelInfo(points);

  return (
    <div className="bg-gradient-to-br from-teal-800 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-teal-600/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl shadow-inner">
              ⭐
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-teal-300">مستوى المتطوع</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                  معتمد
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-0.5">
                {levelInfo.currentLevel}
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-left bg-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md border border-white/10">
            <p className="text-[11px] text-teal-200">الرصيد الإجمالي</p>
            <p className="text-2xl font-black text-amber-400 flex items-center gap-1.5 justify-end">
              <span>{points.toLocaleString('ar-DZ')}</span>
              <span className="text-sm font-normal text-white">نقطة</span>
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-teal-100">
            <span>التقدم نحو: <strong className="text-white">{levelInfo.nextLevel}</strong></span>
            <span>{levelInfo.currentPoints} / {levelInfo.targetPoints} نقطة</span>
          </div>

          <div className="w-full h-3 bg-teal-950/60 rounded-full p-0.5 border border-teal-700/50">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-1000"
              style={{ width: `${levelInfo.progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-teal-300/80">
            <span>
              {levelInfo.remainingPoints > 0
                ? `متبقي ${levelInfo.remainingPoints} نقطة للترقية القادمة`
                : 'أنت في أعلى رتبة تطوعية!'}
            </span>
            <span className="font-bold text-amber-300">{levelInfo.progress}%</span>
          </div>
        </div>

        {/* Level Path Pill Bar */}
        <div className="pt-2 border-t border-teal-700/50 flex items-center justify-between overflow-x-auto gap-2 text-xs">
          {['مبتدئ', 'متطوع', 'متطوع نشط', 'متطوع متميز', 'سفير تطوع'].map((lvl) => {
            const isCurrent = lvl === levelInfo.currentLevel;
            return (
              <span
                key={lvl}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-[11px] font-bold transition-all ${
                  isCurrent
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-white/5 text-teal-200/60'
                }`}
              >
                {lvl}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
