import { NextResponse } from "next/server";

export async function GET() {

  const apiKey =
    process.env
      .NEXT_PUBLIC_FINNHUB_API_KEY;

  const symbols = [
    "AAPL",
    "TSLA",
    "NVDA",
    "MSFT",
    "AMZN",
  ];

  try {

    const results =
      await Promise.all(

        symbols.map(async (symbol) => {

          /*
            QUOTE DATA
          */

          const quoteResponse =
            await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`
            );

          const quoteData =
            await quoteResponse.json();

          /*
            BASIC VALUES
          */

          const currentPrice =
            quoteData.c || 0;

          const previousClose =
            quoteData.pc || 0;

          const change =
            quoteData.dp || 0;

          /*
            SIMULATED EMA
            (temporary approximation)
          */

          const ema20 =
            previousClose * 0.98;

          const ema50 =
            previousClose * 0.95;

          /*
            SIMULATED RSI
            based on movement strength
          */

          let rsi = 50;

          if (change > 4) {

            rsi = 74;

          }

          else if (change > 2) {

            rsi = 65;

          }

          else if (change < -4) {

            rsi = 28;

          }

          else if (change < -2) {

            rsi = 38;

          }

          /*
            TREND DETECTION
          */

          let trend =
            "Neutral";

          if (
            currentPrice > ema20 &&
            ema20 > ema50
          ) {

            trend =
              "Strong Uptrend";

          }

          else if (
            currentPrice > ema20
          ) {

            trend =
              "Uptrend";

          }

          else if (
            currentPrice < ema20 &&
            ema20 < ema50
          ) {

            trend =
              "Strong Downtrend";

          }

          else {

            trend =
              "Weak Structure";

          }

          /*
            SIGNAL ENGINE
          */

          let signal =
            "WAIT";

          let sentiment =
            "Neutral";

          let tradeQuality =
            5;

          let action =
            "Wait for confirmation";

          let urgency =
            "Low";

          let volatility =
            "Low";

          let breakout =
            false;

          /*
            VOLATILITY
          */

          if (
            Math.abs(change) > 4
          ) {

            volatility =
              "High";

          }

          else if (
            Math.abs(change) > 2
          ) {

            volatility =
              "Medium";

          }

          /*
            AI LOGIC
          */

          if (
            rsi > 60 &&
            trend.includes("Uptrend")
          ) {

            signal =
              "BREAKOUT";

            sentiment =
              "Bullish";

            tradeQuality = 9;

            action =
              "Momentum continuation likely";

            urgency =
              "High";

            breakout = true;

          }

          else if (
            rsi > 50
          ) {

            signal =
              "WATCH";

            sentiment =
              "Bullish";

            tradeQuality = 7;

            action =
              "Strength improving gradually";

            urgency =
              "Medium";

          }

          else if (
            rsi < 40
          ) {

            signal =
              "CAUTION";

            sentiment =
              "Bearish";

            tradeQuality = 4;

            action =
              "Weak structure detected";

            urgency =
              "Medium";

          }

          else if (
            rsi < 30
          ) {

            signal =
              "AVOID";

            sentiment =
              "Strong Bearish";

            tradeQuality = 2;

            action =
              "Heavy weakness detected";

            urgency =
              "High";

          }

          return {

            symbol,

            price:
              currentPrice,

            change,

            sentiment,

            tradeQuality,

            action,

            breakout,

            volatility,

            urgency,

            signal,

            /*
              NEW INDICATORS
            */

            rsi,

            ema20,

            ema50,

            trend,

          };

        })

      );

    return NextResponse.json(results);

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error:
        "Failed to fetch market data",
    });

  }

}