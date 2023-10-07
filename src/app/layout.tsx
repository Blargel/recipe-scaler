import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import type { Metadata } from "next";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { AuthProvider } from "@/contexts/auth/AuthProvider";
import styles from "./layout.module.css";
import { TopBar } from "@/components/TopBar";

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
          <Container>
            <main className={styles.main}>{children}</main>
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
