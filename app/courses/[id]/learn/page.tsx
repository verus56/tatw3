'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Award,
  ArrowRight,
  Lock,
  Volume2,
  Maximize2
} from 'lucide-react';

export default function CourseLearnPage() {
  const params = useParams();
  const router = useRouter();
  const { courses, courseProgress, markLessonComplete, role } = useApp();
  const courseId = params.id as string;
  const course = courses.find((c) => c.id === courseId);

  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  useEffect(() => {
    if (course && courseProgress[course.id]?.isCompleted) {
      // Trigger confetti celebration if just completed
    }
  }, [course, courseProgress]);

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">الدورة غير موجودة</h2>
        <Link href="/courses" className="btn-primary text-xs">
          العودة للتكوينات
        </Link>
      </div>
    );
  }

  const currentProgress = courseProgress[course.id] || {
    completedLessonIds: [],
    progress: 0,
    isCompleted: false,
  };

  const activeLesson = course.lessons[activeLessonIndex];
  const isLastLesson = activeLessonIndex === course.lessons.length - 1;
  const isLessonCompleted = currentProgress.completedLessonIds.includes(activeLesson.id);

  const handleNextOrComplete = () => {
    markLessonComplete(course.id, activeLesson.id);
    if (isLastLesson) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
    } else {
      setActiveLessonIndex((prev) => Math.min(course.lessons.length - 1, prev + 1));
    }
  };

  const handlePrev = () => {
    setActiveLessonIndex((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Top Bar */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/${course.id}`}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            title="خروج من المشغل"
          >
            <ArrowRight className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
              {course.title}
            </h1>
            <p className="text-[11px] text-teal-400">
              الدرس {activeLessonIndex + 1} من {course.lessons.length}: {activeLesson.title}
            </p>
          </div>
        </div>

        {/* Course Progress Indicator */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-left">
            <span className="text-xs text-slate-400 font-medium">
              الإنجاز: {currentProgress.progress}%
            </span>
            <div className="w-32 h-2 bg-slate-800 rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-teal-500 rounded-full transition-all duration-300"
                style={{ width: `${currentProgress.progress}%` }}
              />
            </div>
          </div>

          {currentProgress.isCompleted && (
            <Link
              href={`/checkout?courseId=${course.id}`}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-all animate-bounce"
            >
              <Award className="w-4 h-4" />
              <span>استلام الشهادة</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Player Content & Sidebar */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Video & Player Stage */}
        <div className="lg:col-span-8 p-4 sm:p-8 flex flex-col justify-between space-y-6 overflow-y-auto">
          {/* Simulated Video Player */}
          <div className="relative aspect-video w-full bg-black rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex items-center justify-center group">
            <div className="absolute inset-0 bg-radial-gradient from-teal-950/40 to-black/80" />
            <div className="text-center p-6 relative z-10 space-y-4">
              <div className="w-20 h-20 rounded-full bg-teal-600/90 text-white flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                <Play className="w-10 h-10 ml-1" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{activeLesson.title}</h2>
                <p className="text-xs text-slate-400 mt-1">المدة المقدرة: {activeLesson.duration}</p>
              </div>
            </div>

            {/* Video Controls bar mock */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <Play className="w-4 h-4 text-teal-400 cursor-pointer" />
                <Volume2 className="w-4 h-4 text-slate-400 cursor-pointer" />
                <span>04:15 / {activeLesson.duration}</span>
              </div>
              <Maximize2 className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>
          </div>

          {/* Lesson Details & Description */}
          <div className="bg-slate-800/60 border border-slate-700/60 p-6 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-white">ملخص الدرس</h3>
              {isLessonCompleted && (
                <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>تم إنجاز هذا الدرس</span>
                </span>
              )}
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{activeLesson.summary}</p>
          </div>

          {/* Player Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handlePrev}
              disabled={activeLessonIndex === 0}
              className="px-5 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الدرس السابق</span>
            </button>

            <button
              onClick={handleNextOrComplete}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all"
            >
              <span>{isLastLesson ? 'إكمال الدورة والحصول على الشهادة' : 'إكمال والانتقال للتالي'}</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Curriculum */}
        <div className="lg:col-span-4 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-sm text-white">فهرس المحتوى</h3>
              <span className="text-xs text-slate-400">
                {currentProgress.completedLessonIds.length} / {course.lessons.length} مكتمل
              </span>
            </div>

            <div className="space-y-2">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = currentProgress.completedLessonIds.includes(lesson.id);
                const isActive = idx === activeLessonIndex;

                return (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIndex(idx)}
                    className={`w-full p-3.5 rounded-xl text-right flex items-center justify-between text-xs transition-all ${
                      isActive
                        ? 'bg-teal-900/60 border border-teal-500 text-white font-bold'
                        : isCompleted
                        ? 'bg-slate-900 text-slate-300 hover:bg-slate-850 border border-slate-800'
                        : 'bg-slate-900/40 text-slate-400 hover:bg-slate-800/40 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : isActive ? (
                        <Play className="w-4 h-4 text-amber-400 shrink-0 fill-amber-400" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
                          {idx + 1}
                        </span>
                      )}
                      <span className="truncate max-w-[180px] sm:max-w-[220px]">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-500 mr-2">
                      {lesson.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Certificate promotion box if completed */}
          {currentProgress.isCompleted && (
            <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-teal-500/10 border border-amber-500/30 text-center space-y-3">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <h4 className="font-bold text-sm text-white">مبروك إتمام الدورة!</h4>
              <p className="text-xs text-slate-300">
                احصل على شهادتك الرسمية المعتمدة فوراً باستخدام 100 نقطة تطوع أو 1500 دج.
              </p>
              <Link
                href={`/checkout?courseId=${course.id}`}
                className="block w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition-colors"
              >
                طلب الشهادة الآن
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
