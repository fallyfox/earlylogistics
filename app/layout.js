import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Early Logistics | Package Tracking Software",
  description: "Tracking packages with accurate records",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
