import { Button } from "@/components/ui/button";
import LandingLogo from "./landingLogo";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="py-4 px-7 md:px-12 shadow-md flex justify-between w-full fixed top-0 z-50 bg-white border-b">
      <LandingLogo />
      <div className=" space-x-4">
        <Button asChild className="py-3" variant={"outline"}>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="bg-black text-white">
          <Link href="/register">Get Started Here</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
