import Link from "next/link";

import { auth } from "@/lib/auth";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SignOutButton from "@/components/ui/SignOutButton";

import AuthButtons from "../../forms/AuthButtons";

import NavLinks from "./NavLinks";

async function MobileNavigation() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu">
        <span className="hidden">Menu</span>
        {/*  eslint-disable-next-line @next/next/no-img-element */}
        <img src={"/icons/hamburger.svg"} alt="Menu" className="invert-colors size-9 sm:hidden" />
      </SheetTrigger>
      <SheetContent side="left" className="background-light900_dark200 border-none">
        <SheetHeader>
          <SheetTitle className="hidden">Navigation</SheetTitle>
          <Link href="/" className="flex items-center gap-3">
            <img className="size-14" src="/images/site-logo2.svg" alt="Skillora Logo" />
            <p className="h1-bold font-rakkas text-dark-100 dark:text-light-900 mt-2 tracking-wider">
              Skillora
            </p>
          </Link>
          <SheetDescription className="hidden">Mobile Navigation</SheetDescription>
        </SheetHeader>

        <div className="mx-3 flex h-[calc(100vh-80px)] flex-col justify-between gap-6 overflow-y-auto">
          <SheetClose asChild>
            <section className="flex h-full flex-col">
              <NavLinks isMobileNav userId={userId}  />
            </section>
          </SheetClose>

          <div className="mb-8 flex flex-col gap-3">
            <SheetClose asChild>
              {!session ? <AuthButtons isMobileNav /> : <SignOutButton />}
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNavigation;
