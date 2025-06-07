"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Trophy, TrendingUp, Target, Loader2, ImageOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const getPlayerById = (id: string) => {
  const players = [
    {
      id: 1,
      name: "Virat Kohli",
      country: "India",
      image: "/placeholder.svg?height=200&width=200",
      role: "Batsman",
      ranking: { test: 8, odi: 2, t20: 15 },
      stats: {
        test: { matches: 111, runs: 8848, average: 49.15, centuries: 29, fifties: 30 },
        odi: { matches: 274, runs: 12898, average: 57.32, centuries: 46, fifties: 65 },
        t20i: { matches: 115, runs: 4008, average: 52.73, centuries: 1, fifties: 37 },
      },
      recentForm: "Excellent",
      speciality: "Chase Master",
      age: 35,
      debut: "2008",
      birthPlace: "Delhi, India",
      fullName: "Virat Kohli",
      battingStyle: "Right-hand bat",
      bowlingStyle: "Right-arm medium",
      recentMatches: [
        { opponent: "Australia", runs: 89, format: "ODI", result: "Won" },
        { opponent: "England", runs: 45, format: "Test", result: "Lost" },
        { opponent: "Pakistan", runs: 122, format: "ODI", result: "Won" },
      ],
      achievements: [
        "ICC ODI Player of the Decade (2011-2020)",
        "Fastest to 8000, 9000, 10000, 11000, 12000 ODI runs",
        "Most centuries in ODI chases",
        "Wisden Leading Cricketer in the World (2016, 2017, 2018)",
      ],
      careerHighlights: [
        { year: "2008", event: "International debut vs Sri Lanka" },
        { year: "2012", event: "First Test century vs Australia" },
        { year: "2016", event: "Became Test captain" },
        { year: "2023", event: "Surpassed Sachin's ODI century record" },
      ],
    },
    // Add more players as needed
  ]

  return players.find((p) => p.id === Number.parseInt(id))
}

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  const player = getPlayerById(params.id)
  const [playerImage, setPlayerImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  // Fetch player image from API
  useEffect(() => {
    async function fetchPlayerImage() {
      if (!player) return

      try {
        setImageLoading(true)
        const response = await fetch(`/api/player-images?id=${player.id}`)
        const result = await response.json()

        if (response.ok && result.success) {
          setPlayerImage(result.data.imageUrl)
        } else {
          setPlayerImage(player.image) // Fallback to default
        }
      } catch (error) {
        console.error("Error fetching player image:", error)
        setPlayerImage(player.image) // Fallback to default
      } finally {
        setImageLoading(false)
      }
    }

    fetchPlayerImage()
  }, [player])

  if (!player) {
    notFound()
  }

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "batsman":
        return "bg-blue-100 text-blue-800"
      case "bowler":
        return "bg-red-100 text-red-800"
      case "all-rounder":
        return "bg-green-100 text-green-800"
      case "wicket-keeper":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/players">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Players</span>
            </Button>
          </Link>
        </div>

        {/* Player Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative w-48 h-48 mx-auto md:mx-0">
                {imageLoading ? (
                  <div className="w-48 h-48 rounded-lg bg-gray-200 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : imageError ? (
                  <div className="w-48 h-48 rounded-lg bg-gray-200 flex items-center justify-center">
                    <ImageOff className="w-12 h-12 text-gray-400" />
                  </div>
                ) : (
                  <Image
                    src={playerImage || player.image}
                    alt={player.name}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover w-full h-full"
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
                <p className="text-xl text-muted-foreground mb-4">{player.country}</p>

                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  <Badge className={getRoleColor(player.role)}>{player.role}</Badge>
                  <Badge variant="outline">{player.speciality}</Badge>
                  <Badge variant="secondary">Age {player.age}</Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="font-bold text-yellow-600 text-lg">#{player.ranking.test}</p>
                    <p className="text-sm text-muted-foreground">Test Ranking</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-bold text-blue-600 text-lg">#{player.ranking.odi}</p>
                    <p className="text-sm text-muted-foreground">ODI Ranking</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-bold text-green-600 text-lg">#{player.ranking.t20}</p>
                    <p className="text-sm text-muted-foreground">T20I Ranking</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-bold text-purple-600 text-lg">{player.recentForm}</p>
                    <p className="text-sm text-muted-foreground">Current Form</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Career Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Career Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Test Stats */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-red-600">Test Cricket</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.test.matches}</p>
                        <p className="text-sm text-muted-foreground">Matches</p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.test.runs}</p>
                        <p className="text-sm text-muted-foreground">Runs</p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.test.average}</p>
                        <p className="text-sm text-muted-foreground">Average</p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.test.centuries}</p>
                        <p className="text-sm text-muted-foreground">Centuries</p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.test.fifties}</p>
                        <p className="text-sm text-muted-foreground">Fifties</p>
                      </div>
                    </div>
                  </div>

                  {/* ODI Stats */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-blue-600">ODI Cricket</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.odi.matches}</p>
                        <p className="text-sm text-muted-foreground">Matches</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.odi.runs}</p>
                        <p className="text-sm text-muted-foreground">Runs</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.odi.average}</p>
                        <p className="text-sm text-muted-foreground">Average</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.odi.centuries}</p>
                        <p className="text-sm text-muted-foreground">Centuries</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.odi.fifties}</p>
                        <p className="text-sm text-muted-foreground">Fifties</p>
                      </div>
                    </div>
                  </div>

                  {/* T20I Stats */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3 text-green-600">T20I Cricket</h3>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.t20i.matches}</p>
                        <p className="text-sm text-muted-foreground">Matches</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.t20i.runs}</p>
                        <p className="text-sm text-muted-foreground">Runs</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.t20i.average}</p>
                        <p className="text-sm text-muted-foreground">Average</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.t20i.centuries}</p>
                        <p className="text-sm text-muted-foreground">Centuries</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="font-bold text-lg">{player.stats.t20i.fifties}</p>
                        <p className="text-sm text-muted-foreground">Fifties</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Matches */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Recent Performances</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.recentMatches.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="text-center">
                          <p className="font-bold text-lg">{match.runs}</p>
                          <p className="text-xs text-muted-foreground">runs</p>
                        </div>
                        <div>
                          <p className="font-medium">vs {match.opponent}</p>
                          <p className="text-sm text-muted-foreground">{match.format}</p>
                        </div>
                      </div>
                      <Badge variant={match.result === "Won" ? "default" : "secondary"}>{match.result}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Player Info */}
            <Card>
              <CardHeader>
                <CardTitle>Player Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Debut: {player.debut}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{player.birthPlace}</span>
                </div>
                <div className="text-sm">
                  <p>
                    <strong>Full Name:</strong> {player.fullName}
                  </p>
                  <p>
                    <strong>Batting:</strong> {player.battingStyle}
                  </p>
                  <p>
                    <strong>Bowling:</strong> {player.bowlingStyle}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5" />
                  <span>Major Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {player.achievements.map((achievement, index) => (
                    <li key={index} className="text-sm flex items-start space-x-2">
                      <Trophy className="w-3 h-3 text-yellow-600 mt-1 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Career Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Career Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {player.careerHighlights.map((highlight, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        {highlight.year}
                      </div>
                      <p className="text-sm">{highlight.event}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
