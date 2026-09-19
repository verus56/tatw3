import { VolunteerLevel } from './types';

// All 58 Algerian Wilayas
export const ALGERIA_WILAYAS = [
  '01 - أدرار',
  '02 - الشلف',
  '03 - الأغواط',
  '04 - أم البواقي',
  '05 - باتنة',
  '06 - بجاية',
  '07 - بسكرة',
  '08 - بشار',
  '09 - البليدة',
  '10 - البويرة',
  '11 - تمنراست',
  '12 - تبسة',
  '13 - تلمسان',
  '14 - تيارت',
  '15 - تيزي وزو',
  '16 - الجزائر',
  '17 - الجلفة',
  '18 - جيجل',
  '19 - سطيف',
  '20 - سعيدة',
  '21 - سكيكدة',
  '22 - سيدي بلعباس',
  '23 - عنابة',
  '24 - قالمة',
  '25 - قسنطينة',
  '26 - المدية',
  '27 - مستغانم',
  '28 - المسيلة',
  '29 - معسكر',
  '30 - ورقلة',
  '31 - وهران',
  '32 - البيض',
  '33 - إليزي',
  '34 - برج بوعريريج',
  '35 - بومرداس',
  '36 - الطارف',
  '37 - تندوف',
  '38 - تيسمسيلت',
  '39 - الوادي',
  '40 - خنشلة',
  '41 - سوق أهراس',
  '42 - تيبازة',
  '43 - ميلة',
  '44 - عين الدفلى',
  '45 - النعامة',
  '46 - عين تموشنت',
  '47 - غرداية',
  '48 - غليزان',
  '49 - تيميمون',
  '50 - برج باجي مختار',
  '51 - أولاد جلال',
  '52 - بني عباس',
  '53 - إن صالح',
  '54 - إن قزام',
  '55 - تقرت',
  '56 - جانت',
  '57 - المغير',
  '58 - المنيعة',
];

export const WILAYA_NAMES = ALGERIA_WILAYAS.map((w) => w.split(' - ')[1]);

// Categories from plan.md
export const OPPORTUNITY_CATEGORIES = [
  'البيئة',
  'التعليم',
  'الصحة',
  'الثقافة',
  'الرياضة',
  'التكنولوجيا',
  'التضامن',
  'الأطفال',
  'الشباب',
  'الحيوانات',
  'الإغاثة',
  'التنمية',
];

export const COURSE_CATEGORIES = [
  'الكل',
  'القيادة',
  'التواصل',
  'الإسعافات الأولية',
  'إدارة المشاريع',
  'العمل الجمعوي',
  'التكنولوجيا',
  'التنمية الشخصية',
  'إدارة الفعاليات',
];

export const DURATION_OPTIONS = [
  'يوم واحد',
  '2 - 3 أيام',
  'أسبوع',
  'أكثر من أسبوع',
  'طويلة المدى',
];

export const TYPE_OPTIONS = ['حضوري', 'عن بعد', 'مختلط'];

export const DATE_FILTER_OPTIONS = [
  'الكل',
  'اليوم',
  'هذا الأسبوع',
  'هذا الشهر',
];

export const LEVEL_RULES: {
  level: VolunteerLevel;
  minPoints: number;
  maxPoints: number;
  badge: string;
}[] = [
  { level: 'مبتدئ', minPoints: 0, maxPoints: 99, badge: '🌱' },
  { level: 'متطوع', minPoints: 100, maxPoints: 249, badge: '🤝' },
  { level: 'متطوع نشط', minPoints: 250, maxPoints: 499, badge: '⭐' },
  { level: 'متطوع متميز', minPoints: 500, maxPoints: 999, badge: '🏆' },
  { level: 'سفير تطوع', minPoints: 1000, maxPoints: Infinity, badge: '👑' },
];

export const calculateLevel = (points: number): VolunteerLevel => {
  if (points >= 1000) return 'سفير تطوع';
  if (points >= 500) return 'متطوع متميز';
  if (points >= 250) return 'متطوع نشط';
  if (points >= 100) return 'متطوع';
  return 'مبتدئ';
};

export const getNextLevelInfo = (points: number) => {
  if (points >= 1000) {
    return {
      currentLevel: 'سفير تطوع',
      nextLevel: 'سفير تطوع (أعلى مستوى)',
      progress: 100,
      currentPoints: points,
      targetPoints: 1000,
      remainingPoints: 0,
    };
  }
  if (points >= 500) {
    return {
      currentLevel: 'متطوع متميز',
      nextLevel: 'سفير تطوع',
      progress: Math.min(100, Math.round(((points - 500) / 500) * 100)),
      currentPoints: points,
      targetPoints: 1000,
      remainingPoints: 1000 - points,
    };
  }
  if (points >= 250) {
    return {
      currentLevel: 'متطوع نشط',
      nextLevel: 'متطوع متميز',
      progress: Math.min(100, Math.round(((points - 250) / 250) * 100)),
      currentPoints: points,
      targetPoints: 500,
      remainingPoints: 500 - points,
    };
  }
  if (points >= 100) {
    return {
      currentLevel: 'متطوع',
      nextLevel: 'متطوع نشط',
      progress: Math.min(100, Math.round(((points - 100) / 150) * 100)),
      currentPoints: points,
      targetPoints: 250,
      remainingPoints: 250 - points,
    };
  }
  return {
    currentLevel: 'مبتدئ',
    nextLevel: 'متطوع',
    progress: Math.min(100, Math.round((points / 100) * 100)),
    currentPoints: points,
    targetPoints: 100,
    remainingPoints: 100 - points,
  };
};
