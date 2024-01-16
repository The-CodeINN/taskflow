import axiosConfig from '@/config/axios';
import { AxiosResponse } from 'axios';
import { request } from 'http';

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

// export interface ForgotPasswordRequest {
//   username: string;
// }

// export interface ForgotPasswordResponse {
//   status: string;
//   message: string;
// }

// export interface ResetPasswordRequest {
//   username: string;
//   token: string;
//   NewPassword: string;
//   ConfirmPassword: string;
// }

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

  
}

export default AuthService;
