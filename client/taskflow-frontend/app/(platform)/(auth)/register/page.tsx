import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  return (
    <div>
      <section className="flex bg-[#86B6F6] justify-between ">
        <div className="w-[40%] hidden md:flex">
          <div className="text-right w-[40%] mt-10 font-bold text-gray-900  ">
            TaskFlow
          </div>
        </div>

        <div className="bg-white h-screen md:w-[85%] md:rounded-l-[30px] w-full">
          <h2 className="mt-20 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-1 text-center text-1xl font-bold leading-9 tracking-tight text-gray-900">
            Already have an account?{" "}
            <Link href="/login" className="text-[#3C3CFF] underline">
              Login
            </Link>
          </p>

          <div className="mt-9 pl-20"></div>
        </div>
      </section>

      <section className=""></section>
    </div>
  );
};

export default RegisterPage;
