"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

import SocialAuthForm from "@/components/layout/forms/SocialAuthForm";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const title = pathname === "/sign-in" ? "Welcome Back" : "Join Skillora";
  const description = pathname === "/sign-in" ? "Login to your account" : "To get your questions answered";
  return (
    <main className="bg-auth-light dark:bg-auth-dark flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ type: "spring", bounce: 0.14, duration: 0.8 }}
        className="light-border background-light800_dark200 shadow-light100_dark100 min-w-full rounded-[10px] border px-4 py-10 shadow-md sm:min-w-[520px] sm:px-8"
      >
        <div className="flex items-center justify-between gap-2">
          <div className="space-y-2.5">
            <h1 className="h2-bold text-dark100_light900">{title}</h1>
            <p className="paragraph-regular text-dark500_light400">
              {description}
            </p>
          </div>
          <Link href="/">
            <Image
              src="images/site-logo2.svg"
              alt="Skillora Logo"
              width={50}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>

        {children}

        <SocialAuthForm />
      </motion.div>
    </main>
  );
};

export default AuthLayout;
