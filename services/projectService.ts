import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';

export interface CreateProjectRequest {
  name: string;
  description: string;
  startdate: string;
  enddate: string;
  UserIds: string[];
}
export interface CreateProjectResponse {
  status: string;
  data: Data;
}

interface Data {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  projectMembers: ProjectMember[];
  projectTasks: any[];
}

interface ProjectMember {
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

export interface FetchWorkspaceProjectResponse {
  status: string;
  data: FetchWorkspaceProjectData[];
}

export interface FetchWorkspaceProjectData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface DeleteWorkspaceProjectResponseData {
  status: string;
  message: string;
}

export interface EditWorkspaceProjectRequest {
  name: string;
  description: string;
  startdate: string;
  enddate: string;
}

class ProjectService {
  static async createProject(
    workspaceId: string,
    requestBody: CreateProjectRequest
  ): Promise<AxiosResponse<CreateProjectResponse>> {
    return await axiosConfig.post(
      `workspaces/${workspaceId}/projects`,
      requestBody
    );
  }

  static async fetchWorkspaceProjects(
    workspaceId: string
  ): Promise<AxiosResponse<FetchWorkspaceProjectResponse>> {
    return await axiosConfig.get(`workspaces/${workspaceId}/projects`);
  }

  static async deleteWorkspaceProject(
    workspaceId: string,
    projectId: string
  ): Promise<AxiosResponse<DeleteWorkspaceProjectResponseData>> {
    return await axiosConfig.delete(
      `workspaces/${workspaceId}/projects/${projectId}`
    );
  }

  static async editWorkspaceProject(
    workspaceId: string,
    projectId: string,
    requestBody: EditWorkspaceProjectRequest
  ): Promise<AxiosResponse<CreateProjectResponse>> {
    return await axiosConfig.put(
      `workspaces/${workspaceId}/projects/${projectId}`,
      requestBody
    );
  }
}

export default ProjectService;
