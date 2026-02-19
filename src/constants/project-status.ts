export const PROJECT_STATUS_CONFIG = {
  LIVE: {
    label: '운영 중',
    variant: 'default' as const,
    class: `
      bg-emerald-100 text-emerald-900 border-emerald-200
      dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30
      px-3 py-1.5 text-[12px] font-bold tracking-tight shadow-sm
      backdrop-blur-md
    `,
  },
  DEVELOPING: {
    label: '개발 중',
    variant: 'secondary' as const,
    class: `
      bg-orange-100 text-orange-900 border-orange-200
      dark:bg-orange-500/20 dark:text-orange-400 dark:border-orange-500/30
      px-3 py-1.5 text-[12px] font-bold tracking-tight shadow-sm
      backdrop-blur-md
    `,
  },
  ARCHIVED: {
    label: '보관됨',
    variant: 'outline' as const,
    class: `
      bg-gray-100 text-gray-900 border-gray-200
      dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700
      px-3 py-1.5 text-[12px] font-bold tracking-tight shadow-sm
      backdrop-blur-md
    `,
  },
} as const;
