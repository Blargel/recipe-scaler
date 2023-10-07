import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  const authValue = useContext(AuthContext);
  if (authValue === undefined) {
    throw Error("useAuth was used outside of AuthProvider");
  }
  return authValue;
}
