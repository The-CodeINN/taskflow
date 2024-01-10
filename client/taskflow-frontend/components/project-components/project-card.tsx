import { FolderOpenDot, MoreHorizontal } from "lucide-react";
import { Card } from "../ui/card";

interface TaskCardProps {
  title: string;
  description: string;
  projectTimeline: string;
  onClick: () => void;
}

const ProjectCard = ({
  title,
  description,
  projectTimeline,
  onClick,
}: TaskCardProps) => {
  return (
    <Card className="rounded-lg shadow-sm hover:shadow-md p-4 md:p-6 bg-[#F9FAFB] border-[#EAECF0]">
      <div className="grid grid-cols-3 gap-4 items-center justify-between">
        <div className="flex items-center space-x-4 md:col-span-1">
          <FolderOpenDot className="text-primary" size={24} />
          <div>
            <p className="text-md font-semibold">{title}</p>
            <p className="text-sm hidden md:flex">{description}</p>
          </div>
        </div>
        <div className="text-sm md:col-span-1 hidden md:flex">
          Project Timeline - {projectTimeline}
        </div>
        <div className="text-primary cursor-pointer md:col-span-1 flex justify-end">
          <MoreHorizontal onClick={onClick} size={25} />
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
