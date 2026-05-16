'use client';

import { useMemo, useState } from 'react';

import { Code2, Cpu, Database, Globe } from 'lucide-react';

import { BlurFade } from '@/components/ui/blur-fade';
import { IconCloud } from '@/components/ui/icon-cloud';
import { H2Typography, PTypography } from '@/components/ui/typography';
import { cn } from '@/lib/utils';

const LAYER_DATA = [
  {
    id: 1,
    title: 'Core: 프론트엔드 & 라우팅',
    icon: <Code2 className='size-4' />,
    color: 'text-emerald-500',
    indicator: 'bg-emerald-500',
    bgColor: 'bg-emerald-500/10',
    activeBorder: 'border-emerald-500/50',
    description:
      'React와 Next.js(App Router)를 기반으로 화면을 구성합니다. TypeScript의 타입 시스템과 TailwindCSS의 유틸리티 클래스를 조합해 일관성 있는 UI를 유지하려 합니다.',
    slugs: [
      'typescript',
      'javascript',
      'react',
      'nextdotjs',
      'html5',
      'css3',
      'tailwindcss',
      'nextauth',
    ],
  },
  {
    id: 2,
    title: 'Data: 데이터 & 상태 관리',
    icon: <Database className='size-4' />,
    color: 'text-blue-500',
    indicator: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    activeBorder: 'border-blue-500/50',
    description:
      '서버 상태와 클라이언트 상태의 역할을 구분해 관리하는 데 익숙합니다. 프로젝트 성격에 따라 TanStack Query 또는 Apollo Client를 사용했으며, 폼과 데이터 유효성 검증에는 React Hook Form과 Zod를 조합합니다.',
    slugs: [
      'reactquery',
      'redux',
      'apollo',
      'graphql',
      'prisma',
      'postgresql',
      'zod',
      'reacthookform',
    ],
  },
  {
    id: 3,
    title: 'Infra: 인프라 & 협업',
    icon: <Globe className='size-4' />,
    color: 'text-purple-500',
    indicator: 'bg-purple-500',
    bgColor: 'bg-purple-500/10',
    activeBorder: 'border-purple-500/50',
    description:
      'Vercel과 EC2를 사용해 직접 배포해 본 경험이 있습니다. Git/Jira/Confluence/Notion 등 실무 협업 도구에 익숙하며, MSW와 Vitest로 테스트와 모킹 환경을 구성하는 데 친숙합니다.',
    slugs: [
      'vercel',
      'amazonec2',
      'docker',
      'git',
      'figma',
      'slack',
      'microsoftteams',
      'clickup',
      'discord',
      'jira',
      'confluence',
      'notion',
      'pnpm',
      'mockserviceworker',
      'vitest',
      'testinglibrary',
    ],
  },
  {
    id: 4,
    title: 'Extra: 부가적으로 다뤄본 기술',
    icon: <Cpu className='size-4' />,
    color: 'text-orange-500',
    indicator: 'bg-orange-500',
    bgColor: 'bg-orange-500/10',
    activeBorder: 'border-orange-500/50',
    description:
      '주력은 아니지만 프로젝트 과정에서 함께 다뤄본 기술들입니다. Framer Motion으로 인터랙션을 구성하거나, i18next로 다국어 환경을 구성하거나, OpenAI API를 활용해본 경험이 있습니다.',
    slugs: ['openai', 'framer', 'i18next', 'pwa'],
  },
];

const ALL_SLUGS = Array.from(
  new Set(LAYER_DATA.flatMap((layer) => layer.slugs)),
);

export function SkillsetSection() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  const images = useMemo(() => {
    const targetSlugs = activeLayer
      ? LAYER_DATA.find((l) => l.id === activeLayer)?.slugs || ALL_SLUGS
      : ALL_SLUGS;

    return targetSlugs.map(
      (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
    );
  }, [activeLayer]);

  const handleLayerClick = (id: number) => {
    setActiveLayer((prev) => (prev === id ? null : id));
  };

  return (
    <section id='skills' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='space-y-12'>
          <div className='space-y-2 text-center md:text-left'>
            <H2Typography className='border-none pb-0'>
              🛠️ SkillSet
            </H2Typography>
            <PTypography className='text-muted-foreground mt-0 max-w-3xl break-keep'>
              프로젝트에서 사용해 본 기술을{' '}
              <span className='inline-block'>
                <span className='text-foreground font-bold'>
                  네 개 계층으로 나눠 정리
                </span>
              </span>
              했습니다. 레이어를 클릭해 기술 구성을 확인해보세요.
            </PTypography>
          </div>

          <div className='grid items-center gap-12 md:grid-cols-2'>
            {/* ☁️ Left: Icon Cloud Area */}
            <div className='relative flex h-[350px] w-full items-center justify-center overflow-hidden px-4 md:h-[500px]'>
              <div
                key={activeLayer}
                className='animate-in fade-in zoom-in duration-700'
              >
                <IconCloud images={images} />
              </div>
            </div>

            {/* 📑 Right: Interactive Layer Cards */}
            <div className='grid gap-4'>
              {LAYER_DATA.map((layer) => (
                <div
                  key={layer.id}
                  onClick={() => handleLayerClick(layer.id)}
                  className={cn(
                    'group relative cursor-pointer overflow-hidden rounded-xl border p-5 transition-all duration-300',
                    activeLayer === layer.id
                      ? cn(
                          layer.bgColor,
                          layer.activeBorder,
                          'translate-x-2 shadow-lg ring-1 ring-inset',
                          `ring-${layer.indicator.split('-')[1]}-500/20`,
                        )
                      : 'bg-card hover:bg-muted/50 border-border/50 shadow-sm hover:translate-x-1',
                  )}
                >
                  {/* Active Indicator Bar */}
                  <div
                    className={cn(
                      'absolute top-0 left-0 h-full w-1 transition-all duration-300',
                      activeLayer === layer.id
                        ? layer.indicator
                        : 'bg-transparent',
                    )}
                  />

                  <div className='flex items-start gap-4'>
                    <div
                      className={cn(
                        'mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300',
                        activeLayer === layer.id
                          ? 'bg-background shadow-sm'
                          : 'bg-muted/50',
                      )}
                    >
                      <span
                        className={cn(
                          activeLayer === layer.id
                            ? layer.color
                            : 'text-muted-foreground group-hover:text-foreground',
                        )}
                      >
                        {layer.icon}
                      </span>
                    </div>

                    <div className='space-y-1.5'>
                      <h3
                        className={cn(
                          'text-sm font-bold tracking-tight transition-colors',
                          activeLayer === layer.id
                            ? 'text-foreground'
                            : 'text-foreground/80 group-hover:text-foreground',
                        )}
                      >
                        {layer.title}
                      </h3>
                      <p
                        className={cn(
                          'text-[13px] leading-relaxed break-keep transition-colors',
                          activeLayer === layer.id
                            ? 'text-foreground/90'
                            : 'text-muted-foreground',
                        )}
                      >
                        {layer.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
