"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function JoinBet() {
  const router = useRouter()
  const { toast } = useToast()
  const [betId, setBetId] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleJoinBet = () => {
    if (!betId.trim()) {
      toast({
        title: "Bet ID required",
        description: "Please enter a valid bet ID to join.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsLoading(true)

    // Simulate loading
    setTimeout(() => {
      setIsLoading(false)
      router.push(`/bet/${betId}`)
    }, 1500)
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
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join a Bet</h1>
          <p className="max-w-[700px] text-slate-600 md:text-xl">
            Enter the bet ID shared by your friend to join their bet
          </p>
        </div>

        <div className="max-w-md mx-auto bg-white rounded-xl p-8 shadow-sm border border-orange-100">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bet-id">Bet ID</Label>
              <Input
                id="bet-id"
                placeholder="Enter the bet ID"
                value={betId}
                onChange={(e) => setBetId(e.target.value)}
              />
              <p className="text-xs text-slate-500">Your friend should have shared a bet ID with you.</p>
            </div>

            <Button
              className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 py-5 font-medium w-full"
              onClick={handleJoinBet}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Looking up bet...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find Bet
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4 text-center">How to Join a Bet</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-orange-500">
                1
              </div>
              <p className="text-slate-600">Ask your friend to share their bet ID with you</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-orange-500">
                2
              </div>
              <p className="text-slate-600">Enter the bet ID in the field above</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-orange-100 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4 text-xl font-bold text-orange-500">
                3
              </div>
              <p className="text-slate-600">Review the bet details and click "Join Bet"</p>
            </div>
          </div>
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
