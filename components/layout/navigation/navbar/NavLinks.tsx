"use client";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants/sideBarLinks";
import { cn } from "@/lib/utils";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// 👇 define shared animation settings
const linkTransition = { type: "spring", bounce: 0.12, duration: 0.3 };

function NavLinks({ isMobileNav = false, userId }: { isMobileNav?: boolean; userId?: string }) {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <>
      {/* hidden SheetClose we can trigger later */}
      <SheetClose id="delayed-sheet-close" className="hidden" />

      {sidebarLinks.map((link) => {
        const isActive =
          pathName === link.PATH || (pathName.includes(link.PATH) && link.PATH.length > 1);

        const href = link.PATH === "/profile" && userId ? `${link.PATH}/${userId}` : link.PATH;
        const handleClick = (e: React.MouseEvent) => {
          if (isMobileNav) {
            e.preventDefault();

            // Navigate immediately
            router.push(href);

            // Delay closing sheet to match animation
            setTimeout(
              () => {
                const closer = document.getElementById(
                  "delayed-sheet-close"
                ) as HTMLButtonElement | null;
                closer?.click();
              },
              (linkTransition.duration ?? 0) * 1000
            ); // convert sec → ms
          }
        };

        return (
          <Link
            key={link.PATH}
            href={href}
            onClick={handleClick}
            className={cn("group relative", link.LABEL === "Profile" && !userId && "hidden")}
          >
            <div
              className={cn(
                isActive ? "text-light-900" : "text-dark300_light900",
                "text-dark300_light900 relative z-10 flex items-center justify-start gap-4 rounded-lg bg-transparent p-4"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={link.ImgURL}
                alt={`${link.LABEL} icon`}
                width={20}
                height={20}
                className={cn("invert-colors", "size-5")}
              />
              <p className={cn(!isMobileNav && "max-lg:hidden", "base-medium text-[15px]")}>
                {link.LABEL}
              </p>
            </div>

            {isActive && (
              <motion.div
                layoutId={isMobileNav ? "activeMobileLink" : "activeLink"}
                transition={linkTransition as Transition}
                className="primary-gradient absolute inset-0 h-full w-full rounded-lg"
              />
            )}

            <div className="background-light800_dark400 absolute inset-0 h-full w-full rounded-lg opacity-0 transition-opacity duration-300" />
          </Link>
        );
      })}
    </>
  );
}

export default NavLinks;
