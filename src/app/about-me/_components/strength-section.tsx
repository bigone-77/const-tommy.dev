'use client';

import { useEffect, useState } from 'react';

import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Layers,
  LayoutTemplate,
  Plug,
  Rocket,
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
          The Context (배경)
        </h4>
        <p className='text-muted-foreground border-muted border-l-2 pl-6 text-sm leading-relaxed break-keep'>
          {s.details.challenge}
        </p>
      </div>

      <div className='space-y-3'>
        <h4 className='text-foreground flex items-center gap-2 text-base font-bold'>
          <CheckCircle2 className='text-primary size-4' />
          The Approach (접근 방식)
        </h4>
        <p className='text-muted-foreground border-muted border-l-2 pl-6 text-sm leading-relaxed break-keep'>
          {s.details.approach}
        </p>
      </div>

      <div className='bg-primary/5 border-primary/10 space-y-3 rounded-2xl border p-5 shadow-inner'>
        <div className='flex items-center gap-2'>
          <Rocket className='text-primary size-4' />
          <h4 className='text-primary text-xs font-bold tracking-widest uppercase'>
            What I Learned
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
            Read More
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
      title: '반복을 줄이는 구조 설계',
      tag: 'Engineering',
      icon: <Layers className='text-primary size-6' />,
      description:
        '같은 작업이 반복된다는 신호를 만나면 구조를 다시 봅니다. 매번 정적으로 짜던 화면을 스키마 기반의 동적 렌더링 구조로 옮긴 경험이 있습니다.',
      details: {
        challenge:
          '공공기관 SI 환경에서 50여 종의 서식을 매번 정적으로 구현해야 했고, 신규 서식이 추가될 때마다 비슷한 컴포넌트를 반복해서 작성하는 패턴이 누적되고 있었습니다.',
        approach:
          'Zustand로 관리되는 스키마를 런타임에 주입하면 UI가 자동 구성되는 동적 렌더링 구조를 설계했습니다. 컬럼 정의와 권한 분기, 서식 상태에 따른 UI 변화를 스키마 한 곳에서 다루도록 정리했습니다.',
        result:
          '신규 서식 추가 시 컴포넌트를 새로 작성하지 않고 스키마 정의만으로 대응 가능해졌습니다. "같은 작업이 반복된다"는 신호를 코드 구조 차원에서 다루는 감각을 얻었습니다.',
      },
    },
    {
      title: '라이브러리와 환경의 결을 맞추는 통합',
      tag: 'Integration',
      icon: <Plug className='size-6 text-blue-500' />,
      description:
        'React가 기대하는 패턴과 외부 라이브러리·환경의 동작이 어긋날 때, 그 사이를 메우는 인터페이스를 설계합니다. 비표준 라이브러리와 명령형 SDK를 React 라이프사이클에 맞춰 통합한 경험이 있습니다.',
      details: {
        challenge:
          '폐쇄망 환경에서 사용해야 했던 비표준 그리드 라이브러리(ibSheet)가 React 라이프사이클과 어긋나, 서버 데이터 갱신 시 상태 동기화 불일치로 테이블이 불필요하게 재렌더링되거나 무한 스크롤 threshold 통과 시 데이터 로딩이 끊기는 문제가 있었습니다.',
        approach:
          '커스텀 훅으로 라이프사이클 래퍼를 설계해 라이브러리 인스턴스의 생성·갱신·해제를 React의 흐름과 동기화하고, 발견된 이슈들을 차례로 해결했습니다. 이후 명령형으로 동작하는 네이버 지도 SDK에도 같은 관점을 적용해, Callback Ref와 React Root 주입 패턴으로 선언적 인터페이스를 구성했습니다.',
        result:
          '서로 다른 두 환경에서 같은 문제(외부 세계와 React의 결 차이)를 마주했고, 매번 다른 라이브러리에 끌려가기보다 React 패턴 쪽으로 통합 지점을 끌어오는 방식이 더 안정적이라는 감각을 얻었습니다.',
      },
    },
    {
      title: 'AI를 동반자로, 검증은 직접',
      tag: 'AI Collaboration',
      icon: <BrainCircuit className='size-6 text-purple-500' />,
      description:
        'AI 도구로 구현 속도를 높이되, 핵심 비즈니스 로직과 상태 흐름은 직접 설계하고 검증합니다. 빠른 구현과 신뢰할 수 있는 동작 사이의 균형을 찾으려 합니다.',
      details: {
        challenge:
          'AI 도구를 적극 사용할수록 코드는 빠르게 생성되지만, 생성된 코드의 동작 가정이 실제 사용자 인터랙션과 어긋나는 경우가 종종 발생했습니다. 속도와 신뢰성 사이의 균형이 필요했습니다.',
        approach:
          '1차로 AI를 통해 프로토타입 코드를 얻고, 그 이후에는 시퀀스적으로 접근했습니다. 해당 코드의 다음 단계, 상태가 어떻게 발산될 수 있는지를 AI와 대화하며 함께 검증하고, 핵심 비즈니스 로직이라고 판단되는 부분은 직접 예상 결과값을 정의한 뒤 단위 테스트로 두었습니다.',
        result:
          'AI가 만든 코드를 그대로 신뢰하지 않고, "생성 → 시퀀스 검증 → 테스트로 고정"의 흐름을 거치며 속도를 잃지 않으면서도 안정성을 유지할 수 있다는 감각을 얻었습니다.',
      },
    },
    {
      title: '프론트엔드 너머의 환경도 함께 본다',
      tag: 'Beyond Frontend',
      icon: <LayoutTemplate className='size-6 text-yellow-500' />,
      description:
        '프론트엔드 코드만으로 해결되지 않는 환경 제약을 만났을 때, 필요한 만큼 그 너머의 영역도 들여다보려 합니다. 폐쇄망 환경에서 부족했던 영역을 학습하고 팀에 공유한 경험이 있습니다.',
      details: {
        challenge:
          '폐쇄망 SI 환경에서는 외부 라이브러리 도입이 제한되고, 학부 시절에 다루지 못했던 영역(웹서버 설정, 네트워크 기초 등)이 실무에서 마주치는 일이 잦았습니다. 프론트엔드 코드 안에서만 문제를 보면 막히는 순간이 많았습니다.',
        approach:
          '디버깅에 필요한 최소 기능의 JSON Viewer를 직접 구현하고, 평소 부족했던 영역(IP, HTTPS 등 네트워크 기초)을 따로 학습한 뒤 팀원 7명을 대상으로 사내 세미나를 진행했습니다. 혼자 아는 것보다 누구에게 설명해야 한다는 압박이 학습 동기와 정리의 질을 모두 끌어올렸습니다.',
        result:
          '프론트엔드의 경계가 환경 제약 앞에서는 의미가 약해진다는 점, 그리고 부족한 영역은 학습해서 팀과 나눌 때 더 단단해진다는 점을 직접 체감했습니다.',
      },
    },
  ];

  return (
    <section id='strength' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='space-y-12'>
          <div className='space-y-2 text-center md:text-left'>
            <H2Typography className='border-none pb-0'>
              🛡️ Approach
            </H2Typography>
            <PTypography className='text-muted-foreground mt-0 max-w-2xl leading-relaxed break-keep'>
              실무에서 마주친 문제들을 풀어내며{' '}
              <span className='inline-block'>
                <span className='text-foreground font-bold'>
                  중요하게 보게 된 네 가지 관점
                </span>
              </span>
              입니다.
            </PTypography>
          </div>

          {/* Carousel 영역: 버튼이 튀어나와도 잘리지 않게 적절한 padding을 부여합니다 */}
          <div className='relative w-full px-6 md:px-2'>
            <Carousel
              opts={{
                align: 'start',
                loop: false,
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
