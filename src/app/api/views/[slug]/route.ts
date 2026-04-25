import { NextResponse } from "next/server";
import { getViews, incrementView } from "@/lib/views";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return NextResponse.json({ views: getViews(slug) });
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return NextResponse.json({ views: incrementView(slug) });
}
