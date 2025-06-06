// src/app/components/Navbar.tsx
import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold hover:text-blue-200">
          Meeting Room Booker
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/office" className="hover:text-blue-200">
              Office View
            </Link>
          </li>
          <li>
            <Link href="/timeline" className="hover:text-blue-200">
              Timeline
            </Link>
          </li>
          <li>
            <Link href="/my-reservations" className="hover:text-blue-200">
              My Reservations
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
