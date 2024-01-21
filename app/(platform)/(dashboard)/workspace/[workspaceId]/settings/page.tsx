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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from 'react';
import axiosConfig from "@/config/axios";
import { toast } from "sonner";
import axiosResponseMessage from "@/lib/axiosResponseMessage";

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
  const queryClient = useQueryClient();

  const DeleteWorkspaceMutation = useMutation({
    mutationFn: async () => {
      // Call your deleteWorkspace API function
      const response = await axiosConfig.delete('workspace/workspaceid');
      return response?.data;
    },
    onSuccess: (data) => {
      const { status } = data;
      toast.success(status);

      // You may redirect to a different page or perform additional actions after deletion

      // Invalidate queries related to the deleted workspace
      // const queryKey = ['workspaceProjects', 'your-workspace-id'];
      // queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      toast.error(axiosResponseMessage(error));
    },
  });

  const handleDeleteWorkspace = () => {
    // Call the mutation to delete the workspace
    DeleteWorkspaceMutation.mutate();
  };



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
        <Button
                  className="mt-1 bg-red-600 hover:bg-red-800"
                  onClick={handleDeleteWorkspace}
                >
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