'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ALGERIA_WILAYAS } from '@/lib/constants';
import { User, Building2, CheckCircle2, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setRole, showToast } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedRole, setSelectedRole] = useState<'volunteer' | 'organization'>('volunteer');

  // Volunteer Fields
  const [volForm, setVolForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: true,
  });

  // Organization Fields
  const [orgForm, setOrgForm] = useState({
    name: '',
    type: 'جمعية محلية',
    email: '',
    phone: '',
    wilaya: 'الجزائر',
    commune: '',
    address: '',
    regNumber: '',
    description: '',
  });

  const [registered, setRegistered] = useState(false);

  const handleRegisterVolunteer = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('volunteer');
    setRegistered(true);
    showToast('تم إنشاء الحساب بنجاح! 🎉', 'أهلاً بك في منصة تطوّع', 'success');
  };

  const handleRegisterOrg = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('organization');
    setRegistered(true);
    showToast('تم إرسال طلب التسجيل', 'طلبك قيد المراجعة والتحقق حالياً', 'info');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 text-right">
        {registered ? (
          <div className="text-center space-y-6 py-6 animate-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            {selectedRole === 'volunteer' ? (
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">
                  تم إنشاء حسابك كمتطوع بنجاح 🎉
                </h2>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  هل ترغب في استكمال بيانات ملفك الشخصي الآن أم البدء في تصفح الفرص التطوعية؟
                </p>
                <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href="/profile"
                    className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    استكمال الملف الشخصي
                  </Link>
                  <Link
                    href="/opportunities"
                    className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all"
                  >
                    تصفح الفرص أولاً
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">
                  تم تسجيل منظمتك بنجاح
                </h2>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full text-xs font-bold">
                  <ShieldAlert className="w-4 h-4" />
                  <span>الحالة: في انتظار التحقق والاعتماد</span>
                </div>
                <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  يمكنك الآن الدخول إلى لوحة التحكم واستكشاف أدوات نشر الفرص وإدارة المتطوعين.
                </p>
                <div className="pt-4">
                  <Link
                    href="/organization/dashboard"
                    className="px-6 py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-all shadow-md inline-block"
                  >
                    الانتقال إلى لوحة تحكم المنظمة
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : step === 1 ? (
          /* Step 1: Choose Role */
          <div className="space-y-8">
            <div className="text-center space-y-2 flex flex-col items-center">
              <img
                src="/logo.png"
                alt="تطوع TAWTOU3"
                className="h-16 w-auto object-contain mb-1"
              />
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                الخطوة 1 من 2
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                من أنت؟
              </h2>
              <p className="text-xs text-slate-500">
                اختر نوع الحساب الذي يناسب نشاطك على المنصة
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('volunteer')}
                className={`p-6 rounded-2xl border-2 text-right transition-all flex flex-col justify-between space-y-4 ${
                  selectedRole === 'volunteer'
                    ? 'border-teal-700 bg-teal-50/50 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl">
                  🙋
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">أنا متطوع</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    أريد البحث عن فرص للتطوع، حضور دورات تدريبية، وجمع نقاط وشارات تقديرية.
                  </p>
                </div>
                <span className="text-xs font-bold text-teal-700 flex items-center gap-1">
                  <span>المتابعة كمتطوع</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('organization')}
                className={`p-6 rounded-2xl border-2 text-right transition-all flex flex-col justify-between space-y-4 ${
                  selectedRole === 'organization'
                    ? 'border-amber-500 bg-amber-50/40 shadow-md'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl">
                  🏢
                </div>
                <div>
                  <h3 className="font-black text-base text-slate-900">أمثل جمعية أو مؤسسة</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    نبحث عن متطوعين لإنجاح مشاريعنا، نشر الفرص، ومنح النقاط والشهادات.
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                  <span>المتابعة كجهة منظمة</span>
                  <ArrowLeft className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>متابعة التسجيل</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <p className="text-center text-xs text-slate-500">
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-teal-700 font-bold hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        ) : (
          /* Step 2: Form according to selected role */
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-teal-700">الخطوة 2 من 2</span>
                <h2 className="text-xl font-black text-slate-900 mt-1">
                  {selectedRole === 'volunteer' ? 'تسجيل حساب متطوع جديد' : 'تسجيل جمعية أو منظمة'}
                </h2>
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>تغيير نوع الحساب</span>
              </button>
            </div>

            {selectedRole === 'volunteer' ? (
              <form onSubmit={handleRegisterVolunteer} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الاسم</label>
                    <input
                      type="text"
                      required
                      placeholder="محمد"
                      value={volForm.firstName}
                      onChange={(e) => setVolForm({ ...volForm, firstName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اللقب</label>
                    <input
                      type="text"
                      required
                      placeholder="أحمد"
                      value={volForm.lastName}
                      onChange={(e) => setVolForm({ ...volForm, lastName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      placeholder="mohamed@example.com"
                      value={volForm.email}
                      onChange={(e) => setVolForm({ ...volForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف</label>
                    <input
                      type="tel"
                      required
                      placeholder="0550 12 34 56"
                      value={volForm.phone}
                      onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">كلمة المرور</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={volForm.password}
                      onChange={(e) => setVolForm({ ...volForm, password: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={volForm.confirmPassword}
                      onChange={(e) => setVolForm({ ...volForm, confirmPassword: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer pt-2">
                  <input
                    type="checkbox"
                    checked={volForm.terms}
                    onChange={(e) => setVolForm({ ...volForm, terms: e.target.checked })}
                    required
                    className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
                  />
                  <span className="text-xs text-slate-600">
                    أوافق على الشروط وسياسة الاستخدام وأتعهد بالالتزام بقيم العمل التطوعي.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-black rounded-xl text-xs shadow-md transition-all mt-4"
                >
                  إنشاء حسابي كمتطوع
                </button>
              </form>
            ) : (
              /* Organization Form */
              <form onSubmit={handleRegisterOrg} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الجمعية أو المنظمة *</label>
                  <input
                    type="text"
                    required
                    placeholder="جمعية الأمل لرعاية الشباب..."
                    value={orgForm.name}
                    onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">نوع المنظمة</label>
                    <select
                      value={orgForm.type}
                      onChange={(e) => setOrgForm({ ...orgForm, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="جمعية محلية">جمعية محلية</option>
                      <option value="جمعية ولائية">جمعية ولائية</option>
                      <option value="جمعية وطنية">جمعية وطنية</option>
                      <option value="نادي جامعي أو مدرسي">نادي جامعي أو مدرسي</option>
                      <option value="مؤسسة عامة / دار شباب">مؤسسة عامة / دار شباب</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">رقم الاعتماد الرسمي</label>
                    <input
                      type="text"
                      placeholder="مثال: DZ-16-2020-001"
                      value={orgForm.regNumber}
                      onChange={(e) => setOrgForm({ ...orgForm, regNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@org.dz"
                      value={orgForm.email}
                      onChange={(e) => setOrgForm({ ...orgForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الهاتف</label>
                    <input
                      type="tel"
                      required
                      placeholder="034 11 22 33"
                      value={orgForm.phone}
                      onChange={(e) => setOrgForm({ ...orgForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500 text-left"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">الولاية</label>
                    <select
                      value={orgForm.wilaya}
                      onChange={(e) => setOrgForm({ ...orgForm, wilaya: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                    >
                      {ALGERIA_WILAYAS.map((w) => (
                        <option key={w} value={w.split(' - ')[1]}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">البلدية والعنوان</label>
                    <input
                      type="text"
                      placeholder="العنوان التفصيلي"
                      value={orgForm.address}
                      onChange={(e) => setOrgForm({ ...orgForm, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">نبذة عن أهداف ونشاطات الجمعية</label>
                  <textarea
                    rows={3}
                    value={orgForm.description}
                    onChange={(e) => setOrgForm({ ...orgForm, description: e.target.value })}
                    placeholder="مجال النشاط، أهم الأعمال السابقة..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-md transition-all mt-4"
                >
                  تقديم طلب اعتماد الجمعية
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
