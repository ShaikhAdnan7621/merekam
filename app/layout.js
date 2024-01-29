import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Todo List",
  description: "todo app created by shaikh adnan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:bg-black dark:text-white"}>
        {children}
      </body>
    </html>
  );
}
