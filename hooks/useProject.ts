import axiosResponseMessage from '@/lib/axiosResponseMessage';
import ProjectService, {
  CreateProjectRequest,
  EditWorkspaceProjectRequest,
} from '@/services/projectService';
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useProject = () => {
  const queryClient = useQueryClient();

  const CreateProjectMutation = (
    workspaceId: string,
    setIsopen?: (bool: boolean) => void
  ) =>
    useMutation({
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
        setIsopen && setIsopen(false);

        const queryKey: InvalidateQueryFilters = {
          queryKey: ['workspaceProjects', workspaceId],
        };
        queryClient.invalidateQueries(queryKey);
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
          // toast.error(error as string);
        }
      },
    });

  const DeleteWorkspaceProjectMutation = (
    workspaceId: string,
    setIsopen?: (bool: boolean) => void) => useMutation({
        mutationFn: async ({
          workspaceId,
          projectId,
        }: {
          workspaceId: string;
          projectId: string;
        }) => {
          const response = await ProjectService.deleteWorkspaceProject(
            workspaceId,
            projectId
          );
          return response?.data;
        },
       onSuccess: (data) => {
          const { status } = data;
          toast.success(status);
          setIsopen && setIsopen(false);
  
          const queryKey: InvalidateQueryFilters = {
            queryKey: ['workspaceProjects', workspaceId],
          };
          queryClient.invalidateQueries(queryKey);
        },
      });
  
  
  const UpdateWorkspaceProjectMutation = () =>
    useMutation({
      mutationFn: async ({
        workspaceId,
        projectId,
        data,
      }: {
        workspaceId: string;
        projectId: string;
        data: EditWorkspaceProjectRequest;
      }) => {
        const response = await ProjectService.editWorkspaceProject(
          workspaceId,
          projectId,
          data
        );
        return response?.data;
      },
    });

  return {
    CreateProjectMutation,
    FetchWorkspaceProjectsQuery,
    DeleteWorkspaceProjectMutation,
    UpdateWorkspaceProjectMutation,
  };
};

export default useProject;
