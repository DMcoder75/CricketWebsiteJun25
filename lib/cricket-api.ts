// CricAPI.com API integration (WORKING VERSION)
const CRICKET_API_KEY = process.env.CRICKET_API_KEY || "1f2ad458-2220-4a94-888b-59b78221920b"
const BASE_URL = "https://api.cricapi.com/v1"

// Check if API key is properly configured
const isApiKeyConfigured = () => {
  return (
    CRICKET_API_KEY &&
    CRICKET_API_KEY !== "your-api-key-here" &&
    CRICKET_API_KEY !== "your_cricapi_key_here" &&
    CRICKET_API_KEY.length > 10
  )
}

const fetchOptions = {
  redirect: "follow" as RequestRedirect,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
}

export interface CricketMatch {
  id: string
  name: string
  matchType: string
  status: string
  venue: string
  date: string
  dateTimeGMT: string
  teams: string[]
  teamInfo: Array<{
    name: string
    shortname: string
    img: string
  }>
  score: Array<{
    r: number
    w: number
    o: number
    inning: string
  }>
  series_id: string
  matchStarted: boolean
  matchEnded: boolean
}

// Fetch current/live matches from CricAPI.com
export async function fetchCurrentMatches(): Promise<CricketMatch[]> {
  // Check if API key is configured
  if (!isApiKeyConfigured()) {
    console.log("⚠️ No valid CricAPI.com API key configured. Using demo data.")
    throw new Error("No valid API key configured. Using demo data.")
  }

  try {
    console.log("🔄 Fetching current matches from CricAPI.com...")
    const response = await fetch(`${BASE_URL}/currentMatches?apikey=${CRICKET_API_KEY}&offset=0`, fetchOptions)

    if (!response.ok) {
      console.error(`❌ API Error: ${response.status} ${response.statusText}`)
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    console.log("📊 Raw API Response from CricAPI.com:", JSON.stringify(data, null, 2))

    if (!data || data.status !== "success") {
      console.error("❌ API returned unsuccessful status:", data)
      throw new Error(`API Error: ${data?.status || "Unknown"}`)
    }

    if (!data.data || !Array.isArray(data.data)) {
      console.log("ℹ️ No current matches available from CricAPI.com")
      return []
    }

    console.log(`✅ Successfully fetched ${data.data.length} real matches from CricAPI.com`)
    return data.data
  } catch (error) {
    console.error("❌ Failed to fetch current matches from CricAPI.com:", error)
    throw error
  }
}

// Fetch match info by ID
export async function fetchMatchInfo(matchId: string): Promise<any> {
  if (!isApiKeyConfigured()) {
    throw new Error("No valid API key configured")
  }

  try {
    console.log(`🔄 Fetching match info for ${matchId} from CricAPI.com...`)
    const response = await fetch(`${BASE_URL}/match_info?apikey=${CRICKET_API_KEY}&id=${matchId}`, fetchOptions)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    console.log("📊 Match info response:", data)

    if (!data || data.status !== "success") {
      throw new Error(`API Error: ${data?.status || "Unknown"}`)
    }

    return data.data
  } catch (error) {
    console.error("❌ Failed to fetch match info:", error)
    throw error
  }
}

// Fetch all matches list
export async function fetchAllMatches(): Promise<CricketMatch[]> {
  if (!isApiKeyConfigured()) {
    throw new Error("No valid API key configured")
  }

  try {
    console.log("🔄 Fetching all matches from CricAPI.com...")
    const response = await fetch(`${BASE_URL}/matches?apikey=${CRICKET_API_KEY}&offset=0`, fetchOptions)

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    console.log("📊 All matches response:", data)

    if (!data || data.status !== "success") {
      throw new Error(`API Error: ${data?.status || "Unknown"}`)
    }

    return data.data || []
  } catch (error) {
    console.error("❌ Failed to fetch all matches:", error)
    throw error
  }
}

// Transform API data from CricAPI.com format
export function transformMatchData(apiMatch: any) {
  if (!apiMatch) {
    console.error("❌ No match data to transform")
    return null
  }

  console.log("🔄 Transforming match data from CricAPI.com:", apiMatch.name || apiMatch.id)

  // Get team information
  const team1Info = apiMatch.teamInfo?.[0] || { name: apiMatch.teams?.[0] || "TBD", shortname: "TBD", img: "" }
  const team2Info = apiMatch.teamInfo?.[1] || { name: apiMatch.teams?.[1] || "TBD", shortname: "TBD", img: "" }

  // Extract scores
  let team1Score = null
  let team2Score = null

  if (apiMatch.score && Array.isArray(apiMatch.score) && apiMatch.score.length > 0) {
    // Find the latest innings for each team
    team1Score = apiMatch.score.find(
      (s: any) =>
        s.inning &&
        (s.inning.toLowerCase().includes(team1Info.name?.toLowerCase()) ||
          s.inning.toLowerCase().includes(team1Info.shortname?.toLowerCase())),
    )

    team2Score = apiMatch.score.find(
      (s: any) =>
        s.inning &&
        (s.inning.toLowerCase().includes(team2Info.name?.toLowerCase()) ||
          s.inning.toLowerCase().includes(team2Info.shortname?.toLowerCase())),
    )
  }

  // Determine if match is actually live
  const isLive = apiMatch.matchStarted === true && apiMatch.matchEnded === false
  const isCompleted = apiMatch.matchEnded === true
  const isUpcoming = !apiMatch.matchStarted && !apiMatch.matchEnded

  let status = "Scheduled"
  if (isLive) {
    status = "Live"
  } else if (isCompleted) {
    status = apiMatch.status || "Completed"
  } else if (isUpcoming) {
    status = "Upcoming"
  }

  const transformedMatch = {
    id: apiMatch.id,
    team1: {
      name: team1Info.shortname || team1Info.name || "TBD",
      flag: team1Info.img || "/placeholder.svg?height=24&width=36",
      score: team1Score ? `${team1Score.r || 0}/${team1Score.w || 0}` : null,
      overs: team1Score ? (team1Score.o || 0).toString() : null,
      runRate: team1Score && team1Score.o > 0 ? (team1Score.r / team1Score.o).toFixed(2) : null,
    },
    team2: {
      name: team2Info.shortname || team2Info.name || "TBD",
      flag: team2Info.img || "/placeholder.svg?height=24&width=36",
      score: team2Score ? `${team2Score.r || 0}/${team2Score.w || 0}` : null,
      overs: team2Score ? (team2Score.o || 0).toString() : null,
      runRate: team2Score && team2Score.o > 0 ? (team2Score.r / team2Score.o).toFixed(2) : null,
    },
    status: status,
    format: apiMatch.matchType || "Unknown",
    venue: apiMatch.venue || "TBD",
    series: apiMatch.series || "",
    matchNumber: apiMatch.name || "",
    result: isCompleted ? apiMatch.status : null,
    date_start: apiMatch.dateTimeGMT || apiMatch.date || new Date().toISOString(),
    isLive: isLive,
    isCompleted: isCompleted,
    isUpcoming: isUpcoming,
    matchStarted: apiMatch.matchStarted || false,
    matchEnded: apiMatch.matchEnded || false,
  }

  console.log("✅ Transformed match from CricAPI.com:", {
    id: transformedMatch.id,
    teams: `${transformedMatch.team1.name} vs ${transformedMatch.team2.name}`,
    status: transformedMatch.status,
    isLive: transformedMatch.isLive,
    hasScores: !!(team1Score || team2Score),
  })

  return transformedMatch
}

// Enhanced demo data for when API is not available
export const ENHANCED_DEMO_MATCHES = [
  {
    id: "demo-1",
    team1: {
      name: "IND",
      flag: "/placeholder.svg?height=24&width=36",
      score: "287/6",
      overs: "48.3",
      runRate: "5.92",
    },
    team2: {
      name: "AUS",
      flag: "/placeholder.svg?height=24&width=36",
      score: "245/8",
      overs: "45.2",
      runRate: "5.41",
    },
    status: "Live",
    format: "ODI",
    venue: "Melbourne Cricket Ground, Melbourne",
    series: "India tour of Australia 2024-25",
    matchNumber: "3rd ODI",
    result: null,
    date_start: new Date().toISOString(),
    isLive: true,
    isCompleted: false,
    isUpcoming: false,
    matchStarted: true,
    matchEnded: false,
  },
  {
    id: "demo-2",
    team1: {
      name: "ENG",
      flag: "/placeholder.svg?height=24&width=36",
      score: "178/4",
      overs: "17.5",
      runRate: "9.98",
    },
    team2: {
      name: "SA",
      flag: "/placeholder.svg?height=24&width=36",
      score: null,
      overs: null,
      runRate: null,
    },
    status: "Live",
    format: "T20I",
    venue: "Lord's Cricket Ground, London",
    series: "South Africa tour of England 2024",
    matchNumber: "2nd T20I",
    result: null,
    date_start: new Date().toISOString(),
    isLive: true,
    isCompleted: false,
    isUpcoming: false,
    matchStarted: true,
    matchEnded: false,
  },
  {
    id: "demo-3",
    team1: {
      name: "PAK",
      flag: "/placeholder.svg?height=24&width=36",
      score: "312/7",
      overs: "50.0",
      runRate: "6.24",
    },
    team2: {
      name: "NZ",
      flag: "/placeholder.svg?height=24&width=36",
      score: "298/9",
      overs: "50.0",
      runRate: "5.96",
    },
    status: "Completed",
    format: "ODI",
    venue: "Eden Park, Auckland",
    series: "Pakistan tour of New Zealand 2024",
    matchNumber: "1st ODI",
    result: "Pakistan won by 14 runs",
    date_start: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Yesterday
    isLive: false,
    isCompleted: true,
    isUpcoming: false,
    matchStarted: true,
    matchEnded: true,
  },
  {
    id: "demo-4",
    team1: {
      name: "WI",
      flag: "/placeholder.svg?height=24&width=36",
      score: null,
      overs: null,
      runRate: null,
    },
    team2: {
      name: "BAN",
      flag: "/placeholder.svg?height=24&width=36",
      score: null,
      overs: null,
      runRate: null,
    },
    status: "Upcoming",
    format: "Test",
    venue: "Kensington Oval, Barbados",
    series: "Bangladesh tour of West Indies 2024",
    matchNumber: "1st Test",
    result: null,
    date_start: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    isLive: false,
    isCompleted: false,
    isUpcoming: true,
    matchStarted: false,
    matchEnded: false,
  },
  {
    id: "demo-5",
    team1: {
      name: "SL",
      flag: "/placeholder.svg?height=24&width=36",
      score: null,
      overs: null,
      runRate: null,
    },
    team2: {
      name: "AFG",
      flag: "/placeholder.svg?height=24&width=36",
      score: null,
      overs: null,
      runRate: null,
    },
    status: "Upcoming",
    format: "T20I",
    venue: "R.Premadasa Stadium, Colombo",
    series: "Afghanistan tour of Sri Lanka 2024",
    matchNumber: "1st T20I",
    result: null,
    date_start: new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString(), // 3 days from now
    isLive: false,
    isCompleted: false,
    isUpcoming: true,
    matchStarted: false,
    matchEnded: false,
  },
]
