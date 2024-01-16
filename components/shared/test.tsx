import useWorkspaces from '@/hooks/useWorkspace';

export default function Test() {
  const { getMyWorkspacesQuery } = useWorkspaces();
  const workspaces = getMyWorkspacesQuery?.data;
}
