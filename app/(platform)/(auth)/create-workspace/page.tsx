'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';


import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormDescription,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import useWorkspaces from '@/hooks/useWorkspace';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const workspaceFormSchema = z.object({
  Name: z
    .string()
    .min(2, {
      message: 'Workspace name must be at least 2 characters.',
    })
    .max(160, {
      message: 'Workspace must not be longer than 30 characters.',
    }),
  Description: z.string({
    required_error: 'Description is required',
  }),
  Members: z.string().refine(
    (value) => {
      const membersArray = value.split(/[ ,]+/).filter(Boolean);
      return membersArray.every(
        (email) => z.string().email().safeParse(email).success
      );
    },
    { message: 'Invalid email addresses' }
  ),
});

type FormValues = z.infer<typeof workspaceFormSchema>;

const Workspace = () => {
  const router = useRouter();
  const { createWorkspaceMutation } = useWorkspaces();

  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      Name: '',
      Description: '',
    },
  });

  const isLoading = createWorkspaceMutation.isPending;

  const onSubmit = (data: FormValues) => {
    const membersArray = data.Members.split(/[ ,]+/).filter(Boolean);

    const requestData = {
      Name: data.Name,
      Description: data.Description,
      Members: membersArray,
    };

    // console.log(requestData);
    createWorkspaceMutation.mutate(requestData, {
      onSuccess: (response) => {
        const createdWorkspaceId = response.data.id;
        if (createdWorkspaceId) {
          router.push(`/workspace/${createdWorkspaceId}`);
        }
      },
      onError: (error) => {
        toast.error(error?.message);
        return;
      },
    });

    console.log(data);
  };
const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div className=" bg-[url('/workspacebg5.jpg')] bg-no-repeat bg-fixed bg-cover min-h-screen">
      <section className='flex items-center justify-center py-20 md:py-0 '>
        <Card className=' bg-[#eaebf4] md:w-[50%] mt-10 mb-5'>
          <div>
            <CardHeader>
              <CardTitle className='font-bold'>Create your Workspace</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className='grid w-full items-center gap-4'>
                    <FormField
                      control={form.control}
                      name='Name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of your Workspace</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-xs' />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid w-full items-center gap-4'>
                    <FormField
                      control={form.control}
                      name='Description'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input
                              type='text'
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className='text-xs' />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='grid w-full items-center gap-4 mt-5'>
                    <CardTitle>Invite Members</CardTitle>
                    {/* <CardDescription>
                      Invite members with their email addresses
                    </CardDescription> */}

                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-1.5'>
                        <FormField
                          control={form.control}
                          name='Members'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormDescription>
                                Enter or paste one or more email addresses,
                                separated by spaces or commas
                              </FormDescription>
                              <FormControl>
                                <Textarea
                                  disabled={isLoading}
                                  {...field}
                                  placeholder='Enter your email address here'
                                />
                              </FormControl>

                              <FormMessage className='text-xs' />
                            </FormItem>
                          )}
                        />
                      </div>
                      <CardFooter className='flex justify-between mt-3'>
                        <Button onClick={goBack}>Go Back</Button>
                        <Button
                          disabled={isLoading}
                          className='text-white bg-sky-950'
                          type='submit'
                        >
                          {isLoading ? (
                            <div className='flex gap-2 items-center'>
                              Loading <Loader2 className=' animate-spin' />
                            </div>
                          ) : (
                            'DONE'
                          )}
                        </Button>
                      </CardFooter>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Workspace;
