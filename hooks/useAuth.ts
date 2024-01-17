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
        toast.error(axiosResponseMessage(error));
        // console.log(axiosResponseMessage(error));
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
    toast.error(axiosResponseMessage(error));
    console.log(axiosResponseMessage(error));
  },
  onSuccess: (data) => {
    const { status, data: responseData } = data;
    toast.success(status);
    setUser(responseData.user);
    setToken(responseData.jwtToken);

    // Get the return URL
    const returnUrl = localStorage.getItem('/workspaceId');

    // If the return URL is not null, redirect to it, otherwise go to default workspace
    if (returnUrl) {
      router.push(returnUrl);
      // Clear the return URL
      localStorage.removeItem('/workspaceId');
    } else {
      router.push('/workspace/1');
    }
  },
});

 const logOut = () => {
  // Store the current route in localStorage
  localStorage.setItem('/workspaceId', window.location.pathname);
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
          toast.error(error as string);
        }
      },
    });

  return { SignUpMutation, loginMutation, user, token, logOut, GetCurrentUser };
};

export default useAuth;
