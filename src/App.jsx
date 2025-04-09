import {useState} from 'react'
import './App.css'
import {ProvaContext} from './contexts/CountContext.jsx'
import Title from './ui/Title/Title'
import Carosello from "./features/Carosello/Carosello.jsx";
import Mappa from "./features/Mappa/Mappa.jsx";
import Feedback from "./features/Feedback/Feedback.jsx";
import AboutUs from "./features/About/About.jsx";  // Updated import path
import ContactUs from "./features/ContactUs/ContactUs.jsx";

/**
 * App Component
 * 
 * The main application component that assembles the homepage.
 * Provides the ProvaContext and renders the main content sections.
 * 
 * @returns {JSX.Element} The complete homepage with all sections
 */
function App() {
    // State for the ProvaContext counter demonstration
    const [count, setCount] = useState(0);

    return (
        <ProvaContext.Provider value={{count, setCount}}>
            <div className="container">
                {/* Hero section with large title and image */}
                <Title imageSrc={"https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                       title="EveryWay"></Title>
                <br/>
                
                {/* Map section with link to full map page */}
                <a href="/map"><Mappa></Mappa></a>

                {/* Itineraries section */}
                <Carosello title={"Itinerari"}></Carosello>
                
                {/* User feedback section */}
                <Feedback title={"Feedback"}></Feedback>
                
                {/* About us section */}
                <AboutUs
                    title="About Us"
                    description="Siamo un team di giovani programmatori, web-developer e sistemisti che amano il proprio lavoro. Il nostro obiettivo è rendere piacevoli e facili i viaggi abbattendo ogni difficoltà per tutti, con le foche come guida."
                    image="/logo.svg"
                />
                
                {/* Contact us section */}
                <ContactUs
                    title="Contact Us"
                    address="Via Rivolta 10, Lecco Italy 🇮🇹"
                    phone="0341 365339"
                    email="info@every-way.it"
                />
            </div>
        </ProvaContext.Provider>
    );
}

export default App
