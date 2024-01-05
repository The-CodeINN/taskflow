import { Button } from "@/components/ui/button";
import LandingLogo from "./landingLogo";

const Navbar = () => {
  return (<nav className="py-4 shadow-md flex justify-between container max-w-[1440px]">
      <LandingLogo />
    <div className=" space-x-4">
        <Button className="py-3" variant={"outline"}>Login</Button>
        <Button className="bg-black text-white">Get Started Here</Button>
    </div>
  </nav>);
};

export default Navbar;
