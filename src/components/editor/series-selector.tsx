'use client';

import { useController } from 'react-hook-form';

import { useQuery } from '@apollo/client/react';
import { ImagePlus, Library, Loader2 } from 'lucide-react';

import { GET_SERIES_LIST } from '@/app/(blog-layout)/series/page.queries';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useImageHandler } from '@/hooks/use-image-handler';
import { cn } from '@/lib/utils';

export function SeriesSelector({
  control,
  setValue,
}: {
  control: any;
  setValue: any;
}) {
  const { data, loading } = useQuery(GET_SERIES_LIST, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });
  const existingSeries = data?.allSeries || [];

  const { field: seriesIdField } = useController({
    name: 'seriesId',
    control,
    defaultValue: 'none',
  });

  const isFalsyValue = !seriesIdField.value || seriesIdField.value === 'none';

  const { field: newSeriesTitleField } = useController({
    name: 'newSeries.title',
    control,
    defaultValue: '',
  });
  const { field: newSeriesThumbField } = useController({
    name: 'newSeries.thumbnail',
    control,
    defaultValue: '',
  });

  const { uploadFile, isUploading } = useImageHandler({
    mode: 'series',
    setValue,
    content: '',
    textareaRef: { current: null },
  });

  const isCreatingNew = seriesIdField.value === 'new';

  const handleThumbnailUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadFile(file);
    if (url) setValue('newSeries.thumbnail', url, { shouldDirty: true });
    e.target.value = '';
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-2.5'>
        <div className='flex items-center gap-1.5 text-zinc-400'>
          <Library className='size-4' />
          <span className='text-xs font-bold tracking-wider uppercase'>
            Series
          </span>
        </div>

        <Select
          onValueChange={seriesIdField.onChange}
          value={isFalsyValue ? undefined : seriesIdField.value}
          disabled={loading}
        >
          <SelectTrigger
            className={cn(
              'h-7 w-auto gap-1.5 rounded-full border px-3 py-0 text-xs font-medium transition-all focus:ring-0',
              isFalsyValue
                ? 'text-muted-foreground border-dashed bg-transparent'
                : 'bg-primary/5 text-primary border-primary/20',
            )}
          >
            <SelectValue
              placeholder={loading ? '불러오는 중...' : '시리즈 연결하기'}
            />
          </SelectTrigger>

          <SelectContent align='start' className='rounded-xl shadow-2xl'>
            <SelectItem value='none' className='text-xs'>
              선택 안 함
            </SelectItem>
            {existingSeries.map((s: any) => (
              <SelectItem key={s.id} value={s.id} className='text-xs'>
                {s.title}
              </SelectItem>
            ))}
            <SelectItem value='new' className='text-primary text-xs font-bold'>
              + 새 시리즈 만들기
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isCreatingNew && (
        <div className='animate-in fade-in slide-in-from-top-1 bg-muted/20 ml-5 space-y-3 rounded-lg border border-dashed p-4 duration-200'>
          <div className='grid gap-3 sm:grid-cols-2'>
            <div className='space-y-1.5'>
              <label className='text-muted-foreground ml-0.5 text-[10px] font-bold tracking-tight uppercase'>
                Title
              </label>
              <Input
                {...newSeriesTitleField}
                placeholder='시리즈 이름을 적어주세요'
                className='h-8 border-zinc-200 bg-white text-sm focus-visible:ring-1 dark:border-zinc-800 dark:bg-zinc-950'
              />
            </div>
            <div className='space-y-1.5'>
              <label className='text-muted-foreground ml-0.5 text-[10px] font-bold tracking-tight uppercase'>
                Thumbnail
              </label>
              <div className='relative flex items-center gap-2'>
                <Input
                  {...newSeriesThumbField}
                  placeholder='URL 또는 파일 업로드'
                  className='h-8 border-zinc-200 bg-white pr-8 text-sm focus-visible:ring-1 dark:border-zinc-800 dark:bg-zinc-950'
                />
                <label className='text-muted-foreground hover:text-primary absolute right-2 flex cursor-pointer items-center justify-center transition-colors'>
                  {isUploading ? (
                    <Loader2 className='size-3.5 animate-spin' />
                  ) : (
                    <ImagePlus className='size-3.5' />
                  )}
                  <input
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={handleThumbnailUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>
          {newSeriesThumbField.value && (
            <div className='relative aspect-video w-32 overflow-hidden rounded border'>
              <img
                src={newSeriesThumbField.value}
                alt='Preview'
                className='h-full w-full object-cover'
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
