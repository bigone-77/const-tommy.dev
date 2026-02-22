'use client';

import Link from 'next/link';

import { Layers } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { SeriesUpdateButton } from './series-update-button';

interface SeriesCardProps {
  id: string;
  title: string;
  thumbnail?: string | null;
  postCount: number;
  date: string;
  url: string;
  isAdmin?: boolean;
}

export function SeriesCard({
  id,
  title,
  thumbnail,
  postCount,
  date,
  url,
  isAdmin,
}: SeriesCardProps) {
  return (
    <div className='group relative h-full'>
      {isAdmin && (
        <div
          className='absolute top-3 right-3 z-30 opacity-0 transition-opacity duration-200 group-hover:opacity-100'
          onClick={(e) => e.preventDefault()}
        >
          <SeriesUpdateButton
            id={id}
            initialTitle={title}
            initialThumbnail={thumbnail}
          />
        </div>
      )}

      <Link href={url} className='relative block h-full'>
        <div className='bg-muted-foreground/15 absolute -top-1.5 -right-1.5 z-0 size-full rounded-xl border transition-transform group-hover:-top-2 group-hover:-right-2' />
        <div className='bg-muted-foreground/5 absolute -top-3 -right-3 z-0 size-full rounded-xl border transition-transform group-hover:-top-4 group-hover:-right-4' />

        <Card className='hover:border-primary/40 bg-background relative z-10 flex h-full flex-col overflow-hidden py-0 transition-all duration-300 hover:shadow-xl'>
          <div className='bg-muted relative aspect-video w-full overflow-hidden border-b'>
            <AppImage
              src={thumbnail || '/api/placeholder/400/225'}
              alt={title}
              fill
              imageClassName='object-cover transition-transform duration-500 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
            <div className='absolute top-3 left-3 z-20'>
              <div className='bg-primary text-primary-foreground flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[10px] font-black tracking-wider shadow-md'>
                <Layers size={12} />
                SERIES
              </div>
            </div>
          </div>

          <CardHeader className='flex-1 gap-2 px-6 pt-6 pb-4'>
            <CardTitle className='group-hover:text-primary line-clamp-2 text-xl leading-[1.4] font-extrabold tracking-tight transition-colors'>
              {title}
            </CardTitle>
          </CardHeader>

          <CardContent className='border-t border-zinc-100 px-4 py-4 dark:border-zinc-800'>
            <div className='text-muted-foreground/60 flex items-center overflow-hidden text-[12px] font-medium whitespace-nowrap'>
              <div className='shrink-0'>
                <span>{postCount}개의 포스트</span>
              </div>

              <div
                className='mx-3 h-3 w-[1px] shrink-0 bg-zinc-200 dark:bg-zinc-700'
                aria-hidden='true'
              />

              <div className='flex min-w-0 items-center gap-1'>
                <span className='shrink-0 opacity-80'>업데이트</span>
                <time className='truncate'>{date}</time>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
