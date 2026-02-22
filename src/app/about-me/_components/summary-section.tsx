import { Github, Mail } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H1Typography, PTypography } from '@/components/ui/typography';

import { PrintableResume } from './printable-resume';

export function SummarySection() {
  return (
    <section id='summary' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-12 lg:gap-16'>
          {/* 프로필 이미지 영역 (기존 동일) */}
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

              {/* 연락처 영역 (기존 동일) */}
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
              150개 이상의 컬럼이 포함된 그리드처럼{' '}
              <span className='text-foreground font-bold'>
                데이터 복잡도가 높은 화면을 안정적으로 구현
              </span>
              하는 과정에 집중합니다. <br className='hidden lg:block' />
              <span className='text-foreground font-bold'>
                사업비 24억 원 규모의 엔터프라이즈급 차세대 시스템 구축
              </span>
              에 참여하여, 초기 아키텍처 설계부터 단독 유지보수까지 전 과정을
              책임지며 시스템의{' '}
              <span className='text-foreground font-bold'>
                지속 가능한 성장
              </span>
              을 위한 기술적 대안을 고민합니다.
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
