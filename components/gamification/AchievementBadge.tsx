import React from 'react';
import { Achievement } from '@/lib/types';
import { Lock } from 'lucide-react';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div
      className={`relative p-4 rounded-2xl border transition-all flex flex-col items-center text-center ${
        achievement.unlocked
          ? 'bg-gradient-to-b from-white to-amber-50/40 border-amber-200/70 shadow-xs'
          : 'bg-slate-50/80 border-slate-200 opacity-60 grayscale'
      }`}
    >
      {!achievement.unlocked && (
        <div className="absolute top-2 left-2 text-slate-400">
          <Lock className="w-3.5 h-3.5" />
        </div>
      )}

      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-2xl mb-2">
        {achievement.icon}
      </div>

      <h4 className="font-bold text-xs text-slate-900 mb-1">{achievement.title}</h4>
      <p className="text-[11px] text-slate-500 leading-relaxed mb-2">
        {achievement.description}
      </p>

      {achievement.unlocked && achievement.unlockedAt && (
        <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full mt-auto">
          تم الحصول عليه: {achievement.unlockedAt}
        </span>
      )}

      {!achievement.unlocked && achievement.maxProgress && (
        <div className="w-full mt-auto">
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
            <span>التقدم</span>
            <span>{achievement.progress} / {achievement.maxProgress}</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-400 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  Math.round(((achievement.progress || 0) / achievement.maxProgress) * 100)
                )}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
