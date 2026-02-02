import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';

import { AppBreadCrumb } from '@/components/app-breadcrumb';
import { AppSidebar } from '@/components/app-sidebar';
import { SiteTracker } from '@/components/app-site-tracker';
import { ApolloProvider } from '@/components/provider/apollo-provider';
import { ThemeProvider } from '@/components/provider/theme-provider';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import './globals.css';

const pretendard = localFont({
  src: '../assets/font/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: {
    default: 'const-tommy.dev | Front-end Engineering Archive',
    template: '%s | const-tommy.dev',
  },
  description: '프론트엔드 개발자 Tommy의 개인 기술 아카이브입니다.',

  openGraph: {
    title: 'const-tommy.dev | Front-end Engineering Archive',
    description: '프론트엔드 개발자 Tommy의 본질을 담은 기록들.',
    url: 'https://const-tommy.dev',
    siteName: 'const-tommy.dev',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'const-tommy.dev 로고',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

  return (
    <html lang='ko' suppressHydrationWarning>
      <body className={pretendard.className}>
        <ApolloProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <SiteTracker ip={ip} />
              <AppSidebar />
              <SidebarInset>
                <header className='bg-background/80 sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b px-4 backdrop-blur-md transition-all duration-200'>
                  <SidebarTrigger className='hover:bg-accent -ml-1 transition-colors duration-200' />
                  <AppBreadCrumb />
                </header>

                <div className='relative flex flex-1 flex-col'>
                  <main className='@container/main relative flex-1 p-6 lg:p-10'>
                    {children}
                  </main>
                </div>
              </SidebarInset>
            </SidebarProvider>
          </ThemeProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
