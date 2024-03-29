'use client';

import React from 'react';
import Logo from './logo';
import MobileSidebar from './mobile-sidebar';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import useAuth from '@/hooks/useAuth';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';
import { getFirstLetter } from '@/lib/utils';

const DashboardNavbar = () => {
  const { GetCurrentUser, logOut } = useAuth();
  const user = GetCurrentUser();

  

  const router = useRouter()

  return (
    <nav className='flex items-center px-8 py-4 border-b-2 border-gray-300'>
      <MobileSidebar />
      <div className='flex justify-end items-center w-full'>
        <div className='flex items-center gap-4'>
          <Bell className='cursor-pointer hidden lg:flex' size={24} />

          {user.isLoading ? (
            <div className='flex items-center gap-x-2'>
              <div className='w-10 h-10 relative shrink-0'>
                <Skeleton className='h-full w-full absolute bg-neutral-800/10' />
              </div>
              <div className='w-10 h-10 relative shrink-0'>
                <Skeleton className='h-full w-full absolute bg-neutral-800/10' />
              </div>
              <div className='w-10 h-10 relative shrink-0'>
                <Skeleton className='h-full w-full absolute bg-neutral-800/10' />
              </div>
            </div>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className='cursor-pointer'>
                    {/* <AvatarImage
                  className=' h-10 w-10'
                  src='https://avatars.githubusercontent.com/u/55942632?v=4'
                /> */}
                    <AvatarFallback className='space-x-1 bg-neutral-800/15'>
                      {getFirstLetter(user?.data?.firstName)}
                      {getFirstLetter(user?.data?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      {/* <DropdownMenuSubTrigger>
                        Invite Members
                      </DropdownMenuSubTrigger> */}
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logOut}>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div>
                <p className='text-sm font-semibold'>
                  {`${user?.data?.firstName} ${user?.data?.lastName}`}
                </p>
                <p className='text-xs text-gray-500'>Member</p>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
