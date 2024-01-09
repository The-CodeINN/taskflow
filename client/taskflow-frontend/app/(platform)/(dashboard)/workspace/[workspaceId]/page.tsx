"use client";

import TaskCard from "@/components/project-components/task-card";
import HeaderInfo from "@/components/workspace-components/header-info";
import { getProjectsByWorkspaceId } from "@/db/mock.json";
import { useRouter } from "next/navigation";

const WorkspaceIdPage = ({ params }: { params: { workspaceId: string } }) => {
  const router = useRouter();
  const handleTaskCardClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };
  return (
    <>
      {/* <HeaderInfo /> */}
      <div className="flex flex-col gap-5">
        {getProjectsByWorkspaceId(params?.workspaceId)?.map((project) => (
          // <li key={project.id}>{project.name}</li>
          <div key={project.id}>
            <TaskCard
              onClick={() => handleTaskCardClick(project.id)}
              title={project.name}
              description={project.description}
              projectTimeline={`${project.startDate} - ${project.endDate}`}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default WorkspaceIdPage;
