import Header from "@/components/home-components/header";
import MetricCard from "@/components/home-components/metric-card";
import TaskCard from "@/components/home-components/task-card";
import { ClipboardList, Layers3, ListTodo } from "lucide-react";

const HomePage = () => {
  return (
    <section>
      <Header />
      <div className="grid md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Projects"
          value="20"
          icon={Layers3}
          iconClassName="text-violet-500"
        />
        <MetricCard
          title="Pending Tasks"
          value="15"
          icon={ClipboardList}
          iconClassName="text-pink-700"
        />
        <MetricCard
          title="Upcoming Tasks"
          value="10"
          icon={ListTodo}
          iconClassName="text-violet-500"
        />
      </div>

      <div className="py-10 space-y-3">
        <h1 className="font-bold text-xl">My Tasks</h1>
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
        <TaskCard />
      </div>
    </section>
  );
};

export default HomePage;
