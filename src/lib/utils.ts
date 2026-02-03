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
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return '';

  const kstString = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(dateObj);

  const kstDate = new Date(kstString);
  return format(kstDate, formatStr, { locale: ko });
};

export const getNowKst = (): Date => {
  return new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  );
};

export const calculateReadingTime = (content: string): number => {
  const WORDS_PER_MINUTE = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = words / WORDS_PER_MINUTE;
  const roundedTime = Math.ceil(minutes / 5) * 5;
  return Math.max(5, roundedTime);
};

export function parseTilDate(date: string | undefined): Date {
  if (!date) return getNowKst();
  const isNumeric = /^\d+$/.test(date);
  const parsed = isNumeric ? new Date(Number(date)) : new Date(date);
  return isNaN(parsed.getTime()) ? getNowKst() : parsed;
}
