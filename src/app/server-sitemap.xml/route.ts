import { getServerSideSitemap } from 'next-sitemap';

import { prisma } from '@/lib/prisma';

export async function GET() {
  // 1. DB에서 블로그(Post), TIL, 프로젝트 데이터를 병렬로 가져오기
  const [posts, tils, projects] = await Promise.all([
    prisma.post.findMany({
      where: { published: true },
      select: { id: true, createdAt: true },
    }),
    prisma.til.findMany({
      where: { published: true },
      select: { id: true, updatedAt: true },
    }),
    prisma.project.findMany({
      where: { published: true },
      select: { id: true, createdAt: true },
    }),
  ]);

  // 2. 블로그 포스트 필드 구성 (Post 모델)
  const blogFields = posts.map((post) => ({
    loc: `https://const-tommy.dev/blog/${post.id}`,
    lastmod: post.createdAt.toISOString(),
    changefreq: 'daily' as const,
    priority: 0.7,
  }));

  // 3. TIL 필드 구성 (Til 모델)
  const tilFields = tils.map((til) => ({
    loc: `https://const-tommy.dev/til/${til.id}`,
    lastmod: til.updatedAt.toISOString(),
    changefreq: 'daily' as const,
    priority: 0.7,
  }));

  // 4. 프로젝트 필드 구성 (Project 모델)
  const projectFields = projects.map((project) => ({
    loc: `https://const-tommy.dev/project/${project.id}`,
    lastmod: project.createdAt.toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.8, // 프로젝트는 중요도가 높으므로 조금 더 높은 가중치 부여
  }));

  // 5. 모든 필드를 합쳐서 사이트맵 반환
  return getServerSideSitemap([...blogFields, ...tilFields, ...projectFields]);
}
