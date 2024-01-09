import { FolderOpenDot, MoreHorizontal } from "lucide-react";
import { Card } from "../ui/card";

interface TaskCardProps {
  title: string;
  description: string;
  projectTimeline: string;
  onClick: () => void;
}

const TaskCard = ({
  title,
  description,
  projectTimeline,
  onClick,
}: TaskCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="rounded-lg shadow-sm hover:shadow-md px-4 py-3 md:px-6 md:py-5 bg-[#F9FAFB] border-[#EAECF0]"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="items-center flex space-x-6">
          <FolderOpenDot className="text-primary" size={25} />
          <div className={`grid gap-1.5 leading-none`}>
            <p className="text-md font-semibold leading-none">
              {/* Create a new task */}
              {title}
            </p>
            <p className="text-sm">
              {/* Create a new task */}
              {description}
            </p>
          </div>
        </div>
        <p className="text-sm">Project Timeline - {projectTimeline}</p>
        {/* <p className="text-md">Today</p> */}
        <MoreHorizontal className="text-primary cursor-pointer" size={25} />
      </div>
    </Card>
  );
};

export default TaskCard;
