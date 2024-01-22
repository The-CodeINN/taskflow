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
import { AlertTriangle, Route } from "lucide-react"
import WorkspaceService, { DeleteWorkspaceResponse, MyWorkspaceDetails, UpdateWorkspaceRequest } from "@/services/workspaceService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from 'react';
import axiosConfig from "@/config/axios";
import { toast } from "sonner";
import axiosResponseMessage from "@/lib/axiosResponseMessage";
import useWorkspaces from "@/hooks/useWorkspace";
import { useRouter } from 'next/navigation';



type WorkspaceSettingPageProps = {
  params:{workspaceId:string, data:UpdateWorkspaceRequest}
}


const WorkspaceSettingPage = (
  {params}: WorkspaceSettingPageProps
) => {
const workspaceId = params.workspaceId
const queryClient = useQueryClient();
const { DeleteWorkspaceMutation, getMyWorkspacesQuery } = useWorkspaces();
const deleteWorkspaceMutation = DeleteWorkspaceMutation(workspaceId);
const isSuccessWorkspace = getMyWorkspacesQuery.isSuccess;
const workspaces = getMyWorkspacesQuery?.data?.data;

const {UpdateWorkspaceMutation} = useWorkspaces();
const updateWorkspaceMutation = UpdateWorkspaceMutation();
const [newWorkspaceName, setNewWorkspaceName] = useState('');


const router = useRouter();

const handleDeleteWorkspace = async () => {
  try {
    await deleteWorkspaceMutation.mutateAsync({ workspaceId });
    // Redirect after successful deletion
    if (isSuccessWorkspace && workspaces && workspaces.length > 0) {
      router.push(`/workspace/${workspaces[0].id}`);
    } else {
      // Redirect to create-workspace route only if workspaces query has successfully fetched data
      if (!workspaces) {
        router.replace('/create-workspace');  // Use router.replace instead of router.push
      }
    }
  } catch (error) {
    console.error("Error deleting workspace:", error);
  }
};


const handleUpdateWorkspace = async (workspaceId: string, data: UpdateWorkspaceRequest) => {
    try {
      const updatedData: UpdateWorkspaceRequest = { ...data, Name: newWorkspaceName };

      // Pass an object with the workspaceId and updated data properties
      await updateWorkspaceMutation.mutateAsync({ workspaceId, data: updatedData });

      // Optionally handle success (e.g., show a success message)
      console.log('Workspace updated successfully!');
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error('Error updating workspace:', error);
    }
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
            <Input
        value={newWorkspaceName}
        onChange={(e) => setNewWorkspaceName(e.target.value)}
      />
            </div>
             <div className="py-5">
                <h1 className="font-bold">Invite new members to your workspace</h1>
          <Label className="font-normal">Enter or paste one or more email addresses, separated by spaces or commas</Label>
           <Textarea typeof="email"/>
        </div>
        {/* <div>
          <h1 className="mb-2 font-bold">Remove workspace members</h1>
        <Select>
         <SelectTrigger>
         <SelectValue placeholder='Select a member to remove' />
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
        </div> */}
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
         {/* <Button onClick={() => handleUpdateWorkspace(workspaceId, data)}>
        Done
      </Button> */}
      </CardFooter>
      </div>
    </Card>
   </section>
  </div>
   
  )

};

export default WorkspaceSettingPage;