"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import { format, getHours } from "date-fns";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import AddTask from "../project-components/add-task";

const Header = () => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [greetingMessage, setGreetingMessage] = useState<string>("");

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Get current time and set greeting message
    const updateDateTime = () => {
      const now = new Date();
      const currentHour = getHours(now);

      // Set greeting message based on the time of the day
      if (currentHour < 12) {
        setGreetingMessage("Good Morning!");
      } else if (currentHour < 18) {
        setGreetingMessage("Good Afternoon!");
      } else {
        setGreetingMessage("Good Evening!");
      }

      // Format and set current time with seconds
      setCurrentTime(format(now, "h:mm:ss a"));
    };

    // Update every second
    const intervalId = setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <p className="text-xs md:text-sm text-gray-500 md:flex justify-end">
        Current Time: {currentTime}
      </p>

      <div className="mb-8 py-4">
        <div className="md:flex md:justify-between items-center max-w-6xl mx-auto space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold">{greetingMessage}</h1>
            <h3 className="text-sm text-gray-500">
              You&apos;ve got tasks to do.
            </h3>
          </div>

          {isDesktop ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-blue-700 py-4">
                  <div className="flex items-center gap-x-2 justify-between px-2">
                    <div>
                      <Plus className="text-md text-white" />
                    </div>
                    <div>Add New Project</div>
                  </div>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>Add New Project</DialogHeader>
                <DialogDescription>
                  Make your project changes and save
                </DialogDescription>
                <AddTask />
                {/* <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose> */}
              </DialogContent>
            </Dialog>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button className="bg-primary hover:bg-blue-700 py-4">
                  <Plus className="text-md text-white mr-2" />
                  Add New Project
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Add Task</DrawerTitle>
                  <DrawerDescription>
                    Make your project changes and save
                  </DrawerDescription>
                </DrawerHeader>
                <div className="px-4">
                  <AddTask />
                </div>
                <DrawerFooter className="pt-2">
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
