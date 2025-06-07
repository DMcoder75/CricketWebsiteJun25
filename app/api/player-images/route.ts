import { NextResponse } from "next/server"

// This API simulates fetching player images from a cricket database
// In a real application, this would connect to an actual cricket API or database

// Map of player IDs to image URLs (simulating an API response)
const playerImageMap: Record<number, string> = {
  // India
  1: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316605.png", // Virat Kohli
  2: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316584.png", // Rohit Sharma
  3: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/319900/319937.png", // Jasprit Bumrah
  4: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/325700/325768.png", // Suryakumar Yadav
  5: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/309100/309198.png", // KL Rahul

  // Australia
  21: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/325800/325848.png", // Pat Cummins
  22: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316534.png", // Steve Smith
  23: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/323100/323136.png", // Travis Head

  // England
  41: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316540.png", // Ben Stokes
  42: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316486.png", // Jos Buttler
  43: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316592.png", // Joe Root

  // Pakistan
  61: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316661.png", // Babar Azam
  62: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/323100/323159.png", // Shaheen Afridi

  // South Africa
  76: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316642.png", // Kagiso Rabada
  77: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316564.png", // Quinton de Kock

  // New Zealand
  86: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316699.png", // Kane Williamson
  87: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316500/316569.png", // Trent Boult

  // Afghanistan
  96: "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/316600/316627.png", // Rashid Khan
}

// Default fallback image for players without a specific image
const defaultPlayerImage = "https://img1.hscicdn.com/image/upload/f_auto,t_h_100/lsci/db/PICTURES/CMS/312200/312279.png"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const playerId = searchParams.get("id")

  try {
    // If a specific player ID is requested
    if (playerId) {
      const id = Number.parseInt(playerId)
      const imageUrl = playerImageMap[id] || defaultPlayerImage

      return NextResponse.json({
        success: true,
        data: {
          id,
          imageUrl,
        },
      })
    }

    // If all player images are requested
    const allPlayerImages = Object.entries(playerImageMap).map(([id, imageUrl]) => ({
      id: Number.parseInt(id),
      imageUrl,
    }))

    return NextResponse.json({
      success: true,
      data: allPlayerImages,
    })
  } catch (error) {
    console.error("Error fetching player images:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch player images",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
