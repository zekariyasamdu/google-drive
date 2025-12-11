"use client";
import React from "react";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <main className="relative w-full">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </main>
  );
}
