'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { blogSchema } from '@/schema/blog';

export async function updatePostAction(id: string, _: any, formData: FormData) {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    return { success: false, message: '권한이 없습니다.' };
  }

  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];

  const seriesId = formData.get('seriesId') as string;
  const rawNewSeries = formData.get('newSeries') as string;
  const newSeriesData = rawNewSeries ? JSON.parse(rawNewSeries) : null;

  const content = formData.get('content') as string;

  const validated = blogSchema.safeParse({
    title: formData.get('title'),
    content: content,
    tags: parsedTags,
    seriesId: seriesId,
    newSeries: newSeriesData,
  });

  if (!validated.success) {
    return { success: false, message: '입력값이 올바르지 않습니다.' };
  }

  const { title, tags } = validated.data;
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const thumbnail = imageMatch ? imageMatch[1] : '';

  try {
    let targetSeriesId: string | null = seriesId;

    if (seriesId === 'none') {
      targetSeriesId = null;
    } else if (seriesId === 'new' && newSeriesData?.title) {
      const createdSeries = await prisma.series.create({
        data: {
          title: newSeriesData.title,
          thumbnail: newSeriesData.thumbnail || '',
          authorId: session.user.id as string,
        },
      });
      targetSeriesId = createdSeries.id;
    }

    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        thumbnail,
        tags,
        seriesId: targetSeriesId,
      },
    });
  } catch (e) {
    console.error('DB 수정 실패:', e);
    return {
      success: false,
      message: '데이터베이스 저장 중 오류가 발생했습니다.',
    };
  }

  revalidatePath(`/blog/${id}`);
  revalidatePath('/blog');
  revalidatePath('/series');

  redirect(`/blog/${id}`);
}
