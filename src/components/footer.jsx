import React from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import AniFlixLogo from "../assets/AniFlixLogo.jsx";

function Footer() {



  const topAnime = [
    { name: "One Piece", id: 21 },
    { name: "Attack on Titan", id: 16498 },
    { name: "Demon Slayer", id: 38000 },
    { name: "Jujutsu Kaisen", id: 145855 },
    { name: "Hunter x Hunter", id: 11061 },
    { name: "Steins;Gate", id: 196 },
    { name: "Death Note", id: 1535 },
    { name: "Bleach", id: 269 },
    { name: "Parasyte", id: 20623 },
    { name: "Pluto", id: 99080 },
  ];

  return (
    <footer className="bg-[#0A1224] border-t border-cyan-300/10">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo / About */}
          <div className="lg:col-span-1">

            <Link to="/" className="inline-block">
              <AniFlixLogo className="text-5xl max-sm:text-4xl max-md:text-5xl max-lg:text-6xl  " />
            </Link>

            <p className="mt-5 text-sm leading-6 text-slate-400 max-w-xs">
              Discover your next favorite anime. Explore trending shows,
              keep track of what you've watched, and build your personal
              watchlist.
            </p>

            <Link
              to="/search"
              className="inline-flex items-center mt-6 text-sm font-medium
                         text-cyan-300 hover:text-teal-300
                         transition-colors duration-200"
            >
              Explore Anime
              <span className="ml-2 transition-transform duration-200 group-hover:translate-x-1">
                →

              </span>
            </Link>

          </div>


          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Explore
            </h3>

            <div className="mt-5 flex flex-col gap-3">

              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behaviour: instant
                  });
                }}
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                Home
              </Link>



              <Link
                to="/watchlist"
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                My Watchlist
              </Link>

              <Link
                to="/watched"
                className="text-slate-400 hover:text-cyan-300 transition-colors"
              >
                Watched
              </Link>

            </div>
          </div>


          {/* Top Anime */}
          <div className="sm:col-span-2 lg:col-span-2">

            <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
              Top Anime
            </h3>

            <div className="mt-5 grid grid-cols-2  gap-x-8 gap-y-3">

              {topAnime.map((anime) => (
                <Link
                  key={anime.id}
                  to={`/overview/${anime.id}`}
                  className="text-sm text-slate-400 hover:text-cyan-300
                             transition-all duration-200
                             hover:translate-x-1"
                >
                  {anime.name}
                </Link>
              ))}

            </div>

          </div>

        </div>
      </div>


      {/* Bottom Bar */}
      <div className="border-t border-white/5">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6
                        flex flex-col sm:flex-row
                        items-center justify-between gap-4">

          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} AniFlix. Built for anime lovers.
          </p>

          <div className="flex items-center gap-5 text-xs">

            <Link
              to="/"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behaviour: instant
                });
              }}
              className="text-slate-500 hover:text-cyan-300 transition-colors"
            >
              Home
            </Link>

            <Link
              to="/search"

              className="text-slate-500 hover:text-cyan-300 transition-colors"
            >
              Search
            </Link>

            <Link
              to="/watchlist"
              className="text-slate-500 hover:text-cyan-300 transition-colors"
            >
              Watchlist
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;