import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import store from './redux/store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Mappa from "./pages/Mappa.jsx";
import About from "./pages/About.jsx";
import Itinerari from "./pages/Itinerari.jsx";
import Feedback from "./pages/Feedback.jsx";
import Contact from "./pages/Contact.jsx";
import Partners from "./pages/Partners.jsx";
import Login from "./pages/Login.jsx";
import NavBar from "./layout/NavBar/NavBar.jsx";
import Footer from "./layout/Footer/Footer.jsx";
import Register from "./pages/Register.jsx";

/**
 * Application Router Configuration
 * 
 * Defines all routes for the application using React Router.
 * Each route maps to a corresponding page component.
 */
const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>, // Homepage
    },
    {
        path: '/map',
        element: <Mappa></Mappa>, // Map page
    },
    {
        path: '/about',
        element: <About></About>, // About Us page
    },
    {
        path: '/feedback',
        element: <Feedback></Feedback>, // Feedback page
    },
    {
        path: '/itinerari',
        element: <Itinerari></Itinerari>, // Itineraries page
    },
    {
        path: '/contact',
        element: <Contact></Contact>, // Contact page
    },
    {
        path: '/partners',
        element: <Partners></Partners>, // Partners page
    },
    {
        path: '/register',
        element: <Register></Register>, // Registration page
    },
    {
        path: '/login',
        element: <Login></Login>, // Login page
    }
])

/**
 * Application Root Rendering
 * 
 * Sets up the React application with:
 * - StrictMode for highlighting potential problems
 * - Redux store provider for state management
 * - Fixed NavBar component that appears on all pages
 * - Router for page navigation
 * - Fixed Footer component that appears on all pages
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <NavBar></NavBar>
        <RouterProvider router={router}/>
        <Footer></Footer>
    </Provider>
  </StrictMode>,
)
