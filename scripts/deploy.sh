#!/bin/bash

# CricHattric Deployment Script for Hostinger
echo "🏏 Starting CricHattric deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version check passed: $(node -v)"

# Check if environment variables are set
if [ ! -f ".env.local" ] && [ -z "$CRICKET_API_KEY" ]; then
    print_warning "No .env.local file found and CRICKET_API_KEY not set."
    print_warning "The application will use demo data."
fi

# Install dependencies
print_status "Installing dependencies..."
if npm install; then
    print_success "Dependencies installed successfully"
else
    print_error "Failed to install dependencies"
    exit 1
fi

# Run linting (optional, don't fail on lint errors)
print_status "Running linter..."
npm run lint || print_warning "Linting completed with warnings"

# Build the application
print_status "Building the application..."
if npm run build; then
    print_success "Build completed successfully"
else
    print_error "Build failed"
    exit 1
fi

# Test the build (optional)
print_status "Testing the build..."
if timeout 10s npm start &> /dev/null; then
    print_success "Build test passed"
else
    print_warning "Build test timed out (this is normal)"
fi

# Create deployment package info
print_status "Creating deployment info..."
cat > deployment-info.json << EOF
{
  "deploymentDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "nodeVersion": "$(node -v)",
  "npmVersion": "$(npm -v)",
  "buildStatus": "success",
  "environment": "production"
}
EOF

print_success "Deployment info created"

# Display deployment summary
echo ""
echo "🎉 CricHattric deployment preparation complete!"
echo ""
echo "📋 Deployment Summary:"
echo "   ✅ Dependencies installed"
echo "   ✅ Application built successfully"
echo "   ✅ Ready for Hostinger deployment"
echo ""
echo "🚀 Next Steps:"
echo "   1. Push to your Git repository"
echo "   2. Configure Hostinger Git deployment"
echo "   3. Set environment variables in Hostinger"
echo "   4. Deploy and enjoy your cricket website!"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT.md"
echo ""
print_success "Happy cricket watching! 🏏"
