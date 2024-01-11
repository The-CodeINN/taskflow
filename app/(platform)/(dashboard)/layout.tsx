import DashboardNavbar from "@/components/shared/dasboard-navbar";
import Sidebar from "@/components/shared/sidebar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="hidden rounded-r-lg h-full w-[200px] lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[80] shrink-0">
        <Sidebar />
      </div>
      <main className="lg:pl-72">
        <div className="sticky top-0 z-10 bg-white">
          <DashboardNavbar />
        </div>
        <div
          className="px-8 py-10 lg:px-20 lg:py-16"
          style={{ minHeight: "calc(100vh - 4rem)" }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
