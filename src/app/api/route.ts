import JWT from "jsonwebtoken";
import { URL } from "url";
import { NextResponse } from "next/server";
import Ably from "ably/promises";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("clientId");

  const ablyApiKey = process.env.ABLY_API_KEY || "ablyApiKey";
  const client = new Ably.Realtime({ key: ablyApiKey });
  const tokenRequestData = await client.auth.createTokenRequest({
    clientId: clientId as string,
  });

  return NextResponse.json(tokenRequestData);
}

