import React from 'react'
import { useMemo, useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router'
import useAnimeData from "./hooks/useAnimeInfo";

function Search() {

  const [page, setPage] = useState(1)
  const [animeList, setAnimeList] = useState()
  const [hasNextPage, setHasNextPage] = useState()
  const loadMoreRef = useRef(null)

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query")

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });

    setPage(1);
    setAnimeList([]);
    setHasNextPage(true);
  }, [searchQuery]);





  const query = `
  query SearchAnime(
  $search: String
  $page: Int
  $perPage: Int
) {
  Page(
    page: $page
    perPage: $perPage
  ) {
    pageInfo {
      currentPage
      lastPage
      hasNextPage
      perPage
      total
    }

    media(
      search: $search
      type: ANIME
      sort: SEARCH_MATCH
    ) {
      id

      title {
        romaji
        english
        native
      }

      coverImage {
        large
      }

      format
      status
      episodes
      season
      seasonYear
      averageScore
    }
  }
}
`

  const variables = useMemo(() => ({

    "search": searchQuery,
    "page": page,
    "perPage": 20



  }), [searchQuery, page]);


  const { data, loading, error } = useAnimeData(query, variables);

  useEffect(() => {
    if (!data?.Page) return

    setAnimeList(prev =>
      page === 1 ? data.Page.media : [...prev, ...data.Page.media]
    );

    setHasNextPage(data.Page.pageInfo.hasNextPage);
  }, [data, page])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {

        if (entries[0].isIntersecting && hasNextPage && !loading) {
          setPage(prev => prev + 1);
        }

      },
      {
        threshold: 0.1
      }


    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }
    return () => observer.disconnect;

  }, [hasNextPage, loading])


  return (
    <div className='bg-[#050B18] pb-10'>
      <div className=' pt-30 mx-10 border-b-3 border-white/15'>

        <div className='text-3xl max-sm:text-2xl pb-3'>
          Search Results
        </div>

      </div>

      <div className='mt-10 mx-10 grid justify-items-center grid-cols-2 gap-x-4 gap-y-10 max-sm:gap-x-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>

        {loading && page === 1 ? (
          <>
            <AnimeCardSkeleton />
          </>
        ) : (

          animeList.length === 0 ? (
            <>
              <NoResults search={searchQuery} />
            </>

          ) : (
            animeList.map((obj) => (
              <AnimeCard key={obj.id} anime={obj} />
            ))
          )






        )}




      </div>

      {
        hasNextPage && (
          <div
           ref={loadMoreRef}
            className='h-20 flex items-center justify-center'
          >
           

            {loading && (
              <div className="text-sm text-cyan-300/70 animate-pulse">
                Loading more anime...
              </div>
            )}

          </div>
        )
      }





    </div>
  )
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

function NoResults({ search }) {
  return (
    <div className="col-span-full w-full min-h-[65vh] flex flex-col items-center justify-center px-5 text-center">

      {/* icon */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-2xl border border-cyan-300/10
                                bg-[#0a1224] flex items-center justify-center">

          <svg
            viewBox="0 0 24 24"
            className="w-12 h-12 text-cyan-300/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          >
            <circle cx="10.8" cy="10.8" r="5.8" />
            <path d="m15.2 15.2 4.3 4.3" />
          </svg>

        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-semibold text-white">
        No results <span className="text-cyan-300">found</span>
      </h2>

      <p className="mt-3 max-w-md text-sm sm:text-base text-gray-400 leading-relaxed">
        We couldn't find anything matching{" "}
        <span className="text-gray-300">"{search}"</span>.
        <br />
        Try a different anime name or check for typos.
      </p>

      <div className="mt-7 flex items-center gap-3 px-5 py-3 rounded-full
                            border border-white/10 bg-white/2
                            text-sm text-gray-500">
        <span className="text-cyan-300/70">⌕</span>
        <span>Try another search...</span>
      </div>

    </div>
  );
};




function AnimeCardSkeleton() {
  return (
    <>

      {Array.from({ length: 20 }).map((_, index) => (

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

export default Search