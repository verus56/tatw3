'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { DonationCard } from '@/components/donations/DonationCard';
import { Heart, Search, HandHeart, Sparkles } from 'lucide-react';

export default function DonationsPage() {
  const { donations } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categories = ['الكل', 'التعليم', 'التضامن', 'التكنولوجيا', 'البيئة', 'الصحة'];

  const filtered = donations.filter((d) => {
    const matchesCat = selectedCategory === 'الكل' || d.category === selectedCategory;
    const matchesSearch =
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-teal-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white border border-white/20 text-xs font-semibold backdrop-blur-md">
            <HandHeart className="w-4 h-4 text-amber-300" />
            <span>مبادرات تضامنية شفافة وموثوقة</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">تبرعك يصنع فرقًا حقيقيًا</h1>
          <p className="text-sm sm:text-base text-amber-100 leading-relaxed">
            ساهم في دعم مشاريع الجمعيات الجزائرية التي تلامس حياة الفئات الهشة، من توزيع المؤونة إلى تجهيز المدارس وحفر الآبار.
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث في حملات التبرع..."
            className="w-full pr-10 pl-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-amber-500 outline-hidden shadow-xs"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
        </div>
      </div>

      {/* Donations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((donation) => (
          <DonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </div>
  );
}
