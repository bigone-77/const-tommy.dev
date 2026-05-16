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

              <div className='flex flex-col gap-2'>
                {/* 첫 번째 문단: 정체성 */}
                <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed'>
                  React 생태계 기반의{' '}
                  <span className='text-foreground font-bold'>
                    사용자 경험(UX)
                  </span>
                  과 함께 일하는 팀의{' '}
                  <span className='text-foreground font-bold'>
                    개발자 경험(DX)
                  </span>
                  을 함께 고민하는 프론트엔드 엔지니어입니다.
                </PTypography>

                {/* 두 번째 문단: 실제 한 일 */}
                <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed'>
                  공공기관 SI 환경에서{' '}
                  <span className='text-foreground font-bold'>
                    비표준 라이브러리의 React 통합
                  </span>
                  과{' '}
                  <span className='text-foreground font-bold'>
                    동적 렌더링 구조 설계
                  </span>
                  를 통해 반복되는 작업의 비효율을 줄이는 데 집중해 왔습니다.
                </PTypography>

                {/* 세 번째 문단: AI 활용 + 검증 의식 */}
                <PTypography className='text-muted-foreground text-base leading-relaxed break-keep md:text-base md:leading-relaxed lg:text-lg lg:leading-relaxed'>
                  AI 도구로 구현 속도를 높이는 한편,{' '}
                  <span className='text-foreground font-bold'>
                    핵심 비즈니스 로직은 직접 설계하고 검증
                  </span>
                  하며 안정성을 유지하려 합니다.
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
