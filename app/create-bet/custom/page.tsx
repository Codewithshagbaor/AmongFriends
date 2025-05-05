"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"

export default function CustomBet() {
  const router = useRouter()
  const [betAmount, setBetAmount] = useState("")

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
          onClick={() => router.push("/create-bet")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Bet Types
        </Button>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
            <div className="text-3xl text-orange-500">+</div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Custom Bet</h1>
            <p className="text-slate-600">Create a completely custom bet about anything</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-8 shadow-sm border border-orange-100">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bet-title">Bet Title</Label>
              <Input id="bet-title" placeholder="Give your bet a name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bet-description">Bet Description</Label>
              <Textarea
                id="bet-description"
                placeholder="Describe what this bet is about in detail"
                className="min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="your-position">Your Position</Label>
                <Input id="your-position" placeholder="What you're betting on" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="friend-position">Friend's Position</Label>
                <Input id="friend-position" placeholder="What your friend is betting on" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-date">Resolution Date</Label>
              <Input id="resolution-date" type="date" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-method">Resolution Method</Label>
              <Input id="resolution-method" placeholder="How will you determine the winner?" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bet-amount">Bet Amount (ETH)</Label>
              <Input
                id="bet-amount"
                placeholder="0.1"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="friend-address">Friend's Wallet Address</Label>
              <Input id="friend-address" placeholder="0x..." />
            </div>

            <div className="pt-4 flex justify-center">
              <Button className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-8 py-6 font-medium text-lg">
                Create Custom Bet
              </Button>
            </div>
          </form>
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
