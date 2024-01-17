import axiosResponseMessage from '@/lib/axiosResponseMessage';
import ProjectService, {
  CreateProjectRequest,
} from '@/services/projectService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useProject = () => {
  const createProjectMutation = useMutation({
    mutationFn: async ({
      data,
      workspaceId,
    }: {
      data: CreateProjectRequest;
      workspaceId: string;
    }) => {
      const response = await ProjectService.createProject(workspaceId, data);
      return response?.data;
    },
    onError: (error: AxiosError) => {
      toast.error(axiosResponseMessage(error));
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data) => {
      const { data: responseData, status } = data;
      toast.success(status);
    },
  });

  const FetchWorkspaceProjectsQuery = (workspaceId: string) =>
    useQuery({
      queryKey: ['workspaceProjects', workspaceId],
      queryFn: async () => {
        try {
          const response = await ProjectService.fetchWorkspaceProjects(
            workspaceId
          );
          return response?.data;
        } catch (error) {
          console.log(error);
          toast.error(error as string);
        }
      },
    });

  return { createProjectMutation, FetchWorkspaceProjectsQuery };
};

export default useProject;
