'use client';

import Link from 'next/link';

import { Layers } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SeriesCardProps {
  title: string;
  thumbnail?: string | null;
  postCount: number;
  date: string;
  excerpt: string;
  url: string;
}

export function SeriesCard({
  title,
  thumbnail,
  postCount,
  date,
  excerpt,
  url,
}: SeriesCardProps) {
  return (
    <Link href={url} className='group relative block h-full'>
      {/* 겹쳐진 카드 효과 (카드 뒤에 배치) */}
      <div className='bg-muted-foreground/15 absolute -top-1.5 -right-1.5 z-0 size-full rounded-xl border transition-transform group-hover:-top-2 group-hover:-right-2' />
      <div className='bg-muted-foreground/5 absolute -top-3 -right-3 z-0 size-full rounded-xl border transition-transform group-hover:-top-4 group-hover:-right-4' />

      {/* 메인 카드 */}
      <Card className='hover:border-primary/40 bg-background relative z-10 flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:shadow-lg'>
        {/* 상단 썸네일 영역: BlogCard와 동일하게 Full-bleed로 설정 */}
        <div className='bg-muted relative aspect-video w-full overflow-hidden border-b'>
          <AppImage
            src={thumbnail || '/api/placeholder/400/225'}
            alt={title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          {/* 시리즈 뱃지: BlogCard의 태그 위치와 통일 */}
          <div className='absolute top-3 left-3 z-20'>
            <div className='bg-primary text-primary-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-black tracking-wider shadow-md'>
              <Layers size={12} />
              SERIES
            </div>
          </div>
        </div>

        {/* 정보 영역: BlogCard와 텍스트 스타일 및 패딩 완전 통일 */}
        <CardHeader className='flex-1 gap-2 pb-4'>
          <CardTitle className='group-hover:text-primary line-clamp-2 text-lg leading-snug font-bold tracking-tight transition-colors'>
            {title}
          </CardTitle>
          <p className='text-muted-foreground/80 line-clamp-3 text-xs leading-relaxed'>
            {excerpt}
          </p>
        </CardHeader>

        {/* 푸터 영역: BlogCard와 동일한 보더 및 정렬 */}
        <CardContent className='border-t px-5 pt-4 pb-4'>
          <div className='flex items-center justify-between'>
            <time className='text-muted-foreground/80 block font-mono text-[10px] font-medium tracking-widest uppercase'>
              {date}
            </time>
            <span className='text-primary bg-primary/10 rounded px-2 py-0.5 font-mono text-[10px] font-bold'>
              {postCount} POSTS
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
