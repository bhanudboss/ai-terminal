"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Activity,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";

type WatchlistItem = {
  label: string;
};

export default function Home() {

  const watchlist: WatchlistItem[] = [
    { label: "BANKNIFTY" },
    { label: "NIFTY" },
    { label: "RELIANCE" },
    { label: "HDFCBANK" },
    { label: "INFY" },
    { label: "TCS" },
    { label: "SBIN" },
    { label: "ICICIBANK" },
  ];

  const [selectedSymbol, setSelectedSymbol] =
    useState<WatchlistItem>({
      label: "BANKNIFTY",
    });

  const [timeframe, setTimeframe] =
    useState("5m");

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
        "Buyers defending support",
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

          <div className="flex items-center gap-4">

            <select
              value={timeframe}
              onChange={(e) =>
                setTimeframe(e.target.value)
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

          {/* CHART AREA */}
          <div className="flex-1 border-r border-white/5 bg-[#0b0f19] p-4">

            <div className="h-full rounded-2xl overflow-hidden border border-white/5 bg-[#111827] flex items-center justify-center">

              <div className="text-center">

                <h2 className="text-4xl font-semibold mb-4">
                  {selectedSymbol.label}
                </h2>

                <p className="text-zinc-400">
                  Chart Engine Coming Soon
                </p>

              </div>

            </div>

          </div>

          {/* AI PANEL */}
          <div className="w-[380px] bg-[#0f1725] flex flex-col overflow-hidden">

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
                LIVE
              </div>

            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">

              {/* MARKET DIRECTION */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  Market Direction
                </p>

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-2xl font-semibold">
                      {analysis.trend}
                    </h3>

                    <p className="text-sm text-zinc-400 mt-1">
                      Momentum currently improving
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-zinc-500">
                      Confidence
                    </p>

                    <p className="text-2xl font-semibold text-blue-400">
                      {analysis.confidence}%
                    </p>

                  </div>

                </div>

              </div>

              {/* AI DECISION */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
                  AI Decision
                </p>

                <div className="text-lg font-medium leading-8 text-zinc-100">

                  {analysis.action}

                </div>

              </div>

              {/* AI REASONING */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                  AI Reasoning
                </p>

                <div className="space-y-3">

                  {analysis.reasoning.map((item, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-3 text-sm text-zinc-300"
                    >

                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-2"></div>

                      <span>
                        {item}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* TRADE QUALITY */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <div className="flex items-center justify-between mb-4">

                  <p className="text-xs uppercase tracking-wider text-zinc-500">
                    Trade Quality
                  </p>

                  <span className="text-xl font-semibold text-green-400">
                    8.1/10
                  </span>

                </div>

                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{
                      width: "81%",
                    }}
                  />

                </div>

                <p className="text-xs text-zinc-400 mt-3 leading-5">
                  Setup quality currently favorable with moderate momentum confirmation.
                </p>

              </div>

              {/* AI FOCUS */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                  AI Focus Today
                </p>

                <div className="space-y-3">

                  {[
                    {
                      stock: "SBIN",
                      tag: "Breakout Watch",
                    },

                    {
                      stock: "RELIANCE",
                      tag: "High Volume",
                    },

                    {
                      stock: "TCS",
                      tag: "Weak Momentum",
                    },
                  ].map((item) => (

                    <div
                      key={item.stock}
                      className="flex items-center justify-between"
                    >

                      <div>

                        <p className="font-medium">
                          {item.stock}
                        </p>

                        <p className="text-xs text-zinc-500 mt-1">
                          {item.tag}
                        </p>

                      </div>

                      <button className="text-xs px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">

                        Analyze

                      </button>

                    </div>

                  ))}

                </div>

              </div>

              {/* TOP GAINERS */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                  Top Gainers
                </p>

                <div className="space-y-3">

                  {[
                    ["SBIN", "+4.8%"],
                    ["ICICIBANK", "+3.1%"],
                    ["RELIANCE", "+2.4%"],
                  ].map(([stock, gain]) => (

                    <div
                      key={stock}
                      className="flex items-center justify-between"
                    >

                      <span className="font-medium">
                        {stock}
                      </span>

                      <span className="text-green-400 text-sm">
                        {gain}
                      </span>

                    </div>

                  ))}

                </div>

              </div>

              {/* TOP LOSERS */}
              <div className="bg-[#131c2b] border border-white/5 rounded-2xl p-5">

                <p className="text-xs uppercase tracking-wider text-zinc-500 mb-4">
                  Top Losers
                </p>

                <div className="space-y-3">

                  {[
                    ["INFY", "-2.1%"],
                    ["WIPRO", "-1.8%"],
                    ["HCLTECH", "-1.5%"],
                  ].map(([stock, loss]) => (

                    <div
                      key={stock}
                      className="flex items-center justify-between"
                    >

                      <span className="font-medium">
                        {stock}
                      </span>

                      <span className="text-red-400 text-sm">
                        {loss}
                      </span>

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

                    Avoid aggressive entries until broader market confirms directional strength.

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