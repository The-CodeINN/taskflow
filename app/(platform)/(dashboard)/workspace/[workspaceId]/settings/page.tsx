'use client';

import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


//import WorkspaceService from "@/services/workspaceService"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle } from "lucide-react"
import WorkspaceService, { DeleteWorkspaceResponse } from "@/services/workspaceService";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from 'react';

//  const handleDeleteWorkspace = async () => {
//     try {
//       //const response = await WorkspaceService.deleteWorkspace(workspaceId);
//       const responseData: DeleteWorkspaceResponse = response.data;
//       console.log(responseData.status, responseData.data.message);
//     } catch (error) {
//       console.error("Error deleting workspace:", error);
//     }
//   };

const WorkspaceSettingPage = () => {
  // const [workspaceName, setWorkspaceName] = useState("Initial Workspace Name");

  // const getMyWorkspacesQuery = useQuery({
  //   queryKey: ['getMyWorkspace'],
  //   queryFn: async () => {
  //     try {
  //       const response = await WorkspaceService.getMyWorkspaces();
  //       return response?.data;
  //     } catch (error: any) {
  //       console.log(error);
  //       // toast.error(error as string);
  //     }
  //   },
  // });

  // Update workspaceName state when data is fetched
  // useEffect(() => {
  //   if (getMyWorkspacesQuery.data) {
  //     // Assuming data is an array and you want the first workspace's name
  //     const firstWorkspaceName = getMyWorkspacesQuery.data?.name || "Default Workspace Name";
  //     setWorkspaceName(firstWorkspaceName);
  //   }
  // }, [getMyWorkspacesQuery.data]);

  return (
    <div>
        <section className='flex items-center justify-center py-20 md:py-0 '>
        <Card className=' bg-[#fbfbfb] md:w-[90%] mt-10 mb-5'>
        <div>
        <CardHeader>
        <CardTitle>Workspace settings</CardTitle>
        <CardDescription>Manage your workspace settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-2">
            <div className="flex flex-col space-y-1.5">
              <Label className="font-bold">Edit workspace name</Label>
              <Input />
            </div>
             <div className="py-5">
                <h1 className="font-bold">Invite new members to your workspace</h1>
          <Label className="font-normal">Enter or paste one or more email addresses, separated by spaces or commas</Label>
           <Textarea typeof="email"/>
        </div>
        <div>
           <Input 
                // value={workspaceName} 
                // onChange={(e) => setWorkspaceName(e.target.value)} 
              />
        <Select>
         <SelectTrigger>
         <SelectValue placeholder='Select' />
          </SelectTrigger>
           <SelectContent>
            <SelectItem value='jerry'>Jerry Abadi</SelectItem>
               <SelectItem value='m@google.com'>
                   Richard Emijere
                 </SelectItem>
                 <SelectItem value='hashiru'>
                      Hashiru Abdullahi
                 </SelectItem>
                    <SelectItem value='joshua'>Adurotimi Joshua</SelectItem>
                    <SelectItem value='femi'>
                      Oloruntuyi Oluwafemi
                 </SelectItem>
                 </SelectContent>
               </Select>
        </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between mt-1">
        <div>
        <h1 className="font-bold">Delete your workspace</h1>
       <Button className="mt-1 bg-red-600 hover:bg-red-800" >
          Delete workspace <span className="ml-2"><AlertTriangle /></span>
       </Button>
        </div>
        <Button>Done</Button>
      </CardFooter>
     
      </div>
    </Card>
        </section>
    </div>
   
  )

};

export default WorkspaceSettingPage;