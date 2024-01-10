"use client";

import Header from "@/components/home-components/header";
import ProjectCard from "@/components/project-components/project-card";
import { getProjectsByWorkspaceId } from "@/db/mock.json";
import { useRouter } from "next/navigation";

const WorkspaceIdPage = ({ params }: { params: { workspaceId: string } }) => {
  const router = useRouter();
  const handleTaskCardClick = (projectId: string) => {
    router.push(`/project/${projectId}`);
  };
  return (
    <>
      <Header />
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-muted-foreground">My Projects</h1>
        {getProjectsByWorkspaceId(params?.workspaceId)?.map((project) => (
          // <li key={project.id}>{project.name}</li>
          <div key={project.id}>
            <ProjectCard
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
