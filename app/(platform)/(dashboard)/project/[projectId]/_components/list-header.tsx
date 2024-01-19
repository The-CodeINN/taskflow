import React from 'react';

interface ListHeaderProps {
  title: string;
}

export const ListHeader = ({ title }: ListHeaderProps) => {
  return (
    <div className='pt-2 px-2 text-sm font-semibold flex justify-between items-start- gap-x-2'>
      {title}
    </div>
  );
};
