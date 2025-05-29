"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const secret = searchParams.get("secret");
  const exists = searchParams.get("exists");
  const [answer, setAnswer] = useState("");
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [decodedMessage, setDecodedMessage] = useState("");

  const base64ToUtf8 = (base64: string) => {
    // Decode base64 to bytes
    const binaryString = atob(base64);
    // Convert binary string to Uint8Array
    const bytes = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
    // Decode UTF-8 bytes to text
    return new TextDecoder().decode(bytes);
  };

  const handleClick = (value: string) => async () => {
    setLoading(true); // Start loader BEFORE fetch

    const response = await fetch(`/api/secret_message?secret=${value}`);
    const data = await response.json();
    if (data.base64) {
      setDecodedMessage(base64ToUtf8(data.base64));
    }

    if (response.status !== 200) {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setFailure(true);
      setLoading(false); // End loader after handling failure
      return;
    } else {
      setFailure(false);
      setLoading(false); // End loader after success
    }
  };

  const existsText = exists === "true" ? "Exists" : "Does not exist";
  const existsColor =
    exists === "true"
      ? "bg-gradient-to-r from-purple-600 to-blue-600"
      : "bg-gradient-to-r from-gray-400 to-gray-600";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed px-6 inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
          <Loader2 className="animate-spin w-12 h-12 text-purple-600 mb-4" />
          <span className="text-lg font-semibold text-purple-700">
            Loading...
          </span>
          <div className="w-full flex justify-center">
            <span className="text-md text-purple-600 mt-2 max-w-xl text-center">
              Loading to prevent abuse, please wait a moment.
            </span>
          </div>
        </div>
      )}
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
      <main className="flex flex-1 flex-col items-center justify-center w-full px-6">
        {secret === "true" ? (
          <div className="flex flex-col items-center text-center w-full mb-10">
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Your conversation exists obviously, but is it really you?
            </div>
            <div className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">
              Solve this question
            </div>
            <div className="text-2xl md:text-3xl font-semibold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              It's like an axe, and around my neck
            </div>
            <div className="flex flex-row items-center space-x-4 w-full max-w-xs mb-4">
              <input
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                type="text"
                placeholder="Your answer..."
                className={`w-[40vw] max-w-xs px-4 py-2 rounded-full border-2 ${
                  failure ? "border-red-500" : "border-purple-400"
                } focus:border-blue-500 focus:outline-none text-lg shadow-sm bg-white transition`}
              />
              <Button
                onClick={handleClick(answer)}
                className="cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow-sm text-base"
              >
                Submit
              </Button>
            </div>
            {decodedMessage && (
              <div className="text-lg md:text-xl text-gray-700 mt-4 text-align-justify">
                {decodedMessage}
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center text-center w-full">
            {/* Top Row: Medium size */}
            <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
              Your conversation with me
            </div>
            {/* Middle Row: Massive, one word */}
            <div
              className={`text-5xl md:text-7xl font-extrabold mb-6 ${existsColor} bg-clip-text text-transparent`}
            >
              {existsText}
            </div>
            {/* Bottom Row: Small para */}
            <div className="text-base md:text-lg text-gray-600 opacity-80">
              on this platform
            </div>
            <div className="text-sm text-gray-400 mt-3 px-4">
              (ps: For the sake of anonymity, I cannot show you insights by
              username. Contact me personally if you're interested in seeing
              your own data.)
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
