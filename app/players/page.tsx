"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, TrendingUp, Award, Users, Filter, Loader2, ImageOff } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePlayerImages } from "@/hooks/use-player-images"

// Comprehensive player database with 100+ players
const allPlayers = [
  // India (20 players)
  {
    id: 1,
    name: "Virat Kohli",
    country: "India",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 8, odi: 2, t20: 15 },
    stats: { matches: 254, runs: 12169, average: 57.32, centuries: 43, fifties: 64 },
    recentForm: "Excellent",
    speciality: "Chase Master",
    age: 35,
    debut: "2008",
  },
  {
    id: 2,
    name: "Rohit Sharma",
    country: "India",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 12, odi: 5, t20: 8 },
    stats: { matches: 243, runs: 9205, average: 46.23, centuries: 29, fifties: 43 },
    recentForm: "Good",
    speciality: "Opening Batsman",
    age: 37,
    debut: "2007",
  },
  {
    id: 3,
    name: "Jasprit Bumrah",
    country: "India",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 2, odi: 1, t20: 3 },
    stats: { matches: 120, wickets: 159, average: 20.06, economy: 4.63, bestFigures: "6/19" },
    recentForm: "Excellent",
    speciality: "Fast Bowler",
    age: 30,
    debut: "2016",
  },
  {
    id: 4,
    name: "Suryakumar Yadav",
    country: "India",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 45, odi: 18, t20: 1 },
    stats: { matches: 68, runs: 2340, average: 45.88, centuries: 4, fifties: 17 },
    recentForm: "Excellent",
    speciality: "360° Batsman",
    age: 34,
    debut: "2021",
  },
  {
    id: 5,
    name: "KL Rahul",
    country: "India",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 18, odi: 12, t20: 22 },
    stats: { matches: 156, runs: 4567, average: 42.34, centuries: 8, fifties: 28 },
    recentForm: "Good",
    speciality: "Versatile Keeper",
    age: 32,
    debut: "2014",
  },
  {
    id: 6,
    name: "Hardik Pandya",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 35, odi: 8, t20: 5 },
    stats: { matches: 134, runs: 2890, average: 34.56, centuries: 1, fifties: 18, wickets: 89 },
    recentForm: "Good",
    speciality: "Power Hitter",
    age: 30,
    debut: "2016",
  },
  {
    id: 7,
    name: "Ravindra Jadeja",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 3, odi: 15, t20: 25 },
    stats: { matches: 234, runs: 3456, average: 32.45, centuries: 2, fifties: 22, wickets: 267 },
    recentForm: "Excellent",
    speciality: "Spin All-rounder",
    age: 35,
    debut: "2009",
  },
  {
    id: 8,
    name: "Mohammed Shami",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 5, odi: 4, t20: 18 },
    stats: { matches: 178, wickets: 234, average: 26.78, economy: 4.89, bestFigures: "7/57" },
    recentForm: "Excellent",
    speciality: "Reverse Swing",
    age: 34,
    debut: "2013",
  },
  {
    id: 9,
    name: "Rishabh Pant",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Wicket-keeper",
    ranking: { test: 8, odi: 25, t20: 35 },
    stats: { matches: 89, runs: 2567, average: 38.45, centuries: 6, fifties: 12 },
    recentForm: "Good",
    speciality: "Aggressive Keeper",
    age: 27,
    debut: "2017",
  },
  {
    id: 10,
    name: "Shubman Gill",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 15, odi: 7, t20: 28 },
    stats: { matches: 67, runs: 2234, average: 41.56, centuries: 5, fifties: 14 },
    recentForm: "Excellent",
    speciality: "Elegant Stroke Play",
    age: 25,
    debut: "2019",
  },
  {
    id: 11,
    name: "Yashasvi Jaiswal",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 22, odi: 45, t20: 40 },
    stats: { matches: 23, runs: 1234, average: 48.92, centuries: 3, fifties: 6 },
    recentForm: "Excellent",
    speciality: "Young Talent",
    age: 22,
    debut: "2023",
  },
  {
    id: 12,
    name: "Mohammed Siraj",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 8, odi: 6, t20: 22 },
    stats: { matches: 78, wickets: 98, average: 28.45, economy: 5.12, bestFigures: "6/15" },
    recentForm: "Good",
    speciality: "Pace Bowler",
    age: 30,
    debut: "2017",
  },
  {
    id: 13,
    name: "Kuldeep Yadav",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 18, odi: 8, t20: 15 },
    stats: { matches: 89, wickets: 134, average: 24.67, economy: 4.98, bestFigures: "6/25" },
    recentForm: "Good",
    speciality: "Wrist Spinner",
    age: 30,
    debut: "2017",
  },
  {
    id: 14,
    name: "Axar Patel",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 12, odi: 22, t20: 18 },
    stats: { matches: 67, runs: 1234, average: 28.45, centuries: 0, fifties: 8, wickets: 89 },
    recentForm: "Good",
    speciality: "Left-arm Spinner",
    age: 30,
    debut: "2021",
  },
  {
    id: 15,
    name: "Ishan Kishan",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Wicket-keeper",
    ranking: { test: 55, odi: 28, t20: 12 },
    stats: { matches: 45, runs: 1567, average: 36.78, centuries: 2, fifties: 9 },
    recentForm: "Average",
    speciality: "Attacking Keeper",
    age: 26,
    debut: "2021",
  },
  {
    id: 16,
    name: "Shreyas Iyer",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 25, odi: 15, t20: 32 },
    stats: { matches: 78, runs: 2456, average: 38.92, centuries: 4, fifties: 16 },
    recentForm: "Good",
    speciality: "Middle Order",
    age: 29,
    debut: "2017",
  },
  {
    id: 17,
    name: "Yuzvendra Chahal",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 45, odi: 12, t20: 8 },
    stats: { matches: 134, wickets: 189, average: 25.34, economy: 5.67, bestFigures: "6/42" },
    recentForm: "Good",
    speciality: "Leg Spinner",
    age: 34,
    debut: "2016",
  },
  {
    id: 18,
    name: "Arshdeep Singh",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 65, odi: 35, t20: 6 },
    stats: { matches: 34, wickets: 45, average: 22.89, economy: 7.12, bestFigures: "4/37" },
    recentForm: "Excellent",
    speciality: "Death Bowling",
    age: 25,
    debut: "2022",
  },
  {
    id: 19,
    name: "Tilak Varma",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 75, odi: 55, t20: 18 },
    stats: { matches: 23, runs: 789, average: 42.67, centuries: 1, fifties: 5 },
    recentForm: "Excellent",
    speciality: "Young Talent",
    age: 22,
    debut: "2023",
  },
  {
    id: 20,
    name: "Rinku Singh",
    country: "India",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 85, odi: 65, t20: 22 },
    stats: { matches: 18, runs: 567, average: 38.45, centuries: 0, fifties: 4 },
    recentForm: "Good",
    speciality: "Finisher",
    age: 27,
    debut: "2023",
  },

  // Australia (20 players)
  {
    id: 21,
    name: "Pat Cummins",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 1, odi: 5, t20: 12 },
    stats: { matches: 183, wickets: 269, average: 22.73, economy: 3.86, bestFigures: "6/23" },
    recentForm: "Excellent",
    speciality: "Fast Bowler",
    age: 31,
    debut: "2011",
  },
  {
    id: 22,
    name: "Steve Smith",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 4, odi: 15, t20: 25 },
    stats: { matches: 178, runs: 9685, average: 56.97, centuries: 32, fifties: 42 },
    recentForm: "Good",
    speciality: "Test Specialist",
    age: 35,
    debut: "2010",
  },
  {
    id: 23,
    name: "Travis Head",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 6, odi: 8, t20: 18 },
    stats: { matches: 89, runs: 3456, average: 42.15, centuries: 8, fifties: 18 },
    recentForm: "Excellent",
    speciality: "Aggressive Batsman",
    age: 30,
    debut: "2018",
  },
  {
    id: 24,
    name: "David Warner",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 25, odi: 18, t20: 8 },
    stats: { matches: 234, runs: 8786, average: 44.59, centuries: 26, fifties: 35 },
    recentForm: "Good",
    speciality: "Aggressive Opener",
    age: 38,
    debut: "2009",
  },
  {
    id: 25,
    name: "Mitchell Starc",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 6, odi: 2, t20: 15 },
    stats: { matches: 189, wickets: 298, average: 24.56, economy: 4.89, bestFigures: "6/50" },
    recentForm: "Excellent",
    speciality: "Left-arm Pace",
    age: 34,
    debut: "2010",
  },
  {
    id: 26,
    name: "Josh Hazlewood",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 4, odi: 8, t20: 25 },
    stats: { matches: 156, wickets: 234, average: 25.78, economy: 4.23, bestFigures: "6/67" },
    recentForm: "Excellent",
    speciality: "Line and Length",
    age: 34,
    debut: "2014",
  },
  {
    id: 27,
    name: "Alex Carey",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Wicket-keeper",
    ranking: { test: 15, odi: 22, t20: 35 },
    stats: { matches: 89, runs: 2345, average: 34.56, centuries: 3, fifties: 12 },
    recentForm: "Good",
    speciality: "Reliable Keeper",
    age: 33,
    debut: "2018",
  },
  {
    id: 28,
    name: "Glenn Maxwell",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 45, odi: 12, t20: 6 },
    stats: { matches: 167, runs: 4567, average: 32.45, centuries: 4, fifties: 23, wickets: 89 },
    recentForm: "Excellent",
    speciality: "Big Show",
    age: 36,
    debut: "2012",
  },
  {
    id: 29,
    name: "Marcus Stoinis",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 55, odi: 25, t20: 12 },
    stats: { matches: 123, runs: 2890, average: 28.45, centuries: 1, fifties: 15, wickets: 67 },
    recentForm: "Good",
    speciality: "Power Hitter",
    age: 35,
    debut: "2015",
  },
  {
    id: 30,
    name: "Adam Zampa",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 65, odi: 6, t20: 4 },
    stats: { matches: 134, wickets: 178, average: 26.78, economy: 5.45, bestFigures: "5/19" },
    recentForm: "Excellent",
    speciality: "Leg Spinner",
    age: 32,
    debut: "2016",
  },
  {
    id: 31,
    name: "Marnus Labuschagne",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 2, odi: 28, t20: 45 },
    stats: { matches: 78, runs: 3456, average: 58.92, centuries: 11, fifties: 18 },
    recentForm: "Excellent",
    speciality: "Test Specialist",
    age: 30,
    debut: "2018",
  },
  {
    id: 32,
    name: "Cameron Green",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 18, odi: 35, t20: 28 },
    stats: { matches: 56, runs: 1789, average: 36.78, centuries: 2, fifties: 9, wickets: 45 },
    recentForm: "Good",
    speciality: "Tall All-rounder",
    age: 25,
    debut: "2020",
  },
  {
    id: 33,
    name: "Nathan Lyon",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 3, odi: 45, t20: 55 },
    stats: { matches: 134, wickets: 530, average: 30.24, economy: 2.89, bestFigures: "8/50" },
    recentForm: "Excellent",
    speciality: "Off Spinner",
    age: 37,
    debut: "2011",
  },
  {
    id: 34,
    name: "Usman Khawaja",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 12, odi: 55, t20: 65 },
    stats: { matches: 89, runs: 4567, average: 47.89, centuries: 15, fifties: 23 },
    recentForm: "Good",
    speciality: "Solid Opener",
    age: 38,
    debut: "2011",
  },
  {
    id: 35,
    name: "Tim David",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Batsman",
    ranking: { test: 75, odi: 45, t20: 15 },
    stats: { matches: 34, runs: 1234, average: 42.67, centuries: 1, fifties: 7 },
    recentForm: "Good",
    speciality: "Power Hitter",
    age: 28,
    debut: "2022",
  },
  {
    id: 36,
    name: "Josh Inglis",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Wicket-keeper",
    ranking: { test: 65, odi: 35, t20: 18 },
    stats: { matches: 23, runs: 789, average: 38.45, centuries: 1, fifties: 4 },
    recentForm: "Good",
    speciality: "Attacking Keeper",
    age: 29,
    debut: "2022",
  },
  {
    id: 37,
    name: "Sean Abbott",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 85, odi: 42, t20: 25 },
    stats: { matches: 45, runs: 567, average: 22.45, centuries: 0, fifties: 2, wickets: 67 },
    recentForm: "Average",
    speciality: "Pace All-rounder",
    age: 32,
    debut: "2014",
  },
  {
    id: 38,
    name: "Spencer Johnson",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 95, odi: 65, t20: 22 },
    stats: { matches: 12, wickets: 18, average: 24.56, economy: 7.89, bestFigures: "3/25" },
    recentForm: "Good",
    speciality: "Left-arm Pace",
    age: 28,
    debut: "2023",
  },
  {
    id: 39,
    name: "Matthew Short",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "All-rounder",
    ranking: { test: 88, odi: 48, t20: 32 },
    stats: { matches: 18, runs: 456, average: 28.45, centuries: 0, fifties: 3, wickets: 12 },
    recentForm: "Average",
    speciality: "Utility Player",
    age: 28,
    debut: "2023",
  },
  {
    id: 40,
    name: "Xavier Bartlett",
    country: "Australia",
    image: "/placeholder.svg?height=120&width=120",
    role: "Bowler",
    ranking: { test: 92, odi: 58, t20: 35 },
    stats: { matches: 8, wickets: 12, average: 26.78, economy: 6.45, bestFigures: "4/17" },
    recentForm: "Good",
    speciality: "Fast Bowler",
    age: 25,
    debut: "2024",
  },

  // England (20 players)
  {
    id: 41,
    name: "Ben Stokes",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 15, odi: 22, t20: 30 },
    stats: { matches: 178, runs: 6145, average: 35.89, centuries: 13, fifties: 30, wickets: 196 },
    recentForm: "Good",
    speciality: "Match Winner",
    age: 33,
    debut: "2011",
  },
  {
    id: 42,
    name: "Jos Buttler",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 45, odi: 12, t20: 2 },
    stats: { matches: 162, runs: 4120, average: 40.78, centuries: 9, fifties: 22 },
    recentForm: "Excellent",
    speciality: "Explosive Batsman",
    age: 34,
    debut: "2014",
  },
  {
    id: 43,
    name: "Joe Root",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 3, odi: 10, t20: 35 },
    stats: { matches: 178, runs: 11956, average: 50.23, centuries: 31, fifties: 62 },
    recentForm: "Excellent",
    speciality: "Test Master",
    age: 34,
    debut: "2012",
  },
  {
    id: 44,
    name: "Harry Brook",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 5, odi: 8, t20: 12 },
    stats: { matches: 45, runs: 2345, average: 54.78, centuries: 6, fifties: 12 },
    recentForm: "Excellent",
    speciality: "Aggressive Batsman",
    age: 25,
    debut: "2022",
  },
  {
    id: 45,
    name: "Jonny Bairstow",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 22, odi: 15, t20: 18 },
    stats: { matches: 189, runs: 6789, average: 37.45, centuries: 12, fifties: 35 },
    recentForm: "Good",
    speciality: "Aggressive Keeper",
    age: 35,
    debut: "2011",
  },
  {
    id: 46,
    name: "Mark Wood",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 8, odi: 12, t20: 20 },
    stats: { matches: 89, wickets: 134, average: 26.78, economy: 5.12, bestFigures: "6/37" },
    recentForm: "Good",
    speciality: "Express Pace",
    age: 35,
    debut: "2015",
  },
  {
    id: 47,
    name: "Jofra Archer",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 25, odi: 18, t20: 8 },
    stats: { matches: 67, wickets: 89, average: 23.45, economy: 6.78, bestFigures: "6/45" },
    recentForm: "Good",
    speciality: "Fast Bowler",
    age: 30,
    debut: "2019",
  },
  {
    id: 48,
    name: "Moeen Ali",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 35, odi: 25, t20: 15 },
    stats: { matches: 234, runs: 4567, average: 28.45, centuries: 5, fifties: 23, wickets: 234 },
    recentForm: "Good",
    speciality: "Spin All-rounder",
    age: 37,
    debut: "2014",
  },
  {
    id: 49,
    name: "Liam Livingstone",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 55, odi: 18, t20: 10 },
    stats: { matches: 78, runs: 1890, average: 32.45, centuries: 1, fifties: 12, wickets: 45 },
    recentForm: "Good",
    speciality: "Power Hitter",
    age: 31,
    debut: "2021",
  },
  {
    id: 50,
    name: "Adil Rashid",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 45, odi: 8, t20: 6 },
    stats: { matches: 156, wickets: 234, average: 32.45, economy: 5.67, bestFigures: "5/27" },
    recentForm: "Excellent",
    speciality: "Leg Spinner",
    age: 37,
    debut: "2009",
  },
  {
    id: 51,
    name: "Sam Curran",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 28, odi: 22, t20: 12 },
    stats: { matches: 123, runs: 2345, average: 26.78, centuries: 1, fifties: 12, wickets: 134 },
    recentForm: "Good",
    speciality: "Left-arm All-rounder",
    age: 26,
    debut: "2018",
  },
  {
    id: 52,
    name: "Chris Woakes",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 18, odi: 28, t20: 25 },
    stats: { matches: 167, runs: 2890, average: 24.56, centuries: 1, fifties: 15, wickets: 189 },
    recentForm: "Good",
    speciality: "Seam All-rounder",
    age: 35,
    debut: "2013",
  },
  {
    id: 53,
    name: "Ollie Pope",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 18, odi: 45, t20: 55 },
    stats: { matches: 56, runs: 2234, average: 32.45, centuries: 5, fifties: 12 },
    recentForm: "Good",
    speciality: "Middle Order",
    age: 27,
    debut: "2018",
  },
  {
    id: 54,
    name: "Zak Crawley",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 25, odi: 55, t20: 65 },
    stats: { matches: 45, runs: 1789, average: 28.45, centuries: 3, fifties: 8 },
    recentForm: "Average",
    speciality: "Opening Batsman",
    age: 26,
    debut: "2020",
  },
  {
    id: 55,
    name: "Reece Topley",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 65, odi: 15, t20: 22 },
    stats: { matches: 67, wickets: 89, average: 28.45, economy: 5.89, bestFigures: "6/24" },
    recentForm: "Good",
    speciality: "Left-arm Pace",
    age: 31,
    debut: "2015",
  },
  {
    id: 56,
    name: "Phil Salt",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 75, odi: 35, t20: 8 },
    stats: { matches: 34, runs: 1234, average: 38.45, centuries: 2, fifties: 7 },
    recentForm: "Excellent",
    speciality: "Aggressive Opener",
    age: 28,
    debut: "2021",
  },
  {
    id: 57,
    name: "Will Jacks",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 65, odi: 42, t20: 18 },
    stats: { matches: 23, runs: 789, average: 32.45, centuries: 1, fifties: 4, wickets: 18 },
    recentForm: "Good",
    speciality: "Spin All-rounder",
    age: 26,
    debut: "2022",
  },
  {
    id: 58,
    name: "Gus Atkinson",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 22, odi: 55, t20: 45 },
    stats: { matches: 18, wickets: 34, average: 24.56, economy: 4.89, bestFigures: "7/45" },
    recentForm: "Excellent",
    speciality: "Fast Bowler",
    age: 27,
    debut: "2023",
  },
  {
    id: 59,
    name: "Brydon Carse",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 45, odi: 38, t20: 32 },
    stats: { matches: 12, runs: 234, average: 18.45, centuries: 0, fifties: 1, wickets: 23 },
    recentForm: "Good",
    speciality: "Pace All-rounder",
    age: 29,
    debut: "2021",
  },
  {
    id: 60,
    name: "Jacob Bethell",
    country: "England",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 85, odi: 65, t20: 42 },
    stats: { matches: 8, runs: 156, average: 22.34, centuries: 0, fifties: 1, wickets: 8 },
    recentForm: "Average",
    speciality: "Young All-rounder",
    age: 21,
    debut: "2024",
  },

  // Pakistan (15 players)
  {
    id: 61,
    name: "Babar Azam",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 3, odi: 1, t20: 3 },
    stats: { matches: 102, runs: 4442, average: 56.83, centuries: 17, fifties: 26 },
    recentForm: "Good",
    speciality: "Consistent Scorer",
    age: 30,
    debut: "2015",
  },
  {
    id: 62,
    name: "Shaheen Afridi",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 8, odi: 3, t20: 5 },
    stats: { matches: 89, wickets: 142, average: 24.36, economy: 5.12, bestFigures: "6/35" },
    recentForm: "Good",
    speciality: "Left-arm Pacer",
    age: 24,
    debut: "2018",
  },
  {
    id: 63,
    name: "Mohammad Rizwan",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 12, odi: 8, t20: 4 },
    stats: { matches: 134, runs: 4567, average: 42.34, centuries: 8, fifties: 28 },
    recentForm: "Excellent",
    speciality: "Reliable Keeper",
    age: 32,
    debut: "2019",
  },
  {
    id: 64,
    name: "Fakhar Zaman",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 55, odi: 18, t20: 15 },
    stats: { matches: 89, runs: 3456, average: 38.45, centuries: 6, fifties: 18 },
    recentForm: "Good",
    speciality: "Aggressive Opener",
    age: 34,
    debut: "2017",
  },
  {
    id: 65,
    name: "Naseem Shah",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 15, odi: 22, t20: 18 },
    stats: { matches: 67, wickets: 89, average: 26.78, economy: 5.45, bestFigures: "5/31" },
    recentForm: "Good",
    speciality: "Fast Bowler",
    age: 21,
    debut: "2019",
  },
  {
    id: 66,
    name: "Haris Rauf",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 45, odi: 12, t20: 8 },
    stats: { matches: 78, wickets: 98, average: 24.56, economy: 7.12, bestFigures: "5/29" },
    recentForm: "Excellent",
    speciality: "Express Pace",
    age: 31,
    debut: "2020",
  },
  {
    id: 67,
    name: "Shadab Khan",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 35, odi: 15, t20: 12 },
    stats: { matches: 123, runs: 1890, average: 24.56, centuries: 0, fifties: 8, wickets: 134 },
    recentForm: "Good",
    speciality: "Leg Spinner",
    age: 26,
    debut: "2017",
  },
  {
    id: 68,
    name: "Imam-ul-Haq",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 45, odi: 25, t20: 55 },
    stats: { matches: 67, runs: 2890, average: 48.92, centuries: 6, fifties: 16 },
    recentForm: "Good",
    speciality: "Opening Batsman",
    age: 28,
    debut: "2017",
  },
  {
    id: 69,
    name: "Shan Masood",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 22, odi: 45, t20: 65 },
    stats: { matches: 56, runs: 2234, average: 36.78, centuries: 4, fifties: 12 },
    recentForm: "Good",
    speciality: "Test Specialist",
    age: 35,
    debut: "2013",
  },
  {
    id: 70,
    name: "Saim Ayub",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 65, odi: 35, t20: 25 },
    stats: { matches: 23, runs: 789, average: 38.45, centuries: 1, fifties: 5 },
    recentForm: "Good",
    speciality: "Young Talent",
    age: 22,
    debut: "2023",
  },
  {
    id: 71,
    name: "Mohammad Hasnain",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 75, odi: 42, t20: 22 },
    stats: { matches: 34, wickets: 45, average: 28.45, economy: 6.78, bestFigures: "4/25" },
    recentForm: "Average",
    speciality: "Fast Bowler",
    age: 24,
    debut: "2019",
  },
  {
    id: 72,
    name: "Usama Mir",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 85, odi: 28, t20: 18 },
    stats: { matches: 18, wickets: 28, average: 26.78, economy: 6.45, bestFigures: "4/34" },
    recentForm: "Good",
    speciality: "Leg Spinner",
    age: 28,
    debut: "2023",
  },
  {
    id: 73,
    name: "Abdullah Shafique",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 28, odi: 55, t20: 75 },
    stats: { matches: 34, runs: 1456, average: 42.67, centuries: 3, fifties: 8 },
    recentForm: "Good",
    speciality: "Opening Batsman",
    age: 25,
    debut: "2021",
  },
  {
    id: 74,
    name: "Saud Shakeel",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 18, odi: 65, t20: 85 },
    stats: { matches: 23, runs: 1234, average: 54.78, centuries: 3, fifties: 6 },
    recentForm: "Excellent",
    speciality: "Middle Order",
    age: 29,
    debut: "2021",
  },
  {
    id: 75,
    name: "Abrar Ahmed",
    country: "Pakistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 25, odi: 75, t20: 65 },
    stats: { matches: 12, wickets: 34, average: 22.45, economy: 3.89, bestFigures: "7/114" },
    recentForm: "Good",
    speciality: "Mystery Spinner",
    age: 26,
    debut: "2022",
  },

  // Continue with more countries...
  // South Africa (10 players)
  {
    id: 76,
    name: "Kagiso Rabada",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 3, odi: 4, t20: 8 },
    stats: { matches: 156, wickets: 298, average: 22.75, economy: 4.89, bestFigures: "7/112" },
    recentForm: "Excellent",
    speciality: "Express Pace",
    age: 29,
    debut: "2015",
  },
  {
    id: 77,
    name: "Quinton de Kock",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 25, odi: 14, t20: 12 },
    stats: { matches: 156, runs: 6345, average: 44.69, centuries: 17, fifties: 34 },
    recentForm: "Good",
    speciality: "Attacking Keeper",
    age: 31,
    debut: "2013",
  },
  {
    id: 78,
    name: "Temba Bavuma",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 35, odi: 22, t20: 28 },
    stats: { matches: 89, runs: 2890, average: 34.56, centuries: 3, fifties: 18 },
    recentForm: "Good",
    speciality: "Captain",
    age: 34,
    debut: "2014",
  },
  {
    id: 79,
    name: "Aiden Markram",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 22, odi: 18, t20: 15 },
    stats: { matches: 78, runs: 3456, average: 38.45, centuries: 6, fifties: 16, wickets: 23 },
    recentForm: "Good",
    speciality: "Elegant Batsman",
    age: 30,
    debut: "2017",
  },
  {
    id: 80,
    name: "Marco Jansen",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 18, odi: 28, t20: 22 },
    stats: { matches: 45, runs: 1234, average: 24.56, centuries: 1, fifties: 6, wickets: 67 },
    recentForm: "Good",
    speciality: "Tall All-rounder",
    age: 24,
    debut: "2021",
  },
  {
    id: 81,
    name: "Anrich Nortje",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 12, odi: 15, t20: 12 },
    stats: { matches: 67, wickets: 89, average: 24.56, economy: 5.67, bestFigures: "6/56" },
    recentForm: "Good",
    speciality: "Express Pace",
    age: 31,
    debut: "2019",
  },
  {
    id: 82,
    name: "Keshav Maharaj",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 8, odi: 18, t20: 25 },
    stats: { matches: 89, wickets: 134, average: 28.45, economy: 4.23, bestFigures: "9/129" },
    recentForm: "Good",
    speciality: "Left-arm Spinner",
    age: 35,
    debut: "2016",
  },
  {
    id: 83,
    name: "David Miller",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 65, odi: 12, t20: 8 },
    stats: { matches: 167, runs: 4567, average: 38.45, centuries: 4, fifties: 28 },
    recentForm: "Excellent",
    speciality: "Finisher",
    age: 35,
    debut: "2010",
  },
  {
    id: 84,
    name: "Heinrich Klaasen",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 55, odi: 8, t20: 6 },
    stats: { matches: 78, runs: 2890, average: 42.34, centuries: 4, fifties: 18 },
    recentForm: "Excellent",
    speciality: "Power Hitter",
    age: 33,
    debut: "2018",
  },
  {
    id: 85,
    name: "Tabraiz Shamsi",
    country: "South Africa",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 45, odi: 12, t20: 4 },
    stats: { matches: 89, wickets: 123, average: 24.56, economy: 5.89, bestFigures: "5/24" },
    recentForm: "Good",
    speciality: "Wrist Spinner",
    age: 35,
    debut: "2016",
  },

  // New Zealand (10 players)
  {
    id: 86,
    name: "Kane Williamson",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 5, odi: 7, t20: 20 },
    stats: { matches: 178, runs: 8743, average: 54.31, centuries: 25, fifties: 44 },
    recentForm: "Good",
    speciality: "Elegant Stroke Play",
    age: 34,
    debut: "2010",
  },
  {
    id: 87,
    name: "Trent Boult",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 12, odi: 8, t20: 15 },
    stats: { matches: 189, wickets: 317, average: 27.49, economy: 4.85, bestFigures: "7/34" },
    recentForm: "Good",
    speciality: "Swing Bowler",
    age: 35,
    debut: "2011",
  },
  {
    id: 88,
    name: "Tim Southee",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 15, odi: 22, t20: 18 },
    stats: { matches: 234, wickets: 389, average: 28.45, economy: 5.12, bestFigures: "7/33" },
    recentForm: "Good",
    speciality: "Swing Bowler",
    age: 36,
    debut: "2008",
  },
  {
    id: 89,
    name: "Devon Conway",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 18, odi: 15, t20: 12 },
    stats: { matches: 67, runs: 2890, average: 48.92, centuries: 6, fifties: 16 },
    recentForm: "Good",
    speciality: "Left-handed Batsman",
    age: 33,
    debut: "2020",
  },
  {
    id: 90,
    name: "Rachin Ravindra",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 25, odi: 12, t20: 22 },
    stats: { matches: 34, runs: 1456, average: 42.67, centuries: 3, fifties: 8, wickets: 23 },
    recentForm: "Excellent",
    speciality: "Young All-rounder",
    age: 25,
    debut: "2021",
  },
  {
    id: 91,
    name: "Tom Latham",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 12, odi: 25, t20: 35 },
    stats: { matches: 134, runs: 4567, average: 38.45, centuries: 12, fifties: 28 },
    recentForm: "Good",
    speciality: "Reliable Keeper",
    age: 33,
    debut: "2014",
  },
  {
    id: 92,
    name: "Mitchell Santner",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 28, odi: 18, t20: 15 },
    stats: { matches: 123, runs: 1890, average: 24.56, centuries: 0, fifties: 8, wickets: 134 },
    recentForm: "Good",
    speciality: "Left-arm Spinner",
    age: 32,
    debut: "2015",
  },
  {
    id: 93,
    name: "Glenn Phillips",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 35, odi: 22, t20: 18 },
    stats: { matches: 78, runs: 2234, average: 32.45, centuries: 2, fifties: 12, wickets: 34 },
    recentForm: "Good",
    speciality: "Utility Player",
    age: 28,
    debut: "2017",
  },
  {
    id: 94,
    name: "Matt Henry",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 18, odi: 15, t20: 28 },
    stats: { matches: 89, wickets: 123, average: 26.78, economy: 4.89, bestFigures: "7/23" },
    recentForm: "Good",
    speciality: "Seam Bowler",
    age: 33,
    debut: "2014",
  },
  {
    id: 95,
    name: "Daryl Mitchell",
    country: "New Zealand",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 22, odi: 28, t20: 25 },
    stats: { matches: 67, runs: 2345, average: 36.78, centuries: 4, fifties: 12, wickets: 23 },
    recentForm: "Good",
    speciality: "Reliable All-rounder",
    age: 33,
    debut: "2019",
  },

  // Afghanistan (5 players)
  {
    id: 96,
    name: "Rashid Khan",
    country: "Afghanistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 25, odi: 3, t20: 1 },
    stats: { matches: 145, wickets: 198, average: 18.45, economy: 6.14, bestFigures: "7/18" },
    recentForm: "Good",
    speciality: "Leg Spinner",
    age: 26,
    debut: "2015",
  },
  {
    id: 97,
    name: "Mohammad Nabi",
    country: "Afghanistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "All-rounder",
    ranking: { test: 45, odi: 22, t20: 18 },
    stats: { matches: 167, runs: 3456, average: 28.45, centuries: 2, fifties: 18, wickets: 156 },
    recentForm: "Good",
    speciality: "Experienced All-rounder",
    age: 40,
    debut: "2009",
  },
  {
    id: 98,
    name: "Mujeeb Ur Rahman",
    country: "Afghanistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Bowler",
    ranking: { test: 35, odi: 15, t20: 8 },
    stats: { matches: 89, wickets: 123, average: 22.45, economy: 5.67, bestFigures: "5/20" },
    recentForm: "Good",
    speciality: "Mystery Spinner",
    age: 23,
    debut: "2017",
  },
  {
    id: 99,
    name: "Rahmanullah Gurbaz",
    country: "Afghanistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Wicket-keeper",
    ranking: { test: 65, odi: 28, t20: 15 },
    stats: { matches: 45, runs: 1789, average: 38.45, centuries: 3, fifties: 9 },
    recentForm: "Good",
    speciality: "Aggressive Keeper",
    age: 23,
    debut: "2019",
  },
  {
    id: 100,
    name: "Ibrahim Zadran",
    country: "Afghanistan",
    image: "/placeholder.svg?height=120&width=120", // Will be replaced with API image
    role: "Batsman",
    ranking: { test: 55, odi: 35, t20: 28 },
    stats: { matches: 34, runs: 1234, average: 36.78, centuries: 2, fifties: 7 },
    recentForm: "Good",
    speciality: "Opening Batsman",
    age: 22,
    debut: "2021",
  },
]

// Countries list
const countries = [
  "All Countries",
  "India",
  "Australia",
  "England",
  "Pakistan",
  "South Africa",
  "New Zealand",
  "Afghanistan",
  "Sri Lanka",
  "West Indies",
  "Bangladesh",
  "Zimbabwe",
]

const playerAwards = [
  { name: "ICC Player of the Year", winner: "Pat Cummins", year: "2024" },
  { name: "ICC T20I Player of the Year", winner: "Suryakumar Yadav", year: "2024" },
  { name: "ICC Women's Player of the Year", winner: "Smriti Mandhana", year: "2024" },
  { name: "ICC Emerging Player", winner: "Rachin Ravindra", year: "2024" },
]

const PLAYERS_PER_PAGE = 20

function PlayerCard({ player, playerImage }: { player: (typeof allPlayers)[0]; playerImage: string }) {
  const [imageError, setImageError] = useState(false)

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

  const getFormColor = (form: string) => {
    switch (form.toLowerCase()) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "average":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20">
            {imageError ? (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <ImageOff className="w-8 h-8 text-gray-400" />
              </div>
            ) : (
              <Image
                src={playerImage || "/placeholder.svg"}
                alt={player.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            )}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl">{player.name}</CardTitle>
            <p className="text-muted-foreground">{player.country}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Badge className={getRoleColor(player.role)}>{player.role}</Badge>
              <Badge variant="outline">{player.speciality}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="bg-yellow-50 p-2 rounded">
            <p className="font-bold text-yellow-600">#{player.ranking.test}</p>
            <p className="text-muted-foreground">Test</p>
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <p className="font-bold text-blue-600">#{player.ranking.odi}</p>
            <p className="text-muted-foreground">ODI</p>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <p className="font-bold text-green-600">#{player.ranking.t20}</p>
            <p className="text-muted-foreground">T20I</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age:</span>
            <span className="font-medium">{player.age}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Debut:</span>
            <span className="font-medium">{player.debut}</span>
          </div>
          {player.stats.runs && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Runs:</span>
                <span className="font-medium">{player.stats.runs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average:</span>
                <span className="font-medium">{player.stats.average}</span>
              </div>
            </>
          )}
          {player.stats.wickets && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Wickets:</span>
                <span className="font-medium">{player.stats.wickets}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Economy:</span>
                <span className="font-medium">{player.stats.economy}</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Form</p>
            <p className={`font-medium ${getFormColor(player.recentForm)}`}>{player.recentForm}</p>
          </div>
          <Link href={`/players/${player.id}`}>
            <Button size="sm">View Profile</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function PlayersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [selectedRole, setSelectedRole] = useState("All Roles")
  const [displayedPlayers, setDisplayedPlayers] = useState(PLAYERS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)

  // Use the custom hook to fetch player images
  const { playerImages, loading: imagesLoading, getPlayerImage } = usePlayerImages()

  const roles = ["All Roles", "Batsman", "Bowler", "All-rounder", "Wicket-keeper"]

  // Filter players based on search and filters
  const filteredPlayers = useMemo(() => {
    return allPlayers.filter((player) => {
      const matchesSearch =
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.speciality.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCountry = selectedCountry === "All Countries" || player.country === selectedCountry
      const matchesRole = selectedRole === "All Roles" || player.role === selectedRole

      return matchesSearch && matchesCountry && matchesRole
    })
  }, [searchTerm, selectedCountry, selectedRole])

  // Get currently displayed players
  const currentPlayers = filteredPlayers.slice(0, displayedPlayers)
  const hasMorePlayers = displayedPlayers < filteredPlayers.length

  // Load more players function
  const loadMorePlayers = useCallback(() => {
    if (hasMorePlayers && !isLoading) {
      setIsLoading(true)
      // Simulate loading delay
      setTimeout(() => {
        setDisplayedPlayers((prev) => Math.min(prev + PLAYERS_PER_PAGE, filteredPlayers.length))
        setIsLoading(false)
      }, 500)
    }
  }, [hasMorePlayers, isLoading, filteredPlayers.length])

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000 &&
        hasMorePlayers &&
        !isLoading
      ) {
        loadMorePlayers()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loadMorePlayers, hasMorePlayers, isLoading])

  // Reset displayed players when filters change
  useEffect(() => {
    setDisplayedPlayers(PLAYERS_PER_PAGE)
  }, [searchTerm, selectedCountry, selectedRole])

  // Get players by country for country view
  const playersByCountry = useMemo(() => {
    const grouped = allPlayers.reduce(
      (acc, player) => {
        if (!acc[player.country]) {
          acc[player.country] = []
        }
        acc[player.country].push(player)
        return acc
      },
      {} as Record<string, typeof allPlayers>,
    )
    return grouped
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cricket Players</h1>
          <p className="text-muted-foreground">
            Discover the world's best cricket players and rising stars ({allPlayers.length} total players)
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search players by name, country, or speciality..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                className="border rounded px-3 py-2 text-sm"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <select
              className="border rounded px-3 py-2 text-sm"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Tabs defaultValue="all-players" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all-players" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>All Players</span>
            </TabsTrigger>
            <TabsTrigger value="by-country" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>By Country</span>
            </TabsTrigger>
            <TabsTrigger value="awards" className="flex items-center space-x-2">
              <Award className="w-4 h-4" />
              <span>Awards</span>
            </TabsTrigger>
            <TabsTrigger value="women" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Women's</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-players" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {filteredPlayers.length} Player{filteredPlayers.length !== 1 ? "s" : ""} Found
                {currentPlayers.length < filteredPlayers.length && (
                  <span className="text-muted-foreground text-lg ml-2">
                    (Showing {currentPlayers.length} of {filteredPlayers.length})
                  </span>
                )}
              </h2>
              {(searchTerm || selectedCountry !== "All Countries" || selectedRole !== "All Roles") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCountry("All Countries")
                    setSelectedRole("All Roles")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* API Image Loading Indicator */}
            {imagesLoading && (
              <div className="bg-blue-50 p-4 rounded-lg mb-4 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                <p className="text-blue-600">Loading player images from API...</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPlayers.map((player) => (
                <PlayerCard key={player.id} player={player} playerImage={getPlayerImage(player.id, player.image)} />
              ))}
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center py-8">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Loading more players...</span>
                </div>
              </div>
            )}

            {/* Load more button */}
            {hasMorePlayers && !isLoading && (
              <div className="flex justify-center py-8">
                <Button onClick={loadMorePlayers} variant="outline" size="lg">
                  Load More Players ({filteredPlayers.length - currentPlayers.length} remaining)
                </Button>
              </div>
            )}

            {/* No more players message */}
            {!hasMorePlayers && currentPlayers.length > PLAYERS_PER_PAGE && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  You've seen all {filteredPlayers.length} players matching your criteria
                </p>
              </div>
            )}

            {filteredPlayers.length === 0 && (
              <Card className="p-12 text-center">
                <Search className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No Players Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="by-country" className="space-y-6">
            <div className="space-y-8">
              {Object.entries(playersByCountry).map(([country, players]) => (
                <Card key={country}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{country}</span>
                      <Badge variant="outline">{players.length} players</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {players.slice(0, 6).map((player) => (
                        <div
                          key={player.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="relative w-12 h-12">
                            <Image
                              src={getPlayerImage(player.id, player.image) || "/placeholder.svg"}
                              alt={player.name}
                              width={50}
                              height={50}
                              className="rounded-full object-cover"
                              onError={(e) => {
                                // Fallback to placeholder on error
                                ;(e.target as HTMLImageElement).src = player.image
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{player.name}</h4>
                            <p className="text-sm text-muted-foreground">{player.role}</p>
                          </div>
                          <Link href={`/players/${player.id}`}>
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                    {players.length > 6 && (
                      <div className="mt-4 text-center">
                        <Button variant="outline" onClick={() => setSelectedCountry(country)}>
                          View All {country} Players ({players.length})
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="awards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Recent ICC Awards (2024)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {playerAwards.map((award, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border border-yellow-200"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <Award className="w-8 h-8 text-yellow-600" />
                        <div>
                          <h3 className="font-bold text-lg">{award.name}</h3>
                          <p className="text-sm text-muted-foreground">{award.year}</p>
                        </div>
                      </div>
                      <p className="font-semibold text-yellow-800">{award.winner}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="women" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Women's Cricket Stars</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Celebrating the incredible talent in women's cricket from around the world.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPlayers
                    .filter((player) => player.gender === "Women")
                    .map((player) => (
                      <PlayerCard
                        key={player.id}
                        player={player}
                        playerImage={getPlayerImage(player.id, player.image)}
                      />
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
