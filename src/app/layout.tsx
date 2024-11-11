"use client";
import LoaderComponent from "@/components/LoaderComponent";
import "./globals.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const BaseComponent = dynamic(() => import("@/components/BaseComponent"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true only after client-side rendering completes
    setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return (
      <html lang="en">
        <body>
          <LoaderComponent />
        </body>
      </html>
    );
  }

  return <BaseComponent>{isMounted ? children : null}</BaseComponent>;
}
