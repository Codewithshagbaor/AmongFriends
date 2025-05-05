import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast";
import { Web3Provider } from "@/context/Web3Provider";
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Among Friends - Fun Peer-to-Peer Betting with Friends",
  description:
    "Create and settle friendly wagers with ETH directly between friends. No complicated stuff, just good times!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Toaster position="top-center" />
          <Web3Provider>
            {children}
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  )
}
