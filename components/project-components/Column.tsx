'use client';

import React, { Fragment, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Button } from '../ui/button';
// import Modal from "./Modal";
import Link from 'next/link';
import { Textarea } from '@/components/ui/textarea';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, MoreHorizontal, MoreVertical } from 'lucide-react';
import TaskCard from './task-card';

const Column = ({ column, tasks, columnId }: any) => {
  const onClick = () => {};

  return (
    <Card className=' flex-1 rounded-sm min-w-64'>
      <div>
        <CardHeader className='p-3 py-4 bg-neutral-800/15 flex-1 rounded-t-sm border-b '>
          <div className='flex justify-between items-center'>
            <CardTitle className=' font-bold text-md'>{column.title}</CardTitle>
            <div
              className={`rounded-full w-6 h-6 text-white text-xs flex justify-center items-center ${
                column.title === 'TODO'
                  ? 'bg-red-500' // Red for 'To-do'
                  : column.title === 'INPROGRESS'
                  ? 'bg-yellow-500' // Yellow for 'In Progress'
                  : column.title === 'COMPLETED'
                  ? 'bg-green-500' // Green for 'Completed'
                  : 'bg-gray-500' // Default background color
              } p-3`}
            >
              1
            </div>
          </div>
        </CardHeader>
        <Droppable ignoreContainerClipping droppableId={columnId}>
          {(droppableProvided, droppableSnapshot) => (
            <CardContent className='h-full py-3 px-2 min-h-20'>
              <div
                className={`flex flex-col space-y-4  ${droppableSnapshot.isDraggingOver}`}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {tasks.map(
                  (
                    task: {
                      id: string;
                      name: string;
                      description: 'string';
                      stage: 'TODO' | 'INPROGRESS' | 'COMPLETED';
                    },
                    index: number
                  ) => (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(draggableProvided, draggableSnapshot) => {
                        return (
                          // <Dialog>
                          //   <DialogTrigger>
                          <div
                            className={` ${draggableSnapshot.isDragging} justify-self-start`}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            {/* <CardContent>{task.content}</CardContent> */}
                            <div className='bg-gray-100 p-6 rounded-lg shadow-md'>
                              <h3 className='font-semibold text-lg text-gray-800'>
                                {task.name}
                              </h3>
                              <p className='text-sm text-gray-600 mt-2'>
                                {task.description}
                              </p>
                              <div className='flex justify-between items-center'>
                                <span
                                  className={`inline-block ${
                                    task.stage === 'TODO'
                                      ? 'bg-red-500'
                                      : task.stage === 'INPROGRESS'
                                      ? 'bg-yellow-500'
                                      : task.stage === 'COMPLETED'
                                      ? 'bg-green-500'
                                      : 'bg-gray-500'
                                  } text-white text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide mt-4`}
                                >
                                  {task.stage}
                                </span>
                                <MoreHorizontal />
                              </div>
                            </div>
                          </div>
                          //   </DialogTrigger>
                          //   <DialogContent>
                          //     <TaskCard />
                          //   </DialogContent>
                          // </Dialog>
                        );
                      }}
                    </Draggable>
                  )
                )}
              </div>
            </CardContent>
          )}
        </Droppable>
      </div>
    </Card>
  );
};

export default Column;
