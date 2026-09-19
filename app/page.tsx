'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { CourseCard } from '@/components/courses/CourseCard';
import { DonationCard } from '@/components/donations/DonationCard';
import {
  Sparkles,
  ArrowLeft,
  Users,
  CalendarCheck,
  Building,
  Clock,
  UserPlus,
  Compass,
  Send,
  Trophy,
  Award,
  ChevronLeft,
  CheckCircle2,
} from 'lucide-react';

export default function HomePage() {
  const { opportunities, courses, donations } = useApp();

  const featuredOpportunities = opportunities.slice(0, 6);
  const featuredCourses = courses.slice(0, 3);
  const featuredDonations = donations.slice(0, 3);

  const steps = [
    {
      num: '01',
      title: 'أنشئ حسابك',
      desc: 'سجل في ثوان كمتطوع أو كجمعية وابدأ رحلتك التضامنية.',
      icon: UserPlus,
    },
    {
      num: '02',
      title: 'اكتشف الفرصة المناسبة',
      desc: 'تصفح مئات الفرص الميدانية والرقمية عبر 58 ولاية جزائرية.',
      icon: Compass,
    },
    {
      num: '03',
      title: 'قدم طلبك بسهولة',
      desc: 'بضغطة زر أرسل طلب التطوع وتواصل مع الجمعية المنظمة.',
      icon: Send,
    },
    {
      num: '04',
      title: 'تطوع واجمع النقاط',
      desc: 'شارك في الميدان واحصل على نقاط موثقة ترفع مستواك التطوعي.',
      icon: Trophy,
    },
    {
      num: '05',
      title: 'تعلّم واكسب شهادات',
      desc: 'استبدل نقاطك بشهادات تكوينية معتمدة تضاف لسيرتك الذاتية.',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-900 via-teal-800 to-teal-950 text-white pt-16 pb-24 md:pt-24 md:pb-32">
        {/* Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left/Right Text in RTL */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-teal-200 border border-white/15 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>المنصة الوطنية الأولى للتطوع والتمكين في الجزائر</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                شارك... <span className="text-amber-400">تطوّع...</span>
                <br />
                اصنع أثرًا حقيقيًا
              </h1>

              <p className="text-base sm:text-lg text-teal-100 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                اكتشف فرص التطوع، طوّر مهاراتك من خلال تكوينات معتمدة، ساهم في مجتمعك
                واحصل على نقاط وشارات رسمية توثق تجربتك وتصنع مستقبلك.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/opportunities"
                  className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <span>اكتشف فرص التطوع</span>
                  <ArrowLeft className="w-4 h-4" />
                </Link>
                <Link
                  href="/register"
                  className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>ابدأ رحلتك</span>
                </Link>
              </div>

              {/* Quick trust metrics */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-teal-200/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> جمعيات معتمدة وموثوقة
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" /> شواهد ونقاط مجزية
                </span>
              </div>
            </div>

            {/* Visual Hero Image & Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800"
                    alt="شباب جزائريون متطوعون"
                    className="w-full h-80 sm:h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 left-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    <p className="text-xs text-teal-200">مبادرة الأسبوع</p>
                    <p className="text-sm font-bold">تشجير جبال الشريعة • البليدة</p>
                  </div>
                </div>

                {/* Floating Achievement Card */}
                <div className="absolute -top-6 -right-6 bg-white text-slate-900 p-3.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-bounce duration-1000">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-xl">
                    🏆
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">نظام المكافآت</p>
                    <p className="text-xs font-black text-slate-900">+50 نقطة لكل مشاركة</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (Section 19) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg text-center hover:translate-y-[-2px] transition-transform">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">12,500+</p>
            <p className="text-xs font-bold text-slate-500 mt-1">متطوع مسجل</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg text-center hover:translate-y-[-2px] transition-transform">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-3">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">850+</p>
            <p className="text-xs font-bold text-slate-500 mt-1">فرصة تطوع</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg text-center hover:translate-y-[-2px] transition-transform">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Building className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">320</p>
            <p className="text-xs font-bold text-slate-500 mt-1">مؤسسة وجمعية</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-lg text-center hover:translate-y-[-2px] transition-transform">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-3xl font-black text-slate-900 tracking-tight">45,000</p>
            <p className="text-xs font-bold text-slate-500 mt-1">ساعة تطوع منجزة</p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED OPPORTUNITIES (Section 20) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              بادر الآن
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              فرص تطوع مميزة
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              اكتشف الفرص التي تناسب اهتماماتك ومهاراتك في مختلف الولايات.
            </p>
          </div>
          <Link
            href="/opportunities"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>عرض جميع الفرص</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opportunity={opp} />
          ))}
        </div>
      </section>

      {/* 4. HOW IT WORKS (Section 21) */}
      <section className="bg-slate-100/70 py-16 sm:py-20 border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              خطوات بسيطة
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              كيف تعمل منصة تطوّع؟
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              منصة متكاملة ترافقك من أول رغبة في العطاء حتى الحصول على شهاداتك الرسمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative text-right flex flex-col justify-between"
                >
                  <div>
                    <span className="text-2xl font-black text-teal-700/30">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center my-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. COURSES (Section 22) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              أكاديمية تطوّع
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              تعلم مهارات جديدة
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              طور مهاراتك من خلال دورات مجانية مصممة لمساعدتك على أن تكون متطوعًا أكثر تأثيرًا.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-700 hover:text-teal-800 transition-colors"
          >
            <span>استكشف جميع التكوينات</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 6. DONATIONS (Section 23) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              مشاريع التضامن
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              ساهم في صناعة الأثر
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              ساند المبادرات الميدانية والمشاريع التي تلبي احتياجات حقيقية في الجزائر.
            </p>
          </div>
          <Link
            href="/donations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>عرض كل حملات التبرع</span>
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDonations.map((donation) => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      </section>

      {/* 7. CTA BANNER (Section 24) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-800 via-teal-700 to-emerald-700 rounded-3xl p-8 sm:p-14 text-white text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-black">
              جاهز لصنع أثر؟
            </h2>
            <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
              انضم إلى آلاف المتطوعين في الجزائر، واستثمر وقتك وطاقتك في بناء مجتمع الغد
              واكتساب مهارات لا تقدر بثمن.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl shadow-lg transition-all hover:scale-105"
              >
                ابدأ الآن كمتطوع
              </Link>
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 transition-all"
              >
                سجل كجمعية أو منظمة
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
