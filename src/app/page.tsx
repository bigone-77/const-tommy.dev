import Link from 'next/link';

import {
  ArrowRightIcon,
  BookOpen,
  FolderCode,
  PenTool,
  Sparkles,
  Terminal,
} from 'lucide-react';

import { BlogCard } from '@/app/(blog-layout)/blog/_components/blog-card';
import { AppLayout } from '@/components/app-layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H2Typography } from '@/components/ui/typography';
import {
  GetDailyTilsQuery,
  GetPostsQuery,
  GetProjectsQuery,
} from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_POSTS } from './(blog-layout)/blog/page.queries';
import { ProjectCard } from './project/_components/project-card';
import { GET_PROJECTS } from './project/page.queries';
import { TilCard } from './til/_components/til-card';
import { GET_DAILY_TILS } from './til/page.queries';

export default async function HomePage() {
  const [blogRes, tilsRes, projectsRes] = await Promise.all([
    getClient().query<GetPostsQuery>({
      query: GET_POSTS,
      context: { fetchOptions: { cache: 'no-store' } },
    }),
    getClient().query<GetDailyTilsQuery>({
      query: GET_DAILY_TILS,
      context: { fetchOptions: { cache: 'no-store' } },
    }),
    getClient().query<GetProjectsQuery>({
      query: GET_PROJECTS,
      variables: {
        isFeatured: true,
        take: 3,
      },
      context: { fetchOptions: { cache: 'no-store' } },
    }),
  ]);

  const recentBlogs = blogRes.data?.allPosts?.slice(0, 3) || [];
  const recentTils = tilsRes.data?.allTils?.slice(0, 3) || [];
  const featuredProjects = projectsRes.data?.allProjects || [];

  return (
    <AppLayout className='pt-0'>
      <div className='flex flex-col gap-y-20 py-8 md:gap-y-24 md:py-12'>
        <section className='space-y-8 py-4 md:py-6'>
          <div className='space-y-6'>
            <Badge
              variant='secondary'
              className='bg-primary/10 text-primary border-none px-3 py-1 text-[10px] font-black tracking-widest uppercase md:text-xs'
            >
              <Sparkles className='mr-2 h-3 w-3' /> Front-end Engineer
            </Badge>

            <div className='space-y-5'>
              <div className='flex flex-col gap-3 md:flex-row md:items-center md:gap-4'>
                <div className='flex items-center gap-3'>
                  <Terminal
                    className='text-primary h-8 w-8 shrink-0 md:h-12 lg:h-14 lg:w-14'
                    strokeWidth={2.5}
                  />
                  <h1 className='text-4xl leading-tight font-black tracking-tighter sm:text-6xl lg:text-7xl'>
                    <span className='text-primary whitespace-nowrap'>
                      const
                    </span>
                    <span className='whitespace-nowrap'>-tommy.dev</span>
                  </h1>
                </div>
              </div>

              <p className='text-muted-foreground max-w-[600px] text-base leading-relaxed font-medium break-keep md:text-xl'>
                빠르게 변하는 기술 사이에서{' '}
                <span className='text-foreground font-bold'>
                  변하지 않는 본질
                </span>
                을 고민하고 기록합니다.
              </p>
            </div>
          </div>

          <Button
            size='lg'
            asChild
            className='shadow-primary/20 w-full rounded-full px-8 font-bold shadow-lg transition-all hover:-translate-y-1 sm:w-fit'
          >
            <Link href='/about-me'>소개 더보기</Link>
          </Button>
        </section>

        <section className='space-y-10'>
          <div className='flex items-center justify-between border-b pb-5'>
            <div className='flex items-center gap-2'>
              <BookOpen className='text-primary h-5 w-5' />
              <H2Typography className='border-none pb-0 text-xl font-bold'>
                블로그
              </H2Typography>
            </div>
            <Link
              href='/blog'
              className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
            >
              전체 읽기 <ArrowRightIcon className='h-4 w-4' />
            </Link>
          </div>

          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
            {recentBlogs.map((post) => {
              const excerpt =
                post.content
                  ?.replace(/[#*`>_~-]/g, '')
                  .trim()
                  .slice(0, 120) + '...';
              return (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  url={`/blog/${post.id}`}
                  title={post.title}
                  thumbnail={post.thumbnail || ''}
                  viewCount={post.viewCount}
                  tags={post.tags}
                  excerpt={excerpt}
                  date={getFormattedDate(
                    new Date(Number(post.createdAt)),
                    'yyyy. MM. dd',
                  )}
                  readingTime={post.readingTime}
                />
              );
            })}
          </div>
        </section>

        <section className='grid grid-cols-1 gap-16 md:grid-cols-2'>
          <div className='space-y-10'>
            <div className='flex items-center justify-between border-b pb-5'>
              <div className='flex items-center gap-2'>
                <PenTool className='text-primary h-5 w-5' />
                <H2Typography className='border-none pb-0 text-xl font-bold'>
                  오늘 배운 것
                </H2Typography>
              </div>
              <Link
                href='/til'
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
              >
                전체 읽기 <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>

            <div className='border-border/40 ml-4 space-y-12 border-l-2 py-2 pl-10'>
              {recentTils.map((til) => (
                <TilCard
                  key={til.id}
                  id={til.id}
                  title={til.title}
                  tags={til.tags}
                  content={til.content}
                  date={getFormattedDate(
                    new Date(Number(til.createdAt)),
                    'yyyy. MM. dd',
                  )}
                />
              ))}
            </div>
          </div>

          <div className='space-y-10'>
            <div className='flex items-center justify-between border-b pb-5'>
              <div className='flex items-center gap-2'>
                <FolderCode className='text-primary h-5 w-5' />
                <H2Typography className='border-none pb-0 text-xl font-bold'>
                  프로젝트
                </H2Typography>
              </div>
              <Link
                href='/project'
                className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors'
              >
                전체 읽기 <ArrowRightIcon className='h-4 w-4' />
              </Link>
            </div>

            <div className='grid gap-4'>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} {...project} isFeatured={false} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
