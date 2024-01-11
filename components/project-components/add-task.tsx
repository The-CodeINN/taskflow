import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AddTask = () => {
  return (
    <>
      <div className="grid gap-4">
        <Input />
        <Button className="w-full" type="submit">
          Save changes
        </Button>
      </div>
    </>
  );
};

export default AddTask;
