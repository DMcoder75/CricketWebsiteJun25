import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const internationalTeams = [
  {
    id: 1,
    name: "India",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 1, odi: 1, t20: 1 },
    captain: "Rohit Sharma (Test/ODI), Suryakumar Yadav (T20I)",
    coach: "Gautam Gambhir",
    recentForm: ["W", "W", "W", "L", "W"],
    stats: { matches: 158, wins: 95, losses: 52, draws: 11 },
  },
  {
    id: 2,
    name: "Australia",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 2, odi: 2, t20: 2 },
    captain: "Pat Cummins",
    coach: "Andrew McDonald",
    recentForm: ["W", "L", "W", "W", "W"],
    stats: { matches: 162, wins: 102, losses: 50, draws: 10 },
  },
  {
    id: 3,
    name: "England",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 3, odi: 4, t20: 3 },
    captain: "Ben Stokes",
    coach: "Brendon McCullum",
    recentForm: ["L", "W", "W", "L", "W"],
    stats: { matches: 148, wins: 82, losses: 56, draws: 10 },
  },
  {
    id: 4,
    name: "South Africa",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 4, odi: 3, t20: 4 },
    captain: "Aiden Markram",
    coach: "Rob Walter",
    recentForm: ["W", "W", "L", "W", "W"],
    stats: { matches: 135, wins: 78, losses: 49, draws: 8 },
  },
  {
    id: 5,
    name: "Pakistan",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 8, odi: 7, t20: 7 },
    captain: "Shan Masood",
    coach: "Jason Gillespie",
    recentForm: ["L", "L", "W", "L", "W"],
    stats: { matches: 142, wins: 71, losses: 62, draws: 9 },
  },
  {
    id: 6,
    name: "New Zealand",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 5, odi: 6, t20: 6 },
    captain: "Tom Latham",
    coach: "Gary Stead",
    recentForm: ["W", "L", "L", "W", "L"],
    stats: { matches: 125, wins: 62, losses: 55, draws: 8 },
  },
  {
    id: 7,
    name: "Sri Lanka",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 6, odi: 8, t20: 8 },
    captain: "Dhananjaya de Silva",
    coach: "Sanath Jayasuriya",
    recentForm: ["W", "W", "L", "W", "L"],
    stats: { matches: 118, wins: 58, losses: 52, draws: 8 },
  },
  {
    id: 8,
    name: "West Indies",
    flag: "/placeholder.svg?height=60&width=90",
    ranking: { test: 9, odi: 9, t20: 5 },
    captain: "Kraigg Brathwaite",
    coach: "Daren Sammy",
    recentForm: ["L", "W", "L", "W", "W"],
    stats: { matches: 112, wins: 48, losses: 56, draws: 8 },
  },
]

const domesticLeagues = [
  {
    id: 1,
    name: "Indian Premier League",
    shortName: "IPL",
    country: "India",
    logo: "/placeholder.svg?height=60&width=60",
    teams: 10,
    currentChampion: "Kolkata Knight Riders",
    season: "2024",
    format: "T20",
    nextSeason: "March 2025",
  },
  {
    id: 2,
    name: "Big Bash League",
    shortName: "BBL",
    country: "Australia",
    logo: "/placeholder.svg?height=60&width=60",
    teams: 8,
    currentChampion: "Brisbane Heat",
    season: "2024-25",
    format: "T20",
    nextSeason: "December 2024",
  },
  {
    id: 3,
    name: "Pakistan Super League",
    shortName: "PSL",
    country: "Pakistan",
    logo: "/placeholder.svg?height=60&width=60",
    teams: 6,
    currentChampion: "Islamabad United",
    season: "2024",
    format: "T20",
    nextSeason: "February 2025",
  },
  {
    id: 4,
    name: "The Hundred",
    shortName: "The Hundred",
    country: "England",
    logo: "/placeholder.svg?height=60&width=60",
    teams: 8,
    currentChampion: "Southern Brave",
    season: "2024",
    format: "100-ball",
    nextSeason: "July 2025",
  },
  {
    id: 5,
    name: "Caribbean Premier League",
    shortName: "CPL",
    country: "West Indies",
    logo: "/placeholder.svg?height=60&width=60",
    teams: 6,
    currentChampion: "Guyana Amazon Warriors",
    season: "2024",
    format: "T20",
    nextSeason: "August 2025",
  },
  {
    id: 6,
    name: "SA20",
    shortName: "SA20",
    country: "South Africa",
    logo: "/placeholder.svg?height=60&width=60",
    teams: 6,
    currentChampion: "Sunrisers Eastern Cape",
    season: "2024",
    format: "T20",
    nextSeason: "January 2025",
  },
]

function TeamCard({ team }: { team: (typeof internationalTeams)[0] }) {
  const getFormColor = (result: string) => {
    return result === "W" ? "bg-green-500" : result === "L" ? "bg-red-500" : "bg-gray-500"
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <Image src={team.flag || "/placeholder.svg"} alt={team.name} width={60} height={40} className="rounded" />
          <div className="flex-1">
            <CardTitle className="text-xl">{team.name}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="outline">Test: #{team.ranking.test}</Badge>
              <Badge variant="outline">ODI: #{team.ranking.odi}</Badge>
              <Badge variant="outline">T20: #{team.ranking.t20}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Captain</p>
            <p className="font-medium">{team.captain}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Coach</p>
            <p className="font-medium">{team.coach}</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Recent Form</p>
          <div className="flex space-x-1">
            {team.recentForm.map((result, index) => (
              <div
                key={index}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${getFormColor(result)}`}
              >
                {result}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm bg-gray-50 p-3 rounded-lg">
          <div>
            <p className="font-bold text-green-600">{team.stats.wins}</p>
            <p className="text-muted-foreground">Wins</p>
          </div>
          <div>
            <p className="font-bold text-red-600">{team.stats.losses}</p>
            <p className="text-muted-foreground">Losses</p>
          </div>
          <div>
            <p className="font-bold text-gray-600">{team.stats.draws}</p>
            <p className="text-muted-foreground">Draws</p>
          </div>
        </div>

        <Link href={`/teams/${team.id}`}>
          <Button className="w-full">View Team Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

function LeagueCard({ league }: { league: (typeof domesticLeagues)[0] }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Image src={league.logo || "/placeholder.svg"} alt={league.name} width={60} height={60} className="rounded" />
          <div className="flex-1">
            <h3 className="text-xl font-bold">{league.name}</h3>
            <p className="text-muted-foreground">{league.country}</p>
          </div>
          <Badge>{league.format}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Teams</p>
            <p className="font-medium">{league.teams}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Season</p>
            <p className="font-medium">{league.season}</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-3 rounded-lg mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium">Current Champion</span>
          </div>
          <p className="font-bold text-yellow-800">{league.currentChampion}</p>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg mb-4">
          <p className="text-sm text-blue-700">
            <strong>Next Season:</strong> {league.nextSeason}
          </p>
        </div>

        <Link href={`/leagues/${league.id}`}>
          <Button className="w-full">View League Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cricket Teams</h1>
          <p className="text-muted-foreground">
            Explore international teams and domestic leagues from around the world (Updated January 2025)
          </p>
        </div>

        <Tabs defaultValue="international" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="international" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>International</span>
            </TabsTrigger>
            <TabsTrigger value="domestic" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Domestic Leagues</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="international" className="space-y-6">
            {/* Rankings Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Current ICC Rankings (January 2025)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <h3 className="font-semibold mb-3">Test Rankings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </span>
                          <span>India</span>
                        </span>
                        <span className="text-sm text-muted-foreground">128 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </span>
                          <span>Australia</span>
                        </span>
                        <span className="text-sm text-muted-foreground">116 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </span>
                          <span>England</span>
                        </span>
                        <span className="text-sm text-muted-foreground">109 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-3">ODI Rankings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </span>
                          <span>India</span>
                        </span>
                        <span className="text-sm text-muted-foreground">117 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </span>
                          <span>Australia</span>
                        </span>
                        <span className="text-sm text-muted-foreground">113 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </span>
                          <span>South Africa</span>
                        </span>
                        <span className="text-sm text-muted-foreground">111 pts</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold mb-3">T20I Rankings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </span>
                          <span>India</span>
                        </span>
                        <span className="text-sm text-muted-foreground">267 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </span>
                          <span>Australia</span>
                        </span>
                        <span className="text-sm text-muted-foreground">263 pts</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-orange-50 rounded">
                        <span className="flex items-center space-x-2">
                          <span className="w-6 h-6 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </span>
                          <span>England</span>
                        </span>
                        <span className="text-sm text-muted-foreground">252 pts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* International Teams Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {internationalTeams.map((team) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="domestic" className="space-y-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">T20 Franchise Leagues</h2>
              <p className="text-muted-foreground">The world's premier T20 cricket competitions</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {domesticLeagues.map((league) => (
                <LeagueCard key={league.id} league={league} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
