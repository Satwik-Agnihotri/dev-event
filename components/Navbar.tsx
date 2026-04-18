import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="w-full p-5 border-b border-white/10 bg-black/3 backdrop-blur-md sticky top-0 z-50">
      <nav className="flex items-center gap-4 max-w-7xl mx-auto">
        <Link href="/" className="logo flex items-center gap-2">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p className="font-bold text-xl">DevEvent</p>
        </Link>

        <ul className="flex gap-6 ml-auto text-sm text-gray-300">
          <li><Link href="/" className="hover:text-white transition">Home</Link></li>
          {/* Changed to /#events so it scrolls to the events section on the homepage */}
          <li><Link href="/#events" className="hover:text-white transition">Events</Link></li>
          {/* Fixed the broken link from /create-event to /create */}
          <li><Link href="/create" className="hover:text-white transition">Create Event</Link></li>
        </ul>
      </nav>
    </header>
  );
}