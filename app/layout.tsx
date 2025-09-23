import ThemeProvider from "@/context/Theme";
import { auth } from "@/lib/auth";
import { generateMetadata } from "@/lib/metadata";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";
import "./globals.css";
// import AuthSuccessToast from "@/components/layout/AuthSuccessToast";
import { Toaster } from "@/components/ui/sonner";

const rakkas = localFont({
  src: "./fonts/RakkasVF.ttf",
  variable: "--font-rakkas",
  weight: "400",
});

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

export const metadata = generateMetadata({
  title: "Skillora",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and connect with other developers from around the world. Explore a vast collection of tutorials, articles, and resources to help you become a better developer.",
  image: "/images/site-logo2.svg",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider session={session}>
        <body className={`${inter.className} ${rakkas.variable} antialiased`}>
          <ThemeProvider
            attribute={"class"}
            enableSystem
            disableTransitionOnChange
            defaultTheme="dark"
          >
            {/* <AuthSuccessToast /> */}
            {children}
            <Toaster />
          </ThemeProvider>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
          />
        </body>
      </SessionProvider>
    </html>
  );
}
