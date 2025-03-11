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



    return (
        <ProvaContext.Provider value={{count, setCount}}>

            <div className="container">
                <Title imageSrc={"https://images.unsplash.com/photo-1499591934245-40b55745b905?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                       title="EveryWay"></Title>
                <br/>
                <Mappa></Mappa>
                <Carosello title={"Carosello"}></Carosello>
                <Feedback title={"Feedback"}></Feedback>
                <AboutUs
                    title="About Us"
                    description="We are a passionate team dedicated to creating amazing experiences. Our mission is to deliver high-quality products that make a positive impact."
                    image="https://images.unsplash.com/photo-1634482899780-6ac6b92c656e?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <ContactUs
                    title="Contact Us"
                    address="1234 Street Name, City, Country"
                    phone="(123) 456-7890"
                    email="info@every-way.it"
                />


            </div>
        </ProvaContext.Provider>
    );
}

export default App
