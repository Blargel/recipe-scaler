"use client";

import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth, db } from "@/firebase";
import { AuthContext } from "./AuthContext";
import { AuthContextValue } from "./types";
import { setUser } from "@/lib/db/users";

export type AuthProviderProps = PropsWithChildren;

export function AuthProvider(props: AuthProviderProps) {
  const [firebaseUser, setFirebaseUser] =
    useState<AuthContextValue["firebaseUser"]>(undefined);

  const logout = useCallback(() => {
    auth.signOut();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user !== null) {
        setUser(user.uid, { email: user.email });
      }
    });
    return unsubscribe;
  }, []);

  const value: AuthContextValue = useMemo(() => {
    const baseValues = {
      logout,
    };
    if (firebaseUser === undefined) {
      return {
        ...baseValues,
        firebaseUser,
        firebaseUserLoading: true,
      };
    } else {
      return {
        ...baseValues,
        firebaseUser,
        firebaseUserLoading: false,
      };
    }
  }, [firebaseUser, logout]);

  return <AuthContext.Provider value={value} {...props} />;
}
