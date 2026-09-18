
import React from "react";
import { Link } from "react-router";



function Watched() {
  return (
    <>
    <div className=" bg-[#050B18]">
    <EmptyState type="watched"/>
    </div>
    </>
  )
}

export default Watched




function EmptyState({ type = "watchlist" }) {
  const isWatchlist = type === "watchlist";

  return (
    <div className=" min-h-[95vh] flex flex-col items-center justify-center px-5 text-center">

      {/* Icon */}
      <div className="relative mb-6">

        {/* Glow */}
        <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full" />

        <div className="relative w-28 h-28 rounded-3xl bg-[#0a1224] border border-white/10 flex items-center justify-center">

          {isWatchlist ? (
            /* Watchlist SVG */
            <svg
              viewBox="0 0 24 24"
              className="w-14 h-14 text-cyan-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path
                d="M6.5 4.5A2.5 2.5 0 0 1 9 2h6a2.5 2.5 0 0 1 2.5 2.5V21l-5.5-3-5.5 3V4.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              <path
                d="M10 7h4M10 10h4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            /* Watched SVG */
            <svg
              viewBox="0 0 24 24"
              className="w-14 h-14 text-cyan-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <rect
                x="3"
                y="5"
                width="18"
                height="14"
                rx="2"
              />

              <path
                d="m10 9 5 3-5 3V9Z"
                fill="currentColor"
                stroke="none"
              />

              <path
                d="M7 3v2M17 3v2M3 9h18"
                strokeLinecap="round"
              />
            </svg>
          )}

        </div>
      </div>


      {/* Heading */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white">
        {isWatchlist ? (
          <>
            Your watchlist is{" "}
            <span className="text-cyan-300">empty</span>
          </>
        ) : (
          <>
            Nothing here{" "}
            <span className="text-cyan-300">yet</span>
          </>
        )}
      </h1>


      {/* Message */}
      <p className="mt-3 max-w-md text-sm sm:text-base text-gray-400 leading-relaxed">
        {isWatchlist
          ? "Save your favourite anime here and come back anytime to watch them later."
          : "Anime you mark as watched will appear here."
        }
      </p>


      {/* Explore button */}
      {/* <Link
        to="/explore"
        className="
          mt-7
          inline-flex items-center gap-2
          px-6 py-3
          rounded-full
          border border-cyan-300/70
          text-cyan-100
          bg-cyan-300/5
          hover:bg-cyan-300/10
          hover:border-cyan-300
          transition-all duration-200
          active:scale-95
          text-sm sm:text-base
        "
      >

        {/* Compass SVG 
        <svg
          viewBox="0 0 24 24"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        >
          <circle cx="12" cy="12" r="9" />

          <path
            d="m15.5 8.5-2 5-5 2 2-5 5-2Z"
            strokeLinejoin="round"
          />
        </svg>

        Explore Anime
      </Link> */}

    </div>
  );
}