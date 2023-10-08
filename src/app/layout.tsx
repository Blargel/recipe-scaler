import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { AuthProvider } from "@/contexts/auth/AuthProvider";
import { TopBar } from "@/components/TopBar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Henry's Shady Recipe Scaling",
  description: "Some garbage app a random dude made",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CssBaseline />
        <AuthProvider>
          <TopBar />
          <Container maxWidth="lg">
            <Box paddingTop={12}>{children}</Box>
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
