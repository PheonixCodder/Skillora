import ThemeProvider from "@/context/Theme";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navigation/navbar";

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

export const metadata: Metadata = {
  title: "Skillora",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${rakkas.variable} antialiased`}>
        <ThemeProvider
          attribute={"class"}
          enableSystem
          disableTransitionOnChange
          defaultTheme="system"
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
