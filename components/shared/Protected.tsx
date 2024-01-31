"use client";
import useAuth from "@/hooks/useAuth";
import useWorkspaces from "@/hooks/useWorkspace";
import { notFound, redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, token } = useAuth();
  const { getMyWorkspacesQuery } = useWorkspaces();
  const workspaces = getMyWorkspacesQuery?.data?.data;
  const router = useRouter();
  useEffect(() => {
    if (
      workspaces &&
      !getMyWorkspacesQuery.isFetching &&
      workspaces.length < 1
    ) {
      router.push("/create-workspace");
    }
  }, [workspaces]);

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }

    if (!user) {
      notFound();
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedRoute;
