const fs = require("fs")
const path = require("path")

console.log("🔍 Checking CricHattric package integrity...\n")

// Check required files
const requiredFiles = [
  "package.json",
  "next.config.mjs",
  "tailwind.config.ts",
  "tsconfig.json",
  "server.js",
  ".htaccess",
  "app/layout.tsx",
  "app/page.tsx",
  "lib/cricket-api.ts",
  "components/header.tsx",
  "components/footer.tsx",
]

let allFilesPresent = true

console.log("📁 Checking required files:")
requiredFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`)
  } else {
    console.log(`   ❌ ${file} - MISSING`)
    allFilesPresent = false
  }
})

// Check package.json
console.log("\n📦 Checking package.json:")
try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"))

  // Check required scripts
  const requiredScripts = ["dev", "build", "start"]
  requiredScripts.forEach((script) => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      console.log(`   ✅ Script: ${script}`)
    } else {
      console.log(`   ❌ Script: ${script} - MISSING`)
      allFilesPresent = false
    }
  })

  // Check key dependencies
  const keyDeps = ["next", "react", "react-dom", "typescript", "tailwindcss"]
  keyDeps.forEach((dep) => {
    if (packageJson.dependencies && packageJson.dependencies[dep]) {
      console.log(`   ✅ Dependency: ${dep}`)
    } else if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
      console.log(`   ✅ Dev Dependency: ${dep}`)
    } else {
      console.log(`   ❌ Dependency: ${dep} - MISSING`)
      allFilesPresent = false
    }
  })
} catch (error) {
  console.log("   ❌ Error reading package.json:", error.message)
  allFilesPresent = false
}

// Check environment setup
console.log("\n🔧 Checking environment setup:")
if (fs.existsSync(".env.example")) {
  console.log("   ✅ .env.example present")
} else {
  console.log("   ❌ .env.example - MISSING")
  allFilesPresent = false
}

if (fs.existsSync(".env.local")) {
  console.log("   ✅ .env.local present (good for development)")
} else {
  console.log("   ⚠️  .env.local not found (will use demo data)")
}

// Check deployment files
console.log("\n🚀 Checking deployment files:")
const deploymentFiles = ["DEPLOYMENT.md", "README.md", ".gitignore"]
deploymentFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`   ✅ ${file}`)
  } else {
    console.log(`   ❌ ${file} - MISSING`)
  }
})

// Final summary
console.log("\n" + "=".repeat(50))
if (allFilesPresent) {
  console.log("🎉 Package integrity check PASSED!")
  console.log("✅ All required files are present")
  console.log("🚀 Ready for deployment to Hostinger")
} else {
  console.log("❌ Package integrity check FAILED!")
  console.log("⚠️  Some required files are missing")
  console.log("📝 Please check the missing files above")
}
console.log("=".repeat(50))

process.exit(allFilesPresent ? 0 : 1)
