import { redirect, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useLoginRedirect() {
  const pathName = usePathname();
  const loginRedirect = useCallback(() => {
    redirect(`/?redirectPath=${pathName}`);
  }, [pathName]);

  return loginRedirect;
}
