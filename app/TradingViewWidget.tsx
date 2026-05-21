"use client";

import { useEffect, useRef } from "react";

interface Props {
  symbol: string;
}

export default function TradingViewWidget({
  symbol,
}: Props) {

  const containerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script =
      document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";

    script.type = "text/javascript";

    script.async = true;

    script.innerHTML = JSON.stringify({
      symbols: [
        [
          `NSE:${symbol}|1D`,
        ],
      ],
      chartOnly: false,
      width: "100%",
      height: "100%",
      locale: "en",
      colorTheme: "dark",
      autosize: true,
      showVolume: false,
      showMA: false,
      hideDateRanges: false,
      hideMarketStatus: false,
      hideSymbolLogo: false,
      scalePosition: "right",
      scaleMode: "Normal",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      fontSize: "10",
      noTimeScale: false,
      valuesTracking: "1",
      changeMode: "price-and-percent",
      chartType: "candlesticks",
      lineWidth: 2,
      backgroundColor: "#111827",
      gridLineColor:
        "rgba(255,255,255,0.05)",
    });

    containerRef.current.appendChild(script);

  }, [symbol]);

  return (
    
        <div className="w-full h-full">
          <div
            ref={containerRef}
            className="tradingview-widget-container w-full h-full min-h-[500px]"
          />
        </div>
      
  );
}