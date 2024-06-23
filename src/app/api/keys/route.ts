import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

const keys = {
  groqApiKey: process.env.GROQ_API_KEY || "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",
  cartesiaApiKey: process.env.CARTESIA_API_KEY || "77c111e1-c696-4ba0-9b37-6d310fb35621",
};

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(keys);
}
