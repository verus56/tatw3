'use client';

import React from 'react';
import { ALGERIA_WILAYAS, OPPORTUNITY_CATEGORIES, DURATION_OPTIONS, TYPE_OPTIONS } from '@/lib/constants';
import { Filter, RotateCcw, Search } from 'lucide-react';

interface FilterState {
  search: string;
  category: string;
  wilaya: string;
  type: string;
  duration: string;
  sortBy: string;
}

interface OpportunityFiltersProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  totalCount: number;
}

export function OpportunityFilters({
  filters,
  setFilters,
  resetFilters,
  totalCount,
}: OpportunityFiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-800">
          <Filter className="w-5 h-5 text-teal-700" />
          <h2 className="font-bold text-base">تصفية الفرص ({totalCount})</h2>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-slate-500 hover:text-teal-700 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>إعادة ضبط</span>
        </button>
      </div>

      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">البحث بالكلمة المفتاحية</label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="مثال: تنظيف، تعليم، أطفال..."
            className="w-full pr-9 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-hidden transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
        </div>
      </div>

      {/* Wilaya Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">الولاية (58 ولاية)</label>
        <select
          value={filters.wilaya}
          onChange={(e) => setFilters((prev) => ({ ...prev, wilaya: e.target.value }))}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-hidden"
        >
          <option value="">كل الولايات</option>
          {ALGERIA_WILAYAS.map((w) => {
            const name = w.split(' - ')[1];
            return (
              <option key={w} value={name}>
                {w}
              </option>
            );
          })}
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-2">المجال / الفئة</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, category: '' }))}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filters.category === ''
                ? 'bg-teal-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            الكل
          </button>
          {OPPORTUNITY_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                filters.category === cat
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">نوع التطوع</label>
        <select
          value={filters.type}
          onChange={(e) => setFilters((prev) => ({ ...prev, type: e.target.value }))}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-hidden"
        >
          <option value="">جميع الأنواع</option>
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">المدة الزمنية</label>
        <select
          value={filters.duration}
          onChange={(e) => setFilters((prev) => ({ ...prev, duration: e.target.value }))}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-hidden"
        >
          <option value="">أي مدة</option>
          {DURATION_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Sorting */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1.5">ترتيب حسب</label>
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value }))}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-hidden"
        >
          <option value="newest">الأحدث أولاً</option>
          <option value="points-desc">أعلى نقاط</option>
          <option value="urgent">الأكثر إلحاحاً</option>
          <option value="spots">المقاعد المتبقية</option>
        </select>
      </div>
    </div>
  );
}
