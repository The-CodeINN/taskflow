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
import { toast } from 'sonner';

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

const workspaceFormSchema = z.object({
  nameofWorkspace: z
    .string()
    .min(2, {
      message: 'Workspace name must be at least 2 characters.',
    })
    .max(160, {
      message: 'Workspace must not be longer than 30 characters.',
    }),
  email: z.string().email().or(z.undefined()),
});

type FormValues = z.infer<typeof workspaceFormSchema>;

const Workspace = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
    defaultValues: {
      nameofWorkspace: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast.success('Workspace created successfully');
    router.push('/workspace/1');
  };

  return (
    <div className=' bg-[#2f46a5] min-h-screen'>
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
                      name='nameofWorkspace'
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
                  <div className='grid w-full items-center gap-4 mt-5'>
                    <CardTitle>Invite Members</CardTitle>
                    <CardDescription>
                      Invite members with their email addresses
                    </CardDescription>

                    <div className='grid w-full items-center gap-4'>
                      <div className='flex flex-col space-y-1.5'>
                        <FormField
                          control={form.control}
                          name='email'
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
                      <CardFooter className='flex justify-end mt-3'>
                        <Button type='submit'>DONE</Button>
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
