'use client';

import React from 'react';
import Link from 'next/link';
import { Opportunity } from '@/lib/types';
import { useApp } from '@/context/AppContext';
import { MapPin, Calendar, Clock, Trophy, Heart, Users, CheckCircle } from 'lucide-react';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApplyClick?: (opp: Opportunity) => void;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const { savedOpportunityIds, toggleSaveOpportunity, applications } = useApp();
  const isSaved = savedOpportunityIds.includes(opportunity.id);
  const userApp = applications.find((a) => a.opportunityId === opportunity.id);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'البيئة':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'التعليم':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'الصحة':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'التضامن':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'التكنولوجيا':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'الرياضة':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      default:
        return 'bg-teal-50 text-teal-700 border-teal-200';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-teal-200 transition-all duration-300 flex flex-col">
      {/* Image header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
        <img
          src={opportunity.image}
          alt={opportunity.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Category & Points Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${getCategoryColor(
              opportunity.category
            )}`}
          >
            {opportunity.category}
          </span>
          {opportunity.urgent && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-xs animate-pulse">
              عاجل
            </span>
          )}
        </div>

        {/* Save button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveOpportunity(opportunity.id);
          }}
          className={`absolute top-3 left-3 w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-slate-700 hover:text-rose-500'
          }`}
          aria-label="حفظ الفرصة"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Points indicator on image bottom */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500 text-white font-black text-xs shadow-md">
          <Trophy className="w-3.5 h-3.5" />
          <span>+{opportunity.points} نقطة تطوع</span>
        </div>

        {/* Applied status tag if any */}
        {userApp && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-600/90 text-white text-[11px] font-bold backdrop-blur-md">
            <CheckCircle className="w-3 h-3" />
            <span>تم التقديم</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Organization */}
          <div className="flex items-center gap-2 mb-2">
            <img
              src={opportunity.organizationLogo}
              alt={opportunity.organizationName}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className="text-xs font-semibold text-slate-500 truncate max-w-[200px]">
              {opportunity.organizationName}
            </span>
          </div>

          {/* Title */}
          <Link href={`/opportunities/${opportunity.id}`} className="block group-hover:text-teal-800 transition-colors">
            <h3 className="font-black text-base text-slate-900 line-clamp-2 leading-snug mb-2">
              {opportunity.title}
            </h3>
          </Link>

          {/* Description snippet */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {opportunity.description}
          </p>
        </div>

        <div>
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{opportunity.wilaya}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{opportunity.startDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{opportunity.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{opportunity.volunteersRegistered} / {opportunity.volunteersNeeded} مسجل</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <Link
              href={`/opportunities/${opportunity.id}`}
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 text-center transition-colors"
            >
              عرض التفاصيل
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
