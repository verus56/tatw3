'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { NotificationDropdown } from './NotificationDropdown';
import {
  Search,
  Menu,
  X,
  User,
  Building2,
  Trophy,
  Award,
  Bookmark,
  FileText,
  LogOut,
  PlusCircle,
  LayoutDashboard,
  Users,
  ChevronDown,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, currentUser, currentOrg, setRole } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'فرص التطوع', href: '/opportunities' },
    { name: 'التكوينات', href: '/courses' },
    { name: 'التبرعات', href: '/donations' },
    { name: 'لوحة الشرف', href: '/leaderboard' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/opportunities?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-800 to-teal-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform">
                <span>ت</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-2xl tracking-tight text-teal-800">
                    تطوّع
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-amber-500 uppercase bg-amber-50 px-1.5 py-0.5 rounded-md">
                    TAWTOU3
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium -mt-1">
                  المنصة الجزائرية للتطوع
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-teal-800 bg-teal-50/80 font-bold'
                        : 'text-slate-600 hover:text-teal-700 hover:bg-slate-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button / Bar */}
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="ابحث عن فرصة، دورة، جمعية..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-56 sm:w-72 px-4 py-2 pl-9 rounded-xl border border-teal-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute left-2.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-xl text-slate-600 hover:text-teal-700 hover:bg-slate-100 transition-colors"
                  aria-label="البحث"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Notifications */}
            {role !== 'guest' && <NotificationDropdown />}

            {/* User Account or Auth Buttons */}
            {role === 'volunteer' && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.firstName}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-teal-600/30"
                  />
                  <div className="hidden sm:block text-right">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">
                        {currentUser.firstName} {currentUser.lastName}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-sm flex items-center gap-0.5">
                        <Trophy className="w-3 h-3 inline" /> {currentUser.points} نقطة
                      </span>
                    </div>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 text-right">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">
                        {currentUser.firstName} {currentUser.lastName}
                      </p>
                      <p className="text-[11px] text-teal-700 font-semibold">{currentUser.level}</p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>الملف الشخصي</span>
                    </Link>
                    <Link
                      href="/profile/points"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span>رصيد النقاط ({currentUser.points})</span>
                    </Link>
                    <Link
                      href="/profile/applications"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>طلبات التطوع</span>
                    </Link>
                    <Link
                      href="/profile/certificates"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <Award className="w-4 h-4 text-teal-600" />
                      <span>شهاداتي المعتمدة</span>
                    </Link>
                    <Link
                      href="/profile/saved"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <Bookmark className="w-4 h-4 text-slate-400" />
                      <span>الفرص المحفوظة</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        setRole('guest');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-right"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {role === 'organization' && (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl hover:bg-slate-100 border border-slate-200/80 transition-colors"
                >
                  <img
                    src={currentOrg.logo}
                    alt={currentOrg.name}
                    className="w-9 h-9 rounded-xl object-cover ring-2 ring-amber-500/40"
                  />
                  <div className="hidden sm:block text-right">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900 max-w-[120px] truncate">
                        {currentOrg.name}
                      </span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded-sm inline-block">
                      مؤسسة موثقة ✓
                    </span>
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 text-right">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {currentOrg.name}
                      </p>
                      <p className="text-[11px] text-slate-500">حساب جمعية / مؤسسة</p>
                    </div>

                    <Link
                      href="/organization/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-teal-600" />
                      <span>لوحة التحكم</span>
                    </Link>
                    <Link
                      href="/organization/opportunities/new"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <PlusCircle className="w-4 h-4 text-amber-500" />
                      <span>نشر فرصة جديدة</span>
                    </Link>
                    <Link
                      href="/organization/opportunities"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-slate-400" />
                      <span>إدارة الفرص</span>
                    </Link>
                    <Link
                      href="/organization/volunteers"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>المتطوعون وتأكيد الحضور</span>
                    </Link>
                    <Link
                      href="/organization/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-teal-700 transition-colors"
                    >
                      <User className="w-4 h-4 text-slate-400" />
                      <span>ملف الجمعية</span>
                    </Link>

                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={() => {
                        setRole('guest');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors text-right"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {role === 'guest' && (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  تسجيل الدخول
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors"
                >
                  إنشاء حساب
                </Link>
              </div>
            )}

            {/* Mobile hamburger menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              aria-label="القائمة"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                pathname === link.href
                  ? 'text-teal-800 bg-teal-50 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {role === 'organization' && (
            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/organization/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-bold text-teal-800 bg-teal-50/60"
              >
                لوحة تحكم المنظمة
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
