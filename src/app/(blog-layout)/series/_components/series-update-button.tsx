'use client';

import { useState } from 'react';

import { MoreVertical, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { deleteSeriesAction, updateSeriesAction } from '../page.actions';

export function SeriesUpdateButton({
  id,
  initialTitle,
  initialThumbnail,
}: any) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [thumbnail, setThumbnail] = useState(initialThumbnail);

  const handleUpdate = async () => {
    const res = await updateSeriesAction(id, { title, thumbnail });
    if (res.success) setIsEditOpen(false);
  };

  const handleDelete = async () => {
    if (confirm('시리즈를 삭제하시겠습니까? 연결된 포스트는 유지됩니다.')) {
      await deleteSeriesAction(id);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='h-8 w-8 bg-white/80 shadow-sm backdrop-blur-sm hover:bg-white'
          >
            <MoreVertical className='size-4 text-zinc-600' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-32'>
          <DropdownMenuItem
            onClick={() => setIsEditOpen(true)}
            className='gap-2'
          >
            <Pencil className='size-3.5' /> 수정
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className='text-destructive focus:text-destructive gap-2'
          >
            <Trash className='size-3.5' /> 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>시리즈 정보 수정</DialogTitle>
          </DialogHeader>
          <div className='space-y-4 py-4'>
            <div className='space-y-2'>
              <Label>시리즈 이름</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className='space-y-2'>
              <Label>썸네일 URL</Label>
              <Input
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              />
            </div>
            <Button onClick={handleUpdate} className='w-full'>
              변경사항 저장
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
