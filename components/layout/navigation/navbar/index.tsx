import Theme from "@/components/layout/navigation/navbar/Theme";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 shadow-light-300 fixed z-50 w-full p-6 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-3">
        <Image src="/images/site-logo2.svg" width={50} height={23} alt="Skillora" />
        <p className="h1-bold font-rakkas text-dark-100 dark:text-light-900 mt-2 tracking-wider max-sm:hidden">
          Skillora
        </p>
      </Link>
      <p>Global Search</p>
      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  );
};

export default Navbar;
