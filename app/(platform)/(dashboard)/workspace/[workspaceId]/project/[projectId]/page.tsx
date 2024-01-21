'use client';

import MetricCard from '@/components/workspace-components/metric-card';
import { ClipboardList, Layers3, ListTodo } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const Column = dynamic(() => import('@/components/project-components/Column'), {
  ssr: false,
});

type TaskPageProps = {
  params: { taskId: string };
};

type Task = {
  id: number;
  content: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: number[];
};

type State = {
  tasks: Record<number, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

const initialData: State = {
  tasks: {
    1: { id: 1, content: 'Configure Next js' },
    2: { id: 2, content: 'Build app' },
    3: { id: 3, content: 'Design app' },
    4: { id: 4, content: 'Create cards' },
    5: { id: 5, content: 'Turn up' },
  },
  columns: {
    column1: {
      id: 'column1',
      title: 'To-do',
      taskIds: [1, 2, 3, 4, 5],
    },
    column2: {
      id: 'column2',
      title: 'In Progress',
      taskIds: [],
    },
    column3: {
      id: 'column3',
      title: 'Completed',
      taskIds: [],
    },
  },
  columnOrder: ['column1', 'column2', 'column3'],
};

const ProjectIdPage = ({ params }: TaskPageProps) => {
  const taskId = params?.taskId;
  console.log(taskId);

  const [state, setState] = useState(initialData);

  const reorderColumnList = (
    sourceCol: Column,
    startIndex: number,
    endIndex: number
  ) => {
    const newTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = newTaskIds.splice(startIndex, 1);
    newTaskIds.splice(endIndex, 0, removed);

    const newColumn = {
      ...sourceCol,
      taskIds: newTaskIds,
    };

    return newColumn;
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    // If user tries to drop in an unknown destination
    if (!destination) return;

    // If the user drags and drops back in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // If the user drops within the same column but in a different position
    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      console.log({ sourceCol, destinationCol });

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    // If the user moves from one column to another
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [remove] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, remove);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setState(newState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <section>
          <div className='grid md:grid-cols-3 gap-4'>
            <MetricCard
              title='Total Projects'
              value='4'
              icon={Layers3}
              iconClassName='text-violet-500'
            />
            <MetricCard
              title='Pending Tasks'
              value='3'
              icon={ClipboardList}
              iconClassName='text-pink-700'
            />
            <MetricCard
              title='Completed Tasks'
              value='3'
              icon={ListTodo}
              iconClassName='text-violet-500'
            />
          </div>
        </section>
        <div className='flex mt-10 space-x-5 overflow-x-scroll lg:overflow-x-hidden'>
          {state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);
            return (
              <Column
                tasks={tasks}
                column={column}
                key={columnId}
                columnId={columnId}
              />
            );
          })}
        </div>
      </div>
    </DragDropContext>
  );
};

export default ProjectIdPage;
