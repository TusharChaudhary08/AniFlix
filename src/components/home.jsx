import { useState, useEffect, useMemo  } from "react";
import { easeOut, motion, AnimatePresence } from "motion/react";
import { useNavigate, useLocation } from "react-router";
import useAnimeData from "./hooks/useAnimeInfo";

import Poster3 from "../assets/BackgroundImages/tanjiro-kamado.webp";
import mainPoster from "../assets/BackgroundImages/chainsaw-man.webp";
import Poster1 from "../assets/background-anime.webp";


import arrowLeft from "../assets/arrow-left(1).svg";
import arrowRight from "../assets/arrow-right(1).svg";

function Home() {
  const slides = [mainPoster, Poster1, Poster3];

   

  return (
    <>
    <div>
      <div className="relative w-full h-160 max-md:h-140 bg-black">
        <HeroPoster poster={mainPoster}/>

        {/* hero section fading styles */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient( 180deg,transparent 40%, rgba(5, 11, 24, 0.4) 60%,rgba(5, 11, 24, 0.85) 78%,#050B18 100%)",
          }}
        />

        <div className="absolute  bottom-0 w-full">
          <svg
            width="100%"
            height="60"
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full max-w-full"
          >
            <defs>
              <linearGradient
                id="aniFlixLineGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {/* Dark teal → Logo cyan → Dark teal */}
                <stop offset="0%" stopColor="#001a1d" />
                <stop offset="30%" stopColor="#16808c" />
                <stop offset="50%" stopColor="#69D2DD" />
                <stop offset="70%" stopColor="#16808c" />
                <stop offset="100%" stopColor="#001a1d" />
              </linearGradient>
            </defs>

            {/* Black curved background */}
            <path
              d="M 0 80 L 0 65 Q 720 -15 1440 65 L 1440 80 Z"
              fill="#050B18"
            />

            {/* Cyan curved line */}
            <path
              d="M 0 65 Q 720 -15 1440 65"
              stroke="url(#aniFlixLineGrad)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <AnimeList 
      sortList={"TRENDING_DESC" }
      title={"Trending now"}
      />

      <AnimeList
      sortList={"POPULARITY_DESC" }
      title={"All Time Popular"}
      />

      <AnimeList
      sortList={"START_DATE_DESC" }
      title={"New Releases"}
      />



      <AnimeList
      sortList={"SCORE_DESC" }
      title={"Top Rated"}
      />



      

    </div>
    </>
  );
}

function AnimeList({sortList , title}) {

  const query = `query Page($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort]) {

  Page(page: $page, perPage: $perPage) {

    media(sort: $sort,type: $type) {
      title {
        english
        romaji
        native
      }
     
      coverImage {
        large
      }
      id
    }
    
  }
 
}`;

  const variables = useMemo(() => ({
    page: 1,
    perPage: 10,
    type: "ANIME",
    sort: sortList
  }), []);

  const { data, loading, error } = useAnimeData(query, variables);


  return (

    <>

      <section className="relative px-5 max-md:px-8 max-sm:px-6  py-5 w-full bg-cover bg-center overflow-hidden bg-[#050B18] ">
        {/* Your actual content - needs higher z-index to sit above the layers */}
        <div className="relative z-10 ">
          <h1 className="text-4xl lg:px-5 font-bold text-white mb-5 pb-2 pt-2 max-md:text-3xl max-sm:text-2xl">
            {title}
          </h1>

          <div className="flex lg:px-5 lg:py-3 gap-10 overflow-x-auto scrollbar-none max-md:gap-8 max-sm:gap-6">
            {loading ? (
              <AnimeCardListSkeleton />
            ) : (
              <AnimeCardList data={data} />
            )}
          </div>
        </div>
      </section >



    </>
  );
}

function AnimeCardList({ data }) {
  return (
    <>

      {data?.Page?.media?.map((anime) => (
        <AnimeCard key={anime?.id} anime={anime} />
      ))}

    </>
  );
}

function AnimeCard({ anime }) {
  const navigate = useNavigate();
    return (
        <>
    <div 
    id={anime?.id} 
    onClick={(e) => navigate(`/overview/${anime?.id}`)}
    className="group flex flex-col w-fit text-center cursor-pointer transition-transform duration-300 lg:hover:scale-[1.06]">
    <div className="w-45 h-65 max-lg:w-40 max-lg:h-55 max-md:w-40 max-md:h-55 max-sm:w-30 max-sm:h-45 rounded-xl overflow-hidden bg-gray-700  transition-transform duration-300 ">
        <img
            src={anime?.coverImage?.large}
            alt=""
            className="w-full h-full object-cover object-center transition-transform duration-300 lg:group-hover:scale-105"
        />
    </div>

    <div className="w-45 max-lg:w-40 max-md:w-40 max-sm:w-30">
        <h1 className="text-left text-sm max-sm:text-xs pt-2 line-clamp-2 font-semibold text-gray-100 leading-snug group-hover:text-white transition-colors">
            {anime?.title?.english || anime?.title?.romaji}
        </h1>
    </div>
</div>
        </>
    )
}

function HeroPoster({ poster }) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      
      <img
        src={poster}
        alt=""
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        loading="eager"
        decoding="async"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent">
        <div className="absolute left-10 max-md:left-5 top-1/2 -translate-y-1/2 text-[70px] font-bold text-white p-2">
          
          <span className="block text-5xl max-md:text-4xl max-sm:text-3xl text-gray-200 font-semibold">
            Discover, Watchlist, Track
          </span>

          <span className="block text-7xl max-md:text-5xl max-sm:text-4xl mt-2 bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
            Your Favourite Anime
          </span>

          <span className="block text-4xl max-md:text-3xl max-sm:text-2xl mt-2 text-gray-300 font-medium">
            At One Place
          </span>

        </div>
      </div>
    </div>
  );
}



function AnimeCardListSkeleton() {
  return (
    <>

      {Array.from({ length: 10 }).map((_, index) => (

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



export default Home;
