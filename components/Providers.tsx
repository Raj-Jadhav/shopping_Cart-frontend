"use client";

import React from "react";
import { Toaster } from "sonner";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <ThemeToggle />
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
}
