import { Inter } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/components/AppWrapper";
import { AppContextProvider } from "@/lib/global_context";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Early Logistics | Package Tracking Software",
  description: "Tracking packages with accurate records",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <AppContextProvider>
            <AppWrapper>
              {children}
            </AppWrapper>
          </AppContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
