// src/components/AuthWrapper.tsx
"use client"; // This makes this component a client component

import { SessionProvider } from "next-auth/react";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
