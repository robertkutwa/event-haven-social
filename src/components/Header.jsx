import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex items-center justify-between">
      <div>
        <span className="text-2xl font-bold text-violet-600 mr-2">📅</span>
        <span className="text-2xl font-extrabold text-gray-800">EventPal</span>
      </div>
      <nav>
        <Link
          to="/profile"
          className="text-violet-600 font-semibold hover:underline"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}