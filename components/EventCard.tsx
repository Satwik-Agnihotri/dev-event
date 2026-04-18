import Image from 'next/image';
import Link from 'next/link';

interface Props {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export default function EventCard({ title, image, slug, location, date, time }: Props) {
  return (
    <Link href={`/events/${slug}`} id="event-card" className="block border border-gray-800 p-4 rounded-xl hover:border-gray-500 transition-all bg-gray-900/50">
      {/* Fallback image style applied if image is missing from public folder */}
      <div className="w-[410px] h-[300px] bg-gray-800 rounded-lg overflow-hidden relative">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      
      <h3 className="title font-bold text-xl mt-4">{title}</h3>
      
      <div className="flex flex-row gap-2 items-center mt-3 text-gray-400 text-sm">
        <Image src="/icons/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      
      <div className="date-time mt-3 flex flex-col gap-2 text-gray-400 text-sm">
        <div className="flex flex-row gap-2 items-center">
          <Image src="/icons/calendar.svg" alt="date" width={14} height={14} />
          <p>{date}</p>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <Image src="/icons/clock.svg" alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}