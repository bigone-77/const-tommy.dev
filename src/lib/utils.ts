import { type ClassValue, clsx } from 'clsx';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFormattedDate = (
  date: string | Date | null | undefined,
  formatStr: string,
): string => {
  if (!date) return '';

  let d: Date;
  if (typeof date === 'string' && /^\d+$/.test(date)) {
    d = new Date(Number(date));
  } else {
    d = typeof date === 'string' ? new Date(date) : date;
  }

  if (isNaN(d.getTime())) return '';

  const KST_OFFSET = 9 * 60;
  const browserOffset = d.getTimezoneOffset();
  const shiftedDate = new Date(
    d.getTime() + (KST_OFFSET + browserOffset) * 60 * 1000,
  );

  return format(shiftedDate, formatStr, { locale: ko });
};

export const getNowKst = (): Date => new Date();

export const calculateReadingTime = (content: string): number => {
  const WORDS_PER_MINUTE = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = words / WORDS_PER_MINUTE;
  const roundedTime = Math.ceil(minutes / 5) * 5;

  return Math.max(5, roundedTime);
};

export function parseTilDate(date: string | undefined): Date {
  if (!date) return getNowKst();

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(`${date}T00:00:00+09:00`);
  }

  const isNumeric = /^\d+$/.test(date);
  const parsed = isNumeric ? new Date(Number(date)) : new Date(date);
  return isNaN(parsed.getTime()) ? getNowKst() : parsed;
}
