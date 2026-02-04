'use client';

import { useMemo, useState } from 'react';
import { useController } from 'react-hook-form';

import { useQuery } from '@apollo/client/react';
import { Check, Tags, X } from 'lucide-react';

import { GET_ONLY_TAGS } from '@/app/(blog-layout)/blog/page.queries';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function TagSelector({ control }: { control: any }) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const { data } = useQuery(GET_ONLY_TAGS, {
    fetchPolicy: 'cache-first',
  });

  const { field } = useController({
    name: 'tags',
    control,
    defaultValue: [],
  });

  const selectedTags: string[] = field.value || [];

  const allUniqueTags = useMemo(() => {
    if (!data?.allPosts) return [];
    const flatTags = data.allPosts.flatMap((post: any) => post.tags || []);
    return Array.from(new Set(flatTags)).sort();
  }, [data]);

  const suggestions = allUniqueTags.filter(
    (tag) =>
      tag.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag),
  );

  const toggleTag = (tag: string) => {
    const nextValue = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    field.onChange(nextValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      if (!selectedTags.includes(inputValue.trim())) {
        toggleTag(inputValue.trim());
      }
      setInputValue('');
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-1.5 text-zinc-400'>
          <Tags className='size-4' />
          <span className='text-[10px] font-black tracking-widest uppercase'>
            Tags
          </span>
        </div>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <button
              type='button'
              className='text-muted-foreground hover:text-primary hover:bg-primary/5 flex h-7 items-center gap-1.5 rounded-full border border-dashed border-zinc-200 px-3 text-[11px] font-bold transition-all active:scale-95'
            >
              + 태그 추가
            </button>
          </PopoverTrigger>
          <PopoverContent className='w-[240px] p-0 shadow-2xl' align='start'>
            <Command className='rounded-xl'>
              <CommandInput
                placeholder='태그 검색 또는 입력...'
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleKeyDown}
              />
              <CommandList>
                <CommandEmpty className='p-2'>
                  {inputValue ? (
                    <button
                      onClick={() => {
                        toggleTag(inputValue);
                        setInputValue('');
                      }}
                      className='text-primary hover:bg-primary/5 flex w-full items-center gap-2 rounded-md p-2 text-left text-xs font-bold transition-colors'
                    >
                      <Check className='size-3' />"{inputValue}" 새로 추가하기
                    </button>
                  ) : (
                    <p className='text-muted-foreground py-2 text-center text-xs'>
                      검색어를 입력하세요
                    </p>
                  )}
                </CommandEmpty>
                <CommandGroup heading='추천 태그' className='p-1'>
                  {suggestions.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => {
                        toggleTag(tag);
                        setInputValue('');
                      }}
                      className='rounded-md text-xs'
                    >
                      <Check
                        className={cn(
                          'mr-2 size-3',
                          selectedTags.includes(tag)
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                      {tag}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selectedTags.length > 0 && (
        <div className='flex flex-wrap items-center gap-2 pl-7'>
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className={cn(
                'group flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold transition-all',
                'border border-emerald-100/50 bg-emerald-50/60 text-emerald-800 hover:bg-emerald-100/80', // 🟢 스크린샷의 은은한 컬러감
              )}
            >
              {tag}
              <button
                type='button'
                onClick={() => toggleTag(tag)}
                className='flex items-center justify-center text-emerald-800/40 transition-colors hover:text-emerald-800'
              >
                <X className='size-3.5 stroke-[2.5px]' />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
