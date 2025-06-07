"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, RefreshCw, AlertTriangle } from "lucide-react"

export default function ServerError() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="mb-6">
            <AlertTriangle className="w-16 h-16 mx-auto text-orange-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-2">500</h1>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Server Error</h2>
            <p className="text-gray-600">
              Oops! Something went wrong on our end. Our team has been notified and is working to fix the issue.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={() => window.location.reload()} className="w-full">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

            <Link href="/" className="block">
              <Button variant="outline" className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500">
              If the problem persists, please try refreshing the page or contact our support team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
