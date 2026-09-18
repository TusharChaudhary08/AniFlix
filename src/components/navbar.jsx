import { Link, NavLink, useNavigate, useLocation } from "react-router"
import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

import { useRef } from "react";

import searchSVG from "../assets/search2.svg"
import MenuSVG from "../assets/Menu.svg"
import closeSVG from "../assets/close.svg"


import Logo from "../assets/AniFlixLogo.jsx";

function Navbar() {
    const navigate = useNavigate()

    const [search, setSearch] = useState("");

    const location = useLocation();

    const handleSearch = () => {
        if (!search.trim()) return


        navigate(`/search?query=${encodeURIComponent(search.trim())}`)


    }


    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    const [activePosition, setActivePosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });


    const [isActive, setActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState(false)


    useEffect(() => {
        const activeTab = document.querySelector(
             `[data-route="${location.pathname}"]`
        )

        if (activeTab) {
            const { width } = activeTab.getBoundingClientRect();

            const newPosition = {
                width,
                opacity: 1,
                left: activeTab.offsetLeft
            }

            setPosition(newPosition)
            setActivePosition(newPosition)
        } else {
            const hiddenPosition = {
                width: 0,
                opacity: 0,
                left: 0,
            };

            setPosition(hiddenPosition);
            setActivePosition(hiddenPosition);
        }

    }, [location.pathname])

    {/*Closes menu and search when page is scrolled in mobile*/ }
    useEffect(() => {
        function handleScrollMenu() {
            setActive(false);
        }

        function handleScrollSearch() {
            setSearchQuery(false);
        }

        if (setActive) {
            window.addEventListener("scroll", handleScrollMenu);
        }

        if (setSearchQuery) {
            window.addEventListener("scroll", handleScrollSearch);
        }

        return () => {
            window.removeEventListener("scroll", handleScrollMenu);
            window.addEventListener("scroll", handleScrollSearch);
        }





    }, [isActive, searchQuery])

    return (
        <>
            {/* navbar */}
            <div className=" fixed flex items-center justify-between text-white border-3 border-white/20 pl-5  p-2 h-18 w-[95%] z-60 top-4 backdrop-blur-xl rounded-full right-1/2 translate-x-1/2 max-md:h-15 max-[1096px]:pr-5 ">
                <div className="" >
                    <Logo className="text-6xl max-md:text-5xl" />
                </div>

                {/* navbar Desktop elements */}
                <div className=" flex relative items-center  justify-around font-medium gap-10 max-[1096px]:hidden">

                    <div className=" flex relative items-center my-auto p-1  max-sm:hidden">

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Anime"
                            className="input  rounded-full text-gray-800! bg-white placeholder:text-gray-500 border-none hover:outline-none outline-none p-6 w-80"
                        />

                        <button onClick={handleSearch} className="btn  absolute right-2 border-none text-gray-100 rounded-full" >Search</button>

                    </div>

                    <ul
                        onMouseLeave={() => { setPosition(activePosition) }}
                        className="relative flex items-center mx-auto p-1 border-2 border-white w-fit rounded-full max-sm:hidden">

                        <Tabs to="/" setPosition={setPosition} setActivePosition={setActivePosition} >Home</Tabs>
                        <Tabs to="/watchlist" setPosition={setPosition} setActivePosition={setActivePosition} >Watchlist</Tabs>
                        <Tabs to="/watched" setPosition={setPosition} setActivePosition={setActivePosition} >Watched</Tabs>

                        <Cursor position={position} />

                    </ul>



                </div>

                {/*Mobile elements */}

                <div className="hidden max-[1096px]:flex gap-6 items-center justify-between">

                    <button onClick={() => { setSearchQuery((prev) => { return !prev }); setActive(false); }}>
                        <img src={searchSVG} alt="" className="w-10 h-10 p-1 rounded-full bg-white active:scale-95  max-md:w-9 max-md:h-9 " />
                    </button>

                    <button onClick={() => { setActive((prev) => { return !prev }); setSearchQuery(false); }}>
                        <img src={MenuSVG} alt="" className="w-10 h-10 active:scale-95 max-md:w-9 max-md:h-9" />
                    </button>


                </div>


            </div>


            {/*Modal element */}


            <AnimatePresence>
                {
                    isActive && (<Modal setActive={setActive} />)
                }
            </AnimatePresence>

            {/*search bar for Mobile*/}

            <AnimatePresence>
                {
                    searchQuery && (<SearchBarMobile setSearchQuery={setSearchQuery} />)
                }

            </AnimatePresence>






        </>
    )
}


function SearchBarMobile({ setSearchQuery }) {
    const navigate = useNavigate()
    const [search, setSearch] = useState("");

    const handleSearch = () => {
        if (!search.trim()) return


        navigate(`/search?query=${encodeURIComponent(search.trim())}`)


    }

    return (
        <>
            <div className="fixed inset-0 z-80 backdrop-blur-xs" onClick={(e) => { setSearchQuery(false) }} >
                <motion.div

                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "-30%" }}
                    transition={{ duration: 0.3 }}


                    onClick={(e) => e.stopPropagation()}
                    className="fixed  top-28 left-1/2 -translate-x-1/2 w-[90%] z-150">

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Anime"
                        className="input  rounded-full text-gray-800! bg-white placeholder:text-gray-500 border-none hover:outline-none outline-none p-6 w-full"

                    />

                    <button onClick={() => { setSearchQuery(false), handleSearch() }} className="btn absolute top-1 right-1  rounded-full" >Search</button>

                </motion.div>

            </div>
        </>
    )
}

function Modal({ setActive }) {
    return (
        <>


            <div className="fixed inset-0 z-80 " onClick={(e) => { setActive(false) }} >


                <motion.div

                    initial={{ opacity: 0, x: "100%" }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: "100%" }}
                    transition={{ duration: 0.3 }}

                    onClick={(e) => { e.stopPropagation() }}
                    className="fixed right-4 top-25 border-3 border-white/20 backdrop-blur-sm shadow-2xl rounded-2xl p-4 z-90">

                    <div className="relative">

                        <button onClick={() => { setActive(false) }} className="absolute active:scale-95 left-0 top">
                            <img src={closeSVG} alt="" className="w-6 h-6 " />
                        </button>
                        <ul className="flex  flex-col justify-evenly h-50 p-4 rounded-lg">
                            <Tabs to="/" setActive={setActive} className="text-white font-bold"  >Home</Tabs>
                            <Tabs to="/watchlist" setActive={setActive} className="text-white font-bold"  >Watchlist</Tabs>
                            <Tabs to="/watched" setActive={setActive} className="text-white font-bold"  >Watched</Tabs>
                        </ul>

                    </div>

                </motion.div>

            </div>

        </>
    )
}

function Tabs({
    children,
    to,
    setPosition,
    setActivePosition,
    className = "text-white mix-blend-difference",
    setActive
}) {

    const ref = useRef(null)


    function getPosition() {
        const { width } = ref.current.getBoundingClientRect();

        return {
            width,
            opacity: 1,
            left: ref.current.offsetLeft,
        };
    }

    function cursorHover() {
        if (!setPosition) return
        setPosition(getPosition())
    }

    function closeModal() {
        if (!setActive) return

        setActive(false);
    }




    return (
        <>
            <li className={`w-30 text-center `}
                ref={ref}
                data-route={to}
                onMouseEnter={cursorHover}
                onClick={() => { cursorHover(); closeModal(); }}

            >
                {/* jab router add kare to on click ko hata ke isActive laga dena*/}
                <NavLink to={to} className={`relative block uppercase z-90 px-3 py-2 rounded-full ${className}`}>
                    {children}
                </NavLink>
            </li>
        </>
    )
}

function Cursor({ position }) {
    return (
        <>
            <motion.li
                animate={position}
                className="absolute z-0 h-10 my-auto rounded-full bg-white"
            />
        </>
    )
}




export default Navbar