import type { User } from "firebase/auth";

export interface AuthContextValue {
  firebaseUser: User | null | undefined;
  firebaseUserLoading: boolean;
}
