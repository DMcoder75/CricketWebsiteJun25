"use client"

import { useState, useEffect } from "react"

interface PlayerImage {
  id: number
  imageUrl: string
}

export function usePlayerImages() {
  const [playerImages, setPlayerImages] = useState<Record<number, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPlayerImages() {
      try {
        setLoading(true)
        const response = await fetch("/api/player-images")
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || "Failed to fetch player images")
        }

        if (!result.success) {
          throw new Error(result.error || "API returned unsuccessful status")
        }

        // Convert array of player images to a map for easy lookup
        const imageMap: Record<number, string> = {}
        result.data.forEach((item: PlayerImage) => {
          imageMap[item.id] = item.imageUrl
        })

        setPlayerImages(imageMap)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"
        setError(errorMessage)
        console.error("Error fetching player images:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayerImages()
  }, [])

  return {
    playerImages,
    loading,
    error,
    getPlayerImage: (playerId: number, fallback = "/placeholder.svg?height=120&width=120") => {
      return playerImages[playerId] || fallback
    },
  }
}
