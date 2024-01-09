import { Mockdata } from "@/@types";

export const mockData: Mockdata[] = [
  {
    id: "1",
    name: "Richard Workspace",
    projects: [
      {
        id: "1",
        name: "Project Microsoft",
        description:
          "A project designed for engineers in the text-based team to collaborate with team members",
        startDate: "2023-01-01",
        endDate: "2023-09-31",
      },
      {
        id: "2",
        name: "Project Flutter",
        description: "Project Microsoft is for me",
        startDate: "2023-01-01",
        endDate: "2023-09-31",
      },
    ],
  },
  {
    id: "2",
    name: "Workspace 2",
    projects: [
      {
        id: "1",
        name: "Project Todo",
        description: "Project Microsoft is for me",
        startDate: "2023-01-01",
        endDate: "2023-09-31",
      },
      {
        id: "2",
        name: "Project Building",
        description: "Project Microsoft is for me",
        startDate: "2023-01-01",
        endDate: "2023-09-31",
      },
    ],
  },
];

export const getProjectsByWorkspaceId = (id: string) => {
  return mockData.find((data) => data.id === id)?.projects;
};
