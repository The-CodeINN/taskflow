import { GetMyWorkspace } from '@/services/workspaceService';
import { create } from 'zustand';

type WorkspaceStore = {
  activeWorkspace: GetMyWorkspace | null;
  setActiveWorkspace: (workspace: GetMyWorkspace | null) => void;
};

export const useWorkspaceStore = create<WorkspaceStore>((set) => ({
  activeWorkspace: null,
  setActiveWorkspace: (workspace) => set({ activeWorkspace: workspace }),
}));
