import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/home">
      <div className="hover:opacity-75 transition items-center gap-x-2 flex">
        <Image src="/black-logo.svg" alt="Logo" height={60} width={60} />
        <p className="text-2xl pb-1 font-medium text-white">Taskflow</p>
      </div>
    </Link>
  );
};

export default Logo;
