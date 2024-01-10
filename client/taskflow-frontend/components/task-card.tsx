import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const TaskCard = () => {
  return (
    <>
      <div className="grid gap-4 py-4">
        <div>
          <h1>Task title</h1>
          <Input type="text" placeholder="Task title" />
          <p className="text-sm text-muted-foreground">in list todo</p>
        </div>
      </div>
      <div className="flex">
        <div className="w-full">
          <h2>Description</h2>
          <Textarea placeholder="Task description." className="w-full" />
        </div>
        <div className="px-5 space-y-3">
          <h1>Actions</h1>
          <Button
            type="submit"
            className="h-[30%] bg-gray-300 hover:bg-gray-400"
          >
            Update
          </Button>
          <Button
            type="submit"
            className="h-[30%] bg-gray-300 hover:bg-gray-400"
          >
            Delete
          </Button>
        </div>
      </div>
      <div>
        <h1>Assign to</h1>
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
