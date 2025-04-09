import {useState} from 'react'
import './App.css'
import {ProvaContext} from './contexts/ProvaContext'
import Title from './ui/Title/Title'
import Carosello from "./features/Carosello/Carosello.jsx";
import Mappa from "./features/Mappa/Mappa.jsx";
import Feedback from "./features/Feedback/Feedback.jsx";
import AboutUs from "./features/AboutUs/AboutUs.jsx";
import ContactUs from "./features/ContactUs/ContactUs.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <ProvaContext.Provider value={{count, setCount}}>
            <div className="container">
                <Title imageSrc={"https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                       title="EveryWay"></Title>
                <br/>
                <a href="/map"><Mappa></Mappa></a>

                <Carosello title={"Itinerari"}></Carosello>
                <Feedback title={"Feedback"}></Feedback>
                <AboutUs
                    title="About Us"
                    description="Siamo un team di giovani programmatori, web-developer e sistemisti che amano il proprio lavoro. Il nostro obiettivo è rendere piacevoli e facili i viaggi abbattendo ogni difficoltà per tutti, con le foche come guida."
                    image="/logo.svg"
                />
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
