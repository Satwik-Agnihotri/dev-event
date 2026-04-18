"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    location: "",
    date: "",
    time: "",
    mode: "online",
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("location", formData.location);
      data.append("date", formData.date);
      data.append("time", formData.time);
      data.append("mode", formData.mode);
      
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await fetch("/api/events", {
        method: "POST",
        body: data,
      });

      if (response.ok) {
        alert("🎉 Event Created Successfully!");
        router.push("/"); 
      } else {
        const errorData = await response.json();
        alert(`❌ Error: ${errorData.message || "Failed to create event"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went completely wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // Background removed here too!
    <main className="relative min-h-screen text-white pb-20">

      <div className="max-w-2xl mx-auto mt-24 px-6 relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 tracking-tight drop-shadow-lg">
          Create New Event
        </h1>
        <p className="text-purple-100/80 mb-10 text-lg drop-shadow-md">
          Launch your next big thing into the dev ecosystem.
        </p>
        
        {/* GLASSMORPHISM FORM CONTAINER */}
        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-6 bg-white/[0.04] backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
        >
          
          <div className="flex flex-col gap-2">
            <label className="text-gray-200 font-medium text-sm ml-1">Event Title</label>
            <input required type="text" name="title" onChange={handleChange} 
              className="p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-purple-400 focus:bg-black/40 transition-all placeholder:text-gray-500" 
              placeholder="e.g. Hack The Future 2026" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-200 font-medium text-sm ml-1">URL Slug (Must be unique)</label>
            <input required type="text" name="slug" onChange={handleChange} 
              className="p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-purple-400 focus:bg-black/40 transition-all placeholder:text-gray-500" 
              placeholder="e.g. hack-the-future-2026" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-200 font-medium text-sm ml-1">Cover Image</label>
            <input required type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} 
              className="p-3 bg-black/20 border border-white/10 rounded-xl text-gray-300 
              file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-bold 
              file:bg-white file:text-black hover:file:bg-purple-100 cursor-pointer transition-all" />
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-gray-200 font-medium text-sm ml-1">Location</label>
              <input required type="text" name="location" onChange={handleChange} 
                className="p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-purple-400 focus:bg-black/40 transition-all placeholder:text-gray-500" 
                placeholder="e.g. Main Auditorium" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-gray-200 font-medium text-sm ml-1">Mode</label>
              <select name="mode" onChange={handleChange} 
                className="p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-purple-400 focus:bg-black/40 transition-all text-white [&>option]:text-black">
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-gray-200 font-medium text-sm ml-1">Date</label>
              <input required type="text" name="date" onChange={handleChange} 
                className="p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-purple-400 focus:bg-black/40 transition-all placeholder:text-gray-500" 
                placeholder="e.g. Nov 15, 2026" />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-gray-200 font-medium text-sm ml-1">Time</label>
              <input required type="text" name="time" onChange={handleChange} 
                className="p-4 bg-black/20 border border-white/10 rounded-xl outline-none focus:border-purple-400 focus:bg-black/40 transition-all placeholder:text-gray-500" 
                placeholder="e.g. 10:00 AM" />
            </div>
          </div>

          <button disabled={isSubmitting} type="submit" 
            className="mt-6 bg-white text-black font-extrabold text-lg py-4 rounded-xl 
            hover:bg-purple-100 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] 
            transition-all duration-300 disabled:bg-white/20 disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:shadow-none">
            {isSubmitting ? "Uploading..." : "Publish Event"}
          </button>

        </form>
      </div>
    </main>
  );
}