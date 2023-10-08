"use client";

import { Suspense } from "react";
import { redirect, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Typography from "@mui/material/Typography";

const LoginUI = dynamic(() => import("@/components/LoginUI"), { ssr: false });
import { useAuth } from "@/contexts/auth/useAuth";

export default function Home() {
  const { firebaseUser, firebaseUserLoading } = useAuth();
  const params = useSearchParams();
  const redirectPath = params.get("redirectPath") ?? "/recipes";

  if (firebaseUserLoading) {
    return <Suspense />;
  } else if (firebaseUser !== null) {
    redirect(redirectPath);
  } else {
    return (
      <>
        <Typography variant="h3" align="center">
          Henry&apos;s Shady Recipe Scaling
        </Typography>
        <LoginUI />
      </>
    );
  }
}
