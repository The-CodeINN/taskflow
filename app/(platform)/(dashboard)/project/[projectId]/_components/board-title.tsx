import { Button } from '@/components/ui/button';
import React from 'react';

export const BoardTitle = ({ title }: { title: string }) => {
  return (
    <Button
      variant={'transparent'}
      className='font-bold text-lg h-auto w-auto p-1 px-2'
    >
      {title}
    </Button>
  );
};
