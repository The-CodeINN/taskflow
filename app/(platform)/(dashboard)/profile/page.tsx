'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth';
import { getFirstLetter } from '@/lib/utils'
import { useRouter } from 'next/navigation';


    const ProfilePage = () => {
    const { GetCurrentUser, logOut } = useAuth();
    const user = GetCurrentUser();
 
    const toProject = (e: React.MouseEvent<HTMLButtonElement>) => {
      
  };

    const router = useRouter()
  return (
<div
    className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto bg-white shadow-xl rounded-lg text-gray-900">
    <div className="rounded-t-lg h-32 overflow-hidden">
        <img className="object-cover object-top w-full" src='https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ' alt='Mountain' />
    </div>
    <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
        <Avatar className='bg-neutral-900 object-cover object-center w-full h-32'>
                    <AvatarFallback className='space-x-1'>
                        <span className=' text-5xl font-semibold uppercase'>
                      {getFirstLetter(user?.data?.firstName)}
                      {getFirstLetter(user?.data?.lastName)}
                        </span>
                    </AvatarFallback>
                  </Avatar>
    </div>
    <div className="text-center mt-2">
        <h2 className="font-semibold capitalize">{`${user?.data?.firstName} ${user?.data?.lastName}`}</h2>
        <p className="text-gray-500">{user?.data?.email}</p>
    </div>
    <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
            <div>Total Workspace</div>
             <span>3</span>
        </li>
    </ul>
    <div className="p-4 border-t mx-8 mt-2">
        <Button className="w-1/2 block mx-auto rounded-full bg-primary hover:shadow-lg font-semibold text-white px-6 py-2" type='submit'onClick={toProject}>See Projects</Button>
    </div>
</div>  )
}

export default ProfilePage