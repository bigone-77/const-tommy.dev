import { Github, Mail } from 'lucide-react';

import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import {
  H1Typography,
  H2Typography,
  PTypography,
} from '@/components/ui/typography';

import { PrintableResume } from './printable-resume';

export function SummarySection() {
  return (
    <section id='summary' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='space-y-12'>
          <H2Typography className='flex items-center gap-3 border-none pb-0 text-left'>
            👤 Summary
          </H2Typography>
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

              <div className='flex flex-col'>
                {/* 첫 번째 문단 */}
                <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-loose'>
                  React 생태계에 대한 이해를 바탕으로, 뛰어난{' '}
                  <span className='text-foreground font-bold'>
                    사용자 경험(UX)은 물론 팀을 위한 개발자 경험(DX)
                  </span>
                  을 깊이 고민하는 프론트엔드 엔지니어입니다.
                </PTypography>

                <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-loose'>
                  복잡한 요구사항 앞에서도 주도적으로 기술적 대안을 모색하며,{' '}
                  <span className='text-foreground font-bold'>
                    AI 툴을 적극 활용하여 아이디어를 빠르게 구현해 내는 실행력
                  </span>
                  이 저의 강점입니다. 이를 바탕으로 유연한 설계와 안정적인
                  구현을 이끌며{' '}
                  <span className='text-foreground font-bold'>
                    지속 가능한 서비스
                  </span>
                  를 만들어가는 과정을 즐깁니다.
                </PTypography>
              </div>

              <div className='flex justify-center md:justify-end'>
                <PrintableResume />
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
