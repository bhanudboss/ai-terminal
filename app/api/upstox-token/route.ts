import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest
) {

  const code =
    request.nextUrl.searchParams.get(
      "code"
    );

  if (!code) {

    return NextResponse.json({
      error: "Missing code",
    });

  }

  try {

    const response = await fetch(
      "https://api.upstox.com/v2/login/authorization/token",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },

        body: new URLSearchParams({
          code,

          client_id:
            process.env
              .NEXT_PUBLIC_UPSTOX_API_KEY!,

          client_secret:
            process.env
              .UPSTOX_API_SECRET!,

          redirect_uri:
            "http://localhost:3000",

          grant_type:
            "authorization_code",
        }),
      }
    );

    const data =
      await response.json();

    return NextResponse.json(data);

  } catch (error) {

    return NextResponse.json({
      error: "Token exchange failed",
    });

  }

}