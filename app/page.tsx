"use client";

import { useEffect, useState } from "react";
//import TradingViewWidget from "./TradingViewWidget";

import {
  Search,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

type WatchlistItem = {
  label: string;
  tradingview: string;
};

export default function Home() {

  const watchlist: WatchlistItem[] = [
    {
      label: "BANKNIFTY",
      tradingview: "NIFTYBANK",
    },
    {
      label: "NIFTY",
      tradingview: "NIFTY",
    },
    {
      label: "RELIANCE",
      tradingview: "RELIANCE",
    },
    {
      label: "HDFCBANK",
      tradingview: "HDFCBANK",
    },
    {
      label: "INFY",
      tradingview: "INFY",
    },
    {
      label: "TCS",
      tradingview: "TCS",
    },
    {
      label: "SBIN",
      tradingview: "SBIN",
    },
    {
      label: "ICICIBANK",
      tradingview: "ICICIBANK",
    },
  ];

  const [selectedSymbol, setSelectedSymbol] =
    useState<WatchlistItem>({
      label: "BANKNIFTY",
      tradingview: "NIFTYBANK",
    });

  const [timeframe, setTimeframe] =
    useState("5");

  const [price, setPrice] =
    useState(55820);

  const [analysis, setAnalysis] =
    useState({
      trend: "Bullish",
      action:
        "Wait for breakout above resistance",
      risk: "Moderate",
      setup: "55800 CE ATM",
      confidence: 74,
      reasoning: [
        "Price holding above VWAP",
        "RSI strengthening",
        "Momentum stable",
        "Volume below breakout threshold",
      ],
    });

  useEffect(() => {

    const interval = setInterval(() => {

      setPrice((prev) =>
        +(prev + (Math.random() * 30 - 15)).toFixed(2)
      );

      const marketStates = [
        {
          trend: "Bullish",
          action:
            "Wait for breakout above resistance",
          setup: "ATM CE",
          risk: "Moderate",
          reasoning: [
            "Price holding above VWAP",
            "RSI strengthening",
            "Momentum stable",
            "Buyers defending support",
          ],
        },

        {
          trend: "Bearish",
          action:
            "Avoid fresh longs below VWAP",
          setup: "ATM PE",
          risk: "High",
          reasoning: [
            "Price below VWAP",
            "Weak momentum structure",
            "Selling pressure increasing",
            "Resistance holding strongly",
          ],
        },

        {
          trend: "Neutral",
          action:
            "Wait for clearer directional move",
          setup: "No clean setup",
          risk: "Low",
          reasoning: [
            "Range-bound structure",
            "Momentum weakening",
            "Volume below average",
            "No breakout confirmation",
          ],
        },
      ];

      const selectedState =
        marketStates[
          Math.floor(
            Math.random() * marketStates.length
          )
        ];

      setAnalysis({
        ...selectedState,
        confidence:
          Math.floor(Math.random() * 15) + 70,
      });

    }, 8000);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="h-screen w-screen bg-[#0b0f19] text-white flex overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-[240px] border-r border-white/5 bg-[#0f1725] flex flex-col">

        {/* LOGO */}
        <div className="h-[72px] border-b border-white/5 flex items-center px-6">

          <h1 className="text-xl font-semibold tracking-wide">
            AI Terminal
          </h1>

        </div>

        {/* SEARCH */}
        <div className="p-4">

          <div className="flex items-center gap-3 bg-white/5 border border-white/5 rounded-xl px-4 py-3">

            <Search size={18} className="text-zinc-400" />

            <input
              placeholder="Search symbol..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-zinc-500"
            />

          </div>

        </div>

        {/* WATCHLIST */}
        <div className="px-3 flex-1 overflow-y-auto">

          <p className="text-xs uppercase tracking-wider text-zinc-500 px-3 mb-3">
            Watchlist
          </p>

          <div className="space-y-1">

            {watchlist.map((symbol) => (

              <button
                key={symbol.label}
                onClick={() =>
                  setSelectedSymbol(symbol)
                }
                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                  selectedSymbol.label ===
                  symbol.label
                    ? "bg-[#1a2335] border border-blue-500/30"
                    : "hover:bg-white/5"
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="font-medium">
                    {symbol.label}
                  </span>

                  <span className="text-green-400 text-sm">
                    +0.82%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 flex flex-col">

        {/* TOPBAR */}
        <div className="h-[72px] border-b border-white/5 bg-[#0f1725] px-6 flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-6">

            <div>

              <h2 className="text-xl font-semibold">
                {selectedSymbol.label}
              </h2>

              <p className="text-sm text-zinc-400">
                NSE
              </p>

            </div>

            <div className="text-2xl font-semibold">
              {price}
            </div>

            <div className="text-green-400 text-sm">
              +0.84%
            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            {/* TIMEFRAME */}
            <select
              value={timeframe}
              onChange={(e) =>
                setTimeframe(e.target.value)
              }
              className="bg-[#1a2335] border border-white/5 rounded-lg px-4 py-2 text-sm outline-none"
            >

              <option value="1">1m</option>
              <option value="5">5m</option>
              <option value="15">15m</option>
              <option value="60">1H</option>
              <option value="D">1D</option>

            </select>

            {/* LIVE */}
            <div className="flex items-center gap-2 text-sm bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg">

              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>

              LIVE

            </div>

          </div>

        </div>

        {/* CONTENT */}
        <div className="flex-1 flex overflow-hidden">

          {/* CHART AREA */}
          <div className="flex-1 border-r border-white/5 bg-[#0b0f19] p-4">

            <div className="h-full rounded-2xl overflow-hidden border border-white/5 bg-[#111827]">

            <div className="w-full h-full flex items-center justify-center bg-[#111827]">

<div className="text-center">

  <h2 className="text-3xl font-semibold mb-4">
    {selectedSymbol.label}
  </h2>

  <p className="text-zinc-400">
    Live chart loading temporarily disabled
  </p>

</div>

</div>

            </div>

          </div>

          {/* AI PANEL */}
          <div className="w-[360px] bg-[#0f1725] flex flex-col">

            {/* HEADER */}
            <div className="h-[72px] border-b border-white/5 px-6 flex items-center">

              <div className="flex items-center gap-3">

                <Activity
                  size={18}
                  className="text-blue-400"
                />

                <h2 className="font-semibold">
                  AI Analysis
                </h2>

              </div>

            </div>

            {/* ANALYSIS */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">

              {/* TREND */}
              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Trend
                </p>

                <div className="flex items-center gap-3">

                  <TrendingUp
                    size={18}
                    className="text-green-400"
                  />

                  <span className="text-lg font-medium">
                    {analysis.trend}
                  </span>

                </div>

              </div>

              {/* ACTION */}
              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                  Action
                </p>

                <div className="bg-[#131c2b] border border-white/5 rounded-xl p-4 text-sm leading-6 text-zinc-200">

                  {analysis.action}

                </div>

              </div>

              {/* REASONING */}
              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  Reasoning
                </p>

                <div className="space-y-3">

                  {analysis.reasoning.map((item, index) => (

                    <div
                      key={index}
                      className="text-sm text-zinc-300 flex items-start gap-3"
                    >

                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2"></div>

                      <span>
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* SETUP */}
              <div className="grid grid-cols-2 gap-4">

                <div className="bg-[#131c2b] border border-white/5 rounded-xl p-4">

                  <p className="text-xs text-zinc-500 mb-2">
                    Preferred Setup
                  </p>

                  <p className="font-medium">
                    {analysis.setup}
                  </p>

                </div>

                <div className="bg-[#131c2b] border border-white/5 rounded-xl p-4">

                  <p className="text-xs text-zinc-500 mb-2">
                    Risk
                  </p>

                  <p className="font-medium">
                    {analysis.risk}
                  </p>

                </div>

              </div>

              {/* TRADE PLAN */}
              <div>

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  Trade Plan
                </p>

                <div className="space-y-3">

                  <div className="flex justify-between text-sm">

                    <span className="text-zinc-400">
                      Entry
                    </span>

                    <span>
                      55820
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-zinc-400">
                      Stoploss
                    </span>

                    <span>
                      55710
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-zinc-400">
                      Targets
                    </span>

                    <span>
                      55920 / 56050
                    </span>

                  </div>

                  <div className="flex justify-between text-sm">

                    <span className="text-zinc-400">
                      Risk : Reward
                    </span>

                    <span>
                      1 : 2.4
                    </span>

                  </div>

                </div>

              </div>

              {/* CONFIDENCE */}
              <div>

                <div className="flex items-center justify-between mb-3">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Confidence
                  </p>

                  <span className="text-sm">
                    {analysis.confidence}%
                  </span>

                </div>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{
                      width: `${analysis.confidence}%`,
                    }}
                  ></div>

                </div>

              </div>

              {/* WARNING */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">

                <AlertTriangle
                  size={18}
                  className="text-yellow-400 mt-0.5"
                />

                <div>

                  <p className="text-sm font-medium">
                    Market Warning
                  </p>

                  <p className="text-xs text-zinc-400 mt-1 leading-5">
                    Avoid aggressive entries near resistance until volume expands.
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