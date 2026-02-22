import { AppImage } from '@/components/app-image';
import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, SmallTypography } from '@/components/ui/typography';

export function CareerSection() {
  return (
    <section id='career' className='scroll-mt-32'>
      <BlurFade delay={0.2} inView>
        <div className='space-y-12'>
          <H2Typography className='flex items-center gap-3 border-none pb-0 text-left'>
            💼 Career
          </H2Typography>

          <div className='border-muted relative ml-2 space-y-16 border-l-2 pl-8'>
            {/* 회사 헤더 */}
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
                  <p className='text-muted-foreground text-xs leading-tight font-medium'>
                    인프라개발팀 / 프론트엔드 엔지니어
                  </p>
                  <p className='text-muted-foreground/80 max-w-[500px] text-[12px] leading-relaxed font-normal break-keep'>
                    공공기관 및 대규모 기업 대상의 시스템 통합(SI)과
                    엔터프라이즈 솔루션을 제공하는 IT 전문 기업입니다.
                  </p>
                </div>
              </div>
              <SmallTypography className='text-muted-foreground shrink-0 font-mono uppercase'>
                2024.12 — 2025.12
              </SmallTypography>
            </div>

            <div className='space-y-14'>
              {/* 1. 한국환경공단 올바로 */}
              <div className='group relative space-y-6'>
                <div className='border-background bg-primary absolute top-1.5 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />

                <div className='space-y-2'>
                  <p className='text-primary text-[10px] font-bold tracking-[0.2em] uppercase'>
                    Main Frontend Developer / Maintenance Lead
                  </p>
                  <h4 className='text-foreground text-2xl leading-snug font-black tracking-tight'>
                    한국환경공단 올바로 <br className='md:hidden' /> 차세대
                    시스템 구축
                  </h4>
                  <div className='flex items-center gap-2'>
                    <Badge
                      variant='outline'
                      className='border-primary/20 bg-primary/5 text-primary rounded-md px-2 text-[10px]'
                    >
                      핵심 기능 및 전 페이지 개발
                    </Badge>
                    <Badge
                      variant='outline'
                      className='border-muted-foreground/20 bg-muted/5 text-muted-foreground rounded-md px-2 text-[10px]'
                    >
                      단독 유지보수 및 고도화
                    </Badge>
                  </div>
                </div>

                <ul className='space-y-5'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      ✨ 서비스 전체 페이지 및 비즈니스 로직 전담 개발
                    </strong>
                    프로젝트에 포함된{' '}
                    <strong>
                      거의 모든 서비스 페이지의 UI/UX 설계와 로직 구현을 주도
                    </strong>
                    했습니다. 안정적인 정착을 위해 4개월간 프론트엔드 파트를
                    단독 전담하며, 버그 수정 및 실무 요구사항에 맞춘 기능
                    고도화를 수행했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      🚀 IBSheet8 DX 엔진 고도화 및 타입 안정성 확보
                    </strong>
                    공식 타입 지원이 없는 환경에서{' '}
                    <strong>커스텀 .d.ts 시스템을 구축</strong>하여 개발
                    생산성을 높였습니다. <strong>Visual Test Page</strong>를
                    통해 데이터 흐름을 시각적으로 확인하며 복잡한 그리드 연산의
                    정확도를 확보했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      📊 150개 컬럼 대응을 위한 JSON 데이터 시각화
                    </strong>
                    컬럼 수가 방대한 인허가 서식 대응을 위해{' '}
                    <strong>Visual JSON Viewer</strong>를 개발 서버에
                    통합했습니다. 백엔드와 데이터 규격을 직관적으로 대조함으로써
                    불필요한 소통 비용을 줄이고 데이터 정합성을 확보했습니다.
                  </li>

                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block flex items-center gap-2'>
                      🛠️ 인프라 이슈 직접 해결 (WebtoB Reverse Proxy)
                    </strong>
                    현장 배포 환경의{' '}
                    <strong>CORS 에러를 WebtoB 리버스 프록시 설정</strong>으로
                    해결했습니다. 온프레미스 배포 환경을 직접 제어하며 인프라와
                    결합된 프론트엔드 문제 해결 역량을 쌓았습니다.
                  </li>
                </ul>

                <div className='flex flex-wrap gap-1.5'>
                  {[
                    'React',
                    'TypeScript',
                    'IBSheet8',
                    'WebtoB',
                    'PKI Authentication',
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
                  <p className='text-muted-foreground text-sm font-medium'>
                    FSD 아키텍처 기반 프로젝트의 안정적인 기능 확장 및 유지보수
                  </p>
                </div>

                <ul className='space-y-4'>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block'>
                      🧱 FSD(Feature-Sliced Design) 아키텍처 기반 기능 구현
                    </strong>
                    기존에 구축된{' '}
                    <strong>FSD 구조 내에서 위젯 단위의 컴포넌트를 개발</strong>
                    하고 비즈니스 로직을 확장했습니다. 이 과정을{' '}
                    <strong>기술 문서(Docs)</strong>로 정리하여 팀 내 지식
                    자산화에 기여했습니다.
                  </li>
                  <li className='text-muted-foreground text-sm leading-relaxed'>
                    <strong className='text-foreground mb-1 block'>
                      🤝 협업 표준 제안 및 코드 품질 관리
                    </strong>
                    팀 내 일관된 코드 품질을 위해{' '}
                    <strong>ESLint/Prettier 가이드라인</strong>을 수립하고,{' '}
                    <strong>PR 및 Commit 컨벤션 도입</strong>을 제안하여 협업
                    프로세스를 개선했습니다.
                  </li>
                </ul>

                <div className='flex flex-wrap gap-1.5'>
                  {[
                    'React',
                    'FSD Architecture',
                    'Documentation',
                    'Convention',
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
