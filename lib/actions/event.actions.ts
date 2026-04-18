"use server";

import Event from "@/database/event.model";
import { connectDB } from "@/lib/mongodb";

export async function getSimilarEventsBySlug(slug: string) {
  try {
    await connectDB();
    
    const currentEvent = await Event.findOne({ slug });
    if (!currentEvent) return [];

    const similarEvents = await Event.find({
      _id: { $ne: currentEvent._id }, // Exclude current event
      tags: { $in: currentEvent.tags } // Match at least one tag
    })
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

    return JSON.parse(JSON.stringify(similarEvents)); 
  } catch (error) {
    console.error("Failed to fetch similar events:", error);
    return [];
  }
}