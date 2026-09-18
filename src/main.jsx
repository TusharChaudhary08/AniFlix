
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/home.jsx'
import Search from './components/search.jsx'
import Overview from './components/overview.jsx'
import Watched from './components/watched.jsx'
import Watchlist from './components/watchlist.jsx'


const router = createBrowserRouter(
    createRoutesFromElements(

        <Route  path='/' element={<App/>}>
            <Route index element={<Home/>} />
            <Route path='search' element={<Search />} />
            <Route path='overview/:animeId' element={<Overview/>} />
            <Route path='watched' element={<Watched/>}/>
            <Route path='watchlist' element={<Watchlist/>}/>

        </Route>

    



    )
)


createRoot(document.getElementById('root')).render(

    
        <RouterProvider router={router} />



)
