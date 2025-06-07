import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, Trophy, Users, Target, Clock } from "lucide-react"

const teamStats = [
  { team: "Australia", matches: 156, wins: 98, losses: 48, winRate: 62.8 },
  { team: "India", matches: 145, wins: 89, losses: 45, winRate: 61.4 },
  { team: "England", matches: 142, wins: 78, losses: 54, winRate: 54.9 },
  { team: "South Africa", matches: 128, wins: 71, losses: 49, winRate: 55.5 },
  { team: "Pakistan", matches: 134, wins: 67, losses: 58, winRate: 50.0 },
]

const playerRecords = [
  { category: "Most Runs (Test)", player: "Sachin Tendulkar", value: "15,921", country: "India" },
  { category: "Most Runs (ODI)", player: "Sachin Tendulkar", value: "18,426", country: "India" },
  { category: "Most Runs (T20I)", player: "Virat Kohli", value: "4,008", country: "India" },
  { category: "Most Wickets (Test)", player: "Muttiah Muralitharan", value: "800", country: "Sri Lanka" },
  { category: "Most Wickets (ODI)", player: "Muttiah Muralitharan", value: "534", country: "Sri Lanka" },
  { category: "Most Wickets (T20I)", player: "Shakib Al Hasan", value: "136", country: "Bangladesh" },
]

const recentPerformances = [
  { player: "Virat Kohli", performance: "89* vs Australia", format: "ODI", impact: "Match Winning" },
  { player: "Pat Cummins", performance: "5/42 vs India", format: "Test", impact: "Series Defining" },
  { player: "Jos Buttler", performance: "78* vs Pakistan", format: "T20I", impact: "Tournament Best" },
  { player: "Babar Azam", performance: "114 vs England", format: "ODI", impact: "Captain's Knock" },
]

export default function StatisticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cricket Statistics</h1>
          <p className="text-muted-foreground">Comprehensive cricket statistics, records, and performance analytics</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Records</span>
            </TabsTrigger>
            <TabsTrigger value="teams" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Teams</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Performance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-2xl font-bold mb-2">12</h3>
                  <p className="text-muted-foreground">Test Playing Nations</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-2xl font-bold mb-2">3</h3>
                  <p className="text-muted-foreground">World Cup Winners</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2">2,500+</h3>
                  <p className="text-muted-foreground">International Matches</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-2xl font-bold mb-2">147</h3>
                  <p className="text-muted-foreground">Years of Cricket</p>
                </CardContent>
              </Card>
            </div>

            {/* Format Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Cricket Formats Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2 text-red-600">Test Cricket</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Duration:</strong> 5 days
                      </p>
                      <p>
                        <strong>Overs:</strong> Unlimited
                      </p>
                      <p>
                        <strong>Players:</strong> 11 per side
                      </p>
                      <p>
                        <strong>Innings:</strong> 2 per team
                      </p>
                    </div>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2 text-blue-600">ODI Cricket</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Duration:</strong> 1 day
                      </p>
                      <p>
                        <strong>Overs:</strong> 50 per team
                      </p>
                      <p>
                        <strong>Players:</strong> 11 per side
                      </p>
                      <p>
                        <strong>Innings:</strong> 1 per team
                      </p>
                    </div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-xl font-bold mb-2 text-green-600">T20 Cricket</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Duration:</strong> 3 hours
                      </p>
                      <p>
                        <strong>Overs:</strong> 20 per team
                      </p>
                      <p>
                        <strong>Players:</strong> 11 per side
                      </p>
                      <p>
                        <strong>Innings:</strong> 1 per team
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>All-Time Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {playerRecords.map((record, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{record.category}</Badge>
                        <span className="text-sm text-muted-foreground">{record.country}</span>
                      </div>
                      <h3 className="font-bold text-lg">{record.player}</h3>
                      <p className="text-2xl font-bold text-yellow-600">{record.value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Team Performance Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Team</th>
                        <th className="text-center p-3">Matches</th>
                        <th className="text-center p-3">Wins</th>
                        <th className="text-center p-3">Losses</th>
                        <th className="text-center p-3">Win Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teamStats.map((team, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{team.team}</td>
                          <td className="p-3 text-center">{team.matches}</td>
                          <td className="p-3 text-center text-green-600 font-medium">{team.wins}</td>
                          <td className="p-3 text-center text-red-600 font-medium">{team.losses}</td>
                          <td className="p-3 text-center">
                            <Badge
                              variant={team.winRate > 60 ? "default" : team.winRate > 50 ? "secondary" : "outline"}
                            >
                              {team.winRate}%
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent Outstanding Performances</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {recentPerformances.map((perf, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold">{perf.player}</h3>
                        <Badge>{perf.format}</Badge>
                      </div>
                      <p className="text-lg font-semibold text-blue-600 mb-1">{perf.performance}</p>
                      <p className="text-sm text-muted-foreground">{perf.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <h3 className="font-bold text-green-600">Batting Average</h3>
                    <p className="text-2xl font-bold">↑ 12%</p>
                    <p className="text-sm text-muted-foreground">vs last season</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-bold text-blue-600">Strike Rate</h3>
                    <p className="text-2xl font-bold">↑ 8%</p>
                    <p className="text-sm text-muted-foreground">vs last season</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <h3 className="font-bold text-purple-600">Economy Rate</h3>
                    <p className="text-2xl font-bold">↓ 5%</p>
                    <p className="text-sm text-muted-foreground">vs last season</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
