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
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import useWorkspaces from '@/hooks/useWorkspace';
import { toast } from 'sonner';
import { AlertTriangle, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const WorkspaceSettingsSchema = z.object({
  Name: z
    .string()
    .min(2, {
      message: 'Workspace name must be at least 2 characters.',
    })
    .max(160, {
      message: 'Workspace must not be longer than 30 characters.',
    }),
   // .optional(),
  Description: z.string(),
  members: z.string().optional(),
});

type FormValues = z.infer<typeof WorkspaceSettingsSchema>;

const WorkspaceSettings = () => {
  const router = useRouter();
  const { createWorkspaceMutation } = useWorkspaces();

  const form = useForm<z.infer<typeof WorkspaceSettingsSchema>>({
    resolver: zodResolver(WorkspaceSettingsSchema),
    defaultValues: {
      Name: '',
      Description: '',
    },
  });

  const isLoading = createWorkspaceMutation.isPending;

  const onSubmit = (data: FormValues) => {
    createWorkspaceMutation.mutate(data, {});
  };


  return (
    <div className="min-h-screen">
      <section className='flex items-center justify-center py-20 md:py-0 '>
        <Card className=' bg-[#f5f4f4] md:w-[90%] mt-10 mb-5'>
          <div>
            <CardHeader>
              <CardTitle className='font-bold'>Manage your workspace</CardTitle>
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
                          <FormLabel>Edit workspace name</FormLabel>
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
                    <CardTitle className='font-bold'>Invite Members</CardTitle>
                    <CardDescription>
                      Enter or paste one or more email addresses, separated by spaces or commas
                    </CardDescription>
                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-1.5'>
                        <FormField
                          control={form.control}
                          name='Description'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
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
                      <div>
            <FormField
              control={form.control}
              name='members'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-bold'>Remove a workspace member</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select a workspace member you want to remove' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='jerry'>Jerry Abadi</SelectItem>
                        <SelectItem value='m@google.com'>
                          Richard Emijere
                        </SelectItem>
                        <SelectItem value='hashiru'>
                          Hashiru Abdullahi
                        </SelectItem>
                        <SelectItem value='joshua'>Adurotimi Joshua</SelectItem>
                        <SelectItem value='femi'>
                          Oloruntuyi Oluwafemi
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                
              )}
            />
        </div>
          <CardFooter className='flex justify-between mt-3'>         
                      <div>
                        <h1 className='font-bold'>Danger</h1>
                        <p>Delete your workspace</p>
                        <Button className='mt-3 text-white bg-sky-950 hover:bg-red-800'>
                         Delete Workspace <span className="ml-2"><AlertTriangle /></span>
                        </Button>
                      </div>
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

export default WorkspaceSettings;
