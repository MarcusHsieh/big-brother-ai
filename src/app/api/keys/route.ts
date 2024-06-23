import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";

const keys = {
  groqApiKey: process.env.GROQ_API_KEY || "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",
  cartesiaApiKey: process.env.CARTESIA_API_KEY || "a4a0b422-d8b3-4624-9cec-6ff38b6b058f",
};

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(keys);
}
