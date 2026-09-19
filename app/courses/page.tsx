'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { CourseCard } from '@/components/courses/CourseCard';
import { COURSE_CATEGORIES } from '@/lib/constants';
import { GraduationCap, Search, Sparkles } from 'lucide-react';

export default function CoursesPage() {
  const { courses } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === 'الكل' || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-900 rounded-3xl p-8 sm:p-12 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-teal-200 border border-white/15 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>تكوين مجاني 100%</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">أكاديمية التكوين</h1>
          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            تعلم مهارات جديدة تساعدك على أن تكون متطوعًا أكثر تأثيرًا. ادرس الدروس في أي وقت، واختبر معارفك، واحصل على شهادات رسمية بنقاط تطوعك أو عبر البطاقة الذهبية.
          </p>
        </div>
      </div>

      {/* Search & Category Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search bar */}
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن دورة تدريبية..."
              className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 shadow-xs outline-hidden"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          </div>

          <span className="text-xs text-slate-500 font-medium self-end sm:self-center">
            {filteredCourses.length} دورة تدريبية متوفرة
          </span>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {COURSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-3">
          <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">لا توجد دورات مطابقة</h3>
          <p className="text-xs text-slate-500">
            لم نتمكن من العثور على دورات تطابق خيارات البحث الحالية.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('الكل');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-teal-700 text-white rounded-xl text-xs font-bold"
          >
            عرض جميع الدورات
          </button>
        </div>
      )}
    </div>
  );
}
