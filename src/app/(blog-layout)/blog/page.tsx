import { Suspense } from 'react';

import { Metadata } from 'next';

import { BlogContent } from './_components/blog-content';
import {
  PostGridSkeleton,
  TagFilterSkeleton,
} from './_components/blog-skeletons';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Tommy의 기술 블로그',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Blog | const-tommy.dev',
    description: 'Tommy의 기술 블로그',
    url: '/blog',
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedParams = await searchParams;
  const selectedTag = resolvedParams.tag || 'All';

  return (
    <Suspense
      fallback={
        <>
          <TagFilterSkeleton />
          <PostGridSkeleton />
        </>
      }
    >
      <BlogContent selectedTag={selectedTag} />
    </Suspense>
  );
}
