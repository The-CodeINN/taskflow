'use client';

import AuthService, {
  LoginRequest,
  RegisterRequest,
} from '@/services/authService';
import { useAuthState } from '@/store/authStore';
import axiosResponseMessage from '@/lib/axiosResponseMessage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const router = useRouter();
  const { setUser, setToken, user, token, clearAuth } = useAuthState();

  const SignUpMutation = (setIsopen?: (bool: boolean) => void) => {
    return useMutation({
      mutationFn: async (user: RegisterRequest) => {
        const response = await AuthService.register(user);
        // console.log(response.data);
        return response?.data;
      },
       onError: (error: AxiosError) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
      },
      onSuccess: (data) => {
        const { status, message } = data;
        setIsopen && setIsopen(true);
        return {
          status,
          message,
        };
      },
      // retry: false,
    });
  };

  const loginMutation = useMutation({
    mutationFn: async (user: LoginRequest) => {
      const response = await AuthService.login(user);
      return response?.data;
    },
     onError: (error: AxiosError) => {
        toast.error(error.message);
        console.log(axiosResponseMessage(error));
      },
    onSuccess: (data) => {
      const { status, data: responseData } = data;
      // console.log(responseData);
      toast.success(status);
      setUser(responseData.user);
      setToken(responseData.jwtToken);
      // router.push('/workspace/1');
    },
  });

  const logOut = () => {
    clearAuth();
    router.push('/login');
  };

  const GetCurrentUser = () =>
    useQuery({
      queryKey: ['user'],
      queryFn: async () => {
        try {
          const response = await AuthService.getCurrentUser();
          return response?.data?.data;
        } catch (error) {
          console.log(error);
          // toast.error(error as string);
        }
      },
    });

  return { SignUpMutation, loginMutation, user, token, logOut, GetCurrentUser };
};

export default useAuth;
