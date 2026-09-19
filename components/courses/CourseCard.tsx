'use client';

import React from 'react';
import Link from 'next/link';
import { Course } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { Star, Users, BookOpen, Clock, Award, CheckCircle } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { courseProgress } = useApp();
  const progress = courseProgress[course.id];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Course Thumbnail */}
        <div className="relative aspect-16/9 w-full overflow-hidden bg-slate-100">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Free Badge & Category */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600/90 text-white backdrop-blur-md shadow-xs">
              🟢 مجاني
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-900/75 text-white backdrop-blur-md">
              {course.category}
            </span>
          </div>

          {/* Certificate Badge */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-teal-800 text-[11px] font-bold shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>شهادة معتمدة</span>
          </div>

          {/* Completed badge if finished */}
          {progress?.isCompleted && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-[11px] font-bold shadow-xs">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>مكتمل 100%</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Rating & Learners */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.learnersCount.toLocaleString('ar-DZ')} متعلم</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/courses/${course.id}`} className="block group-hover:text-teal-800 transition-colors">
            <h3 className="font-black text-base text-slate-900 line-clamp-2 leading-snug mb-2">
              {course.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {course.subtitle || course.description}
          </p>

          {/* Meta Info: lessons count & duration */}
          <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              <span>{course.lessonsCount} دروس</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>{course.duration}</span>
            </div>
          </div>

          {/* Progress Bar if started */}
          {progress && progress.progress > 0 && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-1">
                <span>التقدم</span>
                <span>{progress.progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0">
        <Link
          href={progress && progress.progress > 0 ? `/courses/${course.id}/learn` : `/courses/${course.id}`}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <span>{progress && progress.progress > 0 ? 'متابعة الدورة' : 'ابدأ الدورة مجاناً'}</span>
        </Link>
      </div>
    </div>
  );
}
