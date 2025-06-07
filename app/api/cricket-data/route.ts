import { NextResponse } from "next/server"
import { fetchCurrentMatches, fetchAllMatches, transformMatchData, ENHANCED_DEMO_MATCHES } from "@/lib/cricket-api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  console.log(`🔄 API Request: ${type} (using CricAPI.com)`)

  try {
    switch (type) {
      case "live-matches":
        try {
          console.log("🔄 Fetching REAL live matches from CricAPI.com...")

          // Get all current matches from CricAPI.com API
          const allCurrentMatches = await fetchCurrentMatches()

          if (!allCurrentMatches || allCurrentMatches.length === 0) {
            console.log("ℹ️ No current matches from CricAPI.com API, using demo data")
            const liveDemo = ENHANCED_DEMO_MATCHES.filter((match) => match.isLive)
            return NextResponse.json({
              data: liveDemo,
              success: true,
              source: "demo",
              message: "No matches currently available from CricAPI.com, using demo data",
              timestamp: new Date().toISOString(),
            })
          }

          // Filter for ACTUALLY live matches only
          const actuallyLiveMatches = allCurrentMatches.filter((match) => {
            const isLive = match.matchStarted === true && match.matchEnded === false
            console.log(
              `📊 Match ${match.name}: Started=${match.matchStarted}, Ended=${match.matchEnded}, IsLive=${isLive}`,
            )
            return isLive
          })

          console.log(
            `🎯 Found ${actuallyLiveMatches.length} ACTUALLY LIVE matches out of ${allCurrentMatches.length} total from CricAPI.com`,
          )

          // Transform only the live matches
          const transformedLiveMatches = actuallyLiveMatches.map(transformMatchData).filter((match) => match !== null)

          // If no live matches found, use demo data
          if (transformedLiveMatches.length === 0) {
            console.log("ℹ️ No live matches found from CricAPI.com, using demo data")
            const liveDemo = ENHANCED_DEMO_MATCHES.filter((match) => match.isLive)
            return NextResponse.json({
              data: liveDemo,
              success: true,
              source: "demo",
              message: "No live matches found from CricAPI.com, using demo data",
              timestamp: new Date().toISOString(),
            })
          }

          return NextResponse.json({
            data: transformedLiveMatches,
            success: true,
            source: "cricapi.com",
            totalMatches: allCurrentMatches.length,
            liveMatches: transformedLiveMatches.length,
            timestamp: new Date().toISOString(),
          })
        } catch (error) {
          console.error("❌ Live matches API failed:", error)
          const liveDemo = ENHANCED_DEMO_MATCHES.filter((match) => match.isLive)

          // Check if it's an API key issue
          const isApiKeyIssue = error instanceof Error && error.message.includes("No valid API key")

          return NextResponse.json({
            data: liveDemo,
            success: true,
            source: "demo",
            error: isApiKeyIssue
              ? "CricAPI.com API key not configured. Using demo data."
              : "Failed to fetch live matches from CricAPI.com, using demo data",
            details: error instanceof Error ? error.message : "Unknown error",
            apiKeyRequired: isApiKeyIssue,
            timestamp: new Date().toISOString(),
          })
        }

      case "fixtures":
        try {
          console.log("🔄 Fetching all matches (upcoming and recent) from CricAPI.com...")

          // Try to get all matches first, fallback to current matches
          let allMatches
          try {
            allMatches = await fetchAllMatches()
          } catch (error) {
            console.log("ℹ️ All matches endpoint failed, trying current matches...")
            allMatches = await fetchCurrentMatches()
          }

          if (!allMatches || allMatches.length === 0) {
            console.log("ℹ️ No matches from CricAPI.com API, using demo data")
            return NextResponse.json({
              data: ENHANCED_DEMO_MATCHES,
              success: true,
              source: "demo",
              message: "No matches available from CricAPI.com, using demo data",
              timestamp: new Date().toISOString(),
            })
          }

          // Transform all matches (upcoming, recent, completed)
          const transformedMatches = allMatches.map(transformMatchData).filter((match) => match !== null)

          console.log(`✅ Transformed ${transformedMatches.length} matches from CricAPI.com`)

          return NextResponse.json({
            data: transformedMatches,
            success: true,
            source: "cricapi.com",
            count: transformedMatches.length,
            timestamp: new Date().toISOString(),
          })
        } catch (error) {
          console.error("❌ Fixtures API failed:", error)

          // Check if it's an API key issue
          const isApiKeyIssue = error instanceof Error && error.message.includes("No valid API key")

          return NextResponse.json({
            data: ENHANCED_DEMO_MATCHES,
            success: true,
            source: "demo",
            error: isApiKeyIssue
              ? "CricAPI.com API key not configured. Using demo data."
              : "Failed to fetch fixtures from CricAPI.com, using demo data",
            details: error instanceof Error ? error.message : "Unknown error",
            apiKeyRequired: isApiKeyIssue,
            timestamp: new Date().toISOString(),
          })
        }

      default:
        return NextResponse.json(
          {
            error: "Invalid type parameter. Use: live-matches, fixtures",
          },
          { status: 400 },
        )
    }
  } catch (error) {
    console.error("❌ CricAPI.com API Error:", error)

    // Check if it's an API key issue
    const isApiKeyIssue = error instanceof Error && error.message.includes("No valid API key")

    return NextResponse.json(
      {
        data: ENHANCED_DEMO_MATCHES,
        success: true,
        source: "demo",
        error: isApiKeyIssue
          ? "CricAPI.com API key not configured. Using demo data."
          : "CricAPI.com API service unavailable, using demo data",
        details: error instanceof Error ? error.message : "Unknown error",
        apiKeyRequired: isApiKeyIssue,
        timestamp: new Date().toISOString(),
      },
      { status: 200 },
    )
  }
}

// Enable CORS for client-side requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
