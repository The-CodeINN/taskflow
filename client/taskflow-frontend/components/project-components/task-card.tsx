import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const TaskCard = () => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div>
          <div className="flex items-center">
            <h1 className="font-bold">Task title</h1>
          </div>

          <Input type="text" placeholder="Task title" />
          <p className="text-sm text-muted-foreground">in list todo</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <h2 className="font-bold">Description</h2>
          <Textarea placeholder="Task description." className="w-[95%]" />
        </div>
        <div className="w-[20%] py-2">
          <h1 className="text-center font-bold">Actions</h1>
          <Button
            type="submit"
            className="h-[30%] bg-[#191950] w-full font-light  hover:bg-gray-400"
          >
            <Pencil />
            Update
          </Button>
          <Button
            type="submit"
            className="h-[30%] bg-[#191950] w-full font-light hover:bg-gray-400"
          >
            <Trash2 />
            Delete
          </Button>
        </div>
      </div>
      <div>
        <h1 className="font-bold">Assign to</h1>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email1">email 1</SelectItem>
            <SelectItem value="email2">email 2</SelectItem>
            <SelectItem value="email3">email 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export default TaskCard;
