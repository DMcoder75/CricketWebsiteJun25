#!/bin/bash

# CricHattric Health Check Script
echo "🏥 Running CricHattric health check..."

# Configuration
HOST=${1:-localhost}
PORT=${2:-3000}
TIMEOUT=10

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Health check function
check_endpoint() {
    local endpoint=$1
    local description=$2
    
    echo -n "Checking $description... "
    
    if curl -s --max-time $TIMEOUT "http://$HOST:$PORT$endpoint" > /dev/null; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ FAILED${NC}"
        return 1
    fi
}

# Run health checks
echo "🌐 Target: http://$HOST:$PORT"
echo ""

FAILED=0

# Check main page
check_endpoint "/" "Home page" || FAILED=$((FAILED + 1))

# Check API endpoints
check_endpoint "/api/cricket-data?type=live-matches" "Live matches API" || FAILED=$((FAILED + 1))
check_endpoint "/api/cricket-data?type=fixtures" "Fixtures API" || FAILED=$((FAILED + 1))

# Check key pages
check_endpoint "/live-scores" "Live scores page" || FAILED=$((FAILED + 1))
check_endpoint "/fixtures" "Fixtures page" || FAILED=$((FAILED + 1))
check_endpoint "/teams" "Teams page" || FAILED=$((FAILED + 1))
check_endpoint "/players" "Players page" || FAILED=$((FAILED + 1))

echo ""
echo "📊 Health Check Summary:"
if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! CricHattric is healthy.${NC}"
    exit 0
else
    echo -e "${RED}❌ $FAILED check(s) failed. Please investigate.${NC}"
    exit 1
fi
