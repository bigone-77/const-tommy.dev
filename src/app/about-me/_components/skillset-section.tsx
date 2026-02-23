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
    title: 'Layer 1: 프론트엔드 핵심 & BFF',
    icon: <Code2 className='size-4' />,
    color: 'text-emerald-500',
    indicator: 'bg-emerald-500',
    bgColor: 'bg-emerald-500/10',
    activeBorder: 'border-emerald-500/50',
    description:
      'Next.js(App Router) 기반의 BFF 구조를 설계하여 최적화된 데이터 인터페이스를 구축합니다. 엄격한 타입 시스템을 통해 안정적이고 확장 가능한 아키텍처를 지향합니다.',
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
    title: 'Layer 2: 데이터 및 상태 관리',
    icon: <Database className='size-4' />,
    color: 'text-blue-500',
    indicator: 'bg-blue-500',
    bgColor: 'bg-blue-500/10',
    activeBorder: 'border-blue-500/50',
    description:
      '서버 상태 동기화와 클라이언트 전역 상태의 역할을 명확히 구분하여 관리합니다. 아키텍처에 따라 TanStack Query나 Apollo Client를 선택적으로 운용하며, 데이터 무결성을 위해 Zod와 Hook Form을 연계합니다.',
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
    title: 'Layer 3: 인프라 및 협업 환경',
    icon: <Globe className='size-4' />,
    color: 'text-purple-500',
    indicator: 'bg-purple-500',
    bgColor: 'bg-purple-500/10',
    activeBorder: 'border-purple-500/50',
    description:
      'Vercel, EC2 등 적합한 배포 인프라를 구축합니다. 실무 대다수의 협업 도구를 경험하여 새로운 툴 도입에도 즉시 적응하며, 기획/디자인과 기민하게 소통하여 팀 워크플로우를 최적화합니다.',
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
    title: 'Layer 4: 특화 기술 및 UX 고도화',
    icon: <Cpu className='size-4' />,
    color: 'text-orange-500',
    indicator: 'bg-orange-500',
    bgColor: 'bg-orange-500/10',
    activeBorder: 'border-orange-500/50',
    description:
      '실시간 비전 연산 최적화와 같이 기술 난도가 높은 문제를 해결하는 데 즐거움을 느낍니다. i18n 확장성 확보와 Framer Motion 설계를 통해 사용자가 몰입할 수 있는 완성도 높은 결과물을 만듭니다.',
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
              🛠️ 기술 스택
            </H2Typography>
            <PTypography className='text-muted-foreground mt-0 max-w-3xl break-keep'>
              단순한 도구의 나열보다{' '}
              <span className='inline-block'>
                <span className='text-foreground font-bold'>
                  각 기술 계층의 유기적인 결합
                </span>
              </span>
              을 통해 문제를 해결합니다. 레이어를 클릭해 기술 구성을
              확인해보세요.
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
