import {useState} from 'react'
import './App.css'
import './components/NavBar'
import './components/Footer'
import {ProvaContext} from './stores/ProvaContext'
import Title from './components/Title'
import Carosello  from "./components/Carosello.jsx";
import Mappa from "./components/Mappa.jsx";
import Feedback from "./components/Feedback.jsx";
import AboutUs from "./components/AboutUs.jsx";
import ContactUs from "./components/ContactUs.jsx";



function App() {
    const [count, setCount] = useState(0);


    // <div className="container bg-gradient-to-br from-blue-100 to-purple-100">
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
                    description="Siamo un team di giovani studenti appassionati di informatica. Il nostro obiettivo è rendere piacevoli e facili i viaggi abbattendo ogni difficoltà per tutti, con le foche come guida."
                    image="/focaRound.png"
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
