import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyDZD(amount: number): string {
  return `${amount.toLocaleString('ar-DZ')} دج`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('ar-DZ');
}

export function generateId(prefix = 'id'): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

export function generateCertificateCode(): string {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `TW-2026-${randomNum}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
