"use client"

import { useState, useEffect } from "react"

interface UseCricketDataOptions {
  refreshInterval?: number
  autoRefresh?: boolean
}

export function useCricketData(type: string, options: UseCricketDataOptions = {}) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const { refreshInterval = 30000, autoRefresh = true } = options

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      console.log(`Fetching cricket data: ${type}`)
      const response = await fetch(`/api/cricket-data?type=${type}`)
      const result = await response.json()

      console.log(`API response for ${type}:`, result)

      if (!response.ok) {
        throw new Error(result.error || `Failed to fetch ${type}`)
      }

      if (!result.success) {
        throw new Error(result.error || `API returned unsuccessful status for ${type}`)
      }

      setData(result.data || [])
      setLastUpdated(new Date())

      console.log(`Successfully loaded ${result.data?.length || 0} items for ${type}`)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      console.error(`Error fetching cricket data (${type}):`, err)

      // Set empty array to show "no data" state
      setData([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()

    if (autoRefresh && refreshInterval > 0) {
      const interval = setInterval(fetchData, refreshInterval)
      return () => clearInterval(interval)
    }
  }, [type, refreshInterval, autoRefresh])

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch: fetchData,
  }
}

export function useLiveScore(matchId: number | null) {
  const [score, setScore] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchLiveScore = async () => {
    if (!matchId) return

    try {
      setLoading(true)
      setError(null)

      console.log(`Fetching live score for match: ${matchId}`)
      const response = await fetch(`/api/cricket-data?type=live-score&matchId=${matchId}`)
      const result = await response.json()

      console.log(`Live score response:`, result)

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch live score")
      }

      if (!result.success) {
        throw new Error(result.error || "API returned unsuccessful status")
      }

      setScore(result.data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      setError(errorMessage)
      console.error("Error fetching live score:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (matchId) {
      fetchLiveScore()

      // Refresh live scores every 10 seconds for real-time updates
      const interval = setInterval(fetchLiveScore, 10000)
      return () => clearInterval(interval)
    }
  }, [matchId])

  return {
    score,
    loading,
    error,
    refetch: fetchLiveScore,
  }
}
