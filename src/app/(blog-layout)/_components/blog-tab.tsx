'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function BlogTab() {
  const pathname = usePathname();
  const activeTab = pathname.startsWith('/series') ? 'series' : 'posts';

  return (
    <Tabs value={activeTab} className='w-full'>
      <TabsList
        variant='line'
        className='w-full justify-start bg-transparent p-0'
      >
        <TabsTrigger
          value='posts'
          asChild
          className='data-[state=active]:text-primary text-xl font-bold shadow-none'
        >
          <Link href='/blog'>글</Link>
        </TabsTrigger>
        <TabsTrigger
          value='series'
          asChild
          className='data-[state=active]:text-primary text-xl font-bold shadow-none'
        >
          <Link href='/series'>시리즈</Link>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
