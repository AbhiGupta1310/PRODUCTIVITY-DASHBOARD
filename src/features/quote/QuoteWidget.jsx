import React, { useState, useEffect } from "react";
import { Quote, RefreshCw } from "lucide-react";

const QuoteWidget = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://dummyjson.com/quotes", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();

      // ✅ Choose a random quote from the list
      const randomIndex = Math.floor(Math.random() * data.quotes.length);
      const randomQuote = data.quotes[randomIndex];

      setQuote({
        content: randomQuote.quote,
        author: randomQuote.author,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote({
        content: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Quote
            className="text-secondary-600 dark:text-secondary-400"
            size={24}
          />
          <h2 className="text-xl font-semibold">Daily Motivation</h2>
        </div>
        <button
          onClick={fetchQuote}
          disabled={loading}
          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-secondary-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-secondary-400"
          aria-label="Get new quote"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      <div
        className="flex flex-1 flex-col items-center justify-center py-4"
        aria-busy={loading}
      >
        {loading ? (
          <div className="flex h-24 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-secondary-600"></div>
          </div>
        ) : (
          quote && (
            <div className="animate-fade-in text-center">
              <p className="text-lg font-medium italic text-gray-800 dark:text-gray-200">
                "{quote.content}"
              </p>
              <p className="mt-3 text-sm font-medium text-gray-600 dark:text-gray-400">
                — {quote.author}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default QuoteWidget;
