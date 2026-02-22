'use client';

import { useEffect, useState } from 'react';

import {
  ArrowRight,
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

// 📱 반응형 대응을 위한 미디어 쿼리 훅
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

// 📦 상세 보기 내부 콘텐츠
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
      className='group border-border bg-card relative flex cursor-pointer flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl'
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
        <h3 className='text-lg font-extrabold tracking-tight'>{s.title}</h3>
        <p className='text-muted-foreground text-sm leading-relaxed break-keep'>
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
      title: '지속 가능한 구조와 개발 표준화',
      tag: 'Engineering',
      icon: <Code2 className='text-primary size-6' />,
      description:
        '단순한 기능 구현을 넘어, 팀 전체가 런타임 에러 없이 협업할 수 있는 정교한 타입 시스템과 표준화된 아키텍처를 설계합니다.',
      details: {
        challenge:
          '공식 문서가 부족한 라이브러리 환경이나 폐쇄망 개발 시, 파편화된 코드 스타일과 타입 부재로 인해 기술 부채가 급격히 쌓이는 문제를 겪었습니다.',
        approach:
          'IBSheet8 전면 타입화(.d.ts)를 통해 안정성을 확보하고, FSD 아키텍처 도입 및 PR/Commit 컨벤션을 수립하여 협업 효율을 극대화했습니다.',
        result:
          '코드 리뷰 비용을 획기적으로 낮췄으며, 확장성 있는 구조 덕분에 신규 인원 투입 시 실무 적응 기간을 대폭 단축하는 기반을 마련했습니다.',
      },
    },
    {
      title: '데이터 가공 및 런타임 성능 최적화',
      tag: 'Optimization',
      icon: <Zap className='size-6 text-yellow-500' />,
      description:
        '수만 건의 그리드 데이터부터 실시간 비전 AI 좌표까지, 브라우저 환경에서 발생하는 성능 병목을 수학적 로직으로 해결합니다.',
      details: {
        challenge:
          '대용량 데이터 렌더링 시 발생하는 메인 스레드 점유와 실시간 AI 추론 과정에서의 CPU 부하로 인한 인터랙션 끊김 현상을 마주했습니다.',
        approach:
          '프레임 쓰로틀링(Throttling) 기법을 도입하고, atan2와 같은 기하학적 연산 로직을 최적화하여 불필요한 리렌더링과 연산을 차단했습니다.',
        result:
          '저사양 기기에서도 60fps 수준의 매끄러운 UX를 구현했으며, 복잡한 비즈니스 데이터 처리에 최적화된 프론트엔드 환경을 구축했습니다.',
      },
    },
    {
      title: '경계를 두지 않는 능동적 문제 해결',
      tag: 'Problem Solving',
      icon: <LayoutTemplate className='size-6 text-blue-500' />,
      description:
        '프론트엔드 개발에만 국한되지 않고 리버스 프록시 설정이나 협업용 시각화 도구 제작 등 비즈니스 가치를 위해 인프라까지 다룹니다.',
      details: {
        challenge:
          '고객사 현장의 인프라 제약(CORS)이나 150개 이상의 컬럼을 다뤄야 하는 백엔드 협업 과정에서 비효율적인 소통이 반복되었습니다.',
        approach:
          'WebtoB 리버스 프록시 설정으로 인프라 이슈를 해결하고, 개발 서버용 JSON Viewer를 제작하여 데이터 정합성을 실시간으로 시각화했습니다.',
        result:
          '기술적 허들을 정면으로 돌파하며 서비스 가용성을 확보했고, 협업 도구 제작을 통해 팀 전체의 소통 비용을 획기적으로 개선했습니다.',
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
          <div className='grid gap-8 md:grid-cols-3'>
            {strengths.map((s, i) => (
              <StrengthCard key={i} s={s} i={i} />
            ))}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
