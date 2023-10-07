"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AuthContextValue } from "./types";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export type AuthProviderProps = PropsWithChildren;

export function AuthProvider(props: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] =
    useState<AuthContextValue["firebaseUser"]>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      setFirebaseUser(user);
    });
    return unsubscribe;
  }, []);

  const value: AuthContextValue = useMemo(() => {
    if (firebaseUser === undefined) {
      return {
        firebaseUser,
        firebaseUserLoading: true,
      };
    } else {
      return {
        firebaseUser,
        firebaseUserLoading: false,
      };
    }
  }, [firebaseUser]);

  return <AuthContext.Provider value={value} {...props} />;
}
