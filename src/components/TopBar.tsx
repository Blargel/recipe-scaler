"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import { useAuth } from "@/contexts/auth/useAuth";

export function TopBar() {
  const { firebaseUserLoading, firebaseUser, logout } = useAuth();
  const router = useRouter();
  const pathName = usePathname();

  const navToHome = useCallback(() => {
    if (pathName === "/") {
      router.push("/");
    } else {
      router.push("/recipes");
    }
  }, [router, pathName]);

  return (
    <AppBar>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={navToHome}>
            Home
          </Button>
        </Box>
        {!firebaseUserLoading && firebaseUser !== null && (
          <Button color="inherit" onClick={logout}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
