import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <section className=" flex flex-col-reverse sm:flex-row px-11 mt-11">
        <div className="md:w-[60%] max-w-xl">
          <div className="bg-white mt-10">
            <Button className="bg-[#22304e] text-white px-12 mt-5 mx-auto rounded-l-[20px] rounded-r-[20px]">
              Taskflow task manager is now public!
            </Button>
          </div>
          <h1 className="mt-3 sm:text-left text-4xl font-bold tracking-tight text-center">
            Manage your tasks efficiently and with ease.
          </h1>
          <p className="mt-3 sm:text-left text-gray-900 text-center">
            AIDe is your hard working 24/7 personal assistant, empowering you
            with our blazingly fast dedicated AI analysis of any documents via a
            chat interface. Easily upload your file and start getting answers
            right away!
          </p>
          <div className="mt-10">
            <Button className="px-28 rounded-l-[20px] rounded-r-[20px] md:w-[45%]">
              <Link href="/register">Start for free</Link>
            </Button>
          </div>
        </div>
        <div>
          <Image
            src={"/undraw_add_tasks_re_s5yj.svg"}
            alt="Illustration"
            width={800}
            height={500}
            className="mt-10"
          />
        </div>
      </section>
      <div className="px-1">
        <h1 className="text-center mt-20 text-5xl font-bold tracking-tight">
          Start managing tasks in a minute
        </h1>
        <p className="text-center mt-3 px-3">
          With Taskflow, task and project management and has never been easier.
        </p>
        <div className="flex justify-center items-center">
          <Image
            src={"/homeProj.png"}
            alt="Illustration"
            width={850}
            height={500}
            className=" sm:px-3 mt-10 max-w-full h-auto mb-5"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
