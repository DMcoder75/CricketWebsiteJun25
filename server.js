const { createServer } = require("http")
const { parse } = require("url")
const next = require("next")

const dev = process.env.NODE_ENV !== "production"
const hostname = process.env.HOSTNAME || "localhost"
const port = process.env.PORT || 3000

console.log(`🚀 Starting CricHattric server...`)
console.log(`📊 Environment: ${dev ? "development" : "production"}`)
console.log(`🌐 Hostname: ${hostname}`)
console.log(`🔌 Port: ${port}`)

// Create the Next.js app
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true)

      // Add CORS headers for API routes
      if (parsedUrl.pathname.startsWith("/api/")) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

        if (req.method === "OPTIONS") {
          res.writeHead(200)
          res.end()
          return
        }
      }

      // Let Next.js handle the request
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error("❌ Error occurred handling", req.url, err)
      res.statusCode = 500
      res.end("Internal Server Error")
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`✅ CricHattric ready on http://${hostname}:${port}`)
    console.log(`🏏 Cricket data powered by CricAPI.com`)
    console.log(`🔥 Real-time live scores and explosive cricket coverage!`)
  })
})

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("👋 SIGTERM received, shutting down gracefully")
  process.exit(0)
})

process.on("SIGINT", () => {
  console.log("👋 SIGINT received, shutting down gracefully")
  process.exit(0)
})
