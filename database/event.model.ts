import { Schema, model, models } from "mongoose";

export interface IEvent extends Document {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  overview?: string;
  image: string;
  location: string;
  date: string;
  time: string;
  mode?: string;
  audience?: string;
  agenda?: string[];
  organizer?: string;
  tags?: string[];
}

const EventSchema = new Schema({
  title: { type: String, required: true, maxlength: 100 },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  overview: { type: String },
  image: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, enum: ['offline', 'online', 'hybrid'], default: 'offline' },
  audience: { type: String },
  agenda: { type: [String], default: [] },
  organizer: { type: String },
  tags: { type: [String], default: [] }
}, {
  timestamps: true 
});

const Event = models.Event || model("Event", EventSchema);
export default Event;