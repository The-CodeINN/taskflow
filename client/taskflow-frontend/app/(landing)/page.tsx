import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <section className='py-2 container flex justify-between'>
      <div>
      <Button className="bg-black text-white">Taskflow task manager now public</Button>
      <br/>
      Manage your tasks efficiently with ease.
        
</div>
      <div >
        <Image
          src={"/landingIllustration.png"}
          alt='Illustration'
          width={300}
          height={300}
          className='w-full'
        
        />
        </div>
      
      
    </section>
   
  );
};

export default LandingPage;
