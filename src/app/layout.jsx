import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer } from "react-toastify";
import SessionWrapper from "./dashboard/components/SessionWrapper";
export const metadata = {
  title: "Portal",
  description: "A modern POS solution for seamless business operations",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <ToastContainer position="top-center" />
          <HeroUIProvider>
            {children}
          </HeroUIProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}


