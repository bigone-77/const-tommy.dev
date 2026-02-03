import { subDays } from 'date-fns';

import { getClient } from '@/lib/apollo-client';
import { getFormattedDate } from '@/lib/utils';

import { GET_TIL_SUMMARY } from '../page.queries';
import { TilCalendarClient } from './til-calendar-client';

export async function TilCalendar({ selectedDate }: { selectedDate: Date }) {
  const { data } = await getClient().query({
    query: GET_TIL_SUMMARY,
    variables: {
      fromDate: getFormattedDate(subDays(new Date(), 30), 'yyyy-MM-dd'),
    },
    fetchPolicy: 'no-cache',
    context: { fetchOptions: { cache: 'no-store' } },
  });

  const tilCounts: Record<string, number> = {};

  const kstFormatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  (data?.allTils ?? []).forEach((til: any) => {
    const d = /^\d+$/.test(String(til.createdAt))
      ? new Date(Number(til.createdAt))
      : new Date(til.createdAt);

    if (!isNaN(d.getTime())) {
      const key = kstFormatter.format(d);
      tilCounts[key] = (tilCounts[key] || 0) + 1;
    }
  });

  return (
    <TilCalendarClient selectedDate={selectedDate} tilCounts={tilCounts} />
  );
}
