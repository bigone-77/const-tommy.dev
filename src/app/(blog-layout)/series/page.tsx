import { AppLayout } from '@/components/app-layout';
import { getClient } from '@/lib/apollo-client';
import { auth } from '@/lib/auth';
import { getFormattedDate } from '@/lib/utils';

import { SeriesCard } from './_components/series-card';
import { GET_SERIES_LIST } from './page.queries';

export default async function SeriesPage() {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  const { data } = await getClient().query({
    query: GET_SERIES_LIST,
    fetchPolicy: 'no-cache',
    context: {
      fetchOptions: {
        next: {
          revalidate: 3600,
        },
      },
    },
  });

  const seriesList = data?.allSeries || [];

  return (
    <AppLayout>
      <div className='animate-in fade-in slide-in-from-bottom-2 duration-500'>
        <div className='grid grid-cols-1 gap-10 md:gap-y-16 lg:grid-cols-3 lg:gap-x-12'>
          {seriesList.length > 0 ? (
            seriesList.map((item) => (
              <SeriesCard
                key={item.id}
                id={item.id}
                title={item.title}
                thumbnail={item.thumbnail || ''}
                postCount={item.posts.length}
                isAdmin={isAdmin}
                date={getFormattedDate(
                  new Date(Number(item.createdAt)),
                  'M월 d일, yyyy년',
                )}
                url={`/series/${item.id}`}
              />
            ))
          ) : (
            <div className='text-muted-foreground col-span-full py-20 text-center'>
              작성된 시리즈가 아직 없습니다.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
