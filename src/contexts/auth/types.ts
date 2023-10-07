import type { User } from "firebase/auth";

export interface AuthContextLoadedValue {
  firebaseUser: User | null;
  firebaseUserLoading: false;
}

export interface AuthContextLoadingValue {
  firebaseUser: undefined;
  firebaseUserLoading: true;
}

export type AuthContextValue = AuthContextLoadedValue | AuthContextLoadingValue;
