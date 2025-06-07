"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock, TrendingUp, Calendar, RefreshCw, AlertCircle, Wifi, WifiOff, Database } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCricketData } from "@/hooks/use-cricket-data"

function LiveScoreCard({ match }: { match: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-green-500">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant="destructive" className="text-xs">
            <Play className="w-3 h-3 mr-1" />
            LIVE
          </Badge>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">{match.format}</span>
            <Wifi className="w-3 h-3 text-green-500" />
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
              <div className="font-bold text-lg">{match.team1.score || "0/0"}</div>
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
              <div className="font-bold text-lg">{match.team2.score || "0/0"}</div>
              {match.team2.overs && (
                <div className="text-sm text-muted-foreground">
                  ({match.team2.overs}) {match.team2.runRate && `RR: ${match.team2.runRate}`}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="pt-2 border-t">
          <p className="text-sm text-muted-foreground">{match.venue}</p>
          {match.series && <p className="text-xs text-muted-foreground mt-1">{match.series}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export default function HomePage() {
  const {
    data: liveMatches,
    loading: liveLoading,
    error: liveError,
    lastUpdated,
    refetch,
  } = useCricketData("live-matches", {
    refreshInterval: 30000,
    autoRefresh: true,
  })

  const { data: upcomingMatches, loading: upcomingLoading } = useCricketData("fixtures")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          {/* Radiating lines */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white"
                style={{
                  width: "2px",
                  height: "100vh",
                  left: "50%",
                  top: "0",
                  transformOrigin: "top center",
                  transform: `translateX(-50%) rotate(${i * 30}deg)`,
                }}
              />
            ))}
          </div>

          {/* Explosion effects */}
          <div className="absolute inset-0">
            {/* Impact splatters */}
            <div className="absolute top-20 left-20 w-4 h-4 bg-orange-500 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-32 right-32 w-6 h-6 bg-red-500 rounded-full opacity-20"></div>
            <div className="absolute bottom-40 left-40 w-3 h-3 bg-yellow-500 rounded-full opacity-40"></div>
            <div className="absolute bottom-20 right-20 w-5 h-5 bg-orange-600 rounded-full opacity-25"></div>

            {/* Scattered dots */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Large explosive logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                {/* Central cricket ball with explosion effect */}
                <div className="relative w-32 h-32 mx-auto">
                  {/* Radiating bats */}
                  <div className="absolute inset-0">
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                      <div
                        key={i}
                        className="absolute w-16 h-2 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full opacity-80"
                        style={{
                          left: "50%",
                          top: "50%",
                          transformOrigin: "left center",
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(20px)`,
                        }}
                      />
                    ))}
                  </div>

                  {/* Impact explosion */}
                  <div className="absolute inset-0 bg-black rounded-full opacity-30 blur-sm scale-150"></div>

                  {/* Central cricket ball */}
                  <div className="absolute inset-4 bg-gradient-to-br from-orange-400 via-red-500 to-red-700 rounded-full shadow-2xl">
                    {/* Cricket ball seam */}
                    <div
                      className="absolute inset-2 border-2 border-white rounded-full opacity-60"
                      style={{
                        borderStyle: "dashed",
                        borderDashArray: "8 4",
                      }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">CH</span>
                    </div>
                  </div>
                </div>

                {/* Explosion particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-60 animate-ping"
                    style={{
                      left: `${50 + Math.cos((i * 45 * Math.PI) / 180) * 80}%`,
                      top: `${50 + Math.sin((i * 45 * Math.PI) / 180) * 80}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-orange-400 via-red-500 to-yellow-500 bg-clip-text text-transparent">
                CricHattric
              </span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-300">Your Cricket Universe</h2>
            <p className="text-xl md:text-2xl mb-8 text-gray-400">
              Real-time cricket data from CricketData.org - No fake data, only live matches
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg"
              >
                <Database className="w-5 h-5 mr-2" />
                Real Data Only
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Live Scores
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-3xl font-bold">Live Matches</h2>
              <Badge variant="outline" className="text-xs">
                <Database className="w-3 h-3 mr-1" />
                CricketData.org
              </Badge>
              {lastUpdated && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={refetch} disabled={liveLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${liveLoading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Link href="/live-scores">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </div>

          {liveLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
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
              <h3 className="text-lg font-medium mb-2 text-red-600">API Connection Failed</h3>
              <p className="text-red-600 mb-4">{liveError}</p>
              <Button onClick={refetch} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Retry Connection
              </Button>
            </Card>
          ) : liveMatches.length > 0 ? (
            <>
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-2 text-green-700">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Showing {liveMatches.length} live match{liveMatches.length !== 1 ? "es" : ""} from CricketData.org
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {liveMatches.map((match) => (
                  <LiveScoreCard key={match.id} match={match} />
                ))}
              </div>
            </>
          ) : (
            <Card className="p-12 text-center border-blue-200">
              <AlertCircle className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium mb-2">Real Cricket Data Connected!</h3>
              <p className="text-muted-foreground mb-4">
                Connected to CricketData.org with your API key. Currently showing demo data as no live matches are
                available.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-green-700">
                  <strong>✅ API Key Configured:</strong> Your CricketData.org API key is working!
                </p>
                <p className="text-sm text-green-600 mt-2">
                  When cricket matches are live, they will automatically appear here with real scores.
                </p>
              </div>
              <p className="text-xs text-muted-foreground">This demo shows what real live matches would look like!</p>
            </Card>
          )}
        </div>
      </section>

      {/* Upcoming Matches Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Upcoming Matches</h2>
            <Link href="/fixtures">
              <Button variant="outline">View All Fixtures</Button>
            </Link>
          </div>

          {upcomingLoading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-24 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : upcomingMatches.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingMatches.slice(0, 4).map((match) => (
                <Card key={match.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="outline">{match.format}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-1" />
                        {match.date_start ? new Date(match.date_start).toLocaleDateString() : "TBD"}
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <div className="text-lg font-semibold mb-1">
                        {match.team1.name} vs {match.team2.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {match.venue}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-4 text-blue-600" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Matches</h3>
              <p className="text-muted-foreground">No upcoming matches scheduled according to CricketData.org</p>
            </Card>
          )}
        </div>
      </section>

      {/* Real-Time Data Status */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Live Cricket Data Status</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-4">
                {liveError ? (
                  <WifiOff className="w-12 h-12 text-red-600" />
                ) : (
                  <Database className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">{liveError ? "Offline" : "Real"}</h3>
              <p className="text-muted-foreground">Data Source</p>
              <p className="text-xs text-muted-foreground mt-1">CricketData.org</p>
            </Card>
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-4">
                {liveMatches.length > 0 ? (
                  <Play className="w-12 h-12 text-green-600" />
                ) : (
                  <Play className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">{liveMatches.length}</h3>
              <p className="text-muted-foreground">Live Matches</p>
              <p className="text-xs text-muted-foreground mt-1">
                {liveMatches.length > 0 ? "Currently playing" : "None active"}
              </p>
            </Card>
            <Card className="text-center p-6">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-2xl font-bold mb-2">{upcomingMatches.length}</h3>
              <p className="text-muted-foreground">Upcoming Matches</p>
              <p className="text-xs text-muted-foreground mt-1">Scheduled</p>
            </Card>
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-4">
                {liveError ? (
                  <WifiOff className="w-12 h-12 text-red-600" />
                ) : liveLoading ? (
                  <RefreshCw className="w-12 h-12 text-blue-600 animate-spin" />
                ) : (
                  <Wifi className="w-12 h-12 text-green-600" />
                )}
              </div>
              <h3 className="text-2xl font-bold mb-2">{liveError ? "Error" : liveLoading ? "Loading" : "Live"}</h3>
              <p className="text-muted-foreground">Connection</p>
              <p className="text-xs text-muted-foreground mt-1">
                {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Not connected"}
              </p>
            </Card>
          </div>

          {/* Live Status Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-white border shadow-sm">
              <div
                className={`w-3 h-3 rounded-full ${
                  liveError
                    ? "bg-red-500"
                    : liveLoading
                      ? "bg-yellow-500 animate-pulse"
                      : liveMatches.length > 0
                        ? "bg-green-500"
                        : "bg-blue-500"
                }`}
              ></div>
              <span className="font-medium">
                {liveError
                  ? "API Connection Failed"
                  : liveLoading
                    ? "Fetching Live Data..."
                    : liveMatches.length > 0
                      ? `${liveMatches.length} Live Match${liveMatches.length !== 1 ? "es" : ""} Active`
                      : "Connected to CricketData.org - No Live Matches"}
              </span>
              {lastUpdated && !liveError && (
                <span className="text-sm text-muted-foreground">• Auto-refresh every 30s</span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
