import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react"

const footerLinks = {
  Cricket: [
    { name: "Live Scores", href: "/live-scores" },
    { name: "Fixtures", href: "/fixtures" },
    { name: "Results", href: "/results" },
    { name: "Rankings", href: "/rankings" },
  ],
  Teams: [
    { name: "International", href: "/teams/international" },
    { name: "Domestic", href: "/teams/domestic" },
    { name: "T20 Leagues", href: "/teams/t20-leagues" },
    { name: "Women's Teams", href: "/teams/womens" },
  ],
  More: [
    { name: "Statistics", href: "/statistics" },
    { name: "Records", href: "/records" },
    { name: "Fantasy", href: "/fantasy" },
    { name: "Mobile App", href: "/app" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
}

export function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              {/* Explosive cricket logo for footer */}
              <div className="relative w-12 h-12">
                {/* Central cricket ball */}
                <div className="absolute inset-1 bg-gradient-to-br from-orange-400 via-red-500 to-red-700 rounded-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xs">CH</span>
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                CricHattric
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Your ultimate destination for cricket news, live scores, and comprehensive coverage with explosive
              real-time updates.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 Dalsi Music Studio. All rights reserved.</p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Made with ❤️ by Dalsi Music Studio for cricket fans worldwide
            </p>
          </div>
        </div>
      </div>
      {/* Explosive design elements */}
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-60"></div>
    </footer>
  )
}
