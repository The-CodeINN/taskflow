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
import Image from "next/image";

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
    <section className="flex bg-[#ffffff] justify-between">
      <div className="bg-[#ffffff] h-screen md:w-[90%] md:rounded-l-[20px] md:rounded-r-[20px] w-full flex flex-col justify-center">
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
              <div className="grid py-6 space-y-5">
                <FormField
                  control={form.control}
                  name="newpassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal">New Password</FormLabel>
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
                      <FormLabel className="font-normal">
                        Confirm New Password
                      </FormLabel>
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
                  RESET PASSWORD
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className=" bg-white flex-col items-center w-[60%] hidden md:flex rounded-xl justify-center">
        <div className="text-white space-y-3">
          {/* <h1 className="text-4xl font-bold">Optimize team workflow,</h1>
          <h4 className="text-2xl text-center">
            with seamless task coordination!
          </h4> */}
          <div className="w-[400px]">
            <Image
              src={"/reset-passwordP.png"}
              alt="rest-password"
              width={500}
              height={500}
              className="py-10 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPage;
