"use client";

import dynamic from "next/dynamic";

const LoginUI = dynamic(() => import("@/components/LoginUI"), { ssr: false });

import { useAuth } from "@/contexts/auth/useAuth";

export default function Home() {
  const { firebaseUser } = useAuth();

  return (
    <div>
      {firebaseUser === undefined && "loading"}
      {firebaseUser === null && <LoginUI />}
      {firebaseUser != null && "Logged in!"}
    </div>
  );
}
