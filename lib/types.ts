export type UserRole = 'volunteer' | 'organization' | 'guest';

export type VolunteerLevel =
  | 'مبتدئ'
  | 'متطوع'
  | 'متطوع نشط'
  | 'متطوع متميز'
  | 'سفير تطوع';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  wilaya: string;
  commune: string;
  points: number;
  volunteerHours: number;
  completedOpportunities: number;
  certificatesCount: number;
  level: VolunteerLevel;
  avatar?: string;
  bio?: string;
  phone?: string;
  birthDate?: string;
  educationLevel?: string;
  specialty?: string;
  skills: string[];
}

export interface Organization {
  id: string;
  name: string;
  type: string;
  wilaya: string;
  commune: string;
  address: string;
  verified: boolean;
  opportunitiesCount: number;
  volunteersCount: number;
  hoursCount: number;
  email: string;
  phone: string;
  registrationNumber: string;
  description: string;
  logo: string;
  coverImage?: string;
  foundedYear?: string;
  website?: string;
}

export type OpportunityType = 'حضوري' | 'عن بعد' | 'مختلط';
export type OpportunityStatus = 'open' | 'closed' | 'draft';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  organizationId: string;
  organizationName: string;
  organizationLogo: string;
  category: string;
  wilaya: string;
  commune: string;
  duration: string;
  type: OpportunityType;
  points: number;
  volunteersNeeded: number;
  volunteersRegistered: number;
  status: OpportunityStatus;
  image: string;
  startDate: string;
  endDate: string;
  requirements: string[];
  benefits: string[];
  duties: string[];
  urgent?: boolean;
  featured?: boolean;
}

export type ApplicationStatus = 'pending' | 'accepted' | 'completed' | 'rejected';

export interface Application {
  id: string;
  opportunityId: string;
  opportunityTitle: string;
  opportunityImage: string;
  organizationName: string;
  organizationLogo?: string;
  volunteerId: string;
  volunteerName: string;
  volunteerEmail: string;
  volunteerPhone: string;
  volunteerWilaya: string;
  appliedDate: string;
  status: ApplicationStatus;
  pointsAwarded?: number;
  rating?: number;
  note?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  order: number;
  videoUrl?: string;
  summary: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  rating: number;
  learnersCount: number;
  duration: string;
  lessonsCount: number;
  image: string;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  outcomes: string[];
  certificatePriceDzd: number;
  certificatePricePoints: number;
  lessons: Lesson[];
  featured?: boolean;
}

export interface Certificate {
  id: string;
  certificateCode: string;
  courseId: string;
  courseTitle: string;
  recipientName: string;
  issueDate: string;
  paymentMethod: 'edahabia' | 'points';
  pricePaid: string;
  verified: boolean;
}

export interface Donation {
  id: string;
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  image: string;
  organizationName: string;
  daysLeft: number;
  urgent?: boolean;
  featured?: boolean;
  updates?: {
    date: string;
    title: string;
    content: string;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'application' | 'points' | 'certificate' | 'opportunity';
  link?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  unlockedAt?: string;
}

export interface PointTransaction {
  id: string;
  title: string;
  points: number;
  type: 'credit' | 'debit';
  date: string;
  category: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  wilaya: string;
  points: number;
  volunteerCount: number;
  level: VolunteerLevel;
}
