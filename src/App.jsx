import { useState } from 'react'
import { Outlet } from 'react-router'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

import Navbar from './components/navbar'
import Home from './components/home'
import Overview from './components/overview'
import Search from './components/search'
import Footer from './components/footer'
import Watchlist from './components/watchlist'
import Watched from './components/watched'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {



  return (
    <>

      <ScrollToTop />

      <Navbar />
      <Outlet />
      <Footer />



      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
        toastClassName="!w-[90vw] sm:!w-[350px] !text-xs sm:!text-sm !rounded-lg !text-xs sm:!text-sm !rounded-lg"

     className="!top-24 !right-4"
      />

    </>
  )
}


// scroll page to top when we move to some different page like from overview to home
function ScrollToTop() {
  const routerLocation = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [routerLocation.pathname]);

  return null;
}


export default App
