interface SidebarProps {
  onClickX?: () => void;
  onClickLink?: () => void;
}

export type Workspace = {
  id: string;
  name: string;
};

interface MockdataProject {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}
interface Mockdata {
  id: string;
  name: string;
  projects: MockdataProject[];
}
