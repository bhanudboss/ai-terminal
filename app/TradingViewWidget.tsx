"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    TradingView: any;
  }
}

interface Props {
  symbol: string;
  
}

export default function TradingViewWidget({
  symbol,
  interval,
}: Props) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    containerRef.current!.innerHTML = "";

    const script =
      document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";

    script.type = "text/javascript";

    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `NSE:${symbol}`,
      interval,
      timezone: "Asia/Kolkata",
      theme: "dark",
      style: "1",
      locale: "en",
      hide_top_toolbar: true,
      hide_legend: false,
      allow_symbol_change: false,
      backgroundColor: "#111827",
      gridColor: "rgba(255,255,255,0.05)",
      save_image: false,
    });

    containerRef.current?.appendChild(script);

  }, [symbol, interval]);

  return (
    <div className="w-full h-full">
      <div
        className="tradingview-widget-container h-full"
        ref={containerRef}
      />
    </div>
  );
}