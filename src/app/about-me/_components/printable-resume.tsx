'use client';

import { Download } from 'lucide-react';

import { Button } from '@/components/ui/button';

export const PrintableResume = () => {
  const handleDownloadPDF = () => {
    const fileUrl = '/resume_tommy.pdf';

    const link = document.createElement('a');
    link.href = fileUrl;

    link.download = '프론트엔드_엔지니어_신태일_이력서.pdf';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className='print:hidden'>
      <Button
        onClick={handleDownloadPDF}
        variant='outline'
        className='group hover:bg-accent font-bold transition-all'
      >
        <Download className='mr-2 size-4 transition-transform group-hover:-translate-y-0.5' />
        이력서 PDF 저장
      </Button>
    </div>
  );
};
