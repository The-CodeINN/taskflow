"use client";

import axiosResponseMessage from "@/lib/axiosResponseMessage";
import WorkspaceService, {
  CreateWorkspaceRequest,
  UpdateWorkspaceRequest,
} from "@/services/workspaceService";
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useWorkspaces = () => {
  const queryClient = useQueryClient();

  const router = useRouter();

  const createWorkspaceMutation = useMutation({
    mutationFn: async (data: CreateWorkspaceRequest) => {
      const response = await WorkspaceService.createWorkspace(data);
      return response?.data;
    },
    onError: (error: AxiosError) => {
      toast.error(error.message);
      console.log(axiosResponseMessage(error));
    },
    onSuccess: (data) => {
      const { status, data: createWorkspaceResponseData } = data;
      toast.success(status);
    },
  });

  const getMyWorkspacesQuery = useQuery({
    queryKey: ["getMyWorkspace"],
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

  const GetShowAWorkspaceQuery = (workspaceId: string) => {
    return useQuery({
      queryKey: ["getShowAWorkspace", workspaceId],
      queryFn: async () => {
        try {
          const response = await WorkspaceService.showAWorkspace(workspaceId);
          return response?.data;
        } catch (error: any) {
          console.log(error);
          // toast.error(error as string);
        }
      },
    });
  };

  const DeleteWorkspaceMutation = (workspaceId: string) =>
    useMutation({
      mutationFn: async ({ workspaceId }: { workspaceId: string }) => {
        const response = await WorkspaceService.deleteWorkspace(workspaceId);
        return response?.data;
      },
      onSuccess: (data) => {
        const { status } = data;
        toast.success(status);
        const queryKey: InvalidateQueryFilters = {
          queryKey: ["getMyWorkspace"],
        };
        queryClient.invalidateQueries(queryKey);

        router.refresh();
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
      },
    });

  const UpdateWorkspaceMutation = () =>
    useMutation({
      mutationFn: async ({
        workspaceId,
        data,
      }: {
        workspaceId: string;
        data: UpdateWorkspaceRequest;
      }) => {
        const response = await WorkspaceService.updateWorkspace(
          workspaceId,
          data
        );
        return response?.data;
      },
      onError: (error: AxiosError) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
      },
    });

  return {
    createWorkspaceMutation,
    getMyWorkspacesQuery,
    GetShowAWorkspaceQuery,
    DeleteWorkspaceMutation,
    UpdateWorkspaceMutation,
  };
};

export default useWorkspaces;
