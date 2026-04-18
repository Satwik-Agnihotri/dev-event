import ExploreBtn from '@/components/ExploreBtn';
import EventCard from '@/components/EventCard';
export const dynamic = "force-dynamic";
export default async function Home() {
  
  // 1. Grab the base URL (Declared only ONCE! 😉)
 const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  console.log("SERVER CHECK - Base URL is:", baseUrl);

  // 2. Fetch the data directly from your API!
  const response = await fetch(`${baseUrl}/api/events`);

  // 3. X-RAY VISION: If the response is NOT okay, print the raw text!
  if (!response.ok) {
    const errorText = await response.text();
    console.error("🚨 API BROKE! Here is the raw response:", errorText);
    
    // Instead of completely crashing, let's show an error message on the screen
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-red-500 text-2xl">API Error! Check your VS Code Terminal.</h1>
      </main>
    );
  }

  // 4. If it is okay, parse the JSON normally
  const data = await response.json();
  const events = data.events || [];

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
        
        {/* 5. Check if we actually have events before mapping! */}
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