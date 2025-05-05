"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Trophy, Handshake, Shield } from "lucide-react"

export default function CreateBet() {
  const router = useRouter()

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
          <Button className="bg-green-500 hover:bg-green-400 text-white rounded-full px-6 font-medium">
            Wallet Connected ✓
          </Button>
        </div>
      </header>

      <main className="flex-1 container max-w-screen-lg px-4 py-8 md:px-6">
        <Button
          variant="ghost"
          className="mb-6 text-orange-500 hover:text-orange-600 hover:bg-orange-50 -ml-3"
          onClick={() => router.push("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>

        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Create a New Bet</h1>
          <p className="max-w-[700px] text-slate-600 md:text-xl">Choose what type of bet you'd like to create</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/create-bet/sports" className="block">
            <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer h-full">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Trophy className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sports Game</h3>
              <p className="text-slate-600 text-center">Bet on the outcome of sports games, matches, or tournaments.</p>
            </div>
          </Link>

          <Link href="/create-bet/challenge" className="block">
            <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer h-full">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Handshake className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personal Challenge</h3>
              <p className="text-slate-600 text-center">Create a bet around a personal challenge between friends.</p>
            </div>
          </Link>

          <Link href="/create-bet/prediction" className="block">
            <div className="flex flex-col items-center bg-white rounded-xl p-8 shadow-sm border border-orange-100 hover:shadow-md transition-all hover:border-orange-200 cursor-pointer h-full">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-10 w-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold mb-3">Prediction</h3>
              <p className="text-slate-600 text-center">Make a prediction about future events or outcomes.</p>
            </div>
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/create-bet/custom">
            <Button className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 py-5 font-medium">
              Create Custom Bet
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t border-orange-100 bg-white mt-auto">
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
    </div>
  )
}
