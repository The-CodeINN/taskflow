import useProjectTasks from '@/hooks/useProjectTasks';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import useAuth from '@/hooks/useAuth';



const addTaskFormSchema = z.object({
  Name: z.string().min(1, {
    message: "Title is required"
  }),
  StartDate: z.date({
    required_error: 'Start date is required',
  }),
  Description: z.string().min(1, {
    message: "Enter a description"
  }),
  EndDate: z.date({
    required_error: 'End date is required',
  }),
  // UserId: z.string({
  //   required_error: "User is required"
  // }),
  Stage: z.string({
    required_error: "Select a stage"
  })
})

type AddTaskFormValues = z.infer<typeof addTaskFormSchema>

const AddTask = (
  {
    projectId,
    closeModal,
  }: 
  {
    projectId: string
      closeModal: () => void;
  }
) => {
  const { CreateTask} = useProjectTasks()
  const { user } = useAuth();


  const createProjectTask = CreateTask(projectId, closeModal)  
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(addTaskFormSchema),
  })
  const onSubmit = (data: AddTaskFormValues) => {
    createProjectTask.mutate({
      data: {
        Name: data.Name,
        Description: data.Description,
        StartDate: data.StartDate.toISOString(),
        EndDate: data.EndDate.toISOString(),
        UserId: user?.id!,
        Stage: data.Stage
      },
      projectId: projectId
    })
  }

  return (
  <div className='grid gap-4'>
      <Form {...form}>
        <form
         className='space-y-6 w-full'
         onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField 
            control={form.control}
            name='Name'
            render={({field}) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField 
            control={form.control}
            name='Description'
            render={({field}) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                      placeholder='Tell a little about the task'
                      className='resize-none'
                      {...field}
                    />
                    </FormControl>
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name='Stage'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Members</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Add stage' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='TODO'>Todo</SelectItem>
                        <SelectItem value='INPROGRESS'>
                          In Progress
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className='fle gap-4'>
              <FormField
                control={form.control}
                name='StartDate'
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
                name='EndDate'
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
                            disabled={!form.getValues('StartDate')}
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
                              !form.getValues('StartDate') ||
                              date! >= form.getValues('StartDate')
                            ) {
                              field.onChange(date);
                            }
                          }}
                          disabled={(date) =>
                            date.getTime() < new Date().setHours(0, 0, 0, 0) ||
                            date > new Date('2100-01-02') ||
                            (form.getValues('StartDate') &&
                              date < form.getValues('StartDate'))
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
            <Button 
            className='w-full' type='submit'>
              Save changes
            </Button>
        </form>
      </Form>
    </div>
    );
};

export default AddTask;
