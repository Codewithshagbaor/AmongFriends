"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowLeft, Copy, Share2, Trophy, CheckCircle, AlertCircle, Clock, Users } from "lucide-react"

export default function BetView({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [walletConnected, setWalletConnected] = useState(true) // Assuming wallet is connected
  const [isCreator, setIsCreator] = useState(true) // Toggle this to see different views
  const [hasJoined, setHasJoined] = useState(false) // For invited users
  const [betStatus, setBetStatus] = useState<"pending" | "active" | "voting" | "completed" | "disputed">("active")
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showVoteDialog, setShowVoteDialog] = useState(false)
  const [selectedWinner, setSelectedWinner] = useState<"creator" | "opponent" | null>(null)
  const [opponentVote, setOpponentVote] = useState<"creator" | "opponent" | null>(null)

  // Mock bet data - in a real app, this would come from your contract
  const betData = {
    id: params.id,
    type: "Sports Bet",
    title: "Lakers vs Warriors",
    description: "Bet on the winner of the Lakers vs Warriors game on May 5th, 2025",
    amount: "0.1 ETH",
    creator: {
      address: "0x1234...5678",
      name: "You",
      prediction: "Lakers win",
    },
    opponent: {
      address: "0x8765...4321",
      name: "Alex",
      prediction: "Warriors win",
    },
    createdAt: "May 1, 2025",
    resolutionDate: "May 6, 2025",
    status: betStatus,
  }

  const copyBetId = () => {
    navigator.clipboard.writeText(params.id)
    toast({
      title: "Bet ID copied!",
      description: "Share this ID with your friend so they can join the bet.",
      duration: 3000,
    })
  }

  const joinBet = () => {
    // In a real app, this would call your smart contract
    setHasJoined(true)
    setBetStatus("active")
    toast({
      title: "Bet joined!",
      description: "You've successfully joined this bet.",
      duration: 3000,
    })
  }

  const submitVote = () => {
    // In a real app, this would call your smart contract
    if (!selectedWinner) return

    // Simulate opponent voting differently to show dispute
    if (Math.random() > 0.5) {
      setOpponentVote(selectedWinner === "creator" ? "opponent" : "creator")
      setBetStatus("disputed")
      toast({
        title: "Votes don't match!",
        description: "There's a disagreement on the outcome. The 70/30 split will be applied.",
        duration: 5000,
      })
    } else {
      setOpponentVote(selectedWinner)
      setBetStatus("completed")
      toast({
        title: "Bet completed!",
        description: "Both parties agreed on the outcome. Funds have been distributed.",
        duration: 3000,
      })
    }

    setShowVoteDialog(false)
  }

  const getStatusBadge = () => {
    switch (betStatus) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Waiting for opponent
          </Badge>
        )
      case "active":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            Active
          </Badge>
        )
      case "voting":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Voting
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Completed
          </Badge>
        )
      case "disputed":
        return (
          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
            Disputed
          </Badge>
        )
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

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Trophy className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{betData.title}</h1>
                {getStatusBadge()}
              </div>
              <p className="text-sm text-slate-500">Bet ID: {betData.id}</p>
            </div>
          </div>

          <div className="flex gap-2">
            {isCreator && betStatus === "pending" && (
              <Button
                className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 font-medium"
                onClick={() => setShowShareDialog(true)}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Bet
              </Button>
            )}

            {!isCreator && !hasJoined && (
              <Button
                className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 font-medium"
                onClick={joinBet}
              >
                Join Bet
              </Button>
            )}

            {betStatus === "active" && (
              <Button
                className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 font-medium"
                onClick={() => {
                  setBetStatus("voting")
                  toast({
                    title: "Voting is now open!",
                    description: "The event has concluded. Vote on the outcome now.",
                    duration: 3000,
                  })
                }}
              >
                Start Voting
              </Button>
            )}

            {betStatus === "voting" && (
              <Button
                className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 font-medium"
                onClick={() => setShowVoteDialog(true)}
              >
                Vote on Outcome
              </Button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
          <Tabs defaultValue="details">
            <TabsList className="w-full border-b border-orange-100 bg-orange-50 rounded-none p-0">
              <TabsTrigger
                value="details"
                className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none py-3 px-6"
              >
                Bet Details
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="rounded-none data-[state=active]:bg-white data-[state=active]:shadow-none py-3 px-6"
              >
                Activity
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Bet Information</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-slate-500">Type</Label>
                      <p>{betData.type}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-500">Description</Label>
                      <p>{betData.description}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-500">Amount</Label>
                      <p>{betData.amount}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-500">Created</Label>
                      <p>{betData.createdAt}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-slate-500">Resolution Date</Label>
                      <p>{betData.resolutionDate}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Participants</h3>
                  <div className="space-y-6">
                    <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-sm font-medium text-orange-700">
                            {betData.creator.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{betData.creator.name} (Creator)</p>
                            <p className="text-xs text-slate-500">{betData.creator.address}</p>
                          </div>
                        </div>
                        {betStatus === "completed" && selectedWinner === "creator" && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Winner</Badge>
                        )}
                        {betStatus === "disputed" && selectedWinner === "creator" && (
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">70% Split</Badge>
                        )}
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-orange-100">
                        <p className="text-sm">{betData.creator.prediction}</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center text-sm font-medium text-blue-700">
                            {betData.opponent.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{betData.opponent.name}</p>
                            <p className="text-xs text-slate-500">{betData.opponent.address}</p>
                          </div>
                        </div>
                        {betStatus === "completed" && selectedWinner === "opponent" && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">Winner</Badge>
                        )}
                        {betStatus === "disputed" && selectedWinner === "opponent" && (
                          <Badge className="bg-orange-100 text-orange-800 border-orange-200">70% Split</Badge>
                        )}
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-blue-100">
                        <p className="text-sm">{betData.opponent.prediction}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {betStatus === "completed" && (
                <div className="mt-8 bg-green-50 rounded-xl p-6 border border-green-100 text-center">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-green-800 mb-1">Bet Completed!</h3>
                  <p className="text-green-700">
                    Both parties agreed on the outcome. Funds have been distributed to the winner.
                  </p>
                </div>
              )}

              {betStatus === "disputed" && (
                <div className="mt-8 bg-orange-50 rounded-xl p-6 border border-orange-100 text-center">
                  <AlertCircle className="h-12 w-12 text-orange-500 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-orange-800 mb-1">Outcome Disputed</h3>
                  <p className="text-orange-700">
                    There was a disagreement on the outcome. The 70/30 split has been applied.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                    <Users className="h-4 w-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-medium">Bet Created</p>
                    <p className="text-sm text-slate-500">
                      {betData.createdAt} by {betData.creator.name}
                    </p>
                  </div>
                </div>

                {hasJoined && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <Users className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="font-medium">Bet Joined</p>
                      <p className="text-sm text-slate-500">May 2, 2025 by {betData.opponent.name}</p>
                    </div>
                  </div>
                )}

                {betStatus === "voting" && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                      <Clock className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">Voting Started</p>
                      <p className="text-sm text-slate-500">May 5, 2025</p>
                    </div>
                  </div>
                )}

                {(betStatus === "completed" || betStatus === "disputed") && (
                  <>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                        <Clock className="h-4 w-4 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">Voting Started</p>
                        <p className="text-sm text-slate-500">May 5, 2025</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">{betStatus === "completed" ? "Bet Completed" : "Bet Disputed"}</p>
                        <p className="text-sm text-slate-500">May 6, 2025</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
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

      {/* Share Bet Dialog */}
      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Share Bet with Friends</DialogTitle>
            <DialogDescription>Share this bet ID with your friend so they can join the bet.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="bet-id" className="sr-only">
                Bet ID
              </Label>
              <Input id="bet-id" value={params.id} readOnly className="font-mono" />
            </div>
            <Button size="icon" onClick={copyBetId}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="text-sm text-slate-500">Your friend can join this bet by:</p>
            <ol className="text-sm text-slate-500 list-decimal pl-4 space-y-1">
              <li>Visiting Among Friends</li>
              <li>Connecting their wallet</li>
              <li>Clicking "Join Bet" and entering this ID</li>
            </ol>
          </div>
        </DialogContent>
      </Dialog>

      {/* Vote Dialog */}
      <Dialog open={showVoteDialog} onOpenChange={setShowVoteDialog}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <DialogHeader>
            <DialogTitle>Vote on Bet Outcome</DialogTitle>
            <DialogDescription>
              Select who you believe won this bet. Both parties must agree for an automatic settlement.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className={`flex flex-col items-center p-6 h-auto border-2 ${
                  selectedWinner === "creator" ? "border-orange-500 bg-orange-50" : "border-slate-200"
                }`}
                onClick={() => setSelectedWinner("creator")}
              >
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  {betData.creator.name.charAt(0)}
                </div>
                <span className="font-medium">{betData.creator.name}</span>
                <span className="text-xs text-slate-500 mt-1">{betData.creator.prediction}</span>
              </Button>

              <Button
                variant="outline"
                className={`flex flex-col items-center p-6 h-auto border-2 ${
                  selectedWinner === "opponent" ? "border-orange-500 bg-orange-50" : "border-slate-200"
                }`}
                onClick={() => setSelectedWinner("opponent")}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  {betData.opponent.name.charAt(0)}
                </div>
                <span className="font-medium">{betData.opponent.name}</span>
                <span className="text-xs text-slate-500 mt-1">{betData.opponent.prediction}</span>
              </Button>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-blue-800">
                <AlertCircle className="h-4 w-4 inline-block mr-1" />
                If both parties select different winners, the 70/30 split will be applied to minimize losses.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              className="bg-orange-500 hover:bg-orange-400 text-white rounded-full px-6 font-medium w-full"
              onClick={submitVote}
              disabled={!selectedWinner}
            >
              Submit Vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
