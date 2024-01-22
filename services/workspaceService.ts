import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';

export interface CreateWorkspaceRequest {
  Name: string;
  Description: string;
  Members: string[];
}
// export interface CreateWorkspaceRequest {
//   Name: string;
//   Description: string;
// }

export interface CreateWorkspaceResponse {
  status: string;
  data: Data;
}

interface Data {
  id: string;
  name: string;
  description: string;
  user: User;
  workspaceMembers: WorkspaceMember[];
  projects: any[];
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceMember {
  id: string;
  createdAt: string;
  user: User;
}

interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}
// export interface CreateWorkspaceResponse {
//   status: string;
//   data: CreateWorkspaceData;
// }

export interface CreateWorkspaceData {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetMyWorkspacesData {
  status: string;
  data: MyWorkspaceDetails[];
}

export interface MyWorkspaceDetails {
  id: string;
  name: string;
  description: string;
  user: User;
  workspaceMembers: WorkspaceMember[];
  projects: Project[];
  createdAt: string;
  updatedAt: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

interface WorkspaceMember {
  id: string;
  createdAt: string;
  user: User;
}

interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}

// export interface GetMyWorkspacesData {
//   status: string;
//   data: GetMyWorkspace[];
// }

// export interface GetMyWorkspace {
//   id: string;
//   name: string;
//   description: string;
//   createdAt: string;
//   updatedAt: string;
// }

export interface ShowAWorkspaceData {
  status: string;
  data: showWorkspace;
}

interface showWorkspace extends MyWorkspaceDetails {
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
    workspaceId: string, 
    requestBody: UpdateWorkspaceRequest
  ): Promise<AxiosResponse<UpdateWorkspaceResponse>> {
    return await axiosConfig.put(`workspaces/${workspaceId}`, requestBody);
  }

  static async deleteWorkspace(
    workspaceId: string
  ): Promise<AxiosResponse<DeleteWorkspaceResponse>> {
    return await axiosConfig.delete(`workspaces/${workspaceId}`);
  }
}

export default WorkspaceService;
