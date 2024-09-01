import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bible Story: Journey of Faith",
  description: "Bible Story: Journey of Faith is an platform that explores the key events and figures of the Bible. From the creation of the world to the life of Jesus Christ, this site brings biblical stories to life with engaging text, visuals, and interactive elements. Perfect for learning, inspiration, and deepening faith",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
