import React from "react";

export default function AniFlixLogo({ className = "" }) {
  return (
    <svg
      className={`text-3xl max-md:text-2xl ${className}`}
      style={{ width: "4.2em", height: "auto" }}
      viewBox="0 0 320 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aniflixTeal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      <text
        x="12"
        y="54"
        fontWeight="800"
        fontSize="44"
        letterSpacing="0.5"
        fill="url(#aniflixTeal)"
        fontFamily="Segoe UI, Arial, sans-serif"
      >
        Ani<tspan fill="#f5fffd">Flix</tspan>
      </text>
    </svg>
  );
}
