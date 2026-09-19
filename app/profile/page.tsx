'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { LevelProgress } from '@/components/gamification/LevelProgress';
import { AchievementBadge } from '@/components/gamification/AchievementBadge';
import {
  User,
  MapPin,
  Calendar,
  Award,
  Trophy,
  Clock,
  Briefcase,
  Edit3,
  Bookmark,
  FileText,
  Activity,
  CheckCircle,
  BookOpen,
  Phone,
  Mail,
  GraduationCap
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, setCurrentUser, achievements, applications, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [bioText, setBioText] = useState(currentUser.bio || '');

  const handleSaveBio = () => {
    setCurrentUser((prev) => ({ ...prev, bio: bioText }));
    setIsEditing(false);
    showToast('تم الحفظ ✓', 'تم تحديث نبذة الملف الشخصي بنجاح', 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.firstName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-teal-50 shadow-md"
              />
              <span className="absolute -bottom-1 -left-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-teal-600 text-white shadow-xs">
                {currentUser.level}
              </span>
            </div>
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentUser.firstName} {currentUser.lastName}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-600" />
                  {currentUser.wilaya}، {currentUser.commune}
                </span>
                <span className="flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                  {currentUser.specialty} ({currentUser.educationLevel})
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/profile/points"
              className="px-4 py-2 bg-amber-50 text-amber-800 border border-amber-200 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-amber-100 transition-colors"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>{currentUser.points} نقطة</span>
            </Link>
          </div>
        </div>

        {/* Bio & Skills */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">نبذة عني</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs text-teal-700 hover:underline flex items-center gap-1 font-medium"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'إلغاء' : 'تعديل النبذة'}</span>
              </button>
            </div>
            {isEditing ? (
              <div className="space-y-2">
                <textarea
                  value={bioText}
                  onChange={(e) => setBioText(e.target.value)}
                  rows={3}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={handleSaveBio}
                  className="px-4 py-1.5 bg-teal-700 text-white rounded-lg text-xs font-bold"
                >
                  حفظ
                </button>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentUser.bio}
              </p>
            )}
          </div>

          <div className="md:col-span-4 space-y-2">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">المهارات المكتسبة</h3>
            <div className="flex flex-wrap gap-1.5">
              {currentUser.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Level and Progress Bar (Section 42 & 78) */}
      <LevelProgress points={currentUser.points} />

      {/* 4 Key Statistics Cards (Section 41) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link
          href="/profile/applications"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-teal-400 transition-colors text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-2">
            <Briefcase className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentUser.completedOpportunities}</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">تطوع منجز</p>
        </Link>

        <Link
          href="/profile/points"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 transition-colors text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentUser.points}</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">نقطة رصيد</p>
        </Link>

        <Link
          href="/profile/certificates"
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 transition-colors text-center"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
            <Award className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentUser.certificatesCount}</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">شهادات معتمدة</p>
        </Link>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs text-center">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
            <Clock className="w-5 h-5" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentUser.volunteerHours}</p>
          <p className="text-xs text-slate-500 font-semibold mt-1">ساعة تطوع</p>
        </div>
      </div>

      {/* Achievements Section (Section 44 & 79) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>الأوسمة والشارات التقديرية</span>
          </h2>
          <span className="text-xs text-slate-500">
            {achievements.filter((a) => a.unlocked).length} من {achievements.length} شارة مفتوحة
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((item) => (
            <AchievementBadge key={item.id} achievement={item} />
          ))}
        </div>
      </div>

      {/* Activity Timeline (Section 46) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6">
        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
          <Activity className="w-5 h-5 text-teal-700" />
          <span>سجل نشاطاتي</span>
        </h2>

        <div className="space-y-6 relative border-r-2 border-slate-200 pr-6 mr-2">
          {/* Timeline items */}
          <div className="relative">
            <div className="absolute -right-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100" />
            <span className="text-[11px] text-slate-400 font-mono">20 سبتمبر 2026</span>
            <h4 className="text-sm font-bold text-slate-800 mt-0.5">
              🏆 حصلت على 50 نقطة في تنظيف الشواطئ
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              تمت المصادقة على حضورك من قِبل جمعية الأمل.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-[31px] top-0.5 w-4 h-4 rounded-full bg-teal-600 ring-4 ring-teal-100" />
            <span className="text-[11px] text-slate-400 font-mono">15 سبتمبر 2026</span>
            <h4 className="text-sm font-bold text-slate-800 mt-0.5">
              📜 حصلت على شهادة: أساسيات العمل التطوعي
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              أتممت بنجاح جميع دروس الدورة واختبارها النهائي.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-[31px] top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-emerald-100" />
            <span className="text-[11px] text-slate-400 font-mono">10 سبتمبر 2026</span>
            <h4 className="text-sm font-bold text-slate-800 mt-0.5">
              🤝 شاركت في حملة تشجير غابات الشريعة
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              مساهمة ميدانية مع الهلال الأحمر الجزائري.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-[31px] top-0.5 w-4 h-4 rounded-full bg-purple-600 ring-4 ring-purple-100" />
            <span className="text-[11px] text-slate-400 font-mono">01 سبتمبر 2026</span>
            <h4 className="text-sm font-bold text-slate-800 mt-0.5">
              ⭐ وصلت إلى مستوى "متطوع نشط"
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              تجاوز رصيدك 250 نقطة في التقييم الوطني.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
