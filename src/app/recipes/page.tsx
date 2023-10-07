"use client";

import { Suspense, useCallback } from "react";
import Typography from "@mui/material/Typography";

import { useAuth } from "@/contexts/auth/useAuth";
import { useLoginRedirect } from "@/hooks/useLoginRedirect";

export default function Recipes() {
  const { firebaseUser, firebaseUserLoading } = useAuth();
  const loginRedirect = useLoginRedirect();

  if (firebaseUserLoading) {
    return <Suspense />;
  } else if (firebaseUser === null) {
    loginRedirect();
  } else {
    return <Typography variant="h3">Recipes</Typography>;
  }
}
