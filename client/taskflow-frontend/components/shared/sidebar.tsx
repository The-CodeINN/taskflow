'use client';

import { FolderKanban, Home, LogOut, UserRound } from 'lucide-react';
import Logo from './logo';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const routes = [
  {
    label: 'Home',
    path: '/home',
    icon: Home,
  },
  {
    label: 'Project',
    path: '/project',
    icon: FolderKanban,
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: UserRound,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col h-full'>
      <div className='px-3 py-10 flex-1 bg-primary md:rounded-r-lg'>
        <div className='flex items-center justify-between mb-6 lg:mb-14 '>
          <div className='pl-3 flex items-center'>
            <Logo />
          </div>
        </div>
        <div className='flex flex-col justify-between h-[75dvh] pt-10'>
          <div className='space-y-2'>
            {routes.map((route) => (
              <Link
                href={route.path}
                key={route.path}
                className={cn(
                  'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition',
                  pathname.includes(route.path)
                    ? 'bg-white text-charcoal'
                    : 'text-white bg-none hover:bg-white/10'
                )}
              >
                <div className='flex items-center flex-1 text-lg lg:text-xl'>
                  <route.icon className={cn('h-5 w-5 mr-3 text-xl')} />
                  {route.label}
                </div>
              </Link>
            ))}
          </div>
          <div className='space-y-2'>
            <Link
              href='/'
              className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition text-white bg-none hover:bg-white/10 items-center'
            >
              <LogOut className={cn('h-5 w-5 mr-3 text-xl')} />
              <span className='flex items-center flex-1 text-lg lg:text-xl'>
                Logout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
