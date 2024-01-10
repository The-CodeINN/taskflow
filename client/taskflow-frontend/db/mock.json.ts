import { Mockdata } from "@/@types";

export const mockData: Mockdata[] = [
  {
    id: "1",
    name: "Richard's Workspace",
    projects: [
      {
        id: "1",
        name: "Quiz Game",
        description: "Design a simple quiz game for children below 18 years",
        startDate: "2023-01-01",
        endDate: "2023-09-31",
      },
      {
        id: "2",
        name: "Employee Management",
        description: "Project Microsoft is for me",
        startDate: "2023-01-01",
        endDate: "2023-09-31",
      },
    ],
  },
  {
    id: "2",
    name: "Jerry's Workspace",
    projects: [
      {
        id: "1",
        name: "Task Scheduler",
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
