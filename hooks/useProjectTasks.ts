import axiosResponseMessage from '@/lib/axiosResponseMessage';
import ProjectTasks, {
  CreatProjectTasksRequest,
  UpdateProjectTasksRequest,
} from '@/services/taskService';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useProjectTasks = () => {
  const queryClient = useQueryClient();

  const CreateTask = (projectId: string, setIsopen?: (bool: boolean) => void
) =>
    useMutation({
      mutationFn: async ({
        data,
        projectId,
      }: {
        data: CreatProjectTasksRequest;
        projectId: string;
      }) => {
        const response = await ProjectTasks.createProjectTasks(projectId, data);
        return response?.data;
      },
      onSuccess: (data) => {
        const { status } = data;
        toast.success(status);
        setIsopen && setIsopen(false);


        const queryKey: InvalidateQueryFilters = {
          queryKey: ['projectTasks', projectId],
        };
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
      },
    });

  const FetchProjectTasks = (projectId: string) =>
    useQuery({
      queryKey: ['projectTasks', projectId],
      queryFn: async () => {
        try {
          const response = await ProjectTasks.fetchProjectTasks(projectId);
          return response?.data;
        } catch (error) {
          console.log(error);
        }
      },
    });

  const UpdateProjectTasks = (projectId: string) =>
    useMutation({
      mutationFn: async ({
        taskId,
        projectId,
        data,
      }: {
        taskId: string;
        projectId: string;
        data: UpdateProjectTasksRequest;
      }) => {
        const response = await ProjectTasks.updateProjectTasks(
          projectId,
          taskId,
          data
        );
        return response?.data;
      },
      onSuccess: (data) => {
        const { status } = data;
        toast.success(status);

        const queryKey: InvalidateQueryFilters = {
          queryKey: ['projectTasks', projectId],
        };
        queryClient.invalidateQueries(queryKey);
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
      },
    });

  return {
    CreateTask,
    FetchProjectTasks,
    UpdateProjectTasks,
  };
};

export default useProjectTasks;
