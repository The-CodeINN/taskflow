'use client';

import MetricCard from '@/components/workspace-components/metric-card';
import { ClipboardList, Layers3, ListTodo } from 'lucide-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter, useParams } from 'next/navigation';
import useProjectTasks from '@/hooks/useProjectTasks';
import useAuth from '@/hooks/useAuth';
const Column = dynamic(() => import('@/components/project-components/Column'), {
  ssr: false,
});

type TaskPageProps = {
  params?: { taskId?: string };
};

type Task = {
  createdAt: string;
  description: string;
  endDate: string;
  id: string;
  name: string;
  projectMember: {
    createdAt: string;
    id: string;
    user: {
      id: string;
      lastName: string;
      firstName: string;
      email: string;
      userName: string;
    };
  };
  stage: string;
  startDate: string;
  updatedAt: string;
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type State = {
  tasks: Record<string, Task>;
  columns: Record<string, Column>;
  columnOrder: string[];
};

const ProjectIdPage = () => {
  const { projectId } = useParams<{ projectId: string | string[] }>();
  const { user } = useAuth();

  const [state, setState] = useState<State>({
    tasks: {},
    columns: {
      TODO: {
        id: 'TODO',
        title: 'TODO',
        taskIds: [],
      },
      INPROGRESS: {
        id: 'INPROGRESS',
        title: 'INPROGRESS',
        taskIds: [],
      },
      COMPLETED: {
        id: 'COMPLETED',
        title: 'COMPLETED',
        taskIds: [],
      },
    },
    columnOrder: ['TODO', 'INPROGRESS', 'COMPLETED'],
  });
  const [loading, setLoading] = useState<boolean>(true);
  // If projectId is an array, you may want to handle it appropriately
  const projectIdString = Array.isArray(projectId) ? projectId[0] : projectId;

  // Now `projectIdString` is guaranteed to be a string
  const { FetchProjectTasks, UpdateProjectTasks } = useProjectTasks();
  const tasksData = FetchProjectTasks(projectIdString).data;
  const updateTask = UpdateProjectTasks(projectId as string);

  useEffect(() => {
    const tasks: any = {};
    const columns: Record<string, Column> = {
      TODO: {
        id: 'TODO',
        title: 'TODO',
        taskIds: [],
      },
      INPROGRESS: {
        id: 'INPROGRESS',
        title: 'INPROGRESS',
        taskIds: [],
      },
      COMPLETED: {
        id: 'COMPLETED',
        title: 'COMPLETED',
        taskIds: [],
      },
    };

    tasksData?.data.forEach((task) => {
      // console.log(tasksData);
      tasks[task.id] = task;

      columns[task.stage] = {
        id: task.stage,
        title: task.stage,
        taskIds: columns[task.stage]?.taskIds
          ? [...columns[task.stage].taskIds, task.id]
          : [task.id],
      };
    });

    setState((prev) => {
      return { ...prev, columns, tasks };
    });
    setLoading(false);
  }, [tasksData]);

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

    // console.log('destinationCol.title:', destinationCol.title);

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

    const projId: string = projectId as string;

    updateTask.mutate({
      taskId: remove,
      projectId: projId,
      data: {
        Name: state.tasks[remove].name,
        StartDate: state.tasks[remove].startDate,
        EndDate: state.tasks[remove].endDate,
        Description: state.tasks[remove].description,
        UserId: user?.id!,
        Stage: destinationCol.title,
      },
    });

    setState(newState);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <section>
          <h1 className='font-bold text-3xl'>Project Name</h1>
        </section>
        <div className='flex mt-10 space-x-5 overflow-x-scroll lg:overflow-x-hidden'>
          {!loading &&
            state.columnOrder.map((columnId) => {
              // console.log({ columnId });
              // console.log({ state });
              const column = state.columns[columnId];
              // console.log({ column });
              const tasks = column?.taskIds?.map(
                (taskId) => state.tasks[taskId]
              );
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
