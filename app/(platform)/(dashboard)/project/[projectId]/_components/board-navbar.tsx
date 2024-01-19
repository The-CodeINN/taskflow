import React from 'react';
import { BoardTitle } from './board-title';

export const BoardNavbar = ({ title }: { title: string }) => {
  return (
    <div className='w-full h-14 z-[40] bg-black/50 fixed top-14 flex items-center px-6 gap-x-4 text-white'>
      <BoardTitle title={title} />
    </div>
  );
};
