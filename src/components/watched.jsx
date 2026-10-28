
import React from "react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import useAnimeData from "./hooks/useAnimeInfo";

function Watched() {

  const savedWatched = localStorage.getItem("watched");

  const [watched, setWatched] = useState(() => JSON.parse(savedWatched) || []);


  function removeAnimeId(id) {
    const updatedWatched = watched.filter(
      (animeId) => animeId !== id
    );

    localStorage.setItem("watchlist", JSON.stringify(updatedWatched));
    setWatched(updatedWatched);
    // message 
    toast.success("Anime removed from watched list!");
  }

  if (watched.length === 0) {
    return (
      <div className=" bg-[#050B18]">
        <EmptyState />
      </div>
    )


  }

  return <WatchedAnime watched={watched} removeAnimeId={removeAnimeId} />


}

function WatchedAnime({ watched, removeAnimeId }) {

  const query = `
  query {
    ${watched.map((id, index) => `
      anime${index}: Media(id: ${id}) {
        id
        title {
          english
          romaji
          }
        coverImage{
          large
          }
      }
    `).join("")}
  }

`;
  const variables = useMemo(() => { return {} }, []);
  const { data, loading, error } = useAnimeData(query, variables);

  const animeList = Object.values(data || {})


  if (error) {
    return <p className="text-white">Failed to load anime.</p>;
  }

  return (
    <>
      <div className=" bg-[#050B18] ">


        <div className=' pt-30  mx-10 border-b-3 border-white/15'>

          <div className='text-3xl max-sm:text-2xl pb-3'>
            Watched Anime
          </div>

        </div>

        <div className='mt-10 mx-10 pb-30 grid justify-items-center grid-cols-2 gap-x-4 gap-y-10 max-sm:gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>


          {
            loading ?
              <AnimeCardSkeleton />
              : animeList.length === 0 ?
                (<EmptyState />)
                :
                (
                  <>
                    {animeList.map((animeData) => (
                      <AnimeCard key={animeData.id} anime={animeData} removeAnimeId={removeAnimeId} />
                    ))}
                  </>
                )


          }

        </div>




      </div>

    </>

  )
}







function AnimeCard({ anime, removeAnimeId }) {
  const navigate = useNavigate();

  return (
    <div
      id={anime?.id}
      onClick={() => navigate(`/overview/${anime?.id}`)}
      className="group flex flex-col w-fit text-center cursor-pointer transition-transform duration-300 lg:hover:scale-[1.06]"
    >
      {/* Anime Poster */}
      <div className="relative w-45 h-65 max-lg:w-40 max-lg:h-55 max-md:w-40 max-md:h-55 max-sm:w-30 max-sm:h-45 rounded-xl overflow-hidden bg-gray-700">
        <img
          src={anime?.coverImage?.large}
          alt={anime?.title?.english || anime?.title?.romaji}
          className="w-full h-full object-cover object-center transition-transform duration-300 lg:group-hover:scale-105"
        />

        {/* Remove Button */}
        <button
          type="button"
          aria-label="Remove from watchlist"
          onClick={(e) => {
            e.stopPropagation();
            removeAnimeId(anime.id);
          }}
          className="absolute top-2 right-2 w-9 h-9 max-sm:w-8 max-sm:h-8 flex items-center justify-center rounded-full border border-red-300/25 bg-red-950/40 text-red-200/90 backdrop-blur-md shadow-lg transition-all duration-200 hover:bg-red-600/80 hover:border-red-300/60 hover:text-white hover:scale-110 active:scale-95"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-4 h-4"
          >
            <path
              d="M5 5l14 14M19 5L5 19"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Anime Title */}
      <div className="w-45 max-lg:w-40 max-md:w-40 max-sm:w-30">
        <h1 className="text-left text-sm max-sm:text-xs pt-2 line-clamp-2 font-semibold text-gray-100 leading-snug group-hover:text-white transition-colors">
          {anime?.title?.english || anime?.title?.romaji}
        </h1>
      </div>
    </div>
  );
}



function AnimeCardSkeleton() {
  return (
    <>

      {Array.from({ length: 6 }).map((_, index) => (

        <div key={index}>
          <div className="w-45 h-65 max-lg:w-40 max-lg:h-55 max-md:w-40 max-md:h-55 max-sm:w-30 max-sm:h-45 rounded-xl bg-white/20 overflow-hidden  backdrop:backdrop-blur-2xl animate-pulse"> </div>

          <div className="mt-2">
            <div className=" my-2 w-2/3 h-2 bg-white/20 rounded-2xl animate-pulse"></div>
            <div className="my-2 w-1/2 h-2 bg-white/20 rounded-2xl animate-pulse"></div>
            <div className="my-2 w-full h-2 bg-white/20 rounded-2xl animate-pulse"></div>
            <div className="my-2 w-full h-2 bg-white/20 rounded-2xl animate-pulse"></div>
          </div>

        </div>


      ))}
    </>
  );
}




function EmptyState({ type = "watched" }) {
  const isWatchlist = type === "watchlist";

  return (
    <div className=" min-h-[95vh] flex flex-col items-center justify-center px-5 text-center">

      {/* Icon */}
      <div className="relative mb-6">

        {/* Glow */}
        {/* <div className="absolute inset-0 bg-cyan-400/10 blur-3xl rounded-full" /> */}

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

export default Watched