import Link from 'next/link';

import { Project } from '@prisma/client';
import { ArrowUpRight, Calendar, Github, Globe } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PROJECT_STATUS_CONFIG } from '@/constants/project-status';
import { cn } from '@/lib/utils';

interface Props extends Pick<
  Project,
  | 'id'
  | 'title'
  | 'thumbnail'
  | 'description'
  | 'techHighlights'
  | 'techStack'
  | 'period'
  | 'status'
  | 'githubUrl'
  | 'liveUrl'
> {
  isFeatured?: boolean;
  className?: string;
}

export function ProjectCard({
  id,
  title,
  description,
  thumbnail,
  techHighlights,
  techStack,
  period,
  status,
  githubUrl,
  liveUrl,
  isFeatured,
  className,
}: Props) {
  const statusStyle =
    PROJECT_STATUS_CONFIG[
      status.toUpperCase() as keyof typeof PROJECT_STATUS_CONFIG
    ];

  return (
    <div className={cn('group relative h-full', className)}>
      <Link
        href={`/project/${id}`}
        className='absolute inset-0 z-0'
        aria-label={`${title} 상세 보기`}
      />

      <Card className='hover:border-primary/40 pointer-events-none relative flex h-full flex-col overflow-hidden py-0 transition-all duration-300 group-hover:shadow-xl'>
        {/* 1. 썸네일 영역: 가독성 높은 상태 뱃지 배치 */}
        <div
          className={cn(
            'bg-muted relative w-full overflow-hidden border-b transition-all',
            isFeatured ? 'aspect-[2.2/1]' : 'aspect-[16/10]',
          )}
        >
          <AppImage
            src={thumbnail}
            alt={title}
            fill
            imageClassName='object-cover'
            className='transition-transform duration-500'
          />
          {/* 상태 뱃지 위치 및 크기 최적화 */}
          <div className='absolute top-4 left-4 z-10'>
            <span
              className={cn(
                'rounded-lg border shadow-sm backdrop-blur-md transition-all select-none',
                statusStyle.class,
              )}
            >
              {statusStyle.label}
            </span>
          </div>
        </div>

        {/* 2. 카드 헤더: 제목 및 설명 가독성 강화 */}
        <CardHeader
          className={cn(
            'flex-1 gap-3', // gap을 늘려 요소 간 여유 확보
            isFeatured ? 'px-7 pt-7 pb-5' : 'px-5 pt-5 pb-4',
          )}
        >
          <div className='flex items-start justify-between gap-2'>
            <CardTitle
              className={cn(
                'group-hover:text-primary line-clamp-1 leading-snug font-black tracking-tighter transition-colors',
                isFeatured ? 'text-2xl' : 'text-lg', // 텍스트 크기 상향
              )}
            >
              {title}
            </CardTitle>
            <ArrowUpRight className='text-muted-foreground/30 group-hover:text-primary h-5 w-5 shrink-0 transition-colors' />
          </div>

          <p
            className={cn(
              'text-muted-foreground/80 leading-relaxed font-medium',
              isFeatured
                ? 'line-clamp-2 text-base'
                : 'line-clamp-2 text-[14px]', // 설명 크기 상향
            )}
          >
            {description}
          </p>

          {/* 기술 스택 해시태그 크기 상향 */}
          <div className='mt-2 flex flex-wrap gap-x-3 gap-y-1.5'>
            {techStack.slice(0, isFeatured ? 6 : 4).map((tech) => (
              <span
                key={tech}
                className='text-muted-foreground/60 text-[12px] font-semibold tracking-tight'
              >
                #{tech}
              </span>
            ))}
          </div>

          {/* 기술 하이라이트 뱃지 크기 및 패딩 상향 */}
          <div className='mt-3 flex flex-wrap gap-2'>
            {techHighlights.slice(0, 2).map((highlight) => (
              <span
                key={highlight}
                className={cn(
                  'bg-primary/5 text-primary/80 border-primary/20 rounded-md border font-bold shadow-sm',
                  isFeatured
                    ? 'px-2.5 py-1 text-[11px]'
                    : 'px-2 py-0.5 text-[10px]',
                )}
              >
                {highlight}
              </span>
            ))}
          </div>
        </CardHeader>

        {/* 3. 카드 푸터: 진행 기간 가독성 강화 */}
        <CardContent
          className={cn(
            'bg-muted/5 mt-auto border-t', // 푸터에 미세한 배경색 추가
            isFeatured ? 'px-7 py-5' : 'px-5 py-4',
          )}
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Calendar size={14} className='text-muted-foreground/50' />
              <span className='text-muted-foreground/90 font-mono text-[12px] font-bold tracking-tight uppercase'>
                {period}
              </span>
            </div>

            {/* 링크 아이콘 크기 최적화 */}
            <div className='pointer-events-auto relative z-10 flex items-center gap-4'>
              {githubUrl && (
                <a
                  href={githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground/40 hover:text-foreground p-1 transition-colors'
                >
                  <Github size={18} />
                </a>
              )}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-muted-foreground/40 hover:text-primary p-1 transition-colors'
                >
                  <Globe size={18} />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
