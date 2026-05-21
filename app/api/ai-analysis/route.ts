import { NextResponse } from "next/server";

export async function POST(req: Request) {

  try {

    const body =
      await req.json();

    const {
      symbol,
      rsi,
      trend,
      volatility,
      signal,
      change,
    } = body;

    const prompt = `
You are a professional AI trading analyst.

Analyze this stock:

Symbol: ${symbol}

RSI: ${rsi}

Trend: ${trend}

Volatility: ${volatility}

Signal: ${signal}

Price Change: ${change}%

Give:
1. Short market interpretation
2. Risk warning
3. Momentum outlook

Keep response concise and professional.
`;

    const response =
      await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

    const data =
      await response.json();

    const text =
      data?.candidates?.[0]
        ?.content?.parts?.[0]
        ?.text ||
      "AI analysis unavailable";

    return NextResponse.json({
      analysis: text,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json({
      error:
        "AI analysis failed",
    });

  }

}