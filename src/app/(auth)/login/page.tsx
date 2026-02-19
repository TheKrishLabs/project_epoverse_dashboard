import { AuthPage } from "@/components/auth/AuthPage";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Authentication | Epoverse",
  description: "Login or create an account to get started.",
};

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted/40">
      <Suspense fallback={<div>Loading...</div>}>
         <AuthPage />
      </Suspense>
    </div>
  );
}
