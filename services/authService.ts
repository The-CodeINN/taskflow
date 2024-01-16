import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';

export interface RegisterResponse {
  status: string;
  message: string;
}

export interface LoginResponse {
  status: string;
  data: ResponseData;
}

export interface RegisterRequest {
  lastname: string;
  firstname: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface ResponseData {
  jwtToken: string;
  user: User;
}

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  emailConfirmed: string;
  createdAt: string;
  updatedAt: string;
}

class AuthService {
  static register = async (
    requestBody: RegisterRequest
  ): Promise<AxiosResponse<RegisterResponse>> => {
    return await axiosConfig.post('auth/register', requestBody);
  };

  static login = async (
    requestBody: LoginRequest
  ): Promise<AxiosResponse<LoginResponse>> => {
    return await axiosConfig.post('auth/login', requestBody);
  };

  static getCurrentUser = async (): Promise<AxiosResponse<User>> => {
    return await axiosConfig.get('auth/me');
  };
}

export default AuthService;
