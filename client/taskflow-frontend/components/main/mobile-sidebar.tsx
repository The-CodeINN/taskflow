'use client';

import { Menu } from 'lucide-react';
import Sidebar from './sidebar';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { usePathname } from 'next/navigation';
import { on } from 'events';

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const isOpen = useMobileSidebar((state) => state.isOpen);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        onClick={onOpen}
        className='block md:hidden mr-2'
        variant='ghost'
        size='sm'
      >
        <Menu size={26} />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-0'>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileSidebar;
