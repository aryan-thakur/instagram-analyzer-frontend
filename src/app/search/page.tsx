"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, ArrowLeft, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userIds, setUserIds] = useState<{ id: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let attempts = 0;
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch("/api/conversation_count");
        const data = await response.json();
        const userCount = data.conversation_count || 0;
        const genUserIds = Array.from({ length: userCount }, (_, i) => ({
          id: i + 1,
        }));
        setUserIds(genUserIds);
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds before retrying
        attempts += 1;
        if (attempts < 3) {
          fetchData();
        } else {
          console.error("Failed to fetch data after 3 attempts:", error);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (value: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/username_exists?username=${value}`);
      const data = await response.json();
      router.push(
        `/result?secret=${encodeURIComponent(
          data.secret
        )}&exists=${encodeURIComponent(data.exists)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 relative">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed px-6 inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="animate-spin w-12 h-12 text-purple-600 mb-4" />
          <span className="text-lg font-semibold text-purple-700">
            Loading...
          </span>
          <div className="w-full flex justify-center">
            <span className="text-md text-purple-600 mt-2 max-w-xl text-center">
              This might take approximately a minute. Since the backend is
              hosted on a free tier, it periodically sleeps. When you search,
              you wake it up, which takes about a minute and then it is able to
              processes your request.
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button
                variant="outline"
                className="cursor-pointer ml-auto border-2 border-purple-600 text-purple-700 hover:bg-purple-50 hover:border-purple-700 transition px-6 py-2 rounded-full font-semibold shadow-sm text-base flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Direct Message Data Insights
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Either search using an exact username or browse through the complete
            list of anonymized users to view message analytics and insights.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative flex items-center">
            <Input
              type="text"
              placeholder="Search using exact Instagram username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim()) {
                  handleSearch(searchTerm);
                }
              }}
              className="pl-12 pr-14 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-purple-400 focus:ring-purple-400 bg-white/70 backdrop-blur-sm w-full"
            />
            <Button
              type="button"
              onClick={() => handleSearch(searchTerm)}
              disabled={!searchTerm.trim()}
              className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 p-2 h-10 w-10 min-w-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md transition-colors border-none disabled:opacity-50 flex items-center justify-center"
            >
              <Search className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* OR Divider */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
          <div className="mx-8">
            <span className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              OR
            </span>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        {/* User List Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Browse All Users ({userIds.length})
          </h2>

          <div className="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {userIds.map((user) => (
              <Card
                key={user.id}
                className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform cursor-pointer group"
              >
                <CardContent className="p-6 flex flex-col items-center justify-center">
                  {/* User Logo at Top */}
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  {/* User ID */}
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
                    @User_{user.id}
                  </h3>
                  {/* View Details Button */}
                  <Link
                    className="w-full"
                    href={`/users/${encodeURIComponent(user.id)}`}
                  >
                    <Button className="cursor-pointer w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-300">
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
