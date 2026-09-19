'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { initialOrganizations } from '@/lib/mock-data';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { Building2, MapPin, Phone, Mail, ShieldCheck, ArrowRight, Globe, Users, CalendarCheck, Clock } from 'lucide-react';

export default function PublicOrganizationPage() {
  const params = useParams();
  const orgId = params.id as string;
  const { opportunities, currentOrg } = useApp();

  // Find org from initial list or currentOrg
  const org =
    currentOrg.id === orgId
      ? currentOrg
      : initialOrganizations.find((o) => o.id === orgId) || currentOrg;

  const orgOpportunities = opportunities.filter((o) => o.organizationId === org.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/opportunities"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-teal-700 transition-colors"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة لفرص التطوع</span>
      </Link>

      {/* Header with Cover */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-56 sm:h-72 w-full relative bg-slate-900">
          <img
            src={org.coverImage || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1200'}
            alt={org.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-black/20 to-transparent" />
        </div>

        <div className="px-6 sm:px-10 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex items-end gap-4">
              <img
                src={org.logo}
                alt={org.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-white shadow-xl bg-white"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                    {org.name}
                  </h1>
                  {org.verified && (
                    <span className="p-1 bg-teal-100 text-teal-800 rounded-full" title="مؤسسة موثوقة ومعتمدة">
                      <ShieldCheck className="w-4 h-4" />
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">{org.type} • تأسست عام {org.foundedYear || '2019'}</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <div>
              <p className="text-2xl font-black text-teal-800">{org.volunteersCount}</p>
              <p className="text-xs text-slate-500 font-medium">متطوع شاركوا معها</p>
            </div>
            <div>
              <p className="text-2xl font-black text-teal-800">{orgOpportunities.length || org.opportunitiesCount}</p>
              <p className="text-xs text-slate-500 font-medium">فرص ومشاريع</p>
            </div>
            <div>
              <p className="text-2xl font-black text-teal-800">{org.hoursCount}</p>
              <p className="text-xs text-slate-500 font-medium">ساعة تطوعية ميدانية</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details & Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3">
            <h3 className="font-bold text-base text-slate-900">نبذة عن الجمعية</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{org.description}</p>
          </div>

          {/* Active Opportunities from this org */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              فرص التطوع الحالية من {org.name} ({orgOpportunities.length})
            </h3>
            {orgOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {orgOpportunities.map((opp) => (
                  <OpportunityCard key={opp.id} opportunity={opp} />
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 bg-white p-6 rounded-2xl border text-center">
                لا توجد فرص معلنة حالياً من هذه المنظمة.
              </p>
            )}
          </div>
        </div>

        <aside className="md:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs text-slate-600">
          <h3 className="font-bold text-sm text-slate-900 pb-2 border-b border-slate-100">
            بيانات الاتصال والاعتماد
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{org.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{org.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-600 shrink-0" />
              <span dir="ltr">{org.phone}</span>
            </div>
            {org.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-teal-600 shrink-0" />
                <a href={org.website} target="_blank" rel="noreferrer" className="text-teal-700 underline">
                  {org.website}
                </a>
              </div>
            )}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 block">رقم التسجيل والاعتماد:</span>
              <span className="font-mono text-xs font-bold text-slate-800">{org.registrationNumber}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
