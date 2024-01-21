import { MyWorkspaceDetails } from '@/services/workspaceService';
import { create } from 'zustand';

type WorkspaceStore = {
  activeWorkspace: MyWorkspaceDetails | null;
  setActiveWorkspace: (workspace: MyWorkspaceDetails | null) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeWorkspace: null,
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
}));
