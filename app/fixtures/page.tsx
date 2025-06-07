"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, Bell, RefreshCw, Wifi, WifiOff, Database } from "lucide-react"
import Image from "next/image"
import { useCricketData } from "@/hooks/use-cricket-data"

function UpcomingMatchCard({ match }: { match: any }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "TBD"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    if (!dateString) return "TBD"
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getFormatColor = (format: string) => {
    switch (format?.toLowerCase()) {
      case "test":
        return "bg-red-100 text-red-800"
      case "odi":
        return "bg-blue-100 text-blue-800"
      case "t20i":
      case "t20":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "upcoming":
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "live":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Badge className={getFormatColor(match.format)}>{match.format || "TBD"}</Badge>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className={getStatusColor(match.status)}>
              {match.status || "Scheduled"}
            </Badge>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-8 mb-4">
            <div className="text-center">
              <Image
                src={match.team1?.flag || "/placeholder.svg?height=40&width=60"}
                alt={match.team1?.name || "Team 1"}
                width={50}
                height={33}
                className="rounded mx-auto mb-2"
              />
              <p className="font-medium text-sm">{match.team1?.name || "TBD"}</p>
            </div>
            <div className="text-2xl font-bold text-muted-foreground">VS</div>
            <div className="text-center">
              <Image
                src={match.team2?.flag || "/placeholder.svg?height=40&width=60"}
                alt={match.team2?.name || "Team 2"}
                width={50}
                height={33}
                className="rounded mx-auto mb-2"
              />
              <p className="font-medium text-sm">{match.team2?.name || "TBD"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{formatDate(match.date_start)}</span>
            <Clock className="w-4 h-4 text-muted-foreground ml-4" />
            <span>{formatTime(match.date_start)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{match.venue || "Venue TBD"}</span>
          </div>
        </div>

        {match.series && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="font-medium text-sm">{match.series}</p>
            {match.matchNumber && <p className="text-xs text-muted-foreground">{match.matchNumber}</p>}
          </div>
        )}

        <Button className="w-full">Set Reminder</Button>
      </CardContent>
    </Card>
  )
}

function RecentMatchCard({ match }: { match: any }) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Recently"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getFormatColor = (format: string) => {
    switch (format?.toLowerCase()) {
      case "test":
        return "bg-red-100 text-red-800"
      case "odi":
        return "bg-blue-100 text-blue-800"
      case "t20i":
      case "t20":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge className={getFormatColor(match.format)}>{match.format || "TBD"}</Badge>
          <span className="text-sm text-muted-foreground">{formatDate(match.date_start)}</span>
        </div>

        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-6 mb-3">
            <div className="text-center">
              <Image
                src={match.team1?.flag || "/placeholder.svg?height=30&width=45"}
                alt={match.team1?.name || "Team 1"}
                width={40}
                height={27}
                className="rounded mx-auto mb-1"
              />
              <p className="font-medium text-sm">{match.team1?.name || "TBD"}</p>
              <p className="text-lg font-bold">{match.team1?.score || "N/A"}</p>
            </div>
            <div className="text-lg font-bold text-muted-foreground">VS</div>
            <div className="text-center">
              <Image
                src={match.team2?.flag || "/placeholder.svg?height=30&width=45"}
                alt={match.team2?.name || "Team 2"}
                width={40}
                height={27}
                className="rounded mx-auto mb-1"
              />
              <p className="font-medium text-sm">{match.team2?.name || "TBD"}</p>
              <p className="text-lg font-bold">{match.team2?.score || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-3">
          <p className="text-sm text-muted-foreground">{match.venue || "Venue TBD"}</p>
        </div>

        {match.result && (
          <div className="bg-green-50 p-3 rounded-lg text-center">
            <p className="text-sm font-medium text-green-800">{match.result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FixturesPage() {
  const {
    data: allMatches,
    loading,
    error,
    lastUpdated,
    refetch,
  } = useCricketData("fixtures", {
    refreshInterval: 60000, // Refresh every minute
    autoRefresh: true,
  })

  // Add debugging information
  console.log("All matches received:", allMatches)
  console.log("Total matches:", allMatches.length)

  // Improve filtering logic - be more flexible about what constitutes "upcoming"
  const now = new Date()
  const upcomingMatches = allMatches.filter((match) => {
    // Check multiple conditions for upcoming matches
    const isUpcoming = match.isUpcoming === true
    const notStarted = match.matchStarted === false && match.matchEnded === false
    const futureDate = match.date_start && new Date(match.date_start) > now
    const scheduledStatus =
      match.status?.toLowerCase().includes("scheduled") || match.status?.toLowerCase().includes("upcoming")

    console.log(
      `Match ${match.id}: isUpcoming=${isUpcoming}, notStarted=${notStarted}, futureDate=${futureDate}, status=${match.status}`,
    )

    return isUpcoming || notStarted || futureDate || scheduledStatus
  })

  const recentMatches = allMatches.filter((match) => {
    const isCompleted = match.isCompleted === true || match.matchEnded === true
    const completedStatus =
      match.status?.toLowerCase().includes("completed") || match.status?.toLowerCase().includes("finished")

    return isCompleted || completedStatus
  })

  // If no upcoming matches found, show some current matches as "scheduled"
  const displayUpcoming = upcomingMatches.length > 0 ? upcomingMatches : allMatches.slice(0, 6)

  console.log("Filtered upcoming matches:", upcomingMatches.length)
  console.log("Filtered recent matches:", recentMatches.length)
  console.log("Display upcoming matches:", displayUpcoming.length)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Cricket Fixtures</h1>
              <p className="text-muted-foreground">Real-time cricket fixtures and results from CricAPI.com</p>
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

        <Tabs defaultValue="upcoming" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Matches</TabsTrigger>
              <TabsTrigger value="recent">Recent Results</TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" onClick={refetch} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh Data
            </Button>
          </div>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming International Matches</h2>
              <Badge variant="outline">{upcomingMatches.length} matches scheduled</Badge>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-32 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="p-6 text-center border-red-200">
                <WifiOff className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <h3 className="text-lg font-medium mb-2 text-red-600">Failed to Load Fixtures</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={refetch} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            ) : displayUpcoming.length > 0 ? (
              <>
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-700">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {upcomingMatches.length > 0
                        ? `Showing ${upcomingMatches.length} upcoming match${upcomingMatches.length !== 1 ? "es" : ""} from CricAPI`
                        : `Showing ${displayUpcoming.length} current match${displayUpcoming.length !== 1 ? "es" : ""} from CricAPI (no upcoming matches scheduled)`}
                    </span>
                  </div>
                  {allMatches.length > 0 && (
                    <div className="mt-2 text-xs text-blue-600">
                      Debug: Total API matches: {allMatches.length} | Upcoming: {upcomingMatches.length} | Recent:{" "}
                      {recentMatches.length}
                    </div>
                  )}
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayUpcoming.map((match) => (
                    <UpcomingMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </>
            ) : allMatches.length > 0 ? (
              <Card className="p-12 text-center border-yellow-200">
                <Calendar className="w-8 h-8 mx-auto mb-4 text-yellow-600" />
                <h3 className="text-lg font-medium mb-2">No Upcoming Matches Found</h3>
                <p className="text-muted-foreground mb-4">
                  CricAPI returned {allMatches.length} match{allMatches.length !== 1 ? "es" : ""}, but none are
                  scheduled for the future
                </p>
                <div className="text-xs text-muted-foreground mb-4">
                  This could mean all current matches are either live or recently completed
                </div>
                <Button onClick={refetch} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Data
                </Button>
              </Card>
            ) : (
              <Card className="p-12 text-center border-blue-200">
                <Calendar className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-medium mb-2">No Matches Available</h3>
                <p className="text-muted-foreground mb-4">
                  No cricket matches available from CricAPI.com at the moment
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  This site shows only real data - check back later for new fixtures!
                </p>
                <Button onClick={refetch} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Check Again
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="recent" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Match Results</h2>
              <Badge variant="outline">{recentMatches.length} recent matches</Badge>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-24 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : error ? (
              <Card className="p-6 text-center border-red-200">
                <WifiOff className="w-8 h-8 mx-auto mb-4 text-red-600" />
                <h3 className="text-lg font-medium mb-2 text-red-600">Failed to Load Recent Results</h3>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={refetch} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </Card>
            ) : recentMatches.length > 0 ? (
              <>
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Showing {recentMatches.length} recent match result{recentMatches.length !== 1 ? "s" : ""} from
                      CricAPI
                    </span>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentMatches.slice(0, 12).map((match) => (
                    <RecentMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="p-12 text-center">
                <Clock className="w-8 h-8 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-medium mb-2">No Recent Results</h3>
                <p className="text-muted-foreground">No recently completed matches available from CricAPI</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Live Data Status */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Real-Time Data Status</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <div className="flex items-center justify-center mb-4">
                {error ? <WifiOff className="w-12 h-12 text-red-600" /> : <Wifi className="w-12 h-12 text-green-600" />}
              </div>
              <h3 className="text-2xl font-bold mb-2">{error ? "Offline" : "Connected"}</h3>
              <p className="text-muted-foreground">API Status</p>
            </Card>
            <Card className="text-center p-6">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-2xl font-bold mb-2">{displayUpcoming.length}</h3>
              <p className="text-muted-foreground">
                {upcomingMatches.length > 0 ? "Upcoming Matches" : "Current Matches"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {upcomingMatches.length > 0 ? "From CricAPI" : "No upcoming matches, showing current"}
              </p>
            </Card>
            <Card className="text-center p-6">
              <Clock className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h3 className="text-2xl font-bold mb-2">{recentMatches.length}</h3>
              <p className="text-muted-foreground">Recent Results</p>
              <p className="text-xs text-muted-foreground mt-1">From CricAPI</p>
            </Card>
            <Card className="text-center p-6">
              <Database className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold mb-2">{allMatches.length}</h3>
              <p className="text-muted-foreground">Total Matches</p>
              <p className="text-xs text-muted-foreground mt-1">
                {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString()}` : "Not updated"}
              </p>
            </Card>
          </div>

          {/* Real-time Status Indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100">
              <div
                className={`w-3 h-3 rounded-full ${error ? "bg-red-500" : loading ? "bg-yellow-500 animate-pulse" : "bg-green-500"}`}
              ></div>
              <span className="text-sm font-medium">
                {error ? "API Connection Failed" : loading ? "Fetching Live Data..." : "Live Data Connected"}
              </span>
              {lastUpdated && !error && (
                <span className="text-xs text-muted-foreground">
                  • Last updated: {lastUpdated.toLocaleTimeString()}
                </span>
              )}
            </div>
          </div>

          {/* Data Source Information */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Data provided by <strong>CricAPI.com</strong> • Updates every minute •
              {error ? " Currently unavailable" : " Real-time cricket information"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
