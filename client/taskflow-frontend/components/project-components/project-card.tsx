"use client";

import { FolderOpenDot, MoreHorizontal } from "lucide-react";
import { Card } from "../ui/card";
import { useRouter } from "next/navigation";

interface TaskCardProps {
  projectId: string;
  title: string;
  description: string;
  projectTimeline: string;
}

const ProjectCard = ({
  projectId,
  title,
  description,
  projectTimeline,
}: TaskCardProps) => {
  const router = useRouter();
  const handleProjectClick = () => {
    router.push(`/project/${projectId}`);
  };

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
          <MoreHorizontal onClick={handleProjectClick} size={25} />
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
