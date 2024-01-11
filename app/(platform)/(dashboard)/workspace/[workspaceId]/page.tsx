import Header from "@/components/workspace-components/header";
import ProjectCard from "@/components/project-components/project-card";
import { getProjectsByWorkspaceId } from "@/db/mock.json";

type WorkspaceIdPageProps = {
  params: { workspaceId: string };
};

export async function generateMetadata({ params }: WorkspaceIdPageProps) {
  return {
    title: `Workspace ${params.workspaceId}`,
    description: `Welcome to your workspace ${params.workspaceId}`,
  };
}

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  return (
    <>
      <Header />
      <div className="flex flex-col gap-5">
        <h1 className="font-medium text-muted-foreground">My Projects</h1>
        {getProjectsByWorkspaceId(params?.workspaceId)?.map((project) => (
          <div key={project.id}>
            <ProjectCard
              projectId={project.id}
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
