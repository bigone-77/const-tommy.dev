'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function updateSeriesAction(
  id: string,
  data: { title: string; thumbnail: string },
) {
  const session = await auth();
  if (!session?.user?.isAdmin)
    return { success: false, message: '권한이 없습니다.' };

  try {
    await prisma.series.update({
      where: { id },
      data: {
        title: data.title,
        thumbnail: data.thumbnail === '' ? null : data.thumbnail,
      },
    });

    revalidatePath('/series');
    revalidatePath(`/series/${id}`);

    return { success: true };
  } catch (e) {
    console.error('시리즈 수정 에러:', e);
    return { success: false, message: '수정 실패' };
  }
}

export async function deleteSeriesAction(id: string) {
  const session = await auth();
  if (!session?.user?.isAdmin) return { success: false };

  try {
    await prisma.series.delete({ where: { id } });

    revalidatePath('/series');

    return { success: true };
  } catch (e) {
    console.error('시리즈 삭제 에러:', e);
    return { success: false };
  }
}
