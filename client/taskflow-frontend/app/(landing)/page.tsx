import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React from 'react';

const LandingPage = () => {
  return (
    <section >
      <div className='py-2 container flex justify-between'>
      <div>
      <Button className="bg-black text-white">Taskflow task manager now public</Button>
      <br/>
     <p className='font-extrabold font-size:large'> Manage your tasks your efficiently with ease.</p>

        <p> AIDe is your hardw text-whiteorking 24/7 powering assistant empowering you with our
         blazingly <br/> fast dedicated AI analysis of any document via a chat interface.
         Easily upload your<br/>files and start getting answers right away.
        </p><br/>
        <Button className="bg-black">Get Started Here</Button>
</div>
    
      <div >
        <Image
          src={"/landingIllustration.png"}
          alt='Illustration'
          width={400}
          height={400}
          className='w-full'
        
        />
      
        </div>
        

        </div>
        <div className=''>

        <p className='text-center font-extrabold '> Start Managing tasks in a minute </p>
          <p className='text-center'> With taskflow, task and project management and has never been easier</p>      
         <br/>
         <div className='flex justify-center items-center'>
         <Image
          src={"/landingIllustration2.png"}
          alt='Illustration2'
          width={400}
          height={400}
          className='w-full max-w-[500px]'
  
        
        />
        </div>
        </div>
    </section>
   
  );
};

export default LandingPage;
