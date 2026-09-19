'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Organization,
  Opportunity,
  Course,
  Donation,
  Application,
  Certificate,
  Notification,
  UserRole,
  ApplicationStatus,
  PointTransaction,
  Achievement,
} from '@/lib/types';
import {
  initialMockUser,
  initialMockOrg,
  initialOpportunities,
  initialCourses,
  initialDonations,
  initialApplications,
  initialCertificates,
  initialNotifications,
  initialPointTransactions,
  initialAchievements,
} from '@/lib/mock-data';
import { calculateLevel } from '@/lib/constants';
import { generateCertificateCode, generateId } from '@/lib/utils';

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'error' | 'info';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  currentOrg: Organization;
  setCurrentOrg: React.Dispatch<React.SetStateAction<Organization>>;
  
  // Opportunities
  opportunities: Opportunity[];
  savedOpportunityIds: string[];
  toggleSaveOpportunity: (id: string) => void;
  addOpportunity: (data: Omit<Opportunity, 'id' | 'organizationId' | 'organizationName' | 'organizationLogo' | 'volunteersRegistered'>) => Opportunity;
  updateOpportunity: (id: string, data: Partial<Opportunity>) => void;
  deleteOpportunity: (id: string) => void;
  
  // Applications
  applications: Application[];
  applyToOpportunity: (oppId: string, customDetails?: { phone?: string; wilaya?: string; skills?: string[] }) => boolean;
  confirmParticipation: (appId: string, points: number, rating: number, note?: string) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  
  // Courses & Learning
  courses: Course[];
  courseProgress: Record<string, { completedLessonIds: string[]; progress: number; isCompleted: boolean }>;
  markLessonComplete: (courseId: string, lessonId: string) => void;
  
  // Certificates
  certificates: Certificate[];
  purchaseCertificate: (courseId: string, paymentMethod: 'edahabia' | 'points') => { success: boolean; message: string; certificate?: Certificate };
  
  // Gamification & Points
  pointTransactions: PointTransaction[];
  achievements: Achievement[];
  
  // Donations
  donations: Donation[];
  makeDonation: (donationId: string, amount: number) => void;
  
  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Toast notifications
  toasts: ToastMessage[];
  showToast: (title: string, message?: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const [role, setRoleState] = useState<UserRole>('volunteer');
  const [currentUser, setCurrentUser] = useState<User>(initialMockUser);
  const [currentOrg, setCurrentOrg] = useState<Organization>(initialMockOrg);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['opp-002']);
  const [applications, setApplications] = useState<Application[]>(initialApplications);
  const [courses] = useState<Course[]>(initialCourses);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [donations, setDonations] = useState<Donation[]>(initialDonations);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [pointTransactions, setPointTransactions] = useState<PointTransaction[]>(initialPointTransactions);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Course Progress State: courseId -> completed lessons
  const [courseProgress, setCourseProgress] = useState<
    Record<string, { completedLessonIds: string[]; progress: number; isCompleted: boolean }>
  >({
    'course-001': {
      completedLessonIds: ['les-101', 'les-102', 'les-103'],
      progress: 50,
      isCompleted: false,
    },
  });

  // Load persisted state on mount
  useEffect(() => {
    setIsClient(true);
    try {
      const savedRole = localStorage.getItem('tawtou3_role') as UserRole | null;
      if (savedRole) setRoleState(savedRole);
      
      const savedUser = localStorage.getItem('tawtou3_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));

      const savedPoints = localStorage.getItem('tawtou3_points');
      if (savedPoints) {
        const pts = parseInt(savedPoints, 10);
        setCurrentUser((prev) => ({ ...prev, points: pts, level: calculateLevel(pts) }));
      }
    } catch {
      // Ignore localstorage errors
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof window !== 'undefined') {
      localStorage.setItem('tawtou3_role', newRole);
    }
    showToast(
      'تم تغيير الحساب',
      newRole === 'volunteer'
        ? 'أنت تتصفح الآن كمتطوع (محمد أحمد)'
        : newRole === 'organization'
        ? 'أنت تتصفح الآن كمنظمة (جمعية الأمل)'
        : 'أنت تتصفح الآن كزائر غير مسجل',
      'info'
    );
  };

  const showToast = (title: string, message?: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = generateId('toast');
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleSaveOpportunity = (id: string) => {
    if (role === 'guest') {
      showToast('يرجى تسجيل الدخول', 'عليك تسجيل الدخول لحفظ هذه الفرصة', 'error');
      return;
    }
    setSavedOpportunityIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('تمت الإزالة', 'تمت إزالة الفرصة من قائمة المحفوظات', 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast('تم الحفظ ✓', 'تمت إضافة الفرصة إلى قائمة الفرص المحفوظة بنجاح', 'success');
        return [...prev, id];
      }
    });
  };

  const addOpportunity = (data: Omit<Opportunity, 'id' | 'organizationId' | 'organizationName' | 'organizationLogo' | 'volunteersRegistered'>) => {
    const newOpp: Opportunity = {
      ...data,
      id: generateId('opp'),
      organizationId: currentOrg.id,
      organizationName: currentOrg.name,
      organizationLogo: currentOrg.logo,
      volunteersRegistered: 0,
    };
    setOpportunities((prev) => [newOpp, ...prev]);
    showToast('تم نشر الفرصة 🎉', `تم نشر فرصة "${newOpp.title}" بنجاح`, 'success');
    return newOpp;
  };

  const updateOpportunity = (id: string, data: Partial<Opportunity>) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, ...data } : opp))
    );
    showToast('تم التحديث ✓', 'تم حفظ التعديلات على الفرصة بنجاح', 'success');
  };

  const deleteOpportunity = (id: string) => {
    setOpportunities((prev) => prev.filter((opp) => opp.id !== id));
    showToast('تم الحذف', 'تم حذف فرصة التطوع بنجاح', 'info');
  };

  const applyToOpportunity = (oppId: string, customDetails?: { phone?: string; wilaya?: string; skills?: string[] }) => {
    if (role === 'guest') {
      showToast('تسجيل الدخول مطلوب', 'عليك إنشاء حساب أو تسجيل الدخول للتقديم على هذه الفرصة', 'error');
      return false;
    }

    const existing = applications.find((a) => a.opportunityId === oppId && a.volunteerId === currentUser.id);
    if (existing) {
      showToast('طلب سابق موجود', 'لقد تقدمت بالفعل لهذه الفرصة سابقاً', 'info');
      return false;
    }

    const opp = opportunities.find((o) => o.id === oppId);
    if (!opp) return false;

    const newApp: Application = {
      id: generateId('app'),
      opportunityId: opp.id,
      opportunityTitle: opp.title,
      opportunityImage: opp.image,
      organizationName: opp.organizationName,
      organizationLogo: opp.organizationLogo,
      volunteerId: currentUser.id,
      volunteerName: `${currentUser.firstName} ${currentUser.lastName}`,
      volunteerEmail: currentUser.email,
      volunteerPhone: customDetails?.phone || currentUser.phone || '0550 00 00 00',
      volunteerWilaya: customDetails?.wilaya || currentUser.wilaya,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    setApplications((prev) => [newApp, ...prev]);

    // increment registered count
    setOpportunities((prev) =>
      prev.map((o) =>
        o.id === oppId ? { ...o, volunteersRegistered: o.volunteersRegistered + 1 } : o
      )
    );

    // add notification
    const newNotif: Notification = {
      id: generateId('notif'),
      title: 'تم إرسال طلبك بنجاح ✓',
      description: `تم إرسال طلب انضمامك إلى: ${opp.title}. ستتلقى رداً قريباً.`,
      time: 'الآن',
      read: false,
      type: 'application',
      link: '/profile/applications',
    };
    setNotifications((prev) => [newNotif, ...prev]);

    showToast('تم إرسال الطلب بنجاح ✓', 'ستصلك notification عند تحديث حالة طلبك من طرف المنظمة', 'success');
    return true;
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
    showToast('تم تحديث الطلب', `تم تغيير حالة الطلب إلى: ${status}`, 'info');
  };

  const confirmParticipation = (appId: string, points: number, rating: number, note?: string) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    // Update application
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              status: 'completed',
              pointsAwarded: points,
              rating,
              note: note || 'تم تأكيد الحضور والمشاركة بنجاح.',
            }
          : a
      )
    );

    // If currentUser is the volunteer, award points & record transaction
    if (app.volunteerId === currentUser.id) {
      const newPoints = currentUser.points + points;
      const newHours = currentUser.volunteerHours + 4;
      const newCompleted = currentUser.completedOpportunities + 1;
      const newLevel = calculateLevel(newPoints);

      setCurrentUser((prev) => ({
        ...prev,
        points: newPoints,
        volunteerHours: newHours,
        completedOpportunities: newCompleted,
        level: newLevel,
      }));

      // Add to transactions
      const newTx: PointTransaction = {
        id: generateId('tx'),
        title: app.opportunityTitle,
        points,
        type: 'credit',
        date: new Date().toISOString().split('T')[0],
        category: 'تطوع ميداني',
      };
      setPointTransactions((prev) => [newTx, ...prev]);

      // Add notification
      const newNotif: Notification = {
        id: generateId('notif'),
        title: `+${points} نقطة جديدة 🏆`,
        description: `تم تأكيد مشاركتك في "${app.opportunityTitle}" وإيداع ${points} نقطة في حسابك!`,
        time: 'الآن',
        read: false,
        type: 'points',
        link: '/profile/points',
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }

    showToast(
      'تم تأكيد المشاركة ✓',
      `تمت إضافة ${points} نقطة إلى رصيد المتطوع وتقييم الأداء بنجاح!`,
      'success'
    );
  };

  const markLessonComplete = (courseId: string, lessonId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) return;

    const current = courseProgress[courseId] || {
      completedLessonIds: [],
      progress: 0,
      isCompleted: false,
    };

    if (current.completedLessonIds.includes(lessonId)) return;

    const updatedLessons = [...current.completedLessonIds, lessonId];
    const totalLessons = course.lessons.length;
    const progress = Math.round((updatedLessons.length / totalLessons) * 100);
    const isCompleted = updatedLessons.length >= totalLessons;

    setCourseProgress((prev) => ({
      ...prev,
      [courseId]: {
        completedLessonIds: updatedLessons,
        progress,
        isCompleted,
      },
    }));

    if (isCompleted) {
      showToast(
        '🎉 أحسنت! أكملت الدورة',
        `لقد أتممت دورة "${course.title}". يمكنك الآن الحصول على شهادتك المعتمدة!`,
        'success'
      );
    }
  };

  const purchaseCertificate = (courseId: string, paymentMethod: 'edahabia' | 'points') => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) {
      return { success: false, message: 'الدورة غير موجودة' };
    }

    if (paymentMethod === 'points') {
      if (currentUser.points < course.certificatePricePoints) {
        showToast('رصيد النقاط غير كافٍ', `تحتاج إلى ${course.certificatePricePoints} نقطة لشراء الشهادة`, 'error');
        return { success: false, message: 'رصيد النقاط غير كافٍ' };
      }

      // Deduct points
      const newPts = currentUser.points - course.certificatePricePoints;
      setCurrentUser((prev) => ({
        ...prev,
        points: newPts,
        certificatesCount: prev.certificatesCount + 1,
        level: calculateLevel(newPts),
      }));

      // Record transaction
      const newTx: PointTransaction = {
        id: generateId('tx'),
        title: `شراء شهادة: ${course.title}`,
        points: course.certificatePricePoints,
        type: 'debit',
        date: new Date().toISOString().split('T')[0],
        category: 'شهادات',
      };
      setPointTransactions((prev) => [newTx, ...prev]);
    } else {
      // Edahabia mock payment
      setCurrentUser((prev) => ({
        ...prev,
        certificatesCount: prev.certificatesCount + 1,
      }));
    }

    const code = generateCertificateCode();
    const newCert: Certificate = {
      id: generateId('cert'),
      certificateCode: code,
      courseId: course.id,
      courseTitle: course.title,
      recipientName: `${currentUser.firstName} ${currentUser.lastName}`,
      issueDate: new Date().toLocaleDateString('ar-DZ', { year: 'numeric', month: 'long', day: 'numeric' }),
      paymentMethod,
      pricePaid: paymentMethod === 'points' ? `${course.certificatePricePoints} نقطة تطوع` : `${course.certificatePriceDzd} دج`,
      verified: true,
    };

    setCertificates((prev) => [newCert, ...prev]);

    // Add notification
    const notif: Notification = {
      id: generateId('notif'),
      title: 'تم إصدار شهادتك الجديدة 📜',
      description: `تهانينا! أصبحت شهادة "${course.title}" متاحة الآن في ملفك الشخصي (${code}).`,
      time: 'الآن',
      read: false,
      type: 'certificate',
      link: '/profile/certificates',
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast('تهانينا! تمت إضافة الشهادة ✓', `تم إصدار شهادتك بنجاح (${code})`, 'success');
    return { success: true, message: 'تم شراء الشهادة بنجاح', certificate: newCert };
  };

  const makeDonation = (donationId: string, amount: number) => {
    setDonations((prev) =>
      prev.map((don) =>
        don.id === donationId
          ? {
              ...don,
              raisedAmount: don.raisedAmount + amount,
              donorsCount: don.donorsCount + 1,
            }
          : don
      )
    );
    showToast('شكراً لعطائك وجزاك الله خيراً ❤️', `تم تسجيل تبرعك بمبلغ ${amount.toLocaleString('ar-DZ')} دج بنجاح`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('تم تعليم الإشعارات', 'تم تعليم جميع الإشعارات كمقروءة', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser,
        currentOrg,
        setCurrentOrg,
        opportunities,
        savedOpportunityIds,
        toggleSaveOpportunity,
        addOpportunity,
        updateOpportunity,
        deleteOpportunity,
        applications,
        applyToOpportunity,
        confirmParticipation,
        updateApplicationStatus,
        courses,
        courseProgress,
        markLessonComplete,
        certificates,
        purchaseCertificate,
        pointTransactions,
        achievements,
        donations,
        makeDonation,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
