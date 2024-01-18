'use client';

import { FolderOpenDot, MoreHorizontal } from 'lucide-react';
import { Card } from '../ui/card';
import { useRouter } from 'next/navigation';
import { FetchWorkspaceProjectData } from '@/services/projectService';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

const ProjectCard = ({
  id,
  name,
  description,
  startDate,
  endDate,
}: FetchWorkspaceProjectData) => {
  const router = useRouter();
  const handleProjectClick = () => {
    router.push(`/project/${id}`);
  };

  return (
    <Card className='rounded-lg shadow-sm hover:shadow-md p-4 md:p-6 bg-[#F9FAFB] border-[#EAECF0]'>
      <div className='grid grid-cols-3 gap-4 items-center justify-between'>
        <div className='flex items-center space-x-4 md:col-span-1'>
          <FolderOpenDot className='text-primary hidden md:flex' size={24} />
          <div>
            <p className='text-md font-semibold'>{name}</p>
            <p className='text-sm hidden md:flex'>{description}</p>
          </div>
        </div>
        <div className='text-sm  md:col-span-1'>
         Project Timeline - 
        <span className='block md:inline'>{`${startDate} - ${endDate}`}</span>
        </div>
        <div className='text-primary cursor-pointer md:col-span-1 flex justify-end'>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal  size={25} />
              </DropdownMenuTrigger>
              <DropdownMenuContent className=' w-32'>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleProjectClick}>
                    View Details
                  </DropdownMenuItem>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Are you sure you want to
                  permanently delete this file from our servers?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type='submit'>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
