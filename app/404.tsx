import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search, AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
            <p className="text-gray-600">
              Sorry, we couldn't find the cricket page you're looking for. The match might have ended or the page may
              have been moved.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/" className="block">
              <Button className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <Link href="/live-scores" className="block">
              <Button variant="outline" className="w-full">
                <Search className="w-4 h-4 mr-2" />
                View Live Scores
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              Looking for live cricket scores? Check out our
              <Link href="/live-scores" className="text-blue-600 hover:underline ml-1">
                live scores page
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
