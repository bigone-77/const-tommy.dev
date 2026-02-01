import { getFormattedDate } from '@/lib/utils';

import { SeriesCard } from './_components/series-card';

const DUMMY_SERIES = [
  {
    id: 'nextjs-15-arch',
    title: 'Next.js 15 실무 아키텍처 가이드',
    description: 'App Router와 Server Actions를 활용한 고성능 웹 서비스 구축기',
    thumbnail:
      'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=1000&auto=format&fit=crop',
    postCount: 5,
    createdAt: new Date().getTime().toString(),
  },
  {
    id: 'frontend-performance',
    title: '프론트엔드 성능 최적화 가이드',
    description:
      'Lighthouse 점수를 넘어 실제 사용자 경험을 개선하는 기술적 접근법',
    thumbnail:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000&auto=format&fit=crop',
    postCount: 3,
    createdAt: new Date().getTime().toString(),
  },
];

export default function SeriesPage() {
  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 duration-500'>
      <div className='grid grid-cols-1 gap-10 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12'>
        {DUMMY_SERIES.map((item) => (
          <SeriesCard
            key={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            postCount={item.postCount}
            excerpt={item.description}
            date={getFormattedDate(
              new Date(Number(item.createdAt)),
              'M월 d일, yyyy년',
            )}
            url={`/series/${item.id}`}
          />
        ))}
      </div>
    </div>
  );
}
