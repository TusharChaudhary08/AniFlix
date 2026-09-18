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

function App() {



  return (
    <>

     <ScrollToTop/>
   
      <Navbar />
      <Outlet/>
      <Footer />




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
