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

        <header className='space-y-6'>
          {/* 상단 네비게이션 */}
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

          {series.thumbnail ? (
            /* 🟢 테마 유연 대응 히어로 배너 */
            <div className='border-border/50 bg-secondary/30 relative flex min-h-[340px] w-full flex-col overflow-hidden rounded-[2.5rem] border shadow-xl backdrop-blur-sm transition-colors duration-300 md:flex-row dark:bg-zinc-950'>
              {/* 배경 데코레이션: 라이트 모드에선 더 연하게, 다크 모드에선 기똥차게 */}
              <div className='from-primary/10 pointer-events-none absolute top-0 right-0 h-full w-2/3 bg-gradient-to-l to-transparent opacity-50 dark:opacity-100' />

              {/* 썸네일 영역: 'object-contain'으로 사진 원본 비율 사수 */}
              <div className='relative flex items-center justify-center p-8 md:w-1/3 md:p-12'>
                <div className='bg-muted/50 relative aspect-[3/4] h-full max-h-[260px] w-full overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 hover:scale-[1.03] dark:bg-zinc-900/50 dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]'>
                  <AppImage
                    src={series.thumbnail}
                    alt={series.title}
                    fill
                    imageClassName='object-contain p-4' // 패딩을 줘서 사진이 테두리에 붙지 않게
                    priority
                  />
                </div>
              </div>

              {/* 텍스트 영역: 테마에 맞는 텍스트 컬러 적용 */}
              <div className='relative flex flex-1 flex-col justify-center p-8 pt-0 md:p-12 md:pl-0'>
                <div className='mb-5'>
                  <span className='bg-primary/10 text-primary rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-colors'>
                    Series Archive
                  </span>
                </div>

                {/* 텍스트 색상을 text-foreground로 변경하여 테마 자동 대응 */}
                <h1 className='text-foreground text-3xl leading-[1.1] font-black tracking-tighter transition-colors md:text-5xl lg:text-6xl'>
                  {series.title}
                </h1>

                <div className='text-muted-foreground mt-8 flex items-center gap-6'>
                  <div className='flex items-center gap-2.5 font-bold'>
                    <LayoutGrid size={18} className='text-primary' />
                    <span className='text-foreground'>
                      {series.posts.length} Posts
                    </span>
                  </div>
                  <div className='bg-border h-4 w-[1px]' />
                  <div className='text-sm font-medium'>Engineering Record</div>
                </div>
              </div>
            </div>
          ) : (
            /* ⚪️ 썸네일이 없을 때 레이아웃 */
            <div className='flex flex-col gap-6 py-12'>
              <div className='text-foreground flex items-center gap-6'>
                <div className='bg-primary/10 text-primary flex h-16 w-16 items-center justify-center rounded-2xl'>
                  <Library className='h-9 w-9' />
                </div>
                <h1 className='text-4xl font-black tracking-tighter md:text-6xl'>
                  {series.title}
                </h1>
              </div>
              <div className='text-muted-foreground flex items-center gap-2.5 text-sm font-bold'>
                <LayoutGrid size={18} className='text-primary' />
                <span className='text-foreground'>{series.posts.length}개</span>
                의 포스트 기록
              </div>
            </div>
          )}
        </header>

        <hr className='border-border/40' />

        {/* 포스트 리스트 영역 */}
        <section className='grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3'>
          {series.posts.map((post, index) => (
            <div key={post.id} className='relative'>
              <div className='bg-background text-primary absolute -top-4 -left-4 z-20 flex h-10 w-10 items-center justify-center rounded-xl border-2 font-mono text-sm font-black italic shadow-xl transition-colors'>
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
          <div className='text-muted-foreground py-32 text-center font-medium'>
            이 시리즈에 아직 등록된 포스트가 없습니다.
          </div>
        )}
      </div>
    </AppLayout>
  );
}
