import {useState} from 'react'
import './App.css'
import './components/NavBar'
import NavBar from './components/NavBar'
import './components/Footer'
import Footer from './components/Footer'
import {ProvaContext} from './stores/ProvaContext'
import Title from './components/Title'
import Carosello  from "./components/Carosello.jsx";
import Mappa from "./components/Mappa.jsx";
import feedback from "./components/Feedback.jsx";
import Feedback from "./components/Feedback.jsx";



function App() {
    const [count, setCount] = useState(0);



    return (
        <ProvaContext.Provider value={{count, setCount}}>
                <NavBar/>
            <div className="container">
                <Title imageSrc={"https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                       title="EveryWay"></Title>
                <br/>
                <Mappa></Mappa>
                <Carosello title={"Carosello"}></Carosello>
                <Feedback title={"Feedback"}></Feedback>

                <br/>
                About Us
                <br/>
                Contact Us
                <br/>

                Footer
            </div>
            <Footer/>
        </ProvaContext.Provider>
    );
}

export default App
