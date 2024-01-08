"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const createorgFormSchema = z.object({
  nameofOrg: z
    .string()
    .min(2, {
      message: "Organisation must be at least 2 characters.",
    })
    .max(160, {
      message: "Organisation must not be longer than 30 characters.",
    }),
  email: z.string().email({
    message: "Invalid email",
  }),
  role: z.string().refine((value) => value !== "", {
    message: "You have to select a role",
  }),
});

type FormValues = z.infer<typeof createorgFormSchema>;

const CreateOrg = () => {
  const form = useForm<z.infer<typeof createorgFormSchema>>({
    resolver: zodResolver(createorgFormSchema),
    defaultValues: {
      nameofOrg: "",
      email: "",
      role: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className=" bg-[#2f46a5] min-h-screen">
      <section className="flex items-center justify-center py-20 md:py-0 ">
        <Card className=" bg-[#eaebf4] md:w-[50%] mt-10 mb-5">
          <div>
            <CardHeader>
              <CardTitle className="font-bold">
                Create your organisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid w-full items-center gap-4">
                    <FormField
                      control={form.control}
                      name="nameofOrg"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name of your organisation</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid w-full items-center gap-4 mt-5">
                    <CardTitle>Invite Members</CardTitle>
                    <CardDescription>
                      Invite members with their email addresses
                    </CardDescription>

                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Textarea
                                  disabled={isLoading}
                                  {...field}
                                  placeholder="Enter your email address here"
                                  typeof="email"
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="">
                        <h2 className="text-1xl font-bold">Role</h2>
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Role</FormLabel> */}
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select an option" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Roles</SelectLabel>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="User">User</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      <CardFooter className="flex justify-between mt-3">
                        <Button
                          variant="outline"
                          onClick={(e) => e.preventDefault()}
                        >
                          Skip
                        </Button>
                        <Button type="submit">SEND INVITATION</Button>
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

export default CreateOrg;
