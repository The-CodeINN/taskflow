import { Button } from "../ui/button";
import { Plus } from "lucide-react";

const Header = () => {
  return (
    <div className=" mb-8 py-4 ">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold">Good Morning!</h1>
          <h3 className="text-sm text-gray-500">
            You&apos;ve got tasks to do.
          </h3>
        </div>

        <Button
          className="bg-primary hover:bg-blue-700 hidden  md:flex py-4 "
          //   onClick={clickHandler}
        >
          <div className="flex items-center gap-x-2 justify-between px-2">
            <div>
              <Plus className="text-md text-white" />
            </div>
            <div>Create New Task</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Header;
