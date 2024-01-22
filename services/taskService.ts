import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';

export interface CreatProjectTasksRequest {
  Name: string;
  StartDate: string;
  EndDate: string;
  Description: string;
  UserId: string;
  Stage: string;
}

export interface UpdateProjectTasksRequest extends CreatProjectTasksRequest {}

export interface CreatProjectTasksResponse {
  status: string;
  data: TaskData[];
}

export interface UpdateProjectTasksResponse extends CreatProjectTasksResponse {}

export interface TaskData {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  stage: string;
  createdAt: string;
  updatedAt: string;
  projectMember: ProjectMember;
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

// {{URL}}/api/projects/ddfe7ab4-5bd6-4d2b-0dd3-08dc1a150cff/tasks/0965637f-a736-4685-efd9-08dc1a7acc9a

export interface FetchProjectTasksResponse extends CreatProjectTasksResponse {}

// projects/ddfe7ab4-5bd6-4d2b-0dd3-08dc1a150cff/tasks
class ProjectTasks {
  static async createProjectTasks(
    projectId: string,
    requestBody: CreatProjectTasksRequest
  ): Promise<AxiosResponse<CreatProjectTasksResponse>> {
    return await axiosConfig.post(`projects/${projectId}/tasks`, requestBody);
  }

  static async fetchProjectTasks(
    projectId: string
  ): Promise<AxiosResponse<FetchProjectTasksResponse>> {
    return await axiosConfig.get(`projects/${projectId}/tasks`);
  }

  static async updateProjectTasks(
    projectId: string,
    taskId: string,
    requestBody: UpdateProjectTasksRequest
  ): Promise<AxiosResponse<UpdateProjectTasksResponse>> {
    return await axiosConfig.put(
      `projects/${projectId}/tasks/${taskId}`,
      requestBody
    );
  }
}

export default ProjectTasks;
