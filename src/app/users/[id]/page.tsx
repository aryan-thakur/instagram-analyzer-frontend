"use client";

import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  TrendingUp,
  MessageCircle,
  Clock,
  Users,
  BarChart3,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import Plot to avoid SSR issues
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });

interface UserDashboardProps {
  params: {
    id: string;
  };
}

export default function UserDashboard({ params }: UserDashboardProps) {
  const { id } = React.use(params as any) as { id: string };
  const [startDate, setStartDate] = useState("2024-05-01");
  const [endDate, setEndDate] = useState("2025-05-01");
  const [wordCloud, setWordCloud] = useState<{
    top_words: { word: string; count: number }[];
  }>({ top_words: [] });
  const [messageVolume, setMessageVolume] = useState({});
  const [averageResponseTime, setAverageResponseTime] = useState({});
  const [messageComparison, setMessageComparison] = useState({});
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchInitialData() {
      // Sample API call on page load
      await fetch(`/api/message_volume?id=${id}`);
    }
    fetchInitialData();
  }, [id]);
  const handleApplyChanges = async () => {
    setLoading(true);
    try {
      // Simultaneous API calls on Apply
      const start = startDate;
      const end = endDate;
      // Fetch all responses in parallel
      const [
        wordCloudRes,
        messageVolumeRes,
        messageComparisonRes,
        averageResponseTimeRes,
      ] = await Promise.all([
        fetch(`/api/word_cloud?id=${id}&start_date=${start}&end_date=${end}`),
        fetch(
          `/api/message_volume_by_period?id=${id}&start_date=${start}&end_date=${end}`
        ),
        fetch(
          `/api/message_comparison?id=${id}&start_date=${start}&end_date=${end}`
        ),
        fetch(
          `/api/average_response_time?id=${id}&start_date=${start}&end_date=${end}`
        ),
      ]);

      // Parse all responses in parallel
      const [wordCloud, messageVolume, messageComparison, averageResponseTime] =
        await Promise.all([
          wordCloudRes.json(),
          messageVolumeRes.json(),
          messageComparisonRes.json(),
          averageResponseTimeRes.json(),
        ]);

      // Now you can use wordCloud, messageVolume, etc.
      // (e.g., set state variables)
      setWordCloud(wordCloud);
      setMessageVolume(messageVolume);
      setMessageComparison(messageComparison);
      setAverageResponseTime(averageResponseTime);
      setShowFilteredData(true);
    } finally {
      setLoading(false);
    }
  };

  const WordCloud = ({
    data,
  }: {
    data: { top_words: { word: string; count: number }[] };
  }) => {
    const { top_words = [] } = data || {};
    return (
      <div className="flex flex-wrap justify-center items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg min-h-[200px]">
        {[...top_words]
          .sort((a, b) => b.count - a.count)
          .map((item, index) => (
            <span
              key={item.word}
              className={`font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 ${
                index === 0
                  ? "text-4xl"
                  : index === 1
                  ? "text-3xl"
                  : index === 2
                  ? "text-2xl"
                  : "text-xl"
              }`}
              style={{
                opacity: 1 - index * 0.15,
              }}
            >
              {item.word}
            </span>
          ))}
      </div>
    );
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
              This might take a few seconds, depending on the conversation size
            </span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/search">
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
        {/* User Info Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              @User_{id}
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Comprehensive message analytics and conversation insights
          </p>
        </div>

        {/* Main Chart */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="p-6"></CardContent>
        </Card>

        {/* Visual Break */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          <div className="mx-8">
            <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"></div>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"></div>
        </div>

        {/* Date Input Section */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-gray-800">
              <Calendar className="w-5 h-5" />
              <span>Filter by Date Range</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                onClick={handleApplyChanges}
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-2 whitespace-nowrap"
              >
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Filtered Data Visualizations */}
        {showFilteredData && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Filtered Analytics ({startDate} to {endDate})
              </span>
            </h2>

            {/* Two Plotly Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg w-full">
                <CardContent className="p-4 sm:p-6">
                  {messageComparison &&
                    (messageComparison as any).figure &&
                    (messageComparison as any).figure.data &&
                    (messageComparison as any).figure.layout && (
                      <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
                        <Plot
                          data={(messageComparison as any).figure.data}
                          layout={{
                            ...(messageComparison as any).figure.layout,
                            title: "Custom Chart Title",
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor: "rgba(0,0,0,0)",
                            autosize: true,
                            width: undefined,
                            height: undefined,
                            margin: { t: 60, r: 20, b: 60, l: 40 },
                          }}
                          config={{
                            displayModeBar: false,
                            staticPlot: false,
                            responsive: true,
                          }}
                          useResizeHandler={true}
                          style={{
                            width: "100%",
                            height: "100%",
                            minWidth: 0,
                            minHeight: 0,
                          }}
                        />
                      </div>
                    )}
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg w-full">
                <CardContent className="p-4 sm:p-6">
                  {messageVolume &&
                    (messageVolume as any).figure &&
                    (messageVolume as any).figure.data &&
                    (messageVolume as any).figure.layout && (
                      <div className="w-full h-[250px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
                        <Plot
                          data={(messageVolume as any).figure.data}
                          layout={{
                            ...(messageVolume as any).figure.layout,
                            title: "In Pacific Standard Time (PS)",
                            paper_bgcolor: "rgba(0,0,0,0)",
                            plot_bgcolor: "rgba(0,0,0,0)",
                            autosize: true,
                            width: undefined,
                            height: undefined,
                            margin: { t: 60, r: 20, b: 60, l: 40 },
                          }}
                          config={{
                            displayModeBar: false,
                            staticPlot: false,
                            responsive: true,
                          }}
                          useResizeHandler={true}
                          style={{
                            width: "100%",
                            height: "100%",
                            minWidth: 0,
                            minHeight: 0,
                          }}
                        />
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>

            {/* Key Metrics and Word Cloud */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Key Numerical Data */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <TrendingUp className="w-5 h-5" />
                    <span>Response Rates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                        {(averageResponseTime as any)["avg_self"] || "~0"}s
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>My average</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                        {(averageResponseTime as any)["median_self"] || "~0"}s
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>My median</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-cyan-50 to-purple-50 rounded-lg">
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {(averageResponseTime as any)["avg_unknown"] || "~0"}s
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>User_{id} average</span>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                        {(averageResponseTime as any)["median_unknown"] || "~0"}
                        s
                      </div>
                      <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>User_{id} median</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Word Cloud */}
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-800">
                    <MessageCircle className="w-5 h-5" />
                    <span>Top 5 Words</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <WordCloud data={wordCloud} />
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Initial State Message */}
        {!showFilteredData && (
          <Card className="bg-white/50 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-12 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Select Date Range
              </h3>
              <p className="text-gray-500">
                Choose a date range above and click "Apply Changes" to view
                detailed analytics for that period.
              </p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
