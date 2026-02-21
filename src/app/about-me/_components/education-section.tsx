import Link from 'next/link';

import {
  Activity,
  ArrowUpRight,
  BookOpen,
  ExternalLink,
  GraduationCap,
  Star,
  Trophy,
  Youtube,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlurFade } from '@/components/ui/blur-fade';
import { H2Typography, SmallTypography } from '@/components/ui/typography';

export function EducationSection() {
  return (
    <section id='education' className='scroll-mt-32'>
      <BlurFade delay={0.6} inView>
        <div className='space-y-12'>
          <H2Typography className='border-none pb-0 text-left'>
            🎓 Education & Awards
          </H2Typography>

          <div className='grid gap-12 md:grid-cols-2'>
            {/* 🎓 Education & Activity */}
            <div className='space-y-8'>
              <div className='flex items-center gap-3'>
                <div className='bg-primary/10 rounded-lg p-2'>
                  <GraduationCap className='text-primary size-5' />
                </div>
                <h3 className='text-xl font-bold tracking-tight'>
                  Education & Activity
                </h3>
              </div>

              <div className='border-muted relative space-y-10 border-l-2 pl-8'>
                {/* 1. 대학교 */}
                <div className='group relative'>
                  <div className='border-background bg-primary absolute top-1 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-lg font-bold'>서경대학교</h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        2019.03 — 2025.08
                      </SmallTypography>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Badge
                        variant='secondary'
                        className='rounded-md px-1.5 py-0 text-[10px] font-bold'
                      >
                        소프트웨어학과
                      </Badge>
                      <span className='text-muted-foreground text-[13px] font-medium'>
                        학점 3.47 / 4.5
                      </span>
                      <Badge
                        variant='outline'
                        className='border-primary/30 text-primary text-[10px] font-bold'
                      >
                        성적 향상 장학금 2회 수여
                      </Badge>
                    </div>
                    <p className='text-muted-foreground text-[13px] leading-relaxed break-keep'>
                      <BookOpen className='mr-1 mb-0.5 inline size-3 opacity-50' />
                      자료구조, 알고리즘 등 CS 기초 역량을 다졌으며, 배움에 대한
                      집요함으로 꾸준한 성적 향상을 이뤄냈습니다.
                    </p>
                  </div>
                </div>

                {/* 2. 구름톤 유니브 */}
                <div className='group relative'>
                  <div className='border-background bg-primary/70 absolute top-1 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-lg font-bold'>
                        <a
                          href='https://9oormthon.university/'
                          target='_blank'
                          className='hover:text-primary inline-flex items-center gap-1 transition-colors'
                        >
                          구름톤 유니브 3기 <ExternalLink className='size-3' />
                        </a>
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        2024.09 — 2025.01
                      </SmallTypography>
                    </div>
                    <p className='text-primary/80 text-[13px] leading-tight font-semibold'>
                      구름과 카카오 주관 전국 대학생 IT 연합 동아리
                    </p>
                    <ul className='text-muted-foreground space-y-1.5 text-[13px] leading-relaxed'>
                      <li>• 서경대 구름톤 유니브 프론트엔드 '미르미' 참여</li>
                      <li>
                        •{' '}
                        <a
                          href='https://kdc.goorm.io/ai'
                          target='_blank'
                          className='hover:text-foreground underline underline-offset-4'
                        >
                          KDC 47기 AI 웹 개발 과정 수료
                        </a>
                      </li>
                      <li>
                        • <strong>단풍톤 프로젝트 '소확행' 팀 리드</strong> 수행
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 3. 서경 SW 아카데미 */}
                <div className='group relative'>
                  <div className='border-background bg-primary/40 absolute top-1 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-lg font-bold'>
                        <a
                          href='https://swacademy.skuniv.ac.kr/'
                          target='_blank'
                          className='hover:text-primary inline-flex items-center gap-1 transition-colors'
                        >
                          서경 SW 아카데미 <ExternalLink className='size-3' />
                        </a>
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        2024.02 — 2024.06
                      </SmallTypography>
                    </div>
                    <p className='text-primary/80 text-[13px] leading-tight font-semibold'>
                      기업들이 요구하는 맞춤형 인재양성을 위한 클라우드 기반
                      AI/빅데이터 소프트웨어 교육
                    </p>
                    <ul className='text-muted-foreground space-y-1.5 text-[13px] leading-relaxed'>
                      <li>• 8주간의 AI 및 빅데이터 집중 교육 수료</li>
                      <li className='flex items-center gap-1.5'>
                        • 기업 현직자 멘토링 기반 프로젝트 개발
                        <Link
                          href='/project/freeroad-restarea'
                          className='text-primary inline-flex items-center gap-0.5 font-bold hover:underline'
                        >
                          [프로젝트 상세보기 <ArrowUpRight className='size-3' />
                          ]
                        </Link>
                      </li>
                      <li>
                        •{' '}
                        <strong>
                          프로그래머스 코딩 교육 프로그램 수료 (PCCP)
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 4. UMC 5기 */}
                <div className='group relative'>
                  <div className='border-background bg-primary/20 absolute top-1 -left-[41px] size-4 rounded-full border-4 transition-transform group-hover:scale-110' />
                  <div className='flex flex-col gap-2'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-foreground/90 text-lg font-bold'>
                        UMC 5기
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        2023.09 — 2024.02
                      </SmallTypography>
                    </div>
                    <p className='text-primary/80 text-[13px] leading-tight font-semibold'>
                      실무형 앱/웹 프로젝트를 지향하는 IT 연합 동아리
                    </p>
                    <ul className='text-muted-foreground space-y-1.5 text-[13px] leading-relaxed'>
                      <li className='flex items-start gap-1.5'>
                        <span className='bg-muted-foreground/30 mt-1.5 size-1 shrink-0 rounded-full' />
                        <a
                          href='https://github.com/UMC-Hackathon-TTeam/threeout_front'
                          target='_blank'
                          className='hover:text-foreground underline underline-offset-2'
                        >
                          5기 서울 Ne(o)rdinary 해커톤 참가 (Team 3OUT)
                        </a>
                      </li>
                      <li className='flex items-start gap-1.5'>
                        <span className='bg-primary/50 mt-1.5 size-1 shrink-0 rounded-full' />
                        <a
                          href='https://www.notion.so/116ba946abd8800da02dd94fa13195b1'
                          target='_blank'
                          className='hover:text-foreground underline underline-offset-2'
                        >
                          5기 데모데이{' '}
                          <strong>
                            '올래' 서비스 부스 운영 (Frontend Lead)
                          </strong>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 🏆 Awards */}
            <div className='space-y-8'>
              <div className='flex items-center gap-3'>
                <div className='rounded-lg bg-yellow-500/10 p-2'>
                  <Trophy className='size-5 text-yellow-500' />
                </div>
                <h3 className='text-xl font-bold tracking-tight'>Awards</h3>
              </div>

              <div className='border-muted relative space-y-12 border-l-2 pl-8'>
                {/* 1. 헥토 파이낸셜 대회 */}
                <div className='group relative'>
                  <div className='border-background absolute top-1 -left-[41px] size-4 rounded-full border-4 bg-yellow-500 transition-transform group-hover:scale-110' />
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-foreground/90 text-lg font-bold break-keep'>
                        서경 SW 헥토 파이낸셜 프로젝트 성과 발표대회
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        2024.06.25
                      </SmallTypography>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Badge className='rounded-md border-yellow-500/20 bg-yellow-500/10 px-2 py-0.5 text-xs font-bold text-yellow-600'>
                        1위 (금상 수상)
                      </Badge>
                      <span className='text-muted-foreground text-[13px] font-medium'>
                        전체 12팀 중 1위
                      </span>
                    </div>
                    <ul className='text-muted-foreground space-y-1 text-[13px]'>
                      <li className='flex items-center gap-1.5'>
                        <Star className='size-3 opacity-50' />
                        <a
                          href='https://www.econovill.com/news/articleView.html?idxno=658702'
                          target='_blank'
                          className='text-primary inline-flex items-center gap-1 font-bold hover:underline'
                        >
                          공식 보도자료 확인 <ExternalLink className='size-3' />
                        </a>
                      </li>
                    </ul>
                    <p className='text-muted-foreground text-[13px] leading-relaxed break-keep'>
                      자율 주제 프로젝트에서 창의적인 기획과 탄탄한 구현력을
                      바탕으로 12개 팀 중 최종 1위에 선정되었습니다.
                    </p>
                  </div>
                </div>

                {/* 2. 중앙해커톤 */}
                <div className='group relative'>
                  <div className='border-background absolute top-1 -left-[41px] size-4 rounded-full border-4 bg-yellow-500/60 transition-transform group-hover:scale-110' />
                  <div className='flex flex-col gap-3'>
                    <div className='flex flex-col justify-between gap-1 sm:flex-row sm:items-center'>
                      <h4 className='text-foreground/90 text-lg font-bold'>
                        멋쟁이사자처럼 12기 중앙해커톤
                      </h4>
                      <SmallTypography className='text-muted-foreground/70 font-mono'>
                        2024.08.07
                      </SmallTypography>
                    </div>
                    <div className='flex flex-wrap items-center gap-2'>
                      <Badge
                        variant='outline'
                        className='rounded-md border-yellow-500/30 bg-yellow-500/5 px-2 py-0.5 text-[11px] font-bold text-yellow-600/80'
                      >
                        3위 (우수상 수상)
                      </Badge>
                      <span className='text-muted-foreground text-[13px]'>
                        전국 1,500여 명 중 3위
                      </span>
                    </div>
                    <ul className='text-muted-foreground space-y-1.5 text-[13px]'>
                      <li className='flex items-center gap-1.5 font-bold'>
                        •{' '}
                        <Link
                          href='/project/livfit-pose-ai'
                          className='text-primary inline-flex items-center gap-0.5 hover:underline'
                        >
                          프로젝트 상세보기 <ArrowUpRight className='size-3' />
                        </Link>
                      </li>
                      <li className='flex items-center gap-1.5'>
                        •{' '}
                        <a
                          href='https://www.youtube.com/watch?v=uho-ZSaR1ds'
                          target='_blank'
                          className='inline-flex items-center gap-1 font-bold text-red-500 hover:underline'
                        >
                          발표 영상 확인 <Youtube className='size-3' />
                        </a>
                      </li>
                    </ul>
                    <p className='text-muted-foreground text-[13px] leading-relaxed break-keep'>
                      <Activity className='mr-1 mb-0.5 inline size-3 opacity-50' />
                      프론트 파트장으로서 AI 운동 측정 서비스의 핵심 로직 구현을
                      주도했습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
