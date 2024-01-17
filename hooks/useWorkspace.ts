'use client';

import axiosResponseMessage from '@/lib/axiosResponseMessage';
import WorkspaceService, {
  CreateWorkspaceRequest,
} from '@/services/workspaceService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const useWorkspaces = () => {
  const createWorkspaceMutation = useMutation({
    mutationFn: async (data: CreateWorkspaceRequest) => {
      const response = await WorkspaceService.createWorkspace(data);
      return response?.data;
    },
    onError: (error: AxiosError) => {
      toast.error(axiosResponseMessage(error));
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data) => {
      const { status } = data;
      toast.success(status);
    },
  });

  const getMyWorkspacesQuery = useQuery({
    queryKey: ['getMyWorkspace'],
    queryFn: async () => {
      try {
        const response = await WorkspaceService.getMyWorkspaces();
        return response?.data;
      } catch (error: any) {
        console.log(error);
        // toast.error(error as string);
      }
    },
  });

  return { createWorkspaceMutation, getMyWorkspacesQuery };
};

export default useWorkspaces;
