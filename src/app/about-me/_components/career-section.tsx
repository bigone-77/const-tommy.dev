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
                    Main Frontend Developer / Maintenance Lead
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
                      초기 아키텍처 및 핵심 기능 개발 (6개월)
                    </Badge>
                    <Badge
                      variant='outline'
                      className='border-muted-foreground/20 bg-muted/5 text-muted-foreground rounded-md px-2 text-[10px] font-bold'
                    >
                      단독 유지보수 및 고도화 전담 (4개월)
                    </Badge>
                  </div>
                </div>

                <ul className='space-y-6'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      ✨ 비표준 라이브러리의 React 생명주기 통합 및 상태 동기화
                    </strong>
                    로더 기반으로 동작하는 IBSheet8 인스턴스와 React 간의 상태
                    불일치 및 렌더링 타이밍 이슈를 해결하기 위해{' '}
                    <strong>커스텀 훅 기반의 Lifecycle 래퍼를 설계</strong>
                    했습니다. 시트 객체를 React 상태로 캡슐화하여 중복 렌더링과
                    데이터 유실을 방지하고, 50여 종의 서식이 현장 배포
                    환경에서도 동일하게 제어될 수 있는 안정성을 확보했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      🚀 Zustand 기반 동적 서식 엔진 구현 (50여 종 서식 대응)
                    </strong>
                    권한, 서식 상태(임시저장/보완/반려 등), 수출입 여부에 따라
                    실시간으로 변하는{' '}
                    <strong>50여 가지 인허가 서식 로직을 처리</strong>했습니다.
                    Zustand를 활용해 분기별로 필요한 컬럼 스키마를 런타임에서
                    동적으로 주입하는 구조를 설계하여, 대규모 비즈니스
                    요구사항에도 유연하게 대응 가능한 유지보수 환경을
                    구축했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      📊 디버깅 리드타임 단축을 위한 실시간 JSON Viewer 개발
                    </strong>
                    150개 이상의 컬럼 대조 시 발생하는 수동 검증의 비효율을
                    해결하고자{' '}
                    <strong>클라이언트 사이드 데이터 시각화 도구를 제작</strong>
                    했습니다. 요청값의 트리 구조를 직관적으로 확인하게 함으로써
                    데이터 정합성 오류 포착 시간을 획기적으로 단축하고
                    백엔드와의 소통 리소스를 절감했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      🛠️ 현장 네트워크 제약 해결 (WebtoB Reverse Proxy)
                    </strong>
                    보안 정책이 엄격한 현장 배포 환경에서 발생하는 외부 API 통신
                    장애를 <strong>WebtoB 리버스 프록시 설정</strong>으로
                    해결했습니다. 프론트엔드 웹 서버를 경유하는 프록시 계층을
                    직접 구성하여 로컬 환경과 배포 환경 간의 통신 정합성을
                    확보했습니다.
                  </li>
                </ul>

                <div className='flex flex-wrap gap-1.5'>
                  {[
                    'React',
                    'TypeScript',
                    'Zustand',
                    'IBSheet8',
                    'WebtoB',
                    'Nginx',
                    'i18n',
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
                    FSD 아키텍처 기반의 병합 효율화 및 주도적 공통 UI 시스템
                    구축
                  </p>
                </div>

                <ul className='space-y-5'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      ✨ 주도적인 공통 UI 시스템(Modal/Overlay) 설계 및 표준화
                    </strong>
                    독립적인 도메인 개발 중심의 FSD 구조 하에서 누락되었던{' '}
                    <strong>
                      공통 모달 및 오버레이 시스템을 주도적으로 구축
                    </strong>
                    했습니다. 다양한 API 응답 모델에 유연하게 대응할 수 있도록
                    인터페이스를 설계하고 실제 API 연동을 통해 기능을 검증하여,
                    팀원들이 도메인 로직에만 집중할 수 있는 협업 기반을
                    마련했습니다.
                  </li>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      🤝 리드 협의를 통한 기술 지식 자산화 및 문서화
                    </strong>
                    설계한 시스템의 범용성을{' '}
                    <strong>
                      기술 리드(Lead)에게 직접 제안하여 표준으로 채택
                    </strong>
                    시켰습니다. 특히 외부 인터넷 사용이 제한적인 폐쇄망 환경을
                    고려하여{' '}
                    <strong>
                      개발 폴더 내에 인터랙티브한 기술 문서(Docs)를 구축
                    </strong>
                    함으로써, 별도의 외부 참조 없이도 전 팀원이 공통 컴포넌트를
                    즉각 활용할 수 있도록 기여했습니다.
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
