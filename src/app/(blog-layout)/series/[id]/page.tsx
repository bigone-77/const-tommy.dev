import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArrowLeft, LayoutGrid, Library } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { AppLayout } from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { getClient } from '@/lib/apollo-client';
import { BreadcrumbSetter } from '@/lib/breadcrumb-store';
import { getFormattedDate } from '@/lib/utils';

import { BlogCard } from '../../blog/_components/blog-card';
import { GET_SERIES_DETAIL } from './page.queries';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  const { data } = await getClient().query({
    query: GET_SERIES_DETAIL,
    variables: { id },
    fetchPolicy: 'no-cache',
  });

  const series = data?.series;

  if (!series) {
    notFound();
  }

  return (
    <AppLayout>
      <div className='animate-in fade-in slide-in-from-bottom-2 space-y-12 duration-500'>
        <BreadcrumbSetter title={series.title} />

        <header className='space-y-8'>
          <Button
            variant='ghost'
            asChild
            className='text-muted-foreground hover:text-foreground -ml-2 h-8 gap-2 px-2'
          >
            <Link href='/series'>
              <ArrowLeft className='h-4 w-4' />
              <span className='text-sm font-medium'>시리즈 목록</span>
            </Link>
          </Button>

          {series.thumbnail && (
            <div className='bg-muted/30 relative aspect-[4/1] w-full overflow-hidden rounded-3xl border shadow-sm md:aspect-[5/1]'>
              <AppImage
                src={series.thumbnail}
                alt={series.title}
                fill
                imageClassName='object-cover'
                priority
              />
            </div>
          )}

          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
              {!series.thumbnail && (
                <div className='bg-primary/10 text-primary flex h-12 w-12 items-center justify-center rounded-2xl'>
                  <Library className='h-7 w-7' />
                </div>
              )}
              <h1 className='text-4xl font-black tracking-tight md:text-5xl'>
                {series.title}
              </h1>
            </div>

            <div className='text-muted-foreground flex flex-wrap items-center gap-x-6 gap-y-3'>
              <div className='flex items-center gap-2 text-sm font-semibold'>
                <LayoutGrid size={16} className='text-primary' />
                <span className='text-foreground font-bold'>
                  {series.posts.length}개
                </span>
                의 포스트
              </div>
            </div>
          </div>
        </header>

        <hr className='border-border/50' />

        <section className='grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3'>
          {series.posts.map((post, index) => (
            <div key={post.id} className='relative'>
              <div className='bg-background text-primary absolute -top-3 -left-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl border font-mono text-sm font-black italic shadow-md'>
                {String(index + 1).padStart(2, '0')}
              </div>

              <BlogCard
                {...post}
                url={`/blog/${post.id}`}
                date={getFormattedDate(
                  new Date(Number(post.createdAt)),
                  'M월 d일, yyyy년',
                )}
                excerpt={
                  post.content?.replace(/[#*`>_~-]/g, '').slice(0, 130) + '...'
                }
              />
            </div>
          ))}
        </section>

        {series.posts.length === 0 && (
          <div className='text-muted-foreground py-24 text-center font-medium'>
            이 시리즈에 아직 등록된 포스트가 없습니다.
          </div>
        )}
      </div>
    </AppLayout>
  );
}
