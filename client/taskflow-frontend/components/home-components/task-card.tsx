import { Card } from "../ui/card";

const TaskCard = () => {
  return (
    <Card className="rounded-lg shadow-sm hover:shadow-md px-4 py-3 md:px-6 md:py-4 bg-[#F9FAFB] border-[#EAECF0] cursor-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="items-center flex space-x-6">
          <div className={`grid gap-1.5 leading-none`}>
            <p className="text-md font-semibold leading-none">
              Create a new task
            </p>
            <p className="text-sm">10:30am - 12:00pm</p>
          </div>
        </div>

        <p className="text-md">Today</p>
      </div>
    </Card>
  );
};

export default TaskCard;
