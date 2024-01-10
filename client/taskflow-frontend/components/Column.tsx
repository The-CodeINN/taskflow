"use client";

import React, { Fragment, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "./ui/button";
// import Modal from "./Modal";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";
import TaskCard from "./task-card";

const Column = ({ column, tasks, columnId }: any) => {
  const onClick = () => {};

  return (
    <Card className=" bg-[#414fc7] flex-1 rounded-sm min-w-64">
      <div>
        <CardHeader className="p-3 py-2 bg-[#2c3582] flex-1 rounded-t-sm border-b ">
          <CardTitle className=" font-bold text-md text-white text-center">
            {column.title}
          </CardTitle>
        </CardHeader>
        <Droppable ignoreContainerClipping droppableId={columnId}>
          {(droppableProvided, droppableSnapshot) => (
            <CardContent className="h-full py-3 px-2 min-h-20">
              <div
                className={`flex flex-col space-y-4  ${droppableSnapshot.isDraggingOver}`}
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
              >
                {tasks.map(
                  (task: { id: string; content: string }, index: number) => (
                    <Draggable
                      key={task.id}
                      draggableId={`${task.id}`}
                      index={index}
                    >
                      {(draggableProvided, draggableSnapshot) => {
                        return (
                          <Dialog>
                            <DialogTrigger>
                              <Card
                                className={`border text-black px-2 py-2 rounded-md ${draggableSnapshot.isDragging}`}
                                ref={draggableProvided.innerRef}
                                {...draggableProvided.draggableProps}
                                {...draggableProvided.dragHandleProps}
                              >
                                {task.content}
                              </Card>
                            </DialogTrigger>
                            <DialogContent>
                              <TaskCard />
                            </DialogContent>
                          </Dialog>
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
