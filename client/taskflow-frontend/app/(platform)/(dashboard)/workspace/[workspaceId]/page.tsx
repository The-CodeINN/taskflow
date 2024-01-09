import TaskCard from "@/components/project-components/task-card";
import HeaderInfo from "@/components/workspace-components/header-info";
import { getProjectsByWorkspaceId } from "@/db/mock.json";

const WorkspaceIdPage = ({ params }: { params: { workspaceId: string } }) => {
  return (
    <>
      {/* <HeaderInfo /> */}
      <div>
        <ul>
          {getProjectsByWorkspaceId(params?.workspaceId)?.map((project) => (
            // <li key={project.id}>{project.name}</li>
            <div key={project.id}>
              <TaskCard
                title={project.name}
                description={project.description}
                projectTimeline={`${project.startDate} - ${project.endDate}`}
              />
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default WorkspaceIdPage;
