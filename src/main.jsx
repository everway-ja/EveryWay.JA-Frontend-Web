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

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
    },
    {
        path: '/map',
        element: <Mappa></Mappa>,
    },
    {
        path: '/about',
        element: <About></About>,
    },
    {
        path: '/feedback',
        element: <Feedback></Feedback>,
    },
    {
        path: '/itinerari',
        element: <Itinerari></Itinerari>,
    },
    {
        path: '/contact',
        element: <Contact></Contact>,
    },
    {
        path: '/partners',
        element: <Partners></Partners>,
    },
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/login',
        element: <Login></Login>,
    }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <NavBar></NavBar>
        <RouterProvider router={router}/>
        <Footer></Footer>
    </Provider>
  </StrictMode>,
)
