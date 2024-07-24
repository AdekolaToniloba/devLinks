import React, { ReactNode } from "react";
import Head from "next/head";

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export default function Layout({ children, title }: LayoutProps) {
  return (
    <>
      <Head>
        <title>{title} | Dev Links</title>
      </Head>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white shadow-md rounded-btn">
          {children}
        </div>
      </main>
    </>
  );
}
