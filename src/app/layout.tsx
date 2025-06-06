import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; // Adjust path if necessary

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meeting Room Booking System",
  description: "Reserve meeting rooms easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Navbar />
        <main className="p-4"> {/* Add padding to main content area */}
          {children}
        </main>
        {/* Optional: Add a common footer here */}
      </body>
    </html>
  );
}
