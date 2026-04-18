import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";
import { connectDB } from "@/lib/mongodb";

// Notice the type of params is now a Promise!
export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await connectDB();
    
    // 1. AWAIT the params to unwrap them! 🎁
    const resolvedParams = await params; 
    const slug = resolvedParams.slug;
    
    // 2. Now search the database with the real slug
    const event = await Event.findOne({ slug }).lean();
    
    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
    
    return NextResponse.json({ event }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch Event Error:", error);
    return NextResponse.json({ message: "Failed to fetch event" }, { status: 500 });
  }
}