import { Github, Mail } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { Highlighter } from '@/components/ui/highlighter';
import { H1Typography, PTypography } from '@/components/ui/typography';

import { PrintableResume } from './printable-resume';

export function SummarySection() {
  const PRIMARY_HEX = '#10b981';

  return (
    <section id='summary' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16'>
          {/* 프로필 이미지 영역 (기본 동일) */}
          <div className='group bg-muted/30 relative aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-[2.5rem] border p-1 shadow-sm transition-all duration-500 hover:shadow-lg md:w-40 lg:w-48'>
            <div className='relative h-full w-full overflow-hidden rounded-[calc(2.5rem-4px)]'>
              <AppImage
                src='https://res.cloudinary.com/dpzexzf44/image/upload/v1769689309/1630281-20408-Picsart-AiImageEnhancer_yewdnk.png'
                alt='신태일 프로필'
                fill
                priority
                className='transition-transform duration-700 group-hover:scale-105'
                imageClassName='object-cover'
              />
            </div>
          </div>

          <div className='flex-1 space-y-6 text-center md:text-left'>
            <div className='space-y-4'>
              <div className='flex flex-col items-center gap-3 md:flex-row'>
                <H1Typography className='text-3xl font-black tracking-tight md:text-3xl lg:text-4xl'>
                  신태일
                </H1Typography>
                <Badge
                  variant='outline'
                  className='border-primary/30 bg-primary/5 text-primary rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase'
                >
                  Frontend Engineer
                </Badge>
              </div>

              {/* 연락처 영역 (기본 동일) */}
              <div className='flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start'>
                <a
                  href='mailto:taeil012@gmail.com'
                  className='group text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors'
                >
                  <Mail className='size-4' />
                  <span className='font-mono text-sm font-medium tracking-tight'>
                    taeil012@gmail.com
                  </span>
                </a>
                <a
                  href='https://github.com/bigone-77'
                  className='group text-muted-foreground hover:text-primary flex items-center gap-2 transition-colors'
                >
                  <Github className='size-4' />
                  <span className='font-mono text-sm font-medium tracking-tight'>
                    GitHub
                  </span>
                </a>
              </div>
            </div>

            <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-loose'>
              수만 건의 데이터를 다루는{' '}
              <span className='text-foreground font-bold'>
                대규모 데이터 그리드 최적화
              </span>
              부터 실시간 인터랙티브 로직까지, 비즈니스의 복잡도를 정교한
              아키텍처로 구현합니다.{' '}
              <span className='mx-1 inline-block'>
                <Highlighter
                  action='underline'
                  color={PRIMARY_HEX}
                  strokeWidth={2}
                  animationDuration={1000}
                >
                  <span className='text-foreground font-bold'>
                    BFF 구조 설계를 통해 복잡한 요구사항을 유연한 데이터
                    인터페이스로 전환하며
                  </span>
                </Highlighter>
              </span>
              , 문제를 마주하고 해결하는 모든 과정을 기록하며 시스템의{' '}
              <span className='text-foreground font-bold'>
                지속 가능한 성장
              </span>
              을 지향합니다.
            </PTypography>

            <div className='flex justify-center md:justify-start'>
              <PrintableResume />
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
