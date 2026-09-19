'use client';

import React from 'react';
import Link from 'next/link';
import { Donation } from '@/lib/types';
import { Heart, Users, Clock } from 'lucide-react';

interface DonationCardProps {
  donation: Donation;
  onDonateClick?: (donation: Donation) => void;
}

export function DonationCard({ donation, onDonateClick }: DonationCardProps) {
  const percentage = Math.min(
    100,
    Math.round((donation.raisedAmount / donation.targetAmount) * 100)
  );

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-200 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image */}
        <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-100">
          <img
            src={donation.image}
            alt={donation.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Category & Urgent badge */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 text-slate-800 backdrop-blur-md shadow-xs">
              {donation.category}
            </span>
            {donation.urgent && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-500 text-white shadow-xs animate-pulse">
                حملة عاجلة
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-white text-xs font-semibold">
            <span className="truncate max-w-[200px]">{donation.organizationName}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Title */}
          <Link href={`/donations/${donation.id}`} className="block group-hover:text-teal-800 transition-colors">
            <h3 className="font-black text-base text-slate-900 line-clamp-2 leading-snug mb-2">
              {donation.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
            {donation.description}
          </p>

          {/* Progress Bar & Stats */}
          <div className="space-y-2 bg-slate-50 p-3 rounded-xl mb-4">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-teal-800 font-black">
                {donation.raisedAmount.toLocaleString('ar-DZ')} دج
              </span>
              <span className="text-slate-500 font-normal text-[11px]">
                الهدف: {donation.targetAmount.toLocaleString('ar-DZ')} دج
              </span>
            </div>

            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-600 to-amber-500 rounded-full transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>{donation.donorsCount} متبرع</span>
              </div>
              <span className="font-bold text-amber-600">{percentage}% منجز</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>متبقي {donation.daysLeft} يوم</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-5 pt-0 flex gap-2">
        <Link
          href={`/donations/${donation.id}`}
          className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 flex items-center justify-center gap-2 shadow-xs transition-colors"
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>تبرع الآن</span>
        </Link>
        <Link
          href={`/donations/${donation.id}`}
          className="py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          التفاصيل
        </Link>
      </div>
    </div>
  );
}
