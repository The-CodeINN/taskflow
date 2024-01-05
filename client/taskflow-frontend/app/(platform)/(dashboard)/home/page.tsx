import Header from "@/components/home-components/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClipboardList, Layers3, ListTodo } from "lucide-react";

const HomePage = () => {
  return (
    <section>
      <Header />
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="space-y-3">
              <ListTodo className=" text-violet-500 w-6 h-6" />
              <span className="font-medium text-xl">Total Projects</span>
            </CardTitle>
            <CardDescription className="text-4xl font-bold">20</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="space-y-3">
              <ClipboardList className="text-pink-700 w-6 h-6" />
              <span className="font-medium text-xl">Total Projects</span>
            </CardTitle>
            <CardDescription className="text-4xl font-bold">20</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="space-y-3">
              <ListTodo className=" text-violet-500 w-6 h-6" />
              <span className="font-medium text-xl">Total Projects</span>
            </CardTitle>
            <CardDescription className="text-4xl font-bold">20</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="py-10 space-y-3">
        <h1 className="font-bold text-xl">My Tasks</h1>
        <Card className="">
          <CardContent>Hello</CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HomePage;
