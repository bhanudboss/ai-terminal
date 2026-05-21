"use client";

import React, {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Activity,
  AlertTriangle,
} from "lucide-react";

type MarketStock = {
  symbol: string;

  price: number;

  change: number;

  sentiment: string;

  tradeQuality: number;

  action: string;

  breakout: boolean;

  volatility: string;

  urgency: string;

  signal: string;

  rsi: number;

  ema20: number;

  ema50: number;

  trend: string;
};

type SelectedSymbol = {
  label: string;
};

export default function Home() {

  const [marketData, setMarketData] =
    useState<MarketStock[]>([]);

  const [selectedSymbol, setSelectedSymbol] =
    useState<SelectedSymbol>({
      label: "AAPL",
    });

  const [timeframe, setTimeframe] =
    useState("5m");

  const [price, setPrice] =
    useState(0);

  const [aiAnalysis, setAiAnalysis] =
    useState(
      "Loading AI analysis..."
    );

  const topFocusStock =
    [...marketData].sort(
      (a, b) =>
        b.tradeQuality -
        a.tradeQuality
    )[0];

  /*
    FETCH MARKET DATA
  */

  useEffect(() => {

    const fetchMarketData =
      async () => {

        try {

          const response =
            await fetch(
              "/api/market"
            );

          const data =
            await response.json();

          setMarketData(data);

          const selected =
            data.find(
              (stock: MarketStock) =>
                stock.symbol ===
                selectedSymbol.label
            );

          if (selected) {

            setPrice(
              selected.price
            );

          }

        } catch (error) {

          console.error(
            "Failed to fetch market data"
          );

        }

      };

    fetchMarketData();

    const interval =
      setInterval(
        fetchMarketData,
        10000
      );

    return () =>
      clearInterval(interval);

  }, [selectedSymbol.label]);

  /*
    FETCH GEMINI AI ANALYSIS
  */

  useEffect(() => {

    const fetchAIAnalysis =
      async () => {

        if (!topFocusStock)
          return;

        try {

          const response =
            await fetch(
              "/api/ai-analysis",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  symbol:
                    topFocusStock.symbol,

                  rsi:
                    topFocusStock.rsi,

                  trend:
                    topFocusStock.trend,

                  volatility:
                    topFocusStock.volatility,

                  signal:
                    topFocusStock.signal,

                  change:
                    topFocusStock.change,
                }),
              }
            );

          const data =
            await response.json();

          setAiAnalysis(
            data.analysis
          );

        } catch (error) {

          console.error(
            "AI analysis failed"
          );

        }

      };

    fetchAIAnalysis();

  }, [topFocusStock]);

  return (
    <main className="h-screen w-screen bg-[#0b0f19] text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-[260px] border-r border-white/5 bg-[#0f1725] flex flex-col">

        {/* LOGO */}
        <div className="h-[72px] border-b border-white/5 flex items-center px-6">

          <h1 className="text-xl font-semibold tracking-wide">

            AI Terminal

          </h1>

        </div>

        {/* SEARCH */}
        <div className="p-4">

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3">

            <Search
              size={18}
              className="text-zinc-400"
            />

            <input
              placeholder="Search symbol..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-500"
            />

          </div>

        </div>

        {/* WATCHLIST */}
        <div className="px-3 flex-1 overflow-y-auto">

          <p className="text-xs uppercase tracking-wider text-zinc-500 px-3 mb-3">

            AI Market Feed

          </p>

          <div className="space-y-1">

            {marketData.map((stock) => (

              <button
                key={stock.symbol}
                onClick={() =>
                  setSelectedSymbol({
                    label:
                      stock.symbol,
                  })
                }
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedSymbol.label ===
                  stock.symbol
                    ? "bg-[#1a2335] border border-blue-500/30"
                    : "hover:bg-white/5"
                }`}
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="font-medium">

                      {stock.symbol}

                    </p>

                    <p className="text-xs text-zinc-500 mt-1">

                      $
                      {stock.price?.toFixed(
                        2
                      )}

                    </p>

                  </div>

                  <span
                    className={`text-sm ${
                      stock.change >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >

                    {stock.change?.toFixed(
                      2
                    )}
                    %

                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

      </aside>

      {/* MAIN */}
      <section className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <div className="h-[72px] border-b border-white/5 bg-[#0f1725] px-6 flex items-center justify-between">

          <div className="flex items-center gap-6">

            <div>

              <h2 className="text-xl font-semibold">

                {selectedSymbol.label}

              </h2>

              <p className="text-sm text-zinc-400">

                LIVE MARKET

              </p>

            </div>

            <div className="text-2xl font-semibold">

              $
              {price
                ? price.toFixed(2)
                : "0.00"}

            </div>

          </div>

          <div className="flex items-center gap-4">

            <select
              value={timeframe}
              onChange={(e) =>
                setTimeframe(
                  e.target.value
                )
              }
              className="bg-[#1a2335] border border-white/5 rounded-lg px-4 py-2 text-sm outline-none"
            >

              <option>1m</option>
              <option>5m</option>
              <option>15m</option>
              <option>1H</option>
              <option>1D</option>

            </select>

            <div className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">

              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

              LIVE

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 flex overflow-hidden">

          {/* CHART */}
          <div className="flex-1 border-r border-white/5 bg-[#0b0f19] p-4">

            <div className="h-full rounded-2xl overflow-hidden border border-white/5 bg-[#111827] flex items-center justify-center">

              <div className="text-center">

                <h2 className="text-5xl font-semibold mb-5">

                  {selectedSymbol.label}

                </h2>

                <p className="text-zinc-400 text-lg">

                  AI Technical Chart Engine Coming Soon

                </p>

              </div>

            </div>

          </div>

          {/* AI PANEL */}
          <div className="w-[420px] bg-[#0f1725] flex flex-col overflow-hidden">

            {/* HEADER */}
            <div className="h-[72px] border-b border-white/5 px-6 flex items-center justify-between">

              <div className="flex items-center gap-3">

                <Activity
                  size={18}
                  className="text-blue-400"
                />

                <h2 className="font-semibold">

                  AI Market Engine

                </h2>

              </div>

              <div className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">

                LIVE AI

              </div>

            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* AI FOCUS */}
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-5">

                  <div>

                    <p className="text-xs uppercase tracking-wider text-blue-300 mb-2">

                      AI Focus Today

                    </p>

                    <h2 className="text-3xl font-semibold">

                      {topFocusStock?.symbol || "..."}

                    </h2>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-zinc-400">

                      Trade Quality

                    </p>

                    <p className="text-3xl font-semibold text-green-400">

                      {topFocusStock?.tradeQuality || 0}/10

                    </p>

                  </div>

                </div>

                {/* INDICATORS */}
                <div className="grid grid-cols-2 gap-4 mb-5">

                  <div className="bg-black/20 rounded-xl p-4">

                    <p className="text-xs text-zinc-400 mb-2">

                      RSI

                    </p>

                    <p
                      className={`font-semibold ${
                        (topFocusStock?.rsi || 0) > 70
                          ? "text-red-400"

                          : (topFocusStock?.rsi || 0) > 55
                          ? "text-green-400"

                          : "text-yellow-400"
                      }`}
                    >

                      {topFocusStock?.rsi || 0}

                    </p>

                  </div>

                  <div className="bg-black/20 rounded-xl p-4">

                    <p className="text-xs text-zinc-400 mb-2">

                      Trend

                    </p>

                    <p className="font-semibold">

                      {topFocusStock?.trend || "--"}

                    </p>

                  </div>

                </div>

                {/* BADGES */}
                <div className="flex items-center gap-2 flex-wrap mb-5">

                  <div className="bg-green-500/10 text-green-400 border border-green-500/20 text-xs px-3 py-1 rounded-lg">

                    {topFocusStock?.signal || "WAIT"}

                  </div>

                  <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs px-3 py-1 rounded-lg">

                    {topFocusStock?.volatility || "Low"} Volatility

                  </div>

                  <div className="bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs px-3 py-1 rounded-lg">

                    {topFocusStock?.urgency || "Low"} Urgency

                  </div>

                </div>

              </div>

              {/* GEMINI AI ANALYSIS */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-4">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">

                    Gemini AI Analysis

                  </p>

                  <div className="text-xs px-2 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">

                    LIVE AI

                  </div>

                </div>

                <div className="text-sm text-zinc-300 leading-8 whitespace-pre-line">

                  {aiAnalysis}

                </div>

              </div>

              {/* AI SCANNER */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-4">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">

                    AI Market Scanner

                  </p>

                  <div className="text-xs px-2 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">

                    LIVE

                  </div>

                </div>

                <div className="space-y-4">

                  {[...marketData]

                    .sort(
                      (a, b) =>
                        b.tradeQuality -
                        a.tradeQuality
                    )

                    .map((stock) => (

                      <div
                        key={stock.symbol}
                        className="bg-[#0f1725] border border-white/5 rounded-xl p-4"
                      >

                        <div className="flex items-start justify-between mb-4">

                          <div>

                            <h3 className="font-semibold text-lg">

                              {stock.symbol}

                            </h3>

                            <p className="text-xs text-zinc-500 mt-1">

                              {stock.trend}

                            </p>

                          </div>

                          <div
                            className={`text-sm font-medium ${
                              stock.change >= 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >

                            {stock.change?.toFixed(
                              2
                            )}
                            %

                          </div>

                        </div>

                        {/* INDICATORS */}
                        <div className="grid grid-cols-2 gap-3 mb-4">

                          <div className="bg-black/20 rounded-lg p-3">

                            <p className="text-xs text-zinc-500 mb-1">

                              RSI

                            </p>

                            <p className="font-medium">

                              {stock.rsi}

                            </p>

                          </div>

                          <div className="bg-black/20 rounded-lg p-3">

                            <p className="text-xs text-zinc-500 mb-1">

                              Signal

                            </p>

                            <p className="font-medium">

                              {stock.signal}

                            </p>

                          </div>

                        </div>

                        {/* QUALITY */}
                        <div className="mb-4">

                          <div className="flex items-center justify-between mb-2">

                            <p className="text-xs text-zinc-500">

                              Trade Quality

                            </p>

                            <p className="text-sm font-medium">

                              {stock.tradeQuality}/10

                            </p>

                          </div>

                          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">

                            <div
                              className={`h-full rounded-full ${
                                stock.tradeQuality >= 8
                                  ? "bg-green-500"

                                  : stock.tradeQuality >= 5
                                  ? "bg-yellow-500"

                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${
                                  stock.tradeQuality *
                                  10
                                }%`,
                              }}
                            />

                          </div>

                        </div>

                        {/* ACTION */}
                        <div className="bg-black/20 rounded-xl p-4">

                          <p className="text-xs text-zinc-500 mb-2">

                            AI Interpretation

                          </p>

                          <p className="text-sm text-zinc-300 leading-7">

                            {stock.action}

                          </p>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

              {/* WARNING */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 flex items-start gap-3">

                <AlertTriangle
                  size={18}
                  className="text-yellow-400 mt-0.5"
                />

                <div>

                  <p className="text-sm font-medium">

                    AI Risk Alert

                  </p>

                  <p className="text-xs text-zinc-400 mt-2 leading-5">

                    Avoid aggressive entries during extreme volatility expansion.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}