
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
} from "@/components/ui/select"

import WorkspaceService from "@/services/workspaceService"
import { Textarea } from "@/components/ui/textarea"

const WorkspaceSettingPage = () => {
  return (
    <Card className="w-[700px] bg-gray-200">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your workspace settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label>Name of workspace</Label>
              <Input className="flex rounded-sm border ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 py-1 h-7 font-semibold text-xl px-1 text-neutral-700 bg-transparent border-transparent relative -left-1.5 w-[95%] focus-visible:bg-white focus-visible:border-input mb-0.5 truncate" 
              value={WorkspaceService.name}/>
            </div>
          </div>
        </form>
        <div className="py-5">
          <Label>Inivite members to your workspace</Label>
           <Textarea/>
        </div>
        <div>
          <h1>Danger</h1>
          <Button>Delete workspace</Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Done</Button>
      </CardFooter>
    </Card>
  )

};

export default WorkspaceSettingPage;