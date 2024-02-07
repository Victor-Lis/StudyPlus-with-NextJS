import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";

import { AuthProvider } from "@/providers/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ETEC Enfermagem",
  description: "Feito para o gerenciamento de estágios na ETEC Professor Carmine Biagio Tundisi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <AuthProvider>
            <Header />
            {children}
        </AuthProvider>
      </body>
    </html>
  );
}
