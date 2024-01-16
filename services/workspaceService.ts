import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';

export interface CreateWorkspaceRequest {
  Name: string;
  Description: string;
}

export interface CreateWorkspaceResponse {
  status: string;
  data: CreateWorkspaceData;
}

interface CreateWorkspaceData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyWorkspacesData {
  status: string;
  data: GetMyWorkspace[];
}

export interface GetMyWorkspace {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShowAWorkspaceData {
  status: string;
  data: showWorkspace;
}

interface showWorkspace {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateWorkspaceRequest extends CreateWorkspaceRequest {
  id: string;
}

export interface UpdateWorkspaceResponse {
  status: string;
  data: UpdateWorkspaceResponseData;
}

interface UpdateWorkspaceResponseData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface DeleteWorkspaceRequest extends CreateWorkspaceRequest {
  id: string;
}

export interface DeleteWorkspaceResponse {
  status: string;
  data: DeleteWorkspaceResponseData;
}

interface DeleteWorkspaceResponseData {
  status: string;
  message: string;
}

class WorkspaceService {
  static async createWorkspace(
    requestBody: CreateWorkspaceRequest
  ): Promise<AxiosResponse<CreateWorkspaceResponse>> {
    return await axiosConfig.post('workspaces', requestBody);
  }

  static async getMyWorkspaces(): Promise<AxiosResponse<GetMyWorkspacesData>> {
    return await axiosConfig.get('workspaces');
  }

  static async showAWorkspace(
    workspaceId: string
  ): Promise<AxiosResponse<ShowAWorkspaceData>> {
    return await axiosConfig.get(`workspaces/${workspaceId}`);
  }

  static async updateWorkspace(
    requestBody: UpdateWorkspaceRequest
  ): Promise<AxiosResponse<UpdateWorkspaceResponse>> {
    return await axiosConfig.put('workspaces', requestBody);
  }

  static async deleteWorkspace(
    workspaceId: string
  ): Promise<AxiosResponse<DeleteWorkspaceResponse>> {
    return await axiosConfig.delete(`workspaces/${workspaceId}`);
  }
}

export default WorkspaceService;
