import { ProjectCard } from '@/app/project/_components/project-card';
import { GET_PROJECTS } from '@/app/project/page.queries';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, PTypography } from '@/components/ui/typography';
import { getClient } from '@/lib/apollo-client';

export async function ProjectsSection() {
  const { data } = await getClient().query({
    query: GET_PROJECTS,
    variables: { isFeatured: null, status: null, take: null },
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const allProjects = data?.allProjects || [];

  if (allProjects.length === 0) return null;

  return (
    <section id='projects' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='space-y-12'>
          {/* 헤더 섹션 */}
          <div className='flex flex-col items-start justify-between gap-4 md:flex-row md:items-end'>
            <div className='space-y-2'>
              <H2Typography className='border-none pb-0 text-left'>
                🚀 Projects
              </H2Typography>
              <PTypography className='text-muted-foreground mt-0 max-w-2xl break-keep'>
                주어진 제약 사항을 해결하고{' '}
                <span className='inline-block'>
                  <span className='text-foreground font-bold'>
                    안정적인 시스템을 설계하기 위해 고민한
                  </span>
                </span>{' '}
                기록입니다.
              </PTypography>
            </div>

            {/* 프로젝트 총 개수 표시 배지 */}
            <div className='border-primary/20 bg-primary/5 text-primary flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-widest shadow-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75'></span>
                <span className='bg-primary relative inline-flex h-2 w-2 rounded-full'></span>
              </span>
              TOTAL {allProjects.length} PROJECTS
            </div>
          </div>

          {/* 프로젝트 그리드: 4개 제한 없이 전체 출력 */}
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2'>
            {allProjects.map((project, i) => (
              <BlurFade key={project.id} delay={0.5 + i * 0.05} inView>
                <div className='group transition-all duration-300 hover:-translate-y-2'>
                  <ProjectCard {...project} isFeatured={true} />
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
