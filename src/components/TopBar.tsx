"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useAuth } from "@/contexts/auth/useAuth";
import { useCallback } from "react";

import { auth } from "@/firebase";

export function TopBar() {
  const { firebaseUserLoading, firebaseUser } = useAuth();

  const handleLogOut = useCallback(() => {
    auth.signOut();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit">Home</Button>
          </Box>
          {!firebaseUserLoading && firebaseUser !== null && (
            <Button color="inherit" onClick={handleLogOut}>
              Log out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
