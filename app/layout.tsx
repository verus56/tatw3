import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNavbar } from '@/components/layout/MobileNavbar';
import { Footer } from '@/components/layout/Footer';
import { DemoUserSwitcher } from '@/components/layout/DemoUserSwitcher';
import { ToastContainer } from '@/components/ui/ToastContainer';

const thmanyah = localFont({
  src: [
    {
      path: './fonts/thmanyahserifdisplay-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/thmanyahserifdisplay-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/thmanyahserifdisplay-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/thmanyahserifdisplay-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/thmanyahserifdisplay-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-thmanyah',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'تطوّع | TAWTOU3 — المنصة الجزائرية للعمل التطوعي وبناء الأثر',
  description:
    'منصة رقمية جزائرية تربط المتطوعين بالجمعيات والمؤسسات، تتيح اكتساب مهارات وتكوينات مجانية، والحصول على شهادات ونقاط تطوع.',
  keywords: [
    'تطوع',
    'الجزائر',
    'جمعيات',
    'عمل خيري',
    'تكوين مجاني',
    'شهادات معتمدة',
    'نقاط تطوع',
    'TAWTOU3',
  ],
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={thmanyah.variable}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileNavbar />
          <DemoUserSwitcher />
          <ToastContainer />
        </AppProvider>
      </body>
    </html>
  );
}
