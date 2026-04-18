import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import Event from "@/database/event.model";
import { connectDB } from "@/lib/mongodb";

// ==========================================
// 1. CREATE AN EVENT (The POST Request)
// ==========================================
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const formData = await req.formData();

    const file = formData.get("image") as File;
    if (!file || typeof file === "string") {
      return NextResponse.json({ message: "Image FILE is required" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "image", folder: "devevent" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    }) as { secure_url: string };

    const eventData = Object.fromEntries(formData);
    const tags = JSON.parse((formData.get("tags") as string) || "[]");
    const agenda = JSON.parse((formData.get("agenda") as string) || "[]");

    const createdEvent = await Event.create({
      ...eventData,
      image: uploadResult.secure_url,
      tags,
      agenda,
    });

    return NextResponse.json({ message: "Event created perfectly", event: createdEvent }, { status: 201 });
    
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
  }
}

// ==========================================
// 2. FETCH ALL EVENTS (The GET Request)
// ==========================================
export async function GET() {
  try {
    await connectDB();
    
    // Fetch all events from MongoDB, sorted by newest first
    const events = await Event.find().sort({ createdAt: -1 });
    
    return NextResponse.json({ message: "Events fetched successfully", events }, { status: 200 });
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ message: "Event fetching failed", error: error.message }, { status: 500 });
  }
}