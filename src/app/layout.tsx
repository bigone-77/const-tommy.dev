import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { headers } from 'next/headers';

import { GoogleTagManager } from '@next/third-parties/google';

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
    default: 'const-tommy.dev',
    template: '%s | const-tommy.dev',
  },
  description: '프론트엔드 개발자 Tommy의 개인 기술 아카이브입니다.',
  authors: {
    name: 'tommy-shin',
    url: 'https://github.com/bigone-77',
  },
  creator: 'tommy-shin',
  publisher: 'tommy-shin',
  formatDetection: {
    email: true,
    telephone: false,
    address: false,
  },
  metadataBase: new URL('https://const-tommy.dev'),
  alternates: {
    canonical: '/',
  },
  verification: {
    other: {
      'naver-site-verification': '3a702e2d388f0641f86399972cf78345d03730ad',
    },
  },

  openGraph: {
    title: 'const-tommy.dev',
    description: '세상에 하나뿐인 Tommy의 기록들.',
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
                <header className='bg-background/80 sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-all duration-200'>
                  <SidebarTrigger className='hover:bg-accent transition-colors duration-200' />
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

        <GoogleTagManager gtmId='GTM-5759RQQ7' />
      </body>
    </html>
  );
}
