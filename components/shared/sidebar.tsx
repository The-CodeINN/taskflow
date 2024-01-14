'use client';

import Link from 'next/link';
import { LogOut, Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import Logo from './logo';
import { Button } from '../ui/button';
import { Accordion } from '../ui/accordion';
import { NavbarItem } from './navbar-item';
import { cn } from '@/lib/utils';
import { Workspace } from '@/@types';
import { mockData } from '@/db/mock.json';
import useAuth from '@/hooks/useAuth';

interface SidebarProps {
  storageKey?: string;
}

// export const WorkspaceList = [
//   {
//     name: "Workspace 1",
//     id: "1",
//   },
//   {
//     name: "Workspace 2",
//     id: "2",
//   },
//   {
//     name: "Workspace 3",
//     id: "3",
//   },
// ];

const Sidebar = ({ storageKey = 't-sidebar-state' }: SidebarProps) => {
  const { logOut } = useAuth();

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  return (
    <>
      <div className='flex flex-col h-full'>
        <div className='px-3 py-10 flex-1 bg-primary md:rounded-r-lg'>
          <div className='flex items-center justify-between mb-6 lg:mb-14 '>
            <div className=''>
              <Logo />
            </div>
            <Button
              className='p'
              asChild
              type='button'
              size='icon'
              variant='ghost'
            >
              <Link href='/create-workspace'>
                <Plus className='h-6 w-6' />
              </Link>
            </Button>
          </div>
          <div className='flex flex-col justify-between h-[75dvh] pt-10'>
            <Accordion
              type='multiple'
              defaultValue={defaultAccordionValue}
              className='space-y-2'
            >
              {mockData.map((workspace: Workspace) => (
                <NavbarItem
                  key={workspace.id}
                  workspace={workspace}
                  onExpand={onExpand}
                  isExpanded={expanded[workspace.id]}
                  isActive={workspace.id === '1'}
                />
              ))}
            </Accordion>
            <div className='space-y-2'>
              <Button
                variant={'ghost'}
                onClick={logOut}
                className='text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-lg transition text-white bg-none hover:bg-white/10 items-center'
              >
                <LogOut className={cn('h-5 w-5 mr-3 text-xl')} />
                <span className='flex items-center flex-1 text-lg lg:text-xl'>
                  Logout
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
