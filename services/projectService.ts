import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';

export interface CreateProjectRequest {
  name: string;
  description: string;
  startdate: string;
  enddate: string;
}

export interface CreateProjectResponse {
  status: string;
  data: CreateProjectResponseData;
}

export interface CreateProjectResponseData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
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
}

export default ProjectService;
