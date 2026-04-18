"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function ExploreBtn() {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto flex flex-col items-center gap-2 text-gray-300 hover:text-white transition-colors">
      <Link href="#events">Explore Events</Link>
      <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24} />
    </button>
  );
}