import React from 'react'

import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';

import star from "../assets/star-solid.svg";
import episode from "../assets/episode.svg"
import timer from "../assets/timer.svg"
import discriptionSvg from "../assets/description.svg"
import genreSvg from "../assets/3d-glass.svg"
import plusSvg from "../assets/plus.svg"
import eyeSvg from "../assets/eye.svg"
import playSvg from "../assets/youtube.svg"
import useAnimeData from "./hooks/useAnimeInfo";
import { useParams } from 'react-router';

function Overview() {

    const { animeId } = useParams()

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant"
        });
    }, [animeId]);


    const query = `query Media($mediaId: Int, $perPage: Int, $sort: [CharacterSort]) {
  Media(id: $mediaId) {
    bannerImage

    coverImage {
      large
    }

    title {
      english
      romaji
    }

    description

    genres

    format

    episodes

    duration

    status

    startDate {
      day
      month
      year
    }

    endDate {
      day
      month
      year
    }

    averageScore

    meanScore

    popularity

    favourites

    characters(perPage: $perPage, sort: $sort) {
      edges {
        role

        node {
          name {
            full
          }

          image {
            large
          }
        }
      }
    }

    studios {
      nodes {
        name
      }
    }

    trailer {
      id
    }

    season

    seasonYear

    recommendations(perPage: 10) {
      nodes {
        mediaRecommendation {
          id

          title {
            english
            romaji
          }

          coverImage {
            large
          }
        }
      }
    }
  }
}`

    const variables = useMemo(() => ({
        "mediaId": parseInt(animeId),
        "perPage": 10,
        "sort": ["ROLE", "RELEVANCE"]
    }), [animeId]);





    const { data, loading, error } = useAnimeData(query, variables);






    return (
        <>
            <div className='bg-[#050B18] pb-10' >
                <div className='relative bg-[#050B18] '>
                    {/* banner */}
                    <div className='relative w-full h-60  '>

                        {
                            loading ? (
                                <BannerSkeleton />
                            ) : (
                                <>
                                    {data?.Media?.bannerImage ? (

                                        <>
                                            <img
                                                src={data?.Media?.bannerImage}
                                                alt=""
                                                className='w-full h-full object-cover object-center'
                                            />

                                            <div className="absolute inset-0 bg-black/40"></div>
                                        </>


                                    ) : (
                                        <>
                                        </>
                                    )}



                                </>


                            )
                        }





                    </div>


                    {/* AnimeCard */}
                    <div className='absolute  z-50 bottom-0 translate-y-1/2 right-1/2 translate-x-1/2'>
                        {
                            loading ? (
                                <AnimeCardSkeleton />
                            ) : (
                                <AnimeCard anime={data} />
                            )
                        }

                    </div>


                </div>

                {/* content section */}
                <div className='relative  bg-[#050B18] w-full '>

                    {/* container containing title and stats */}
                    <div className='pt-36 max-sm:pt-26 max-md:pt-30 max-lg:pt-32'>

                        {/* title */}
                        <div className='px-4 pb-5'>
                            <h1 className='text-center text-3xl max-sm:text-xl font-bold  text-wrap'>
                                {
                                    loading ? (
                                        <Skeleton />
                                    ) : (
                                        (data?.Media?.title?.english || data?.Media?.title?.romaji) ?? "N/A"
                                    )

                                }
                            </h1>
                        </div>

                        {/* stats container */}
                        <div className=' flex items-center justify-center gap-10 px-4 pb-5'>

                            <div className='flex items-center justify-around gap-4'>
                                <img src={star} alt="" className='w-5 h-5  object-cover object-center' />

                                <div className='flex flex-col '>
                                    <p className='text-sm'>
                                        {
                                            loading ? (
                                                <Skeleton />
                                            ) : (
                                                data?.Media?.meanScore != null
                                                    ? `${data?.Media?.meanScore} %`
                                                    : "N/A"

                                            )
                                        }

                                    </p>
                                    <p className='text-xs font-bold'>meanScore</p>
                                </div>



                            </div>

                            <div className='flex items-center justify-around gap-4'>
                                <img src={episode} alt="" className='w-5 h-5  object-cover object-center' />

                                <div className='flex flex-col '>
                                    <p className='text-sm'>{

                                        loading ? (
                                            <Skeleton />
                                        ) : (
                                            data?.Media?.episodes ?? "N/A"
                                        )



                                    } </p>
                                    <p className='text-xs font-bold'>episodes</p>
                                </div>

                            </div>

                            <div className='flex items-center justify-around gap-4'>
                                <img src={timer} alt="" className='w-5 h-5  object-cover object-center' />

                                <div className='flex flex-col '>
                                    <p className='text-sm'>
                                        {
                                            loading ? (
                                                <Skeleton />
                                            ) : (
                                                data?.Media?.duration != null
                                                    ? `${data?.Media?.duration} min`
                                                    : "N/A"
                                            )


                                        } </p>
                                    <p className='text-xs font-bold'>duration</p>
                                </div>

                            </div>

                        </div>



                    </div>

                    {/* buttons */}
                    <div className='flex items-center justify-center '>
                        <div className='flex gap-5 max-md:flex-col'>

                            <button className="px-4 p-1 flex items-center justify-center gap-3 rounded-full bg-[#54E1E6] text-[#050B18] border-3 border-black/60 active:scale-97 ease-in-out  transition-transform duration-150 cursor-pointer font-[600]">
                                <img src={plusSvg} alt="" className='w-5 h-5' />
                                Add to Watchlist
                            </button>

                            <button className=" px-4 p-1  flex items-center  justify-center gap-3 rounded-full bg-white text-[#050B18] border-3 border-black/60 active:scale-97 ease-in-out  transition-transform duration-150 cursor-pointer font-[600]">
                                <img src={eyeSvg} alt="" className='w-5 h-5' />
                                Mark as Watched
                            </button>
                        </div>

                    </div>


                    {/* overview container */}
                    <div className='mt-8 mx-4 p-4 border-3 border-white/30 rounded-3xl '>

                        <div className='flex gap-2 px-3 pt-5 pb-5'>
                            <div>
                                <img src={discriptionSvg} alt="" className='w-5 h-5' />
                            </div>

                            <h1 className='text-left font-bold '>
                                Overview
                            </h1>
                        </div>

                        <div className='px-3 pb-5'>

                            {loading ? (
                                <OverviewSkeleton />
                            ) : (
                                <div
                                    className="text-white leading-relaxed max-sm:text-sm"
                                    dangerouslySetInnerHTML={{
                                        __html: data?.Media?.description ?? "N/A",
                                    }}
                                />
                            )

                            }





                        </div>


                        {/* genre */}
                        <div>

                            <div className='flex gap-2 px-3 pb-5'>
                                <div>
                                    <img src={genreSvg} alt="" className='w-5 h-5' />
                                </div>

                                <h1 className='text-left font-bold '>
                                    Genre
                                </h1>
                            </div>


                            {/* genre tags */}
                            <div className='flex px-3 pb-5 gap-3 flex-wrap'>
                                {

                                    loading ? (
                                        <GenreSkeleton />
                                    ) : (
                                        data?.Media?.genres?.length != null ? (
                                            data?.Media?.genres.map((el) => (
                                                <span className='px-2 py-1  font-bold text-[#050B18] rounded-full bg-[#54E1E6]'>
                                                    {el}
                                                </span>

                                            ))
                                        ) : ("N/A")
                                    )
                                }

                            </div>
                        </div>

                    </div>

                    {/* other infos */}

                    <div className="mt-15 mx-4 py-4 lg:py-10  grid grid-cols-3 max-lg:grid-cols-1 px-6 rounded-3xl">

                        {/* Details */}
                        <div className="py-6 lg:px-10 max-lg:border-b max-lg:border-white/15">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                Details
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Format</span>
                                    <span className="font-medium text-white">
                                        {

                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.format ?? "N/A"
                                            )
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Episodes</span>
                                    <span className="font-medium text-white">
                                        {

                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.episodes ?? "N/A"
                                            )

                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Duration</span>
                                    <span className="font-medium text-white">{

                                        loading ? (
                                            <DetailSkeleton />
                                        ) : (
                                            data?.Media?.duration != null
                                                ? `${data.Media.duration} min`
                                                : "N/A"
                                        )


                                    }</span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Status</span>
                                    <span className="font-medium text-[#54E1E6]">{

                                        loading ? (
                                            <DetailSkeleton />
                                        ) : (
                                            data?.Media?.status ?? "N/A"
                                        )


                                    }</span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Studio</span>
                                    <span className="font-medium text-white text-right">{

                                        loading ? (
                                            <DetailSkeleton />
                                        ) : (
                                            data?.Media?.studios?.nodes?.[0]?.name ?? "N/A"
                                        )


                                    } </span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Season</span>
                                    <span className="font-medium text-[#54E1E6]"><p>
                                        {

                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.season && data?.Media?.seasonYear
                                                    ? `${data.Media.season} ${data.Media.seasonYear}`
                                                    : "N/A"
                                            )



                                        }
                                    </p></span>
                                </div>
                            </div>
                        </div>


                        {/* Release */}
                        <div className="py-6 lg:px-10 lg:border-x lg:border-white/15 max-lg:border-b max-lg:border-white/15">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                Release
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Start Date</span>
                                    <span className="font-medium text-white text-right">
                                        {
                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.startDate?.day && data?.Media?.startDate?.month && data?.Media?.startDate?.year ? `${data?.Media?.startDate?.day} / ${data?.Media?.startDate?.month} / ${data?.Media?.startDate?.year}` : "N/A"
                                            )



                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">End Date</span>
                                    <span className="font-medium text-white">
                                        {

                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.endDate?.day && data?.Media?.endDate?.month && data?.Media?.endDate?.year ? `${data?.Media?.endDate?.day} / ${data?.Media?.endDate?.month} / ${data?.Media?.endDate?.year}` : "N/A"
                                            )



                                        }
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* Statistics */}
                        <div className="py-6 lg:px-10">
                            <h2 className="text-xl font-semibold text-white mb-6">
                                Statistics
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Average Score</span>
                                    <span className="font-medium text-white">
                                        {

                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.averageScore != null
                                                    ? `${data.Media.averageScore} %`
                                                    : "N/A"
                                            )




                                        }</span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Mean Score</span>
                                    <span className="font-medium text-white">
                                        {
                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.meanScore != null
                                                    ? `${data.Media.meanScore} %`
                                                    : "N/A"
                                            )




                                        }</span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Favourites</span>
                                    <span className="font-medium text-white">
                                        {
                                            loading ? (
                                                <DetailSkeleton />
                                            ) : (
                                                data?.Media?.favourites ?? "N/A"
                                            )


                                        }</span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span className="text-white/50">Popularity</span>
                                    <span className="font-medium text-[#54E1E6]">{

                                        loading ? (
                                            <DetailSkeleton />
                                        ) : (
                                            data?.Media?.popularity ?? "N/A"
                                        )

                                    }</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Charcters section */}

                    <div className='mt-15 mx-4 '>
                        <h2 className='text-3xl max-sm:text-2xl text-center font-semibold text-white mb-6  border-b-3 border-white/15 pb-4'>
                            Characters
                        </h2>
                        <div className='py-4 lg:px-4'>


                            {/* horizontal scroll */}
                            <div className="flex gap-10 overflow-x-auto  pb-4 [&::-webkit-scrollbar]:h-2 &::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full max-md:gap-8 max-sm:gap-6">
                                {/* map  */}
                                {
                                    loading ? (
                                        <CharCardSkeleton />
                                    ) : (



                                        data?.Media?.characters?.edges.length === 0 ? (

                                            <>

                                                <NoCharacters />

                                            </>


                                        ) : (


                                            data?.Media?.characters?.edges.map((object) => (
                                                <CharCard key={object.node.name.full} obj={object} />
                                            ))
                                        
                                        )

                                    )


                                }
                            </div>

                        </div>

                    </div>

                    {/* Trailer section */}
                    <div className='mt-15 mx-4'>
                        <h2 className='text-3xl max-sm:text-2xl text-center font-semibold text-white mb-6 border-b-3 border-white/15 pb-4'>
                            Trailer
                        </h2>

                        <div className='flex justify-center py-4'>


                            {
                                loading ? (
                                    <TrailerSkeleton />
                                ) : (
                                    <Trailer obj={data} />
                                )
                            }

                        </div>






                    </div>


                    {/* Recommendation */}

                    <div className='mt-15 mx-4'>
                        <h2 className='text-3xl max-sm:text-2xl text-center font-semibold text-white mb-6 border-b-3 border-white/15 pb-4'>
                            You may also like
                        </h2>


                        <div className="flex lg:px-4 lg:py-3 gap-10 overflow-x-auto scrollbar-none max-md:gap-8 max-sm:gap-6">
                            {loading ? (
                                <AnimeCardSkeleton />
                            ) : (

                                data?.Media?.recommendations?.nodes.length === 0 ? (

                                    <>

                                        <NoRecommendations />

                                    </>


                                ) : (

                                    data?.Media?.recommendations?.nodes.map((obj) => (
                                        <AnimeCardRecommendations anime={obj} />
                                    ))

                                )

                            )}
                        </div>





                    </div>






                </div>





            </div >

        </>

    )
}

function AnimeCard({ anime }) {
    return (
        <>
            <div className="flex flex-col w-fit text-center">
                <div className="w-45 h-65 max-lg:w-40 max-lg:h-55 max-md:w-40 max-md:h-55 max-sm:w-30 max-sm:h-45 rounded-xl overflow-hidden bg-gray-700 backdrop:backdrop-blur-2xl border-3 border-white/30">
                    <img
                        src={anime?.Media?.coverImage?.large}
                        alt=""
                        className="w-full h-full object-cover object-center "
                    />
                </div>
            </div>
        </>
    )
}



function AnimeCardRecommendations({ anime }) {
    const navigate = useNavigate();
    return (
        <>
            <div
                id={anime?.mediaRecommendation?.id}
                onClick={() => navigate(`/overview/${anime?.mediaRecommendation?.id}`)}
                className="group flex flex-col w-fit text-center cursor-pointer transition-transform duration-300 lg:hover:scale-[1.06]">
                <div className="w-45 h-65 max-lg:w-40 max-lg:h-55 max-md:w-40 max-md:h-55 max-sm:w-30 max-sm:h-45 rounded-xl overflow-hidden bg-gray-700  transition-transform duration-300 ">
                    <img
                        src={anime?.mediaRecommendation?.coverImage?.large}
                        alt=""
                        className="w-full h-full object-cover object-center transition-transform duration-300 lg:group-hover:scale-105"
                    />
                </div>

                <div className="w-45 max-lg:w-40 max-md:w-40 max-sm:w-30">
                    <h1 className="text-left text-sm max-sm:text-xs pt-2 line-clamp-2 font-semibold text-gray-100 leading-snug group-hover:text-white transition-colors">
                        {anime?.mediaRecommendation?.title?.english || anime?.mediaRecommendation?.title?.romaji}
                    </h1>
                </div>
            </div>
        </>
    )
}



function CharCard({ obj }) {

    return (
        <>
            <div className="card shrink-0 bg-base-100  w-35 h-60  max-sm:w-35 max-sm:h-53 bg-white/30  shadow-sm">
                <figure>
                    <img
                        src={obj?.node?.image?.large}
                        alt="Anime Character" className='object-cover object-center' />
                </figure>
                <div className="card-body p-2 pb-4 ">
                    <h2 className="card-title text-sm text-white">{obj?.node?.name?.full ?? "N/A"}</h2>
                    <p className='text-xs font-semibold text-[#54E1E6]'>{obj?.role}</p>


                </div>
            </div>

        </>
    )



}

function Trailer({ obj }) {



    return (
        <>

            {obj?.Media?.trailer?.id ? (
                <iframe
                    src={`https://www.youtube.com/embed/${obj?.Media?.trailer?.id}`}
                    className="w-210 h-100 max-lg:w-180 max-lg:h-80 max-md:w-150 max-md:65 max-sm:w-120 max-sm:h-60 rounded-2xl"
                    allowFullScreen
                />) : (

                <div className='flex flex-col justify-center items-center w-210 h-100 max-lg:w-180 max-lg:h-80 max-md:w-150 max-md:65 max-sm:w-120 max-sm:h-60 rounded-2xl bg-gray-950'>
                    <div className='w-20 h-12 m-4'>
                        <img src={playSvg} alt="" />
                    </div>
                    <h2 className='text-xl'>Trailer not available</h2>
                </div>

            )
            }


        </>
    )
}


function NoRecommendations() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-12 px-4 text-center">

            {/* SVG */}
            <div className="mb-4 p-3 rounded-full bg-cyan-400/10 border border-cyan-300/15">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="w-9 h-9 text-[#54E1E6]"
                >
                    <rect x="3" y="5" width="18" height="14" rx="2" />

                    <path
                        d="M8 3l2 2M14 3l2 2"
                        strokeLinecap="round"
                    />

                    <path
                        d="M10 10a2 2 0 1 1 4 0c0 1.5-2 1.5-2 3"
                        strokeLinecap="round"
                    />

                    <circle cx="12" cy="16" r=".6" fill="currentColor" stroke="none" />
                </svg>
            </div>

            {/* Message */}
            <p className="text-white/80 text-sm font-medium">
                No recommendations available
            </p>

            <p className="mt-1 text-xs text-white/35 max-w-xs">
                We couldn't find any similar anime for this title.
            </p>
        </div>
    );
}


function NoCharacters() {
    return (
        <div className="w-full flex flex-col items-center justify-center py-10 px-4 text-center">

            {/* SVG */}
            <div className="mb-4 p-3 rounded-full bg-cyan-400/10 border border-cyan-300/15">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="w-9 h-9 text-[#54E1E6]"
                >
                    {/* Person 1 */}
                    <circle cx="9" cy="8" r="2.5" />
                    <path
                        d="M4.5 18c.3-3 2-4.5 4.5-4.5s4.2 1.5 4.5 4.5"
                        strokeLinecap="round"
                    />

                    {/* Person 2 */}
                    <circle cx="16.5" cy="9" r="2" />
                    <path
                        d="M14 18c.2-2.3 1.1-3.5 2.5-3.5 1.6 0 2.5 1.2 2.8 3.5"
                        strokeLinecap="round"
                    />
                </svg>
            </div>

            {/* Message */}
            <p className="text-white/80 text-sm font-medium">
                No character information available
            </p>

            <p className="mt-1 text-xs text-white/35 max-w-xs">
                Character details aren't available for this anime.
            </p>

        </div>
    );
}

function OverviewSkeleton() {
    return (
        <>
            <div className='space-y-4'>

                <div className=" my-2 w-1/3 h-4 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-1/2  h-4  not-last:bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-1=2/3  h-4  not-last:bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-full h-4 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-full h-4 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-full h-4 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-full h-4 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-full h-4 bg-white/20 rounded-2xl animate-pulse"></div>
                <div className="my-2 w-full h-4 bg-white/20 rounded-2xl animate-pulse"></div>

            </div>

        </>
    )

}


function GenreSkeleton() {
    return (
        <>

            <span className="px-2 py-1 w-18 h-7  rounded-full bg-white/20 animate-pulse"></span>
            <span className="px-2 py-1 w-18 h-7 rounded-full bg-white/20 animate-pulse"></span>
            <span className="px-2 py-1 w-18 h-7 rounded-full bg-white/20 animate-pulse"></span>
            <span className="px-2 py-1 w-18 h-7 rounded-full bg-white/20 animate-pulse"></span>
            <span className="px-2 py-1 w-18 h-7 rounded-full bg-white/20 animate-pulse"></span>
            <span className="px-2 py-1 w-18 h-7 rounded-full bg-white/20 animate-pulse"></span>

        </>
    )

}

function DetailSkeleton() {
    return (
        <>
            <div className="px-2 py-1 w-28 h-5 rounded-md bg-white/20 animate-pulse" ></div>
        </>
    )
}

function CharCardSkeleton() {

    return (
        <>
            {Array.from({ length: 10 }).map((_, index) => (

                <div key={index}>
                    <div className="w-35 h-60  max-sm:w-35 max-sm:h-53 rounded-xl bg-white/20 overflow-hidden  backdrop:backdrop-blur-2xl animate-pulse">

                    </div>



                </div>


            ))}
        </>
    )


}

function TrailerSkeleton() {
    return (
        <>

            <div className='w-210 h-100 max-lg:w-180 max-lg:h-80 max-md:w-150 max-md:65 max-sm:w-120 max-sm:h-60 rounded-2xl bg-white/20 animate-pulse'>

            </div>

        </>
    )
}

function BannerSkeleton() {
    return (
        <>
            <div className='w-full h-60 bg-white/20 animate-pulse'>

            </div>
        </>
    )

}

function AnimeCardSkeleton() {
    return (
        <>

            <div className='bg-black rounded-xl'>
                <div className='w-45 h-65 max-lg:w-40 max-lg:h-55 max-md:w-40 max-md:h-55 max-sm:w-30 max-sm:h-45 rounded-xl bg-gray-500 animate-pulse'>

                </div>
            </div>


        </>
    )

}


function Skeleton() {
    return (
        <>

        </>
    )
}
export default Overview;