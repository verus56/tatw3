'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OpportunityFilters } from '@/components/opportunities/OpportunityFilters';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';

function OpportunitiesContent() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';

  const { opportunities } = useApp();

  const [filters, setFilters] = useState({
    search: initialSearch,
    category: initialCategory,
    wilaya: '',
    type: '',
    duration: '',
    sortBy: 'newest',
  });

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      wilaya: '',
      type: '',
      duration: '',
      sortBy: 'newest',
    });
  };

  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        if (filters.search) {
          const q = filters.search.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchDesc = opp.description.toLowerCase().includes(q);
          const matchOrg = opp.organizationName.toLowerCase().includes(q);
          const matchWilaya = opp.wilaya.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchOrg && !matchWilaya) return false;
        }

        if (filters.category && opp.category !== filters.category) {
          return false;
        }

        if (filters.wilaya && opp.wilaya !== filters.wilaya) {
          return false;
        }

        if (filters.type && opp.type !== filters.type) {
          return false;
        }

        if (filters.duration && opp.duration !== filters.duration) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'points-desc') {
          return b.points - a.points;
        }
        if (filters.sortBy === 'urgent') {
          return (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0);
        }
        if (filters.sortBy === 'spots') {
          return (b.volunteersNeeded - b.volunteersRegistered) - (a.volunteersNeeded - a.volunteersRegistered);
        }
        return b.id.localeCompare(a.id);
      });
  }, [opportunities, filters]);

  const activeFiltersCount = [
    filters.category,
    filters.wilaya,
    filters.type,
    filters.duration,
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full">
            سوق التطوع
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-2 mb-2">فرص التطوع في الجزائر</h1>
          <p className="text-sm sm:text-base text-teal-100 leading-relaxed">
            استكشف آلاف الساعات التطوعية في مختلف الولايات، واختر ما يلائم مهاراتك وشغفك لتصنع الفارق وتكسب النقاط.
          </p>
        </div>
      </div>

      {/* Mobile filter toggle button */}
      <div className="lg:hidden flex items-center justify-between gap-3">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800 shadow-xs"
        >
          <SlidersHorizontal className="w-4 h-4 text-teal-700" />
          <span>تصفية الفرص {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
        </button>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="p-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-semibold"
          >
            إلغاء
          </button>
        )}
      </div>

      {/* Main Grid: Sidebar Filters + Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          <OpportunityFilters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            totalCount={filteredOpportunities.length}
          />
        </aside>

        {/* Mobile Filter Modal / Drawer */}
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-xs flex justify-end">
            <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="font-bold text-slate-900">خيارات التصفية</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <OpportunityFilters
                filters={filters}
                setFilters={setFilters}
                resetFilters={resetFilters}
                totalCount={filteredOpportunities.length}
              />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-teal-700 text-white font-bold rounded-xl text-xs"
              >
                تطبيق الفلاتر
              </button>
            </div>
          </div>
        )}

        {/* Opportunities List Area */}
        <div className="lg:col-span-8 space-y-6">
          {/* Quick Active Filters tags */}
          {activeFiltersCount > 0 && (
            <div className="flex items-center flex-wrap gap-2 text-xs">
              <span className="text-slate-500 font-medium">الفلاتر المطبقة:</span>
              {filters.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-800 rounded-lg font-medium">
                  {filters.category}
                  <button onClick={() => setFilters((p) => ({ ...p, category: '' }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.wilaya && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-800 rounded-lg font-medium">
                  ولاية {filters.wilaya}
                  <button onClick={() => setFilters((p) => ({ ...p, wilaya: '' }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.type && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-800 rounded-lg font-medium">
                  {filters.type}
                  <button onClick={() => setFilters((p) => ({ ...p, type: '' }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.duration && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-800 rounded-lg font-medium">
                  {filters.duration}
                  <button onClick={() => setFilters((p) => ({ ...p, duration: '' }))}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Cards Grid */}
          {filteredOpportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredOpportunities.map((opp) => (
                <OpportunityCard key={opp.id} opportunity={opp} />
              ))}
            </div>
          ) : (
            /* Empty State (Section 72) */
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs space-y-4">
              <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-2xl flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                لا توجد فرص تطوع مطابقة
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                جرّب تعديل الفلاتر أو البحث بكلمات أخرى للحصول على نتائج مناسبة.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                إزالة جميع الفلاتر
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function OpportunitiesPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">جاري تحميل الفرص التطوعية...</div>}>
      <OpportunitiesContent />
    </Suspense>
  );
}

