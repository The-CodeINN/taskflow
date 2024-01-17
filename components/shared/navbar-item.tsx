'use client';
import { Briefcase, Layout, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { GetMyWorkspace } from '@/services/workspaceService';
import { useWorkspaceStore } from '@/store/workspaceStore';

interface NavbarItemProps {
  isExpanded: boolean;
  isActive: boolean;
  onExpand: (id: string) => void;
  workspace: GetMyWorkspace;
}

export const NavbarItem = ({
  isExpanded,
  isActive,
  onExpand,
  workspace,
}: NavbarItemProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const setActiveWorkspace = useWorkspaceStore(
    (state) => state.setActiveWorkspace
  );

  const routes = [
    {
      label: 'Projects',
      icon: <Layout className='h-4 w-4 mr-2' />,
      href: `/workspace/${workspace.id}`,
    },
    {
      label: 'Settings',
      icon: <Settings className='h-4 w-4 mr-2' />,
      href: `/workspace/${workspace.id}/settings`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };
  return (
    <AccordionItem value={workspace.id} className=' border-none'>
      <AccordionTrigger
        onClick={() => {
          onExpand(workspace.id);
          setActiveWorkspace(workspace);
        }}
        className={cn(
          'flex items-center gap-x-2 p-3 text-gray-100 rounded-md hover:bg-neutral-800/10 transition text-start no-underline hover:no-underline',
          isActive && !isExpanded && 'bg-neutral-800/20 text-gray-100'
        )}
      >
        <div className='flex items-center gap-x-2'>
          <div className='w-7-h-7'>
            <Briefcase />
          </div>
          <span className='font-medium text-sm'>{workspace.name}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className='pt-1 text-gray-200'>
        {routes.map((route) => (
          <Button
            key={route.href}
            size='default'
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full font-normal justify-start pl-10 mb-1 hover:bg-[#eaeaea] hover:text-gray-600',
              pathname === route.href && 'bg-white text-black'
            )}
            variant='ghost'
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

NavbarItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className='flex items-center gap-x-2'>
      <div className='w-10 h-10 relative shrink-0'>
        <Skeleton className='h-full w-full absolute bg-neutral-800/10' />
      </div>
      <Skeleton className='h-10 w-full bg-neutral-800/10' />
    </div>
  );
};
