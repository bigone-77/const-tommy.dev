import { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { remarkGfm } from 'fumadocs-core/mdx-plugins';
import { DocsBody } from 'fumadocs-ui/page';
import { ArrowLeft, Calendar, Github, Globe, Hammer } from 'lucide-react';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';

import { AppImage } from '@/components/app-image';
import { AppLayout } from '@/components/app-layout';
import { ReadProgressBar } from '@/components/read-progressbar';
import { TableOfContents } from '@/components/table-of-contents';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { H1Typography } from '@/components/ui/typography';
import { PROJECT_STATUS_CONFIG } from '@/constants/project-status';
import { GetProjectQuery } from '@/generated/gql/graphql';
import { getClient } from '@/lib/apollo-client';
import { BreadcrumbSetter } from '@/lib/breadcrumb-store';
import { extractHeadings } from '@/lib/toc';
import { cn } from '@/lib/utils';
import { getMDXComponents } from '@/mdx-components';

import { GET_PROJECT } from '../page.queries';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const { data } = await getClient().query<GetProjectQuery>({
    query: GET_PROJECT,
    variables: { id },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const project = data?.project;

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const { title, description, thumbnail } = project;
  const ogImage = thumbnail || '/og-image.png';

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/project/${id}`,
    },
    openGraph: {
      title: `${title} | const-tommy.dev`,
      description: description,
      url: `/project/${id}`,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} 프로젝트 썸네일`,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;

  const { data } = await getClient().query<GetProjectQuery>({
    query: GET_PROJECT,
    variables: { id },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const project = data?.project;
  if (!project) return notFound();

  const statusInfo =
    PROJECT_STATUS_CONFIG[
      project.status.toUpperCase() as keyof typeof PROJECT_STATUS_CONFIG
    ];

  const headings = extractHeadings(project.content);
  const hasToc = headings?.length > 0;

  return (
    <AppLayout
      aside={
        hasToc ? (
          <div className='border-border bg-card sticky top-24 rounded-xl border p-5 shadow-sm'>
            <p className='text-muted-foreground/50 mb-3 text-[11px] font-bold tracking-widest uppercase'>
              목차
            </p>
            <TableOfContents headings={headings} />
          </div>
        ) : null
      }
    >
      <ReadProgressBar />
      <BreadcrumbSetter title={project.title} />

      <div className='space-y-12 pb-20'>
        <div className='flex items-center justify-between'>
          <Button
            variant='ghost'
            asChild
            className='text-muted-foreground hover:text-foreground h-8 gap-2 px-2'
          >
            <Link href='/project'>
              <ArrowLeft className='h-4 w-4' />
              <span className='text-sm font-medium'>목록으로</span>
            </Link>
          </Button>
        </div>

        <section className='space-y-8'>
          <div className='relative aspect-[21/9] w-full overflow-hidden rounded-3xl border shadow-2xl'>
            <AppImage
              src={project.thumbnail}
              alt={project.title}
              fill
              imageClassName='object-cover'
              className='transition-transform duration-500'
              priority
            />
          </div>

          <div className='space-y-6'>
            <div className='flex flex-wrap items-center gap-3'>
              <Badge
                variant={statusInfo.variant}
                className={cn('transition-all', statusInfo.class)}
              >
                {statusInfo.label}
              </Badge>
            </div>

            <div className='space-y-4'>
              <H1Typography
                className={cn(
                  'text-start font-black tracking-tighter transition-all duration-700',
                  project.isFeatured
                    ? 'from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-5xl lg:text-7xl'
                    : 'text-4xl lg:text-5xl',
                )}
              >
                {project.title}
              </H1Typography>

              <p className='text-muted-foreground max-w-[800px] text-lg leading-relaxed font-medium'>
                {project.description}
              </p>
            </div>

            <div className='flex flex-wrap gap-4 pt-2'>
              {project.liveUrl && (
                <Button
                  asChild
                  size='lg'
                  className='rounded-full px-8 font-bold shadow-lg transition-transform hover:-translate-y-1'
                >
                  <a
                    href={project.liveUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Globe className='mr-2 h-5 w-5' /> 라이브 데모
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  asChild
                  variant='outline'
                  size='lg'
                  className='rounded-full px-8 font-bold transition-transform hover:-translate-y-1'
                >
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <Github className='mr-2 h-5 w-5' /> GitHub 저장소
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        <section className='grid grid-cols-1 gap-6 md:grid-cols-2 md:items-stretch'>
          <div className='bg-muted/30 hover:bg-muted/50 flex h-full items-start gap-4 rounded-2xl border p-6 transition-all'>
            <div className='bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm'>
              <Calendar className='text-primary h-5 w-5' />
            </div>
            <div className='flex flex-col'>
              <p className='text-muted-foreground text-[11px] font-bold tracking-widest uppercase'>
                진행 기간
              </p>
              <p className='mt-2 font-mono text-sm leading-none font-semibold'>
                {project.period}
              </p>
            </div>
          </div>

          <div className='bg-muted/30 hover:bg-muted/50 flex h-full items-start gap-4 rounded-2xl border p-6 transition-all'>
            <div className='bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-sm'>
              <Hammer className='text-primary h-5 w-5' />
            </div>
            <div className='flex flex-1 flex-col'>
              <p className='text-muted-foreground text-[11px] font-bold tracking-widest uppercase'>
                핵심 기술
              </p>
              <div className='mt-3 flex flex-wrap gap-1.5'>
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className='bg-background/80 border-border/50 hover:border-primary/30 rounded-md border px-2 py-0.5 text-[11px] font-bold shadow-sm transition-colors'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <hr className='border-border/50' />

        <article className='prose dark:prose-invert prose-lg max-w-none'>
          <DocsBody>
            <MDXRemote
              source={project.content}
              components={getMDXComponents()}
              options={{
                mdxOptions: {
                  format: 'md',
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [
                    rehypeRaw,
                    [
                      rehypePrettyCode,
                      {
                        theme: { dark: 'one-dark-pro', light: 'github-light' },
                        keepBackground: true,
                        showLineNumbers: true,
                      },
                    ],
                    rehypeSlug,
                  ],
                },
              }}
            />
          </DocsBody>
        </article>
      </div>
    </AppLayout>
  );
}
