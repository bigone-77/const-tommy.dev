import { Suspense } from 'react';

import { BlogContent } from './_components/blog-content';
import {
  PostGridSkeleton,
  TagFilterSkeleton,
} from './_components/blog-skeletons';

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
