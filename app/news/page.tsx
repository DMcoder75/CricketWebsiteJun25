import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, TrendingUp, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredNews = [
  {
    id: 1,
    title: "Kohli breaks another record in spectacular fashion",
    excerpt:
      "The Indian captain continues his remarkable form with a century that puts him ahead of legends in the record books.",
    content:
      "In a stunning display of batting prowess, Virat Kohli has once again etched his name in cricket history...",
    image: "/placeholder.svg?height=300&width=500",
    category: "International",
    readTime: "3 min read",
    publishedAt: "2 hours ago",
    author: "Rajesh Kumar",
    featured: true,
  },
  {
    id: 2,
    title: "IPL 2024: New rules and regulations announced",
    excerpt:
      "The BCCI announces significant changes to the tournament format and player regulations for the upcoming season.",
    content: "The Board of Control for Cricket in India (BCCI) has unveiled a comprehensive set of new rules...",
    image: "/placeholder.svg?height=300&width=500",
    category: "IPL",
    readTime: "5 min read",
    publishedAt: "4 hours ago",
    author: "Priya Sharma",
    featured: true,
  },
]

const latestNews = [
  {
    id: 3,
    title: "Women's cricket reaches new heights globally",
    excerpt: "Record viewership and participation numbers mark a golden era for women's cricket worldwide.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Women's Cricket",
    readTime: "4 min read",
    publishedAt: "6 hours ago",
    author: "Sarah Johnson",
  },
  {
    id: 4,
    title: "Young talent emerges in domestic cricket",
    excerpt: "Several promising players showcase exceptional skills in recent domestic tournaments.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Domestic",
    readTime: "3 min read",
    publishedAt: "8 hours ago",
    author: "Michael Chen",
  },
  {
    id: 5,
    title: "Technology in cricket: The future is here",
    excerpt: "Advanced analytics and AI are revolutionizing how cricket is played and analyzed.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Technology",
    readTime: "6 min read",
    publishedAt: "12 hours ago",
    author: "David Wilson",
  },
  {
    id: 6,
    title: "Historic venue gets major renovation",
    excerpt: "One of cricket's most iconic stadiums undergoes significant modernization.",
    image: "/placeholder.svg?height=200&width=300",
    category: "Infrastructure",
    readTime: "4 min read",
    publishedAt: "1 day ago",
    author: "Emma Thompson",
  },
]

const trendingTopics = [
  { name: "World Cup 2024", count: 1250 },
  { name: "IPL Auction", count: 980 },
  { name: "Test Championship", count: 756 },
  { name: "T20 World Cup", count: 642 },
  { name: "Women's Cricket", count: 534 },
]

function FeaturedNewsCard({ article }: { article: (typeof featuredNews)[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="aspect-video md:aspect-square relative">
            <Image src={"/images/cricket-hero-vibrant.png"} alt={article.title} fill className="object-cover" />
            <Badge className="absolute top-4 left-4 bg-white/90 text-black hover:bg-white">{article.category}</Badge>
          </div>
        </div>
        <div className="md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-3 line-clamp-2">{article.title}</h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
            <span>By {article.author}</span>
            <span>{article.publishedAt}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{article.readTime}</span>
            <Link href={`/news/${article.id}`}>
              <Button>Read More</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

function NewsCard({ article }: { article: (typeof latestNews)[0] }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-video relative">
        <Image src={"/images/cricket-hero-vibrant.png"} alt={article.title} fill className="object-cover" />
        <Badge className="absolute top-3 left-3 bg-white/90 text-black hover:bg-white">{article.category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{article.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>By {article.author}</span>
          <span>{article.publishedAt}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{article.readTime}</span>
          <Link href={`/news/${article.id}`}>
            <Button variant="outline" size="sm">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Cricket News</h1>
          <p className="text-muted-foreground">Stay updated with the latest cricket news and analysis</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search cricket news..." className="pl-10" />
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="grid grid-cols-4 md:grid-cols-6 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="international">International</TabsTrigger>
                <TabsTrigger value="ipl">IPL</TabsTrigger>
                <TabsTrigger value="domestic">Domestic</TabsTrigger>
                <TabsTrigger value="womens">Women's</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Featured News */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Featured Stories</h2>
              <div className="space-y-6">
                {featuredNews.map((article) => (
                  <FeaturedNewsCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Latest News */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {latestNews.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Trending Topics
                </h3>
                <div className="space-y-3">
                  {trendingTopics.map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <Link
                        href={`/news/topic/${topic.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm hover:text-blue-600 transition-colors"
                      >
                        {topic.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">{topic.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Today's Highlights
                </h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">15</div>
                    <div className="text-sm text-muted-foreground">New Articles</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">3</div>
                    <div className="text-sm text-muted-foreground">Live Matches</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">8</div>
                    <div className="text-sm text-muted-foreground">Breaking News</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-4">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest cricket news delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Enter your email" type="email" />
                  <Button className="w-full">Subscribe</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
