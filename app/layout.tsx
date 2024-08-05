import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { ModelProvider } from "@/components/model-provideo";
import { ToasterProvider } from "@/components/toster-provider";
import { CrispProvider } from "@/components/crisp-provide";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flux-Craft",
  description: "GEN AI Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
        <Analytics />
         <html lang="en">
          <CrispProvider />
           <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            > 
              <ModelProvider />
              <ToasterProvider />
              {children}
           </ThemeProvider>
          </body>
        </html>
     </ClerkProvider>
  );
}
