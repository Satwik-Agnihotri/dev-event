"use client";

import { useState } from "react";
import { createBooking } from "@/lib/actions/booking.actions";

export default function BookEventForm({ eventId }: { eventId: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleBookEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await createBooking(eventId, email);
    
    setStatus(result.success ? "success" : "error");
    setMessage(result.message);
  };

  return (
    // Sleek dark solid container
    <div className="bg-zinc-950 border border-purple-500/20 p-8 md:p-10 rounded-3xl text-center flex flex-col items-center justify-center shadow-xl">
      
      {/* THE SLASHABLE TITLE */}
      <div className="relative inline-block mb-3">
        <h3 className={`text-3xl font-extrabold transition-colors duration-500 ${status === 'success' ? 'text-zinc-600' : 'text-white'}`}>
          Book your event
        </h3>
        
        {/* The Green Slash Line Magic 🗡️ */}
        <div 
          className={`absolute top-1/2 left-0 h-1 bg-green-500 transform -translate-y-1/2 transition-all duration-700 ease-in-out ${
            status === 'success' ? "w-full" : "w-0"
          }`}
        ></div>
      </div>

      <p className="text-zinc-400 mb-8 text-lg">Limited seats available. Be the first to join!</p>

      {/* Success State vs Form State */}
      {status === "success" ? (
        <div className="bg-green-500/10 border border-green-500/30 p-6 rounded-xl w-full">
          <h3 className="text-xl font-bold text-green-400 mb-2">You're In! 🎉</h3>
          <p className="text-green-200/80">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleBookEvent} className="w-full flex flex-col gap-4">
          <input 
            type="email" 
            required 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 bg-zinc-900 border border-white/5 rounded-xl outline-none focus:border-purple-500 focus:bg-zinc-800 transition-all text-white placeholder:text-zinc-500"
          />
          <button 
            type="submit" 
            disabled={status === "loading"}
            className="w-full bg-purple-600 text-white font-extrabold text-xl py-4 rounded-xl hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none disabled:transform-none"
          >
            {status === "loading" ? "Securing Spot..." : "RSVP Now 🚀"}
          </button>
          
          {status === "error" && <p className="text-red-400 text-sm mt-2">{message}</p>}
        </form>
      )}
    </div>
  );
}