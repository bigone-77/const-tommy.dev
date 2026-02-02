import { auth } from '@/lib/auth';

import { BlogTab } from './_components/blog-tab';

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isAdmin = session?.user?.isAdmin;

  return (
    <>
      <BlogTab isAdmin={isAdmin} />
      <>{children}</>
    </>
  );
}
