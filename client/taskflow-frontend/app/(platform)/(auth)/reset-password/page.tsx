"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ResetFormSchema = z
  .object({
    newpassword: z.string().min(8, {
      message: "New password must be at least 8 characters",
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.newpassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type ResetFormValues = z.infer<typeof ResetFormSchema>;

const ResetPage = () => {
  const form = useForm<z.infer<typeof ResetFormSchema>>({
    resolver: zodResolver(ResetFormSchema),
    defaultValues: {
      newpassword: "",
      confirmPassword: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = (data: ResetFormValues) => {
    console.log(data);
  };

  return (
    <section className="flex bg-[#ffffff] justify-center">
      <div className="bg-[#ffffff] h-screen md:w-[60%] md:rounded-l-[20px] md:rounded-r-[20px] w-full">
        <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Reset Password
        </h2>
        {/* <p className=" md:invisible mt-1 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900 md: visible">
          Don&apos;t have an account?
          <Link href="/register" className="text-[#3C3CFF] underline">
            Sign up
          </Link>
        </p> */}

        <div className="px-12 py-10 md:px-28">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid py-6">
                <FormField
                  control={form.control}
                  name="newpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="Password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" py-10">
                <Button className="w-full" type="submit">
                  RESET
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      {/* <div className=" bg-[#2f46a5] flex-col items-center w-[60%] hidden md:flex rounded-xl">
        <div className="text-right w-[60%] mt-10 font-bold text-[#FFFFFF]  ">
          <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Don&apos;t have an account?
          </h2>
          <p className="mt-9 text-center font-extralight text-[#000000] text-2xl ">
            Sign up and start managing your task right now!
          </p>
        </div>
        <div className="mt-10">
          <Button className="w-full bg-[#3EACFB]" type="submit">
            SIGN UP
          </Button>
        </div>
      </div> */}
    </section>
  );
};

export default ResetPage;
