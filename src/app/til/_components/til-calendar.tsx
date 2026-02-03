import { subDays } from 'date-fns';

import { getClient } from '@/lib/apollo-client';
import { getFormattedDate, getNowKst } from '@/lib/utils';

import { GET_TIL_SUMMARY } from '../page.queries';
import { TilCalendarClient } from './til-calendar-client';

export async function TilCalendar({ selectedDate }: { selectedDate: Date }) {
  const nowKst = getNowKst();

  const { data } = await getClient().query({
    query: GET_TIL_SUMMARY,
    variables: {
      fromDate: getFormattedDate(subDays(nowKst, 30), 'yyyy-MM-dd'),
    },
    fetchPolicy: 'no-cache',
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const tilCounts: Record<string, number> = {};

  (data?.allTils ?? []).forEach((til: any) => {
    const d = /^\d+$/.test(String(til.createdAt))
      ? new Date(Number(til.createdAt))
      : new Date(til.createdAt);
    if (!isNaN(d.getTime())) {
      const key = getFormattedDate(d, 'yyyy-MM-dd');
      tilCounts[key] = (tilCounts[key] || 0) + 1;
    }
  });

  return (
    <TilCalendarClient selectedDate={selectedDate} tilCounts={tilCounts} />
  );
}
