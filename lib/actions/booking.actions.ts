"use server";

import Booking from "@/database/booking.model";
import { connectDB } from "@/lib/mongodb";

export async function createBooking(eventId: string, email: string) {
  try {
    await connectDB();
    
    // Check for duplicates
    const existingBooking = await Booking.findOne({ eventId, email });
    if (existingBooking) {
      return { success: false, message: "You have already registered for this event! 🎉" };
    }

    // Save to database
    await Booking.create({ eventId, email });
    return { success: true, message: "Successfully booked your spot! 🚀" };
  } catch (error) {
    console.error("Booking failed:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}