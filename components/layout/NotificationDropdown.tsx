'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { Bell, CheckCheck, Trophy, Award, HeartHandshake, Sparkles } from 'lucide-react';

export function NotificationDropdown() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'points':
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case 'certificate':
        return <Award className="w-4 h-4 text-teal-600" />;
      case 'application':
        return <HeartHandshake className="w-4 h-4 text-emerald-600" />;
      default:
        return <Sparkles className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors"
        aria-label="الإشعارات"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-amber-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between px-4 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">الإشعارات</h3>
              {unreadCount > 0 && (
                <span className="text-[11px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full">
                  {unreadCount} جديدة
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="text-xs text-teal-600 hover:text-teal-800 flex items-center gap-1 font-medium transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>تعيين الكل كمقروء</span>
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-slate-400 text-xs">
                لا توجد إشعارات حالياً
              </div>
            ) : (
              notifications.map((notif) => (
                <Link
                  key={notif.id}
                  href={notif.link || '#'}
                  onClick={() => {
                    markNotificationRead(notif.id);
                    setIsOpen(false);
                  }}
                  className={`flex items-start gap-3 p-3.5 hover:bg-slate-50 transition-colors text-right ${
                    !notif.read ? 'bg-teal-50/40' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold ${!notif.read ? 'text-slate-900 font-bold' : 'text-slate-700'}`}>
                      {notif.title}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {notif.description}
                    </p>
                    <span className="text-[10px] text-slate-400 mt-1 inline-block">
                      {notif.time}
                    </span>
                  </div>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0 mt-2" />
                  )}
                </Link>
              ))
            )}
          </div>

          <div className="px-4 pt-2 text-center border-t border-slate-100">
            <Link
              href="/profile"
              onClick={() => setIsOpen(false)}
              className="text-xs text-teal-700 font-semibold hover:underline"
            >
              عرض سجل الأنشطة الكامل
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
