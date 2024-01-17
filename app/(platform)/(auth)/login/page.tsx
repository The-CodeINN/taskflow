'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';
import useWorkspaces from '@/hooks/useWorkspace';
import { useEffect } from 'react';

const registerFormSchema = z.object({
  username: z.string().email({
    message: 'Invalid email',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const LoginPage = () => {
  const { loginMutation } = useAuth();
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const isLoading = loginMutation.isPending;
  const { getMyWorkspacesQuery } = useWorkspaces();
  const workspaces = getMyWorkspacesQuery?.data?.data;
  console.log(workspaces);

  const onSubmit = (data: RegisterFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        // Check if workspaces data is available
        if (workspaces && workspaces.length > 0) {
          // Redirect to the first workspace
          router.push(`/workspace/${workspaces[0].id}`);
        } else {
          // Redirect to create-workspace route
          router.push('/create-workspace');
        }
      },
    });
  };

  return (
    <section className='flex bg-[#ffffff] justify-between '>
      <div className='bg-white h-screen md:w-[60%] md:rounded-l-[20px] w-full flex flex-col justify-center'>
        <h2 className='mt-20 text-center text-3xl md:text-4xl font-bold leading-9 tracking-tight text-gray-900'>
          Login to your account
        </h2>
        <p className='mt-1 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900 md: visible'>
          Don&apos;t have an account?
          <Link href='/register' className='text-primary underline ml-1'>
            Sign up
          </Link>
        </p>

        <div className='px-12 md:px-28'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='grid md:py-5'>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type='email' disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className='text-xs' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='flex justify-end font-semibold text-primary hover:text-indigo-500'>
                <Link href='/forgot-password'>Forgot password?</Link>
              </div>
              <div className=' py-10'>
                <Button disabled={isLoading} className='w-full' type='submit'>
                  {isLoading ? (
                    <div className='flex gap-2 items-center'>
                      Loading <Loader2 className=' animate-spin' />
                    </div>
                  ) : (
                    'LOG IN'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className=' bg-primary flex-col items-center w-[60%] hidden md:flex rounded-xl justify-center'>
        <div className='text-white space-y-3'>
          <h1 className='text-4xl font-bold'>Optimize team workflow,</h1>
          <h4 className='text-2xl text-center'>
            with seamless task coordination!
          </h4>
          <div className='w-[400px]'>
            <Image
              src={'/add-task.svg'}
              alt='task'
              width={500}
              height={500}
              className='py-10 w-full'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
