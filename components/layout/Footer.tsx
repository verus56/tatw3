import React from 'react';
import Link from 'next/link';
import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 lg:pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-400 flex items-center justify-center text-slate-900 font-black text-xl shadow-md">
                <span>ت</span>
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white">
                  تطوّع
                </span>
                <span className="text-xs font-bold text-amber-400 mr-2 bg-amber-400/10 px-2 py-0.5 rounded-sm">
                  TAWTOU3
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              المنصة الرقمية الجزائرية الأولى التي تصل بين طاقات الشباب المتطوع والجمعيات والمؤسسات الفاعلة لبناء مجتمع متضامن وصناعة أثر دائم في كل ولايات الوطن.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-teal-950/80 text-teal-300 border border-teal-800/50">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>صنع بكل فخر للشباب الجزائري 🇩🇿</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/opportunities" className="hover:text-teal-400 transition-colors">
                  فرص التطوع الميداني
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-teal-400 transition-colors">
                  أكاديمية التكوين والشهادات
                </Link>
              </li>
              <li>
                <Link href="/donations" className="hover:text-teal-400 transition-colors">
                  حملات التبرع والمشاريع
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-teal-400 transition-colors">
                  لوحة المتطوعين المتميزين
                </Link>
              </li>
            </ul>
          </div>

          {/* Organizations */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">للجمعيات والمؤسسات</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link href="/register" className="hover:text-teal-400 transition-colors">
                  تسجيل جمعية أو نادي
                </Link>
              </li>
              <li>
                <Link href="/organization/dashboard" className="hover:text-teal-400 transition-colors">
                  لوحة إدارة الفرص
                </Link>
              </li>
              <li>
                <Link href="/organization/opportunities/new" className="hover:text-teal-400 transition-colors">
                  نشر فرصة تطوعية
                </Link>
              </li>
              <li>
                <Link href="/organization/volunteers" className="hover:text-teal-400 transition-colors">
                  تأكيد المشاركة ومنح النقاط
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4">تواصل ومساعدة</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <span className="block text-slate-400">البريد: contact@tawtou3.dz</span>
              </li>
              <li>
                <span className="block text-slate-400">الهاتف: 021 00 11 22</span>
              </li>
              <li>
                <span className="block text-slate-400">الجزائر العاصمة، الجزائر</span>
              </li>
              <li className="pt-2 flex gap-3 text-slate-400">
                <span className="hover:text-teal-400 cursor-pointer transition-colors">Facebook</span>
                <span>•</span>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">Instagram</span>
                <span>•</span>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">LinkedIn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 منصة تطوّع (TAWTOU3). جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            <span>معاً من أجل مجتمع أكثر عطاءً</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
