'use client';

import { useEffect, useState } from 'react';

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Code2,
  LayoutTemplate,
  Rocket,
  Zap,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { H2Typography, PTypography } from '@/components/ui/typography';

function useMediaQuery(query: string) {
  const [value, setValue] = useState(false);
  useEffect(() => {
    const onChange = (event: MediaQueryListEvent) => setValue(event.matches);
    const result = window.matchMedia(query);
    result.addEventListener('change', onChange);
    setValue(result.matches);
    return () => result.removeEventListener('change', onChange);
  }, [query]);
  return value;
}

function ContentInner({ s }: { s: any }) {
  return (
    <div className='space-y-8 py-6'>
      <div className='space-y-3'>
        <h4 className='text-foreground flex items-center gap-2 text-base font-bold'>
          <CheckCircle2 className='text-primary size-4' />
          The Challenge (문제 상황)
        </h4>
        <p className='text-muted-foreground border-muted border-l-2 pl-6 text-sm leading-relaxed break-keep'>
          {s.details.challenge}
        </p>
      </div>

      <div className='space-y-3'>
        <h4 className='text-foreground flex items-center gap-2 text-base font-bold'>
          <CheckCircle2 className='text-primary size-4' />
          The Approach (해결 과정)
        </h4>
        <p className='text-muted-foreground border-muted border-l-2 pl-6 text-sm leading-relaxed break-keep'>
          {s.details.approach}
        </p>
      </div>

      <div className='bg-primary/5 border-primary/10 space-y-3 rounded-2xl border p-5 shadow-inner'>
        <div className='flex items-center gap-2'>
          <Rocket className='text-primary size-4' />
          <h4 className='text-primary text-xs font-bold tracking-widest uppercase'>
            Result & Impact
          </h4>
        </div>
        <p className='text-foreground text-sm leading-relaxed font-semibold'>
          {s.details.result}
        </p>
      </div>
    </div>
  );
}

function StrengthCard({ s, i }: { s: any; i: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const Trigger = (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className='group border-border bg-card relative flex h-[320px] cursor-pointer flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl'
    >
      <BorderBeam
        size={250}
        duration={isHovered ? 3 : 10}
        delay={i * 2}
        borderWidth={2}
      />
      <div className='flex items-center justify-between'>
        <div className='bg-muted group-hover:bg-primary/10 rounded-lg p-2.5 transition-colors'>
          {s.icon}
        </div>
        <Badge
          variant='outline'
          className='font-mono text-[10px] tracking-wider uppercase opacity-70'
        >
          {s.tag}
        </Badge>
      </div>
      <div className='space-y-3 text-left'>
        <h3 className='text-lg leading-tight font-extrabold tracking-tight'>
          {s.title}
        </h3>
        <p className='text-muted-foreground line-clamp-3 text-sm leading-relaxed break-keep'>
          {s.description}
        </p>
      </div>
      <div className='mt-auto border-t border-dashed pt-4'>
        <div className='text-primary flex items-center justify-between'>
          <span className='text-[10px] font-bold tracking-widest uppercase'>
            Case Study Inside
          </span>
          <ArrowRight className='size-3 transition-transform group-hover:translate-x-1' />
        </div>
      </div>
    </div>
  );

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>{Trigger}</DialogTrigger>
        <DialogContent className='max-h-[85vh] max-w-2xl overflow-y-auto'>
          <DialogHeader className='text-left'>
            <div className='mb-2 flex items-center gap-3'>
              <div className='bg-primary/10 text-primary rounded-lg p-2'>
                {s.icon}
              </div>
              <Badge variant='secondary'>{s.tag}</Badge>
            </div>
            <DialogTitle className='text-2xl font-black'>{s.title}</DialogTitle>
          </DialogHeader>
          <ContentInner s={s} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
      <DrawerContent className='px-4'>
        <DrawerHeader className='px-0 text-left'>
          <div className='mb-2 flex items-center gap-3'>
            <div className='bg-primary/10 text-primary rounded-lg p-2'>
              {s.icon}
            </div>
            <Badge variant='secondary'>{s.tag}</Badge>
          </div>
          <DrawerTitle className='text-xl font-black'>{s.title}</DrawerTitle>
        </DrawerHeader>
        <div className='max-h-[60vh] overflow-y-auto px-1'>
          <ContentInner s={s} />
        </div>
        <DrawerFooter className='px-0 pt-4 pb-8'>
          <DrawerClose asChild>
            <Button
              variant='outline'
              className='h-12 w-full rounded-xl font-bold'
            >
              닫기
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export function StrengthSection() {
  const strengths = [
    {
      title: 'AI 에이전트 협업 및 실전 기술 구현',
      tag: 'AI & Efficiency',
      icon: <BrainCircuit className='size-6 text-purple-500' />,
      description:
        'AI를 파트너로 활용하여 기술 리서치 및 프로토타이핑 시간을 단축하고, 생성된 코드의 정합성을 직접 검증하여 개발 효율을 극대화합니다.',
      details: {
        challenge:
          'MediaPipe 기반의 실시간 포즈 추론 시 발생하는 기술적 난관과, AI 생성 코드의 실무 정합성을 빠르게 확보해야 하는 과제를 안고 있었습니다.',
        approach:
          'AI를 활용해 기술 리서치 및 보일러플레이트 작성 시간을 최소화하고, 절약된 시간을 atan2 연산 최적화 및 60fps 확보 등 핵심 엔지니어링에 집중 투입했습니다.',
        result:
          '초기 프로토타이핑 사이클을 50% 이상 단축했으며, AI 생성 코드를 무결하게 리팩토링함으로써 기술적 완성도와 속도의 균형을 맞췄습니다.',
      },
    },
    {
      title: '지속 가능한 구조와 개발 표준화',
      tag: 'Engineering',
      icon: <Code2 className='text-primary size-6' />,
      description:
        'FSD 아키텍처 기반의 확장성 있는 시스템을 설계합니다. 특히 위젯 단위의 컴포넌트화를 통해 팀 전체의 개발 생산성을 상향 평준화합니다.',
      details: {
        challenge:
          '대규모 대시보드 환경에서 도메인 간 결합도가 높아지는 문제를 해결하고, 파편화된 UI 컴포넌트의 재사용성을 확보해야 했습니다.',
        approach:
          'FSD 구조 내에 독립적인 위젯 시스템을 설계하여 기능 단위의 분리를 실현하고, IBSheet8 커스텀 훅 설계 및 기술 문서화를 통해 협업 표준을 수립했습니다.',
        result:
          'UI 결합도를 낮춰 유지보수 비용을 절감했으며, 폐쇄망 환경에서도 팀원들이 즉각 활용 가능한 공통 위젯 라이브러리와 Docs를 자산화했습니다.',
      },
    },
    {
      title: '데이터 가공 및 런타임 성능 최적화',
      tag: 'Optimization',
      icon: <Zap className='size-6 text-yellow-500' />,
      description:
        '150개 이상의 컬럼과 50여 종의 복잡한 서식 환경에서도 브라우저 성능 병목을 수학적 로직과 상태 관리 전략으로 해결합니다.',
      details: {
        challenge:
          '50여 가지 인허가 서식별로 상이한 권한과 상태에 따라 실시간으로 변하는 방대한 컬럼 스키마를 처리하며 발생하는 렌더링 부하를 마주했습니다.',
        approach:
          'Zustand 기반의 동적 서식 엔진을 구축하여 런타임에서 필요한 컬럼만 주입하는 구조를 설계하고, 불필요한 리렌더링을 차단하는 상태 최적화를 수행했습니다.',
        result:
          '대규모 서식 전환 시에도 코드 복잡도를 낮게 유지했으며, 150개 이상의 컬럼 환경에서도 안정적인 렌더링 성능을 확보했습니다.',
      },
    },
    {
      title: '경계를 두지 않는 능동적 문제 해결',
      tag: 'Problem Solving',
      icon: <LayoutTemplate className='size-6 text-blue-500' />,
      description:
        '프론트엔드 개발에 국한되지 않고, 개발 도구 직접 제작 및 인프라 제어(Reverse Proxy)를 통해 비즈니스 가치를 확보합니다.',
      details: {
        challenge:
          '현장 배포 환경의 네트워크 제약(CORS)과, 복잡한 JSON 데이터 대조 과정에서 발생하는 막대한 소통 비용 및 정합성 오류를 마주했습니다.',
        approach:
          'WebtoB 리버스 프록시 설정을 직접 수행해 인프라 제약을 돌파하고, 클라이언트 사이드 JSON Viewer를 제작하여 디버깅 리드타임을 획기적으로 줄였습니다.',
        result:
          '백엔드와의 데이터 규격 대조 시간을 단축하여 협업 효율을 극대화했으며, 기술적 허들을 정면으로 돌파해 서비스 가용성을 확보했습니다.',
      },
    },
  ];

  return (
    <section id='strength' className='scroll-mt-32'>
      <BlurFade delay={0.3} inView>
        <div className='space-y-12'>
          <div className='space-y-2 text-center md:text-left'>
            <H2Typography className='border-none pb-0'>
              🛡️ 기술적 강점
            </H2Typography>
            <PTypography className='text-muted-foreground mt-0 max-w-2xl leading-relaxed break-keep'>
              도구의 사용법에 매몰되지 않고,{' '}
              <span className='inline-block'>
                <span className='text-foreground font-bold'>
                  엔지니어링의 본질적인 문제 해결
                </span>
              </span>
              에 집중하며 얻은 실무적 역량입니다.
            </PTypography>
          </div>

          {/* Carousel 영역: 버튼이 튀어나와도 잘리지 않게 적절한 padding을 부여합니다 */}
          <div className='relative w-full px-6 md:px-2'>
            <Carousel
              opts={{
                align: 'start',
                loop: false, // 요구사항: Loop 비활성화
              }}
              className='w-full'
            >
              <CarouselContent className='-ml-4'>
                {strengths.map((s, i) => (
                  <CarouselItem
                    key={i}
                    className='basis-full pl-4 md:basis-1/2 lg:basis-1/3'
                  >
                    <StrengthCard s={s} i={i} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* 내비게이션 버튼: 상시 노출 및 경계선(Border) 밀착 배치 */}
              <div className='hidden md:block'>
                <CarouselPrevious className='border-primary/20 bg-background hover:bg-primary/10 absolute top-1/2 -left-5 z-20 size-10 -translate-y-1/2 rounded-full border shadow-md transition-all hover:scale-110 active:scale-95' />
                <CarouselNext className='border-primary/20 bg-background hover:bg-primary/10 absolute top-1/2 -right-5 z-20 size-10 -translate-y-1/2 rounded-full border shadow-md transition-all hover:scale-110 active:scale-95' />
              </div>
            </Carousel>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
