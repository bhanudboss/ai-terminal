"use client";

import {
  createChart,
} from "lightweight-charts";

import {
  useEffect,
  useRef,
} from "react";

export default function Chart() {

  const chartContainerRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    if (!chartContainerRef.current) return;

    const chart = createChart(
      chartContainerRef.current,
      {
        layout: {
          background: {
            color: "#111827",
          },

          textColor: "#d1d5db",
        },

        grid: {
          vertLines: {
            color:
              "rgba(255,255,255,0.05)",
          },

          horzLines: {
            color:
              "rgba(255,255,255,0.05)",
          },
        },

        width:
          chartContainerRef.current.clientWidth,

        height:
          chartContainerRef.current.clientHeight,
      }
    );

    const candlestickSeries =
      chart.addCandlestickSeries();

    candlestickSeries.setData([
      {
        time: "2025-01-01",
        open: 55000,
        high: 55200,
        low: 54800,
        close: 55120,
      },

      {
        time: "2025-01-02",
        open: 55120,
        high: 55300,
        low: 55000,
        close: 55280,
      },

      {
        time: "2025-01-03",
        open: 55280,
        high: 55500,
        low: 55150,
        close: 55420,
      },

      {
        time: "2025-01-04",
        open: 55420,
        high: 55600,
        low: 55350,
        close: 55550,
      },
    ]);

    const handleResize = () => {

      chart.applyOptions({
        width:
          chartContainerRef.current!
            .clientWidth,
      });

    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

      chart.remove();

    };

  }, []);

  return (
    <div
      ref={chartContainerRef}
      className="w-full h-full"
    />
  );
}