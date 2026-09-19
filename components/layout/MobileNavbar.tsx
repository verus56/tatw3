'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Home, Compass, GraduationCap, Heart, User, Building2 } from 'lucide-react';

export function MobileNavbar() {
  const pathname = usePathname();
  const { role } = useApp();

  const accountHref =
    role === 'organization'
      ? '/organization/dashboard'
      : role === 'volunteer'
      ? '/profile'
      : '/login';

  const isAccountActive =
    role === 'organization'
      ? pathname.startsWith('/organization')
      : role === 'volunteer'
      ? pathname.startsWith('/profile')
      : pathname === '/login' || pathname === '/register';

  const navItems = [
    { label: 'الرئيسية', href: '/', icon: Home },
    { label: 'الفرص', href: '/opportunities', icon: Compass },
    { label: 'التكوينات', href: '/courses', icon: GraduationCap },
    { label: 'التبرعات', href: '/donations', icon: Heart },
    {
      label: role === 'organization' ? 'الجمعية' : 'حسابي',
      href: accountHref,
      icon: role === 'organization' ? Building2 : User,
      active: isAccountActive,
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg">
      <div className="grid grid-cols-5 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.active ?? pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all ${
                isActive
                  ? 'text-teal-700 font-bold bg-teal-50/70 scale-105'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
