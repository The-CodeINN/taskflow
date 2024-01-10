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

const ForgotFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email",
  }),
});

type ForgotFormValues = z.infer<typeof ForgotFormSchema>;

const ForgotPage = () => {
  const form = useForm<z.infer<typeof ForgotFormSchema>>({
    resolver: zodResolver(ForgotFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const formError = form.formState.errors;
  console.log(formError);

  const onSubmit = (data: ForgotFormValues) => {
    console.log(data);
  };

  return (
    <section className="flex bg-[#ffffff] justify-between">
      <div className="bg-[#ffffff] h-screen md:w-[90%] md:rounded-l-[20px] md:rounded-r-[20px] w-full flex flex-col justify-center">
        <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
          Forgot Password
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" disabled={isLoading} {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
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
                /> */}
              </div>
              <div className=" py-10">
                <Button className="w-full" type="submit">
                  Continue
                </Button>
              </div>
              <p className="mt-1 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
                Back to{" "}
                <Link href="/login" className="text-[#2f46a5] underline">
                  Login
                </Link>
              </p>
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
              src={"/forgot-password.png"}
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

export default ForgotPage;
