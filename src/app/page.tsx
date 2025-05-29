import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart3,
  TrendingUp,
  Lock,
  Eye,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              InstagramAnalytics
            </span>
          </div>
          {/* 'For Devs' Button */}
          <Button
            variant="outline"
            className="cursor-pointer ml-auto border-2 border-purple-600 text-purple-700 hover:bg-purple-50 hover:border-purple-700 transition px-6 py-2 rounded-full font-semibold shadow-sm text-base"
          >
            for devs
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Floating Elements */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-8 -right-8 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-30 animate-pulse delay-1000"></div>

            {/* Main Headline */}
            <div className="relative z-10">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-gray-800">Welcome to</span>
                <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
                  Aryan's Instagram
                </span>
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Analysis
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Unlock deep insights from my personal Instagram DMs. Explore
                trends, visualize engagement patterns, and—if you’ve ever
                messaged me—discover your own stats and activity on this
                interactive analytics platform.
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-16 flex justify-center">
            <Link href="/search">
              <Button
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform flex items-center"
              >
                <span>Enter Platform</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Trend Analysis
                </h3>
                <p className="text-gray-600">
                  Identify emerging trends and patterns in direct message
                  conversations and gain valuable insights.
                </p>
              </CardContent>
            </Card>

            <Card
              className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform
            "
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Privacy
                </h3>
                <p className="text-gray-600">
                  Usernames are anonymized and only non-sensitive insights are
                  shown—your privacy and conversation details stay protected.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Visual Analytics
                </h3>
                <p className="text-gray-600">
                  Interactive charts and visualizations to make complex data
                  easy to understand.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Data at a glance
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                  280K+
                </div>
                <div className="text-gray-600">Messages Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                  80+
                </div>
                <div className="text-gray-600">Conversations Processed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  3M+
                </div>
                <div className="text-gray-600">Data Points</div>
              </div>
              <div className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  99%
                </div>
                <div className="text-gray-600">Anonymization Rate</div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Get instant insights with an optimized data processing engine.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Privacy First
              </h3>
              <p className="text-gray-600">
                All data is completely anonymized to protect user privacy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                Timely Updates
              </h3>
              <p className="text-gray-600">
                New data is processed regularly to keep insights fresh and
                relevant.
              </p>
            </div>
          </div>

          {/* Final CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Dive Into the Data?
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Start exploring comprehensive Instagram DM analytics and discover
              insights that matter. Please note only data from May 1, 2024 to
              May 1, 2025 is available for analysis.
            </p>
            <div className="flex justify-center">
              <Link href="/search">
                <Button
                  size="lg"
                  variant="secondary"
                  className="cursor-pointer bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                >
                  <span className="flex items-center">
                    Enter Platform
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2024 Aryan's Instagram Analysis. All rights reserved.</p>
      </footer>
    </div>
  );
}
