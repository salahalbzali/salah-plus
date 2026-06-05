"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/967775307315"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-40 right-5 z-50 bg-green-500 text-white p-4 rounded-full shadow-xl hover:bg-green-600 transition-all hover:scale-110"
      aria-label="تواصل واتساب"
    >
      <FaWhatsapp size={24} />
    </a>
  );
}
