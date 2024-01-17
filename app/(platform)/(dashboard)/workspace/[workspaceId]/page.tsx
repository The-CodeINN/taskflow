'use client';

import Header from '@/components/workspace-components/header';
import ProjectCard from '@/components/project-components/project-card';
import { getProjectsByWorkspaceId } from '@/db/mock.json';
import { FetchWorkspaceProjectData } from '@/services/projectService';
import { Skeleton } from '@/components/ui/skeleton';

import useProject from '@/hooks/useProject';
import { formatDate } from '@/lib/utils';
import { Ghost } from 'lucide-react';

type WorkspaceIdPageProps = {
  params: { workspaceId: string };
};

// export async function generateMetadata({ params }: WorkspaceIdPageProps) {
//   return {
//     title: `Workspace ${params.workspaceId}`,
//     description: `Welcome to your workspace ${params.workspaceId}`,
//   };
// }

const WorkspaceIdPage = ({ params }: WorkspaceIdPageProps) => {
  const { FetchWorkspaceProjectsQuery } = useProject();
  const projectsResponse = FetchWorkspaceProjectsQuery(params?.workspaceId);
  const isFetching = projectsResponse.isFetching;
  const workspaceId = params?.workspaceId;

  const projectsData = projectsResponse.data?.data;

  return (
    <>
      <Header workspaceId={workspaceId} />

      <div className='flex flex-col gap-5'>
        <h1 className='font-medium text-muted-foreground'>My Projects</h1>
        {isFetching && (
          <div className='space-y-3'>
            <Skeleton className=' h-20 w-full bg-neutral-800/10' />
            <Skeleton className=' h-20 w-full bg-neutral-800/10' />
            <Skeleton className=' h-20 w-full bg-neutral-800/10' />
          </div>
        )}

        {/* Projects List */}
        {projectsData && projectsData.length > 0
          ? projectsData.map((project: FetchWorkspaceProjectData) => (
              <div key={project.id}>
                <ProjectCard
                  id={project.id}
                  name={project.name}
                  description={project.description}
                  startDate={formatDate(project.startDate)}
                  endDate={formatDate(project.endDate)}
                />
              </div>
            ))
          : // No Projects Message
            !isFetching && (
              <div className=' mt-16 flex flex-col items-center gap-2'>
                <Ghost size={30} className=' w-8 h-8 text-zinc-800' />
                <h3 className=' font-semibold text-xl'>
                  Pretty empty around here.
                </h3>
                <p>Add a project and get scheduling!😉</p>
              </div>
            )}
      </div>
    </>
  );
};

export default WorkspaceIdPage;
