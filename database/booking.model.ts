"use server";

import { Schema, model, models } from "mongoose";

export interface IBooking extends Document {
  _id: string;
  eventId: string;
  email: string;
}

const BookingSchema = new Schema({
  eventId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  email: { 
    type: String, 
    required: true,
    match: [/.+\@.+\..+/, 'Please use a valid email address'] 
  },
}, {
  timestamps: true
});

// Adding indexes for faster queries (He mentions this in the video!)
BookingSchema.index({ eventId: 1 });
BookingSchema.index({ email: 1 });

const Booking = models.Booking || model("Booking", BookingSchema);
export default Booking;