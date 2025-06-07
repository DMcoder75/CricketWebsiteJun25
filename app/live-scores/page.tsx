"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, RefreshCw, AlertCircle, Wifi, WifiOff, Database } from "lucide-react"
import Image from "next/image"
import { useCricketData } from "@/hooks/use-cricket-data"

function LiveMatchCard({ match }: { match: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="destructive" className="text-xs">
              <Play className="w-3 h-3 mr-1" />
              LIVE
            </Badge>
            <span className="text-sm text-muted-foreground">{match.format}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-green-500" />
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={match.team1.flag || "/placeholder.svg"}
                alt={match.team1.name}
                width={36}
                height={24}
                className="rounded"
              />
              <span className="font-medium">{match.team1.name}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{match.team1.score || "Yet to bat"}</div>
              {match.team1.overs && (
                <div className="text-sm text-muted-foreground">
                  ({match.team1.overs}) {match.team1.runRate && `RR: ${match.team1.runRate}`}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={match.team2.flag || "/placeholder.svg"}
                alt={match.team2.name}
                width={36}
                height={24}
                className="rounded"
              />
              <span className="font-medium">{match.team2.name}</span>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{match.team2.score || "Yet to bat"}</div>
              {match.team2.overs && (
                <div className="text-sm text-muted-foreground">
                  ({match.team2.overs}) {match.team2.runRate && `RR: ${match.team2.runRate}`}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2 border-t space-y-2">
          <p className="text-sm text-muted-foreground">{match.venue}</p>
          {match.series && <p className="text-xs text-muted-foreground">{match.series}</p>}
          {match.matchNumber && <p className="text-xs text-muted-foreground">{match.matchNumber}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

function RecentMatchCard({ match }: { match: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline">{match.format}</Badge>
          <span className="text-sm text-muted-foreground">
            {match.date_start ? new Date(match.date_start).toLocaleDateString() : "Recently"}
          </span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={match.team1.flag || "/placeholder.svg"}
                alt={match.team1.name}
                width={24}
                height={16}
                className="rounded"
              />
              <span className="font-medium text-sm">{match.team1.name}</span>
            </div>
            <span className="font-bold">{match.team1.score || "N/A"}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Image
                src={match.team2.flag || "/placeholder.svg"}
                alt={match.team2.name}
                width={24}
                height={16}
                className="rounded"
              />
              <span className="font-medium text-sm">{match.team2.name}</span>
            </div>
            <span className="font-bold">{match.team2.score || "N/A"}</span>
          </div>
        </div>
        {match.result && (
          <div className="mt-3 pt-3 border-t">
            <p className="text-sm font-medium text-green-600">{match.result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function LiveScoresPage() {
  const {
    data: liveMatches,
    loading: liveLoading,
    error: liveError,
    lastUpdated,
    refetch: refetchLive,
  } = useCricketData("live-matches", {
    refreshInterval: 15000, // Refresh every 15 seconds for live page
    autoRefresh: true,
  })

  const {
    data: recentMatches,
    loading: recentLoading,
    error: recentError,
    refetch: refetchRecent,
  } = useCricketData("fixtures") // This will include recent matches too

  // Filter recent matches to show only completed ones
  const completedMatches = recentMatches.filter((match) => match.isCompleted || match.matchEnded)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Live Cricket Scores</h1>
              <p className="text-muted-foreground">Real-time cricket data from CricAPI.com</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Database className="w-3 h-3 mr-1" />
                CricAPI
              </Badge>
              {lastUpdated && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <Tabs defaultValue="live" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="live" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Live Matches</span>
            </TabsTrigger>
            <TabsTrigger value="recent" className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Recent</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Live Matches</h2>
              <Button variant="outline" size="sm" onClick={refetchLive} disabled={liveLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${liveLoading ? "animate-spin" : ""}`} />
                Refresh Live Data
              </Button>
            </div>

            {liveLoading ? (
              <div className="grid gap-6">
                {[1, 2].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-32 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : liveError ? (
              <Card className="p-6 text-center border-red-200">
                <WifiOff className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <h3 className="text-lg font-medium mb-2 text-red-600">Failed to Load Live Data</h3>
                <p className="text-red-600 mb-4">{liveError}</p>
                <Button onClick={refetchLive} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            ) : liveMatches.length > 0 ? (
              <>
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Wifi className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {liveMatches.length} live match{liveMatches.length !== 1 ? "es" : ""} from CricAPI
                    </span>
                  </div>
                </div>
                <div className="grid gap-6">
                  {liveMatches.map((match) => (
                    <LiveMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-12 text-center border-blue-200">
                <AlertCircle className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-medium mb-2">No Live Matches</h3>
                <p className="text-muted-foreground mb-4">
                  No cricket matches are currently live according to CricAPI.com
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  This page shows only real live data - no fake scores!
                </p>
                <Button onClick={refetchLive} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Again
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Matches</h2>
              <Button variant="outline" size="sm" onClick={refetchRecent} disabled={recentLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${recentLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>

            {recentLoading ? (
              <div className="grid md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-24 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : recentError ? (
              <Card className="p-6 text-center border-red-200">
                <WifiOff className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <h3 className="text-lg font-medium mb-2 text-red-600">Failed to Load Recent Matches</h3>
                <p className="text-red-600 mb-4">{recentError}</p>
                <Button onClick={refetchRecent} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            ) : completedMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {completedMatches.slice(0, 8).map((match) => (
                  <RecentMatchCard key={match.id} match={match} />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Clock className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-medium mb-2">No Recent Matches</h3>
                <p className="text-muted-foreground">No recently completed matches available from CricAPI</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
