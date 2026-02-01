import { TagFilter } from '@/components/tag-filter';
import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_POSTS } from '../page.queries';
import { BlogCard } from './blog-card';

export async function BlogContent({ selectedTag }: { selectedTag: string }) {
  const { data } = await getClient().query({
    query: GET_POSTS,
    context: { fetchOptions: { next: { revalidate: 3600 } } },
  });

  if (!data?.allPosts) return null;

  // 태그 목록 및 카운트 생성 로직
  const tagCounts: Record<string, number> = { All: data.allPosts.length };
  data.allPosts.forEach((post: any) => {
    post.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = [
    'All',
    ...Object.keys(tagCounts)
      .filter((t) => t !== 'All')
      .sort(),
  ];
  const filteredPosts =
    selectedTag === 'All'
      ? data.allPosts
      : data.allPosts.filter((post: any) => post.tags?.includes(selectedTag));

  return (
    <div className='animate-in fade-in slide-in-from-bottom-2 space-y-12 duration-500'>
      <TagFilter
        tags={allTags}
        selectedTag={selectedTag}
        tagCounts={tagCounts}
      />
      <div className='grid grid-cols-1 gap-10 md:gap-y-14 lg:grid-cols-3 lg:gap-x-12'>
        {filteredPosts.map((post: any) => (
          <BlogCard
            key={post.id}
            {...post}
            url={`/blog/${post.id}`}
            date={getFormattedDate(
              new Date(Number(post.createdAt)),
              'M월 d일, yyyy년',
            )}
            excerpt={
              post.content?.replace(/[#*`>_~-]/g, '').slice(0, 130) + '...'
            }
          />
        ))}
      </div>
    </div>
  );
}
