# 🏏 CricHattric - Your Cricket Universe

A modern, explosive cricket website featuring real-time live scores, comprehensive fixtures, detailed player profiles, and breaking cricket news. Built with Next.js 15 and powered by real cricket data from CricAPI.com.

![CricHattric Preview](public/images/cricket-hero-vibrant.png)

## ✨ Features

### 🔴 Live Cricket Data
- **Real-time Live Scores**: Live match updates every 15 seconds
- **No Fake Data**: Only authentic cricket information from CricAPI.com
- **Live Match Status**: Real-time match status and score updates
- **Auto-refresh**: Automatic data refresh for live matches

### 📅 Comprehensive Coverage
- **Match Fixtures**: Upcoming international and domestic matches
- **Recent Results**: Complete match results with detailed scorecards
- **Team Information**: International teams and domestic leagues
- **Player Profiles**: 100+ player profiles with real statistics

### 📰 Cricket News & Analysis
- **Breaking News**: Latest cricket news and updates
- **Match Analysis**: In-depth match reports and analysis
- **Player Features**: Exclusive player interviews and features
- **Tournament Coverage**: Complete coverage of major tournaments

### 📊 Statistics & Records
- **Player Statistics**: Comprehensive batting and bowling statistics
- **Team Rankings**: Latest ICC rankings across all formats
- **Historical Records**: Cricket records and milestones
- **Performance Analytics**: Advanced cricket analytics

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **API Integration**: CricAPI.com
- **Image Handling**: Next.js Image Optimization
- **Responsive Design**: Mobile-first approach

## 🎨 Design Features

### Explosive Cricket Theme
- **Dynamic Logo**: Radiating cricket bats with explosion effects
- **Cricket Ball Design**: Authentic cricket ball with seam details
- **Impact Effects**: Explosion particles and motion trails
- **Gradient Backgrounds**: Vibrant cricket-themed gradients

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- CricAPI.com API key

### Local Development

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/DMcoder75/CricketWebsiteJun25.git
cd CricketWebsiteJun25
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Environment Setup**
\`\`\`bash
cp .env.example .env.local
\`\`\`

Add your CricAPI key to `.env.local`:
\`\`\`env
CRICKET_API_KEY=your_cricapi_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
\`\`\`

4. **Run development server**
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### API Configuration

This website uses real cricket data from CricAPI.com. To get live cricket scores:

1. **Get a free API key**
   - Visit [CricAPI.com](https://cricapi.com)
   - Sign up for a free account
   - Get your API key from the dashboard

2. **Configure the API key**
   \`\`\`env
   CRICKET_API_KEY=your_actual_api_key_here
   \`\`\`

3. **Without API key**
   - The website will show demo data
   - All features work normally with sample cricket matches
   - Perfect for development and testing

### Demo vs Real Data

- **Demo Data**: Realistic cricket matches for development
- **Real Data**: Live cricket scores from CricAPI.com
- **Automatic Fallback**: If API fails, demo data is used
- **No Fake Scores**: Only real or clearly marked demo data

## 🚀 Deployment

### Hostinger Deployment
The website is optimized for Hostinger deployment:

1. **Build the project**
\`\`\`bash
npm run build
\`\`\`

2. **Deploy to Hostinger**
- Follow the detailed [DEPLOYMENT.md](DEPLOYMENT.md) guide
- Configure Node.js environment
- Set environment variables
- Enable SSL certificate

3. **Git Auto-deployment**
- Connect your Git repository
- Enable automatic deployments
- Push changes to deploy instantly

### Other Platforms
- **Vercel**: One-click deployment
- **Netlify**: Static site generation
- **Railway**: Container deployment
- **DigitalOcean**: VPS deployment

## 📁 Project Structure

\`\`\`
crichattric-website/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── live-scores/       # Live scores page
│   ├── fixtures/          # Fixtures page
│   ├── teams/             # Teams page
│   ├── players/           # Players page
│   ├── news/              # News page
│   └── statistics/        # Statistics page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Site header
│   └── footer.tsx        # Site footer
├── lib/                  # Utility libraries
│   ├── cricket-api.ts    # Cricket API integration
│   └── utils.ts          # Utility functions
├── hooks/                # Custom React hooks
├── public/               # Static assets
│   ├── images/           # Images
│   └── logo.svg          # Site logo
├── scripts/              # Database scripts
└── styles/               # Global styles
\`\`\`

## 🔧 Configuration Files

- **next.config.mjs**: Next.js configuration
- **tailwind.config.ts**: Tailwind CSS configuration
- **tsconfig.json**: TypeScript configuration
- **package.json**: Dependencies and scripts
- **server.js**: Production server
- **.htaccess**: Apache configuration for Hostinger

## 🌟 Key Features Explained

### Real-time Live Scores
- Fetches live cricket data every 15 seconds
- Shows actual match status and scores
- Automatic fallback to demo data if API unavailable
- Clear indicators for data source (real vs demo)

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading on all devices

### Performance Optimization
- Next.js Image optimization
- Static asset caching
- Gzip compression
- Lazy loading components

### SEO Optimization
- Server-side rendering
- Meta tags optimization
- Structured data markup
- Sitemap generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support & Contact

- **GitHub Issues**: [Create an issue](https://github.com/DMcoder75/CricketWebsiteJun25/issues)
- **Developer**: DMcoder75
- **Email**: Support via GitHub issues

## 🙏 Acknowledgments

- **CricAPI.com** for providing real cricket data
- **shadcn/ui** for beautiful UI components
- **Tailwind CSS** for styling framework
- **Next.js** for the amazing React framework
- **Vercel** for hosting and deployment tools

## 📈 Roadmap

- [ ] User authentication and profiles
- [ ] Fantasy cricket features
- [ ] Push notifications for live matches
- [ ] Mobile app development
- [ ] Advanced analytics dashboard
- [ ] Social features and comments
- [ ] Multi-language support

---

**Made with ❤️ by DMcoder75 for cricket fans worldwide** 🏏

**Live Demo**: [CricHattric.com](https://your-domain.com) (Replace with your actual domain)
