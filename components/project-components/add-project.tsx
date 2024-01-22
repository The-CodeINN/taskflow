import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';
import Select from 'react-select';
import { Input } from '@/components/ui/input';
import { Textarea } from '../ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import useProject from '@/hooks/useProject';
import useWorkspaces from '@/hooks/useWorkspace';

const addTaskFormSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  members: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'Members are required',
  }),
  startDate: z.date({
    required_error: 'Start date is required',
  }),
  endDate: z.date({
    required_error: 'End date is required',
  }),
});

type AddTaskFormValues = z.infer<typeof addTaskFormSchema>;

const AddProject = ({
  workspaceId,
  closeModal,
}: {
  workspaceId: string;
  closeModal: () => void;
}) => {
  const { CreateProjectMutation } = useProject();
  const { GetShowAWorkspaceQuery } = useWorkspaces();

  const workspaceData = GetShowAWorkspaceQuery(workspaceId)?.data?.data;

  console.log(workspaceData);

  const members = workspaceData?.workspaceMembers;

  const options = Array.isArray(members)
    ? members.map((member) => ({
        value: member.user.id,
        label: `${member.user.firstName} ${member.user.lastName}`,
      }))
    : [];

  const createProjectMutation = CreateProjectMutation(workspaceId, closeModal);
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      members: [], // Initialize members as an array
    },
  });

  const onSubmit = (data: AddTaskFormValues) => {
    // console.log(data);

    createProjectMutation.mutate({
      data: {
        name: data.title,
        description: data.description,
        startdate: data.startDate.toISOString(),
        enddate: data.endDate.toISOString(),
        UserIds: data.members, // Pass the selected members
      },
      workspaceId: workspaceId,
    });
  };

  return (
    <>
      <div className='grid gap-4'>
        <Form {...form}>
          <form
            className='space-y-6 w-full'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel>Project Title</FormLabel>
                  <FormControl className=''>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Tell a little about the project'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='members'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Members</FormLabel>
                  <FormControl>
                    <Select
                      isMulti
                      className='basic-multi-select'
                      classNamePrefix='select'
                      options={options}
                      value={options.filter((option) =>
                        field.value.includes(option.value)
                      )}
                      onChange={(selectedOptions) =>
                        form.setValue(
                          'members',
                          selectedOptions.map((opt) => opt.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='fle gap-4'>
              <FormField
                control={form.control}
                name='startDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0) ||
                            date > new Date('2100-01-02')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endDate'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>End Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[240px] pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                            disabled={!form.getValues('startDate')}
                          >
                            {field.value ? (
                              format(field.value, 'PPP')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0' align='start'>
                        <Calendar
                          mode='single'
                          selected={field.value}
                          onSelect={(date) => {
                            // Check if the selected date is not before the start date
                            if (
                              !form.getValues('startDate') ||
                              date! >= form.getValues('startDate')
                            ) {
                              field.onChange(date);
                            }
                          }}
                          disabled={(date) =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0) ||
                            date > new Date('2100-01-02') ||
                            (form.getValues('startDate') &&
                              date < form.getValues('startDate'))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className='w-full' type='submit'>
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default AddProject;
