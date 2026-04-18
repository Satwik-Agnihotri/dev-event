import Image from "next/image";
import { notFound } from "next/navigation";
import BookEventForm from "@/components/BookEventForm";
import EventCard from "@/components/EventCard";
import { getSimilarEventsBySlug } from "@/lib/actions/event.actions";
import Event from "@/database/event.model";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 👇 The new direct-to-database function!
async function getEvent(slug: string) {
  try {
    await connectDB();
    const event = await Event.findOne({ slug }).lean();
    if (!event) return null;
    
    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    console.error("Failed to fetch event from DB:", error);
    return null;
  }
}

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Unwrap the Promise!
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // 2. Fetch data directly from DB
  const event = await getEvent(slug);
  if (!event) return notFound();

  const similarEvents = await getSimilarEventsBySlug(slug);

  return (
    <main className="relative min-h-screen text-white pb-20 pt-28 px-6 md:px-12 max-w-[1400px] mx-auto z-10">
      
      {/* 🚀 THE SPLIT GRID LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* ========================================= */}
        {/* LEFT COLUMN: 66% Width (col-span-8)       */}
        {/* ========================================= */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* 1. Cover Image */}
          <div className="relative w-full h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl group border border-white/5">
            <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-2xl tracking-tight">{event.title}</h1>
            </div>
          </div>

          {/* 2. Description Box */}
          <div className="bg-zinc-900/80 p-8 rounded-3xl border border-white/5">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">About the Event</h3>
            <p className="text-zinc-300 text-lg leading-relaxed">{event.description || "Join us for an incredible gathering to connect, build, and scale your skills."}</p>
            {event.overview && <p className="text-zinc-400 mt-4 text-md leading-relaxed">{event.overview}</p>}
          </div>

          {/* 3. Icons Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-4 bg-zinc-900/80 p-5 rounded-2xl border border-white/5">
              <Image src="/icons/pin.svg" alt="Location" width={28} height={28} className="opacity-80" />
              <span className="font-semibold text-zinc-200">{event.location}</span>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/80 p-5 rounded-2xl border border-white/5">
              <Image src="/icons/calendar.svg" alt="Date" width={28} height={28} className="opacity-80" />
              <span className="font-semibold text-zinc-200">{event.date} • {event.time}</span>
            </div>
            <div className="flex items-center gap-4 bg-zinc-900/80 p-5 rounded-2xl border border-white/5">
              <Image src="/icons/mode.svg" alt="Mode" width={28} height={28} className="opacity-80" />
              <span className="font-semibold text-zinc-200 capitalize">{event.mode} Event</span>
            </div>
          </div>

          {/* 4. Tags */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Event Categories</h3>
            <div className="flex flex-wrap gap-3">
              {event.tags && event.tags.length > 0 ? (
                event.tags.map((tag: string, i: number) => (
                  <span key={i} className="px-5 py-2 bg-zinc-900 border border-purple-500/20 rounded-full text-sm font-bold text-purple-400 uppercase tracking-wider">
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-zinc-500">No tags found.</p>
              )}
            </div>
          </div>

          {/* 5. Similar Events Section */}
          <div className="mt-6 border-t border-white/5 pt-10">
             <h3 className="text-3xl font-bold mb-6 text-white">Similar Events</h3>
             {similarEvents.length > 0 ? (
               <div className="flex flex-wrap gap-6">
                 {similarEvents.map((simEvent: any) => (
                   <EventCard 
                     key={simEvent._id}
                     title={simEvent.title}
                     slug={simEvent.slug}
                     image={simEvent.image}
                     location={simEvent.location}
                     date={simEvent.date}
                     time={simEvent.time}
                   />
                 ))}
               </div>
             ) : (
               <p className="text-zinc-500">No similar events found at the moment.</p>
             )}
          </div>

        </div>

        {/* ========================================= */}
        {/* RIGHT COLUMN: 33% Width (col-span-4)      */}
        {/* ========================================= */}
        <div className="lg:col-span-4 relative">
          {/* STICKY BOX */}
          <div className="sticky top-32 flex flex-col gap-6">
            <BookEventForm eventId={event._id} />
          </div>
        </div>

      </div>
    </main>
  );
}