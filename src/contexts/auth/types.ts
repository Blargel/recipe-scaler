import type { User } from "firebase/auth";

export interface AuthContextBase {
  logout: () => void;
}

export interface AuthContextLoadedValue extends AuthContextBase {
  firebaseUser: User | null;
  firebaseUserLoading: false;
}

export interface AuthContextLoadingValue extends AuthContextBase {
  firebaseUser: undefined;
  firebaseUserLoading: true;
}

export type AuthContextValue = AuthContextLoadedValue | AuthContextLoadingValue;
