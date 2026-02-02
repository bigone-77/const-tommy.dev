'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import crypto from 'crypto';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { calculateReadingTime } from '@/lib/utils';
import { blogSchema } from '@/schema/blog';

export async function createPostAction(_: any, formData: FormData) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    return { success: false, message: '권한 없음' };
  }

  const userId = session.user.id!;
  const content = formData.get('content') as string;
  const rawTags = formData.get('tags') as string;
  const parsedTags = rawTags ? JSON.parse(rawTags) : [];

  const seriesId = formData.get('seriesId') as string;
  const newSeriesRaw = formData.get('newSeries') as string;
  const newSeriesData = newSeriesRaw ? JSON.parse(newSeriesRaw) : null;

  const validated = blogSchema.safeParse({
    title: formData.get('title'),
    content,
    tags: parsedTags,
    seriesId: seriesId === 'none' ? null : seriesId,
  });

  if (!validated.success) {
    console.log('❌ Zod Validation Error:', validated.error.format());
    return { success: false, message: '입력값 오류' };
  }

  const { title, tags } = validated.data;
  const readingTime = calculateReadingTime(content);
  const imageMatch = content.match(/!\[.*?\]\((.*?)\)/);
  const thumbnail = imageMatch ? imageMatch[1] : '';
  const postId = crypto.randomUUID();

  console.log('--- 시리즈 저장 디버깅 ---');
  console.log('seriesId:', seriesId);
  console.log('newSeriesData:', newSeriesData);
  console.log('------------------------');

  try {
    let targetSeriesId: string | null = null;

    if (seriesId === 'new' && newSeriesData?.title) {
      const createdSeries = await prisma.series.create({
        data: {
          title: newSeriesData.title,
          thumbnail: newSeriesData.thumbnail || '',
          authorId: userId,
        },
      });
      targetSeriesId = createdSeries.id;
    } else if (seriesId && seriesId !== 'none' && seriesId !== 'new') {
      targetSeriesId = seriesId;
    }

    await prisma.post.create({
      data: {
        id: postId,
        title,
        content,
        thumbnail,
        tags,
        authorId: userId,
        published: true,
        readingTime,
        seriesId: targetSeriesId,
      },
    });
  } catch (e) {
    console.error('DB 저장 실패:', e);
    return { success: false, message: '저장 실패' };
  }

  revalidatePath('/blog');
  revalidatePath('/series');
  redirect(`/blog/${postId}`);
}
