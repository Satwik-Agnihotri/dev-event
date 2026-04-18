import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
import Event from "@/database/event.model";
import { connectDB } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

// 👇 The new direct-to-database function!
async function getEvents() {
  try {
    await connectDB();
    const eventsData = await Event.find().sort({ createdAt: -1 }).lean();
    
    // We stringify and parse to convert complex MongoDB objects to plain JS
    return JSON.parse(JSON.stringify(eventsData)); 
  } catch (error) {
    console.error("Failed to fetch events from DB:", error);
    return [];
  }
}

export default async function Home() {
  // Grab the events directly!
  const events = await getEvents();

  return (
    <main className="min-h-screen p-8 max-w-7xl mx-auto">
      <section className="flex flex-col items-center mt-20">
        <h1 className="text-center text-5xl md:text-7xl font-bold tracking-tight">
          The hub for every dev <br /> event you can't miss
        </h1>
        <p className="text-center mt-5 text-gray-400 max-w-lg text-lg">
          Hackathons, meetups, and conferences all in one place.
        </p>
        <ExploreBtn />
      </section>

      <div className="mt-32 space-y-7" id="events">
        <h3 className="text-3xl font-semibold">Featured Events</h3>
        
        {/* Check if we actually have events before mapping! */}
        {events.length > 0 ? (
          <ul className="events flex flex-wrap gap-8 list-none">
            {events.map((event: any) => (
              <li key={event._id}>
                {/* Pass the real database data into your card! */}
                <EventCard 
                  title={event.title}
                  slug={event.slug}
                  image={event.image}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No events found. Create one first!</p>
        )}
      </div>
    </main>
  );
}