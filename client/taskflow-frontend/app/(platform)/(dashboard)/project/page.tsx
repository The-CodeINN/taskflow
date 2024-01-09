import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogDemo } from './Dialog';

const Project = () => {
  return (<div>
          <div className='flex flex-row'>
             <h2 className='text-2xl font-bold'> Project </h2> 
             <span className='ml-[80%]  rounded text-sm w-28'>
              {/* <Button type="button" className='bg-[#3F5BF6] rounded text-sm w-28'>Add Project</Button> */}
             <DialogDemo />
              </span> 
            
          </div>
          <div className='bg-[#D9D9D9] overscroll-none h-screen mt-5 flex items-center justify-center'>
            <h1 className='text-center '>No project created yet!</h1>
          </div>
       
        </div>
  );
};

export default Project;
