import Link from 'next/link';

import {
  Activity,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Trophy,
  Youtube,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, SmallTypography } from '@/components/ui/typography';

// --- 데이터 정의 ---

const EDUCATION_DATA = [
  {
    title: '서경대학교',
    date: '2019.03 — 2025.08',
    subtitle: '소프트웨어학과',
    stats: '학점 3.47 / 4.5',
    badges: ['성적 향상 장학금 2회 수여'],
    description:
      '자료구조, 알고리즘 등 CS 기초 역량을 다졌으며, 배움에 대한 집요함으로 꾸준한 성적 향상을 이뤄냈습니다.',
    icon: <BookOpen className='mr-1 mb-0.5 inline size-3.5 opacity-60' />,
  },
  {
    title: '구름톤 유니브 3기',
    date: '2024.09 — 2025.01',
    subtitle: '구름과 카카오 주관 전국 대학생 IT 연합 동아리',
    href: 'https://9oormthon.university/',
    contentList: [
      "서경대 구름톤 유니브 프론트엔드 '미르미' 참여",
      'KDC 47기 AI 웹 개발 과정 수료',
      "단풍톤 프로젝트 '소확행' 팀 리드 수행",
    ],
  },
  {
    title: '서경 SW 아카데미',
    date: '2024.02 — 2024.06',
    subtitle: '기업 맞춤형 클라우드 기반 AI/빅데이터 소프트웨어 교육',
    href: 'https://swacademy.skuniv.ac.kr/',
    contentList: [
      '8주간의 AI 및 빅데이터 집중 교육 수료',
      '기업 현직자 멘토링 기반 프로젝트 개발',
      '프로그래머스 코딩 교육 프로그램 수료 (PCCP)',
    ],
  },
  {
    title: 'UMC 5기',
    date: '2023.09 — 2024.02',
    subtitle: '실무형 앱/웹 프로젝트 IT 연합 동아리',
    links: [
      {
        label: '서울 Ne(o)rdinary 해커톤 참가 (Team 3OUT)',
        href: 'https://github.com/UMC-Hackathon-TTeam/threeout_front',
        type: 'external',
      },
      {
        label: "데모데이 '올래' 부스 운영 (Frontend Lead)",
        href: 'https://www.notion.so/116ba946abd8800da02dd94fa13195b1',
        type: 'external',
      },
    ],
  },
];

const AWARDS_DATA = [
  {
    title: '서경 SW 헥토 파이낸셜 프로젝트 성과 발표대회',
    date: '2024.06.25',
    rank: '1위 (금상 수상)',
    stats: '전체 12팀 중 1위',
    description:
      '프로젝트의 기획적 가치와 기술 실현 가능성 부문에서 12개 팀 중 가장 높은 점수를 획득하여 1위를 기록했습니다.',
    links: [
      {
        label: '프로젝트 상세보기',
        href: '/project/freeroad-restarea',
        type: 'internal',
      },
      {
        label: '공식 보도자료 확인',
        href: 'https://www.econovill.com/news/articleView.html?idxno=658702',
        type: 'external',
      },
    ],
  },
  {
    title: '멋쟁이사자처럼 12기 중앙해커톤',
    date: '2024.08.07',
    rank: '3위 (우수상 수상)',
    stats: '전국 1,500여 명 중 3위',
    description:
      '프론트 파트장으로서 AI 운동 측정 서비스의 핵심 로직 구현을 주도했습니다.',
    icon: <Activity className='mr-1 mb-0.5 inline size-3.5 opacity-60' />,
    links: [
      {
        label: '프로젝트 상세보기',
        href: '/project/livfit-pose-ai',
        type: 'internal',
      },
      {
        label: '발표 영상 확인',
        href: 'https://www.youtube.com/watch?v=uho-ZSaR1ds',
        type: 'youtube',
      },
    ],
  },
];

export function EducationSection() {
  return (
    <section id='education' className='scroll-mt-32'>
      <BlurFade delay={0.1} inView>
        <div className='space-y-12'>
          <H2Typography className='border-none pb-0 text-left'>
            🎓 Education & Awards
          </H2Typography>

          <div className='grid gap-12 md:grid-cols-2'>
            <div className='space-y-8'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 rounded-lg p-2'>
                  <GraduationCap className='text-primary size-5' />
                </div>
                <h3 className='text-xl font-bold tracking-tight'>
                  Education & Activity
                </h3>
              </div>

              <div className='border-muted relative ml-4 space-y-10 border-l-2 pl-8'>
                {EDUCATION_DATA.map((item, idx) => (
                  <div key={idx} className='group relative'>
                    <div className='border-background bg-primary absolute top-1.5 -left-[41px] size-4 rounded-full border-4 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(var(--primary),0.5)]' />
                    <div className='flex flex-col gap-2'>
                      <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-start'>
                        <h4 className='text-lg leading-tight font-bold break-keep'>
                          {item.href ? (
                            <a
                              href={item.href}
                              target='_blank'
                              className='hover:text-primary inline-flex items-center gap-1 transition-colors'
                            >
                              {item.title} <ExternalLink className='size-3.5' />
                            </a>
                          ) : (
                            item.title
                          )}
                        </h4>
                        <SmallTypography className='text-muted-foreground/60 mt-1 shrink-0 font-mono text-xs'>
                          {item.date}
                        </SmallTypography>
                      </div>

                      {item.subtitle && (
                        <p className='text-primary/80 text-[13px] leading-tight font-semibold'>
                          {item.subtitle}
                        </p>
                      )}

                      <div className='flex flex-wrap items-center gap-2'>
                        {item.stats && (
                          <span className='text-muted-foreground/80 text-[13px] font-medium'>
                            {item.stats}
                          </span>
                        )}
                        {item.badges?.map((b, i) => (
                          <Badge
                            key={i}
                            variant='outline'
                            className='border-primary/30 text-primary py-0 text-[10px] font-bold'
                          >
                            {b}
                          </Badge>
                        ))}
                      </div>

                      {item.description && (
                        <p className='text-muted-foreground/90 text-[13px] leading-relaxed break-keep'>
                          {item.icon}
                          {item.description}
                        </p>
                      )}

                      {item.contentList && (
                        <ul className='text-muted-foreground space-y-1 text-[13px] leading-relaxed'>
                          {item.contentList.map((li, i) => (
                            <li key={i}>• {li}</li>
                          ))}
                        </ul>
                      )}

                      {item.links && (
                        <ul className='flex flex-wrap gap-x-4 gap-y-1.5 text-[13px]'>
                          {item.links.map((link, i) => (
                            <li key={i}>
                              <a
                                href={link.href}
                                target='_blank'
                                className='text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors'
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Awards 섹션 --- */}
            <div className='space-y-8'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-yellow-500/10 p-2'>
                  <Trophy className='size-5 text-yellow-500' />
                </div>
                <h3 className='text-xl font-bold tracking-tight'>Awards</h3>
              </div>

              <div className='border-muted relative ml-4 space-y-10 border-l-2 pl-8'>
                {AWARDS_DATA.map((award, idx) => (
                  <div key={idx} className='group relative'>
                    <div className='border-background absolute top-1.5 -left-[41px] size-4 rounded-full border-4 bg-yellow-500 transition-all duration-300 group-hover:scale-125 group-hover:shadow-[0_0_10px_rgba(234,179,8,0.5)]' />
                    <div className='flex flex-col gap-3'>
                      <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-start'>
                        <h4 className='text-foreground/90 text-lg leading-tight font-bold break-keep'>
                          {award.title}
                        </h4>
                        <SmallTypography className='text-muted-foreground/60 mt-1 shrink-0 font-mono text-xs'>
                          {award.date}
                        </SmallTypography>
                      </div>

                      <div className='flex flex-wrap items-center gap-2'>
                        <Badge className='rounded-md border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 text-[11px] font-bold text-yellow-600 dark:text-yellow-500'>
                          {award.rank}
                        </Badge>
                        <span className='text-muted-foreground/80 text-[13px] font-medium'>
                          {award.stats}
                        </span>
                      </div>

                      <p className='text-muted-foreground/90 text-[13px] leading-relaxed break-keep'>
                        {award.icon}
                        {award.description}
                      </p>

                      <ul className='flex flex-wrap gap-x-4 gap-y-2 text-[13px]'>
                        {award.links.map((link, i) => (
                          <li key={i}>
                            {link.type === 'internal' ? (
                              <Link
                                href={link.href}
                                className='text-primary inline-flex items-center gap-1 font-bold hover:underline'
                              >
                                {link.label}{' '}
                                <ArrowUpRight className='size-3.5' />
                              </Link>
                            ) : (
                              <a
                                href={link.href}
                                target='_blank'
                                className={`inline-flex items-center gap-1 font-bold hover:underline ${link.type === 'youtube' ? 'text-red-500' : 'text-primary'}`}
                              >
                                {link.label}
                                {link.type === 'youtube' ? (
                                  <Youtube className='size-3.5' />
                                ) : (
                                  <ExternalLink className='size-3.5' />
                                )}
                              </a>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
