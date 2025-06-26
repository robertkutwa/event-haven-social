import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white shadow px-6 py-4 flex items-center">
      <span className="text-2xl font-bold text-violet-600 mr-2">📅</span>
      <span className="text-2xl font-extrabold text-gray-800">EventPal</span>
    </header>
  );
}