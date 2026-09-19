'use client';

import React, { useState } from 'react';
import { initialLeaderboard } from '@/lib/mock-data';
import { useApp } from '@/context/AppContext';
import { Trophy, Medal, Award, Flame, Star, Sparkles } from 'lucide-react';

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'month' | 'year' | 'all'>('month');
  const { currentUser } = useApp();

  const tabs = [
    { id: 'month', label: 'هذا الشهر' },
    { id: 'year', label: 'هذا العام' },
    { id: 'all', label: 'كل الأوقات' },
  ];

  const topThree = initialLeaderboard.slice(0, 3);
  const others = initialLeaderboard.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold">
          <Trophy className="w-4 h-4 text-amber-500" />
          <span>سباق العطاء والأثر</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          لوحة الشرف للمتطوعين
        </h1>
        <p className="text-sm text-slate-500">
          تكريمًا للشباب الأكثر نشاطًا وعطاءً وتأثيرًا في مختلف ربوع الجزائر.
        </p>

        {/* Filter Tabs */}
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-teal-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-end">
        {/* 2nd Place */}
        <div className="order-2 md:order-1 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-md text-center space-y-3 relative">
          <div className="absolute -top-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center border-2 border-white shadow-sm">
            🥈 2
          </div>
          <img
            src={topThree[1].avatar}
            alt={topThree[1].name}
            className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-slate-200"
          />
          <div>
            <h3 className="font-bold text-base text-slate-900">{topThree[1].name}</h3>
            <p className="text-xs text-slate-500">{topThree[1].wilaya} • {topThree[1].level}</p>
          </div>
          <div className="bg-slate-50 py-2 rounded-xl border border-slate-100">
            <span className="text-lg font-black text-slate-900">
              {topThree[1].points.toLocaleString('ar-DZ')}
            </span>
            <span className="text-xs text-slate-500 mr-1">نقطة</span>
          </div>
        </div>

        {/* 1st Place - Champion */}
        <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/10 via-white to-white rounded-3xl p-8 border-2 border-amber-400 shadow-xl text-center space-y-4 relative -translate-y-2">
          <div className="absolute -top-5 right-1/2 translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center border-2 border-white shadow-md">
            🥇 1
          </div>
          <img
            src={topThree[0].avatar}
            alt={topThree[0].name}
            className="w-24 h-24 rounded-full mx-auto object-cover ring-4 ring-amber-400"
          />
          <div>
            <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              متصدر الترتيب
            </span>
            <h3 className="font-black text-lg text-slate-900 mt-1">{topThree[0].name}</h3>
            <p className="text-xs text-slate-500">{topThree[0].wilaya} • {topThree[0].level}</p>
          </div>
          <div className="bg-amber-50/80 py-2.5 rounded-xl border border-amber-200">
            <span className="text-2xl font-black text-amber-700">
              {topThree[0].points.toLocaleString('ar-DZ')}
            </span>
            <span className="text-xs text-amber-900 mr-1">نقطة</span>
          </div>
        </div>

        {/* 3rd Place */}
        <div className="order-3 bg-white rounded-3xl p-6 border-2 border-amber-700/20 shadow-md text-center space-y-3 relative">
          <div className="absolute -top-4 right-1/2 translate-x-1/2 w-8 h-8 rounded-full bg-amber-700/20 text-amber-900 font-black text-sm flex items-center justify-center border-2 border-white shadow-sm">
            🥉 3
          </div>
          <img
            src={topThree[2].avatar}
            alt={topThree[2].name}
            className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-amber-200"
          />
          <div>
            <h3 className="font-bold text-base text-slate-900">{topThree[2].name}</h3>
            <p className="text-xs text-slate-500">{topThree[2].wilaya} • {topThree[2].level}</p>
          </div>
          <div className="bg-slate-50 py-2 rounded-xl border border-slate-100">
            <span className="text-lg font-black text-slate-900">
              {topThree[2].points.toLocaleString('ar-DZ')}
            </span>
            <span className="text-xs text-slate-500 mr-1">نقطة</span>
          </div>
        </div>
      </div>

      {/* Rest of the leaderboard */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="font-bold text-sm text-slate-700 mb-2">باقي قائمة الشرف</h3>
        <div className="divide-y divide-slate-100">
          {others.map((user) => {
            const isMe = user.id === currentUser.id;
            return (
              <div
                key={user.id}
                className={`py-3.5 px-4 rounded-xl flex items-center justify-between transition-colors ${
                  isMe ? 'bg-teal-50/70 border border-teal-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="w-6 text-center font-bold text-sm text-slate-400">
                    #{user.rank}
                  </span>
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">
                      {user.name}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {user.wilaya} • {user.level} • {user.volunteerCount} تطوع
                    </p>
                  </div>
                </div>

                <div className="text-left">
                  <span className="font-black text-sm text-teal-800">
                    {user.points.toLocaleString('ar-DZ')}
                  </span>
                  <span className="text-[11px] text-slate-500 mr-1">نقطة</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
