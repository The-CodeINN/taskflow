import React from 'react';
import Logo from './logo';
import MobileSidebar from './mobile-sidebar';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

const DashboardNavbar = () => {
  return (
    <nav className='flex items-center px-8 py-4 border-b-2 border-gray-300'>
      <MobileSidebar />
      <div className='flex justify-end items-center w-full'>
        <div className='flex items-center gap-4'>
          <Bell className='cursor-pointer hidden md:flex' size={24} />
          <Avatar className='cursor-pointer'>
            <AvatarImage
              className=' h-10 w-10'
              src='https://avatars.githubusercontent.com/u/55942632?v=4'
            />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-semibold'>Jerry Abadi</p>
            <p className='text-xs text-gray-500'>Member</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
