'use client';

import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, SmallTypography } from '@/components/ui/typography';

export function CareerSection() {
  return (
    <section id='career' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='space-y-12'>
          <H2Typography className='flex items-center gap-3 border-none pb-0 text-left'>
            💼 Career
          </H2Typography>

          <div className='border-muted relative ml-2 space-y-16 border-l-2 pl-8'>
            {/* 회사 헤더: 클라모스 */}
            <div className='flex flex-col justify-between gap-6 md:flex-row md:items-start'>
              <div className='flex flex-col items-start gap-4 md:flex-row md:items-start'>
                <div className='relative size-12 shrink-0 overflow-hidden rounded-xl border bg-white shadow-sm md:size-14'>
                  <AppImage
                    src='https://imgs.jobkorea.co.kr/img1/_whitebg/200X80/Co_Logo/Logo/2024/1/31/JK_CO_4vhipL324013115041651.png'
                    alt='(주)클라모스 로고'
                    fill
                  />
                </div>
                <div className='space-y-1.5 text-left'>
                  <h3 className='text-foreground text-2xl font-black tracking-tight'>
                    (주)클라모스
                  </h3>
                  <p className='text-muted-foreground text-xs leading-tight font-medium tracking-wider uppercase'>
                    인프라개발팀 / 연구원
                  </p>
                  <p className='text-muted-foreground/80 max-w-[500px] text-[12px] leading-relaxed font-normal break-keep'>
                    공공기관 대상의 대규모 엔터프라이즈 시스템 통합(SI) 전문
                    기업
                  </p>
                </div>
              </div>
              <SmallTypography className='text-muted-foreground shrink-0 font-mono uppercase'>
                2024.12 — 2026.01
              </SmallTypography>
            </div>

            <div className='space-y-14'>
              {/* 1. 한국환경공단 올바로 */}
              <div className='group relative space-y-6'>
                <div className='border-background bg-primary absolute top-1.5 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />

                <div className='space-y-2'>
                  <h4 className='text-foreground text-2xl leading-snug font-black tracking-tight'>
                    한국환경공단 올바로 차세대 시스템 구축{' '}
                  </h4>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='border-primary/20 bg-primary/5 text-primary rounded-md px-2 text-[10px] font-bold'
                    >
                      팀 개발 (6개월)
                    </Badge>
                    <Badge
                      variant='outline'
                      className='border-muted-foreground/20 bg-muted/5 text-muted-foreground rounded-md px-2 text-[10px] font-bold'
                    >
                      단독 운영 (4개월)
                    </Badge>
                  </div>
                </div>

                <ul className='space-y-6'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      프로젝트 단독 운영 및 고객 대응
                    </strong>
                    6개월 팀 개발 후 4개월 단독 운영으로 전환하여, 추가 기능
                    개발과 안정화, 배포 전반을 단독 담당했습니다. 운영 기간 동안
                    고객사와 직접 기술 협의를 진행하며 요구사항을 조율했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      비표준 그리드 라이브러리(ibSheet)의 React 통합
                    </strong>
                    폐쇄망 환경에서 사용해야 했던 ibSheet가 React의
                    라이프사이클과 어긋나며, 서버 데이터 갱신 시 상태 동기화
                    불일치로 테이블이 재렌더링되거나 무한 스크롤 threshold 통과
                    시 데이터 로딩이 끊기는 문제가 있었습니다. 커스텀 훅 기반의
                    라이프사이클 래퍼를 설계해 발견된 이슈들을 해결하고, React
                    패턴과 일관되게 사용 가능한 인터페이스로 정리했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      반복 서식 대응을 위한 동적 렌더링 구조 설계
                    </strong>
                    50여 종의 공공기관 서식을 매번 정적으로 구현하던 작업의
                    비효율을 줄이기 위해, 스키마를 주입하면 UI가 자동 구성되는
                    동적 렌더링 구조를 설계했습니다. 신규 서식 추가 시 컴포넌트
                    작성 없이 스키마 정의만으로 대응 가능하도록 개선했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      폐쇄망 환경에서의 개발 생산성 개선
                    </strong>
                    외부 라이브러리 도입이 제한된 환경에서 디버깅에 필요한 최소
                    기능의 JSON Viewer를 직접 구현해 팀 내 디버깅 시간 단축에
                    기여했습니다. FSD 기반의 전역 UI 시스템과 폐쇄망 전용 기술
                    문서를 구축해 팀 표준을 정립했고, 평소 부족했던 영역(IP,
                    HTTPS 등 네트워크 기초)을 학습한 뒤 팀원 7명 대상으로 사내
                    세미나를 진행하며 지식 공유 문화에 기여했습니다.
                  </li>
                </ul>

                <div className='flex flex-wrap gap-1.5'>
                  {[
                    'React',
                    'TypeScript',
                    'Zustand',
                    'ibSheet',
                    'WebToB',
                    'NGINX',
                    'Webpack',
                    'Jenkins',
                    'Gitea',
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant='secondary'
                      className='rounded-sm px-1.5 py-0 font-mono text-[10px]'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* 2. 해양경찰 장구류 관리 시스템 */}
              <div className='group relative space-y-6'>
                <div className='border-background bg-primary/60 absolute top-1.5 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />

                <div className='space-y-1'>
                  <h4 className='text-foreground/90 text-xl font-bold tracking-tight'>
                    해양경찰 장구류 관리 시스템 고도화
                  </h4>
                  <p className='text-muted-foreground text-[13px] font-medium'>
                    FSD 아키텍처 환경에서의 공통 UI 시스템 구축 및 문서화
                  </p>
                </div>

                <ul className='space-y-5'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      공통 UI 시스템(Modal/Overlay) 설계
                    </strong>
                    도메인별 독립 개발이 중심이던 FSD 구조에서 공통 모달과
                    오버레이 컴포넌트가 누락되어 있어, 다양한 API 응답 모델에
                    유연하게 대응할 수 있는 인터페이스로 설계했습니다. 실제 API
                    연동을 통해 동작을 검증한 뒤 팀에서 사용할 수 있도록
                    정리했습니다.
                  </li>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      폐쇄망 환경을 고려한 기술 문서 구축
                    </strong>
                    외부 인터넷 사용이 제한적인 폐쇄망 환경을 고려하여, 개발
                    폴더 내에서 바로 접근 가능한 기술 문서(Docs)를 구축했습니다.
                    별도의 외부 참조 없이도 팀원이 공통 컴포넌트의 사용법을
                    확인하고 즉시 활용할 수 있도록 정리했습니다.
                  </li>
                </ul>

                <div className='flex flex-wrap gap-1.5'>
                  {[
                    'React',
                    'FSD Architecture',
                    'UI System Design',
                    'Internal Documentation',
                  ].map((tech) => (
                    <Badge
                      key={tech}
                      variant='outline'
                      className='rounded-sm px-1.5 py-0 font-mono text-[10px] opacity-70'
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
