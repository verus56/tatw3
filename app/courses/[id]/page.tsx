'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Star,
  Users,
  Clock,
  BookOpen,
  CheckCircle,
  PlayCircle,
  Award,
  ArrowRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const { courses, courseProgress } = useApp();
  const courseId = params.id as string;
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">الدورة غير موجودة</h2>
        <Link
          href="/courses"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-700 text-white rounded-xl text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للدورات</span>
        </Link>
      </div>
    );
  }

  const progress = courseProgress[course.id];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Breadcrumbs */}
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>الرجوع إلى قائمة التكوينات</span>
      </Link>

      {/* Hero Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-teal-900 to-teal-800 text-white p-6 sm:p-10 rounded-3xl shadow-xl">
        <div className="lg:col-span-7 space-y-4 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold">
            <span className="text-amber-400">★</span>
            <span>{course.category}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">{course.title}</h1>
          <p className="text-sm text-teal-100 leading-relaxed">{course.subtitle}</p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-teal-200 pt-2">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <Star className="w-4 h-4 fill-amber-400" /> {course.rating} تقييم الدورة
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {course.learnersCount.toLocaleString('ar-DZ')} متطوع مسجل
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> {course.lessonsCount} دروس
            </span>
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-3">
            <Link
              href={`/courses/${course.id}/learn`}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              <span>{progress && progress.progress > 0 ? 'متابعة الدورة' : 'ابدأ الدورة الآن'}</span>
            </Link>

            {progress?.isCompleted && (
              <Link
                href={`/checkout?courseId=${course.id}`}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 flex items-center gap-2 transition-all"
              >
                <Award className="w-5 h-5 text-amber-300" />
                <span>طلب الشهادة المعتمدة</span>
              </Link>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border-2 border-white/20 shadow-lg relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Link
                href={`/courses/${course.id}/learn`}
                className="w-16 h-16 rounded-full bg-amber-500/90 text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
              >
                <PlayCircle className="w-10 h-10" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-8">
          {/* Description */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-3">
            <h3 className="text-lg font-black text-slate-900">عن هذا المسار التدريبي</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
          </div>

          {/* Learning outcomes */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-black text-slate-900">ماذا ستتعلم في هذه الدورة؟</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {course.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900">محتوى الدورة ({course.lessonsCount} دروس)</h3>
              <span className="text-xs text-slate-500">{course.duration} إجمالي</span>
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => {
                const isDone = progress?.completedLessonIds?.includes(lesson.id);
                return (
                  <div
                    key={lesson.id}
                    className="p-4 rounded-xl border border-slate-100 hover:border-teal-200 bg-slate-50/50 flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isDone
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{lesson.title}</p>
                        <p className="text-[11px] text-slate-500">{lesson.summary}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px] shrink-0 mr-2">
                      {lesson.duration}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Instructor Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">مؤطر الدورة</h4>
            <div className="flex items-center gap-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-100"
              />
              <div>
                <h4 className="font-bold text-sm text-slate-900">{course.instructor.name}</h4>
                <p className="text-xs text-slate-500 leading-tight mt-0.5">{course.instructor.role}</p>
              </div>
            </div>
          </div>

          {/* Certificate info */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-6 rounded-2xl border border-amber-200/60 space-y-4">
            <div className="flex items-center gap-2 text-amber-800">
              <Award className="w-6 h-6 text-amber-600" />
              <h4 className="font-bold text-sm">شهادة إتمام معتمدة</h4>
            </div>
            <p className="text-xs text-amber-900/80 leading-relaxed">
              بعد اجتياز جميع دروس الدورة، يمكنك الحصول على شهادة رقمية برمز تحقق موثق.
            </p>
            <div className="border-t border-amber-200/50 pt-3 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-700">
                <span>البطاقة الذهبية:</span>
                <span className="font-black text-slate-900">{course.certificatePriceDzd} دج</span>
              </div>
              <div className="flex justify-between items-center text-slate-700">
                <span>أو بنقاط التطوع:</span>
                <span className="font-black text-teal-700">{course.certificatePricePoints} نقطة</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
