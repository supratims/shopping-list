import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: "Shopping List",
  description: "Manage your shopping lists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="container mx-auto px-2">
        <Navbar/>  
        {children}
      </body>
    </html>
  );
}
