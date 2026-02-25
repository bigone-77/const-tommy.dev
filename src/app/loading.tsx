'use client';

export default function Loading() {
  return (
    <div className='bg-background fixed inset-0 z-50 flex flex-col items-center justify-center space-y-10 p-6 lg:ml-[280px]'>
      <div className='flex flex-col items-center space-y-6'>
        <div className='relative'>
          <h1 className='text-primary animate-in fade-in slide-in-from-bottom-3 text-2xl font-semibold tracking-tight duration-1000 md:text-3xl'>
            const-tommy.dev
          </h1>
          <div className='bg-primary/30 absolute -bottom-2 left-0 h-[1px] w-full overflow-hidden'>
            <div className='bg-primary animate-progress-line h-full w-full' />
          </div>
        </div>

        <div className='flex flex-col items-center space-y-3'>
          <p className='text-muted-foreground/60 text-xs font-medium tracking-widest'>
            기록을 불러오는 중입니다
          </p>
          <div className='bg-muted relative h-[1px] w-40 overflow-hidden rounded-full'>
            <div className='bg-primary/60 animate-shimmer absolute inset-0 w-1/3' />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-line {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(250%);
          }
        }
        .animate-progress-line {
          animation: progress-line 2s infinite ease-in-out;
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
