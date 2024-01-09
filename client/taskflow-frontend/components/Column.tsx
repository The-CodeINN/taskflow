import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "./ui/button";

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
                          <Card
                            className={`border text-black px-2 py-2 rounded-md ${
                              draggableSnapshot.isDragging
                              // ? "border-blue-600"
                              // : "border-[#e3f2fa]"
                            }`}
                            onClick={() => console.log(task.content)}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                          >
                            {task.content}
                          </Card>
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
