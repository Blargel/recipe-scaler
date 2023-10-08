import { useCallback } from "react";
import { redirect, usePathname } from "next/navigation";

export function useLoginRedirect() {
  const pathName = usePathname();
  const loginRedirect = useCallback(() => {
    redirect(`/?redirectPath=${pathName}`);
  }, [pathName]);

  return loginRedirect;
}
