"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Handshake, Trophy, Wallet, Share2, Shield, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAccount } from "wagmi";
import ConnectWalletButton from "@/components/ConnectWeb3Wallet"

export default function Home() {
  const { isConnected } = useAccount();
  const [showConnectDialog, setShowConnectDialog] = useState(false)
  const router = useRouter()



  const handleBetTypeClick = (betType: string) => {
    if (isConnected) {
      router.push(`/create-bet/${betType}`)
    } else {
      setShowConnectDialog(true)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFAF5]">
      <header className="border-b border-orange-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-16 max-w-screen-lg items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Among Friends Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Among Friends
            </span>
          </div>
          <ConnectWalletButton />
        </div>
      </header>

      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container max-w-screen-lg px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors border-orange-200 bg-orange-100 text-orange-600">
                Friendly Betting Protocol
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Bet with friends, <span className="text-orange-500">have fun together</span>
              </h1>
              <p className="max-w-[700px] text-slate-600 md:text-xl">
                Create fun wagers with your friends using ETH—no complicated stuff, just good times and friendly bets.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 min-[400px]:flex-row">
                <Button
                  className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-8 py-6 font-medium text-lg"
                  onClick={() => {
                    if (isConnected) {
                      router.push("/create-bet")
                    } else {
                      setShowConnectDialog(true)
                    }
                  }}
                >
                  Start Betting
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full px-8 py-6 font-medium text-lg border-orange-200 text-orange-600 hover:bg-orange-50"
                  onClick={() => {
                    const howItWorksSection = document.getElementById("how-it-works")
                    if (howItWorksSection) {
                      howItWorksSection.scrollIntoView({ behavior: "smooth" })
                    }
                  }}
                >
                  How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container max-w-screen-lg px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">What would you like to bet on?</h2>
              <p className="max-w-[700px] text-slate-600 md:text-xl">
                Choose from popular bet types or create your own custom wager
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div
                className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer"
                onClick={() => handleBetTypeClick("sports")}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-orange-500" />
                </div>
                <span className="font-medium">Sports Game</span>
              </div>

              <div
                className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer"
                onClick={() => handleBetTypeClick("challenge")}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Handshake className="h-8 w-8 text-orange-500" />
                </div>
                <span className="font-medium">Personal Challenge</span>
              </div>

              <div
                className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer"
                onClick={() => handleBetTypeClick("prediction")}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-orange-500" />
                </div>
                <span className="font-medium">Prediction</span>
              </div>

              <div
                className="flex flex-col items-center bg-white rounded-xl p-6 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer"
                onClick={() => handleBetTypeClick("custom")}
              >
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <div className="text-3xl text-orange-500">+</div>
                </div>
                <span className="font-medium">Custom Bet</span>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-16 lg:py-20 bg-orange-50">
          <div className="container max-w-screen-lg px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
              <p className="max-w-[700px] text-slate-600 md:text-xl">
                Among Friends makes betting with friends simple, fun, and trustless
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Wallet className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Create a Bet</h3>
                <p className="text-slate-600">Connect your wallet and create a fun bet with ETH. It's super easy!</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Share2 className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Invite Friends</h3>
                <p className="text-slate-600">Share your unique bet ID with friends so they can join the fun.</p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Settle & Win</h3>
                <p className="text-slate-600">
                  After the event, agree on the winner and collect your winnings instantly!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container max-w-screen-lg px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Why Friends Love Us</h2>
              <p className="max-w-[700px] text-slate-600 md:text-xl">
                Our protocol offers a fun and friendly way to bet with your buddies
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">No Complicated Stuff</h3>
                  <p className="text-slate-600">
                    Just you and your friends deciding the outcome together. No third parties needed!
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Super Easy Sharing</h3>
                  <p className="text-slate-600">
                    Share your bet with a simple ID code that friends can use to join instantly.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Fair Dispute Resolution</h3>
                  <p className="text-slate-600">
                    If you can't agree, our 70/30 split ensures everyone walks away happy.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
                  <Check className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Totally Secure</h3>
                  <p className="text-slate-600">
                    Your bets are secured on the blockchain, so everything stays transparent and safe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-orange-50">
          <div className="container max-w-screen-lg px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to bet with friends?</h2>
              <p className="max-w-[600px] text-slate-600 md:text-xl">
                Start creating fun, friendly bets in just a few clicks!
              </p>
              <Button
                className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-8 py-6 font-medium text-lg"
                onClick={() => {
                  if (isConnected) {
                    router.push("/create-bet")
                  } else {
                    setShowConnectDialog(true)
                  }
                }}
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-orange-100 bg-white">
        <div className="container max-w-screen-lg flex flex-col gap-4 sm:flex-row py-8 w-full items-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Among Friends Logo" width={30} height={30} className="rounded-full" />
            <span className="text-sm font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
              Among Friends
            </span>
          </div>
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Among Friends Protocol. All rights reserved.
          </p>
          <nav className="sm:ml-auto flex gap-6">
            <Link href="#" className="text-sm text-slate-500 hover:text-orange-500">
              Terms
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-orange-500">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-orange-500">
              Help
            </Link>
          </nav>
        </div>
      </footer>

      {/* Connect Wallet Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Connect Your Wallet
            </DialogTitle>
            <DialogDescription>You need to connect your wallet first to create or join bets.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center p-4">
            <ConnectWalletButton />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
