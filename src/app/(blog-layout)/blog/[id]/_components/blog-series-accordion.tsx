'use client';

import Link from 'next/link';

import { useQuery } from '@apollo/client/react';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import {
  ChevronLeft,
  ChevronRight,
  Library,
  Loader2,
  PlayCircle,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { GET_SERIES_NAV } from '../page.queries';

interface Props {
  seriesId: string;
  currentPostId: string;
}

export function BlogSeriesAccordion({ seriesId, currentPostId }: Props) {
  const { data, loading, error } = useQuery(GET_SERIES_NAV, {
    variables: { id: seriesId },
    skip: !seriesId || seriesId === 'none',
  });

  if (!seriesId || seriesId === 'none' || error) return null;
  if (loading)
    return (
      <div className='bg-muted/10 my-12 flex h-24 items-center justify-center rounded-2xl border border-dashed'>
        <Loader2 className='text-muted-foreground h-5 w-5 animate-spin' />
      </div>
    );

  const series = data?.series;
  if (!series) return null;

  const currentIndex = series.posts.findIndex(
    (p: any) => p.id === currentPostId,
  );
  const totalPosts = series.posts.length;

  return (
    <div className='bg-muted/5 group hover:bg-muted/10 relative my-16 overflow-hidden rounded-2xl border transition-all'>
      {/* 🟢 Tommy Identity: 왼쪽 브랜드 포인트 라인 */}
      <div className='bg-primary absolute inset-y-0 left-0 w-1' />

      <div className='p-6'>
        {/* 상단 섹션: 시리즈 정보 및 퀵 네비게이션 */}
        <div className='mb-6 flex items-start justify-between gap-4'>
          <div className='space-y-1.5'>
            <div className='text-primary flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase'>
              <Library size={12} strokeWidth={3} />
              <span>Series Collection</span>
            </div>
            <Link
              href={`/series/${series.id}`}
              className='hover:text-primary block text-xl font-bold tracking-tight transition-colors md:text-2xl'
            >
              {series.title}
            </Link>
          </div>

          {/* 콤팩트 컨트롤러 */}
          <div className='bg-background/50 flex items-center gap-1.5 rounded-full border p-1 shadow-sm backdrop-blur-sm'>
            <Button
              variant='ghost'
              size='icon'
              className='h-7 w-7 rounded-full'
              disabled={currentIndex <= 0}
              asChild={currentIndex > 0}
            >
              {currentIndex > 0 ? (
                <Link href={`/blog/${series.posts[currentIndex - 1].id}`}>
                  <ChevronLeft className='h-4 w-4' />
                </Link>
              ) : (
                <ChevronLeft className='h-4 w-4 opacity-20' />
              )}
            </Button>
            <span className='px-1 font-mono text-[11px] font-bold'>
              {currentIndex + 1}{' '}
              <span className='text-muted-foreground/50 mx-0.5'>/</span>{' '}
              {totalPosts}
            </span>
            <Button
              variant='ghost'
              size='icon'
              className='h-7 w-7 rounded-full'
              disabled={currentIndex >= totalPosts - 1}
              asChild={currentIndex < totalPosts - 1}
            >
              {currentIndex < totalPosts - 1 ? (
                <Link href={`/blog/${series.posts[currentIndex + 1].id}`}>
                  <ChevronRight className='h-4 w-4' />
                </Link>
              ) : (
                <ChevronRight className='h-4 w-4 opacity-20' />
              )}
            </Button>
          </div>
        </div>

        {/* 🟢 Fumadocs UI Accordion 통합 */}
        <Accordions type='single' collapsible className='border-none'>
          <Accordion
            title='시리즈 목록 전체보기'
            className='bg-muted/30 hover:bg-muted/50 rounded-lg border-none px-4 py-0 text-xs font-bold transition-colors'
          >
            <nav className='grid gap-1 pt-4'>
              {series.posts.map((post: any, index: number) => {
                const isActive = post.id === currentPostId;
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className={cn(
                      'group/item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                      isActive
                        ? 'bg-primary/10 text-primary shadow-sm'
                        : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <div className='relative flex h-5 w-5 items-center justify-center font-mono text-[11px] font-bold italic'>
                      {isActive ? (
                        <PlayCircle className='h-4 w-4 animate-pulse' />
                      ) : (
                        <span className='group-hover/item:text-primary transition-colors'>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                    </div>
                    <span
                      className={cn(
                        'line-clamp-1 text-[13px] font-medium transition-all',
                        isActive && 'font-extrabold',
                      )}
                    >
                      {post.title}
                    </span>
                    {isActive && (
                      <div className='ml-auto flex items-center gap-1.5'>
                        <span className='text-[9px] font-black tracking-widest uppercase opacity-60'>
                          Now Reading
                        </span>
                        <div className='bg-primary size-1 animate-ping rounded-full' />
                      </div>
                    )}
                  </Link>
                );
              })}
            </nav>
          </Accordion>
        </Accordions>
      </div>
    </div>
  );
}
