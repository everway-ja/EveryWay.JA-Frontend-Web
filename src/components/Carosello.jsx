import "./Link"
import Card from "./Card.jsx";

const Carosello = ({title}) => {

    const cardsData = [
        {
            title: "LINK",
            image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "lorem ipsum dolor sit amet."
        },
        {
            title: "LINK",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "lorem ipsum dolor sit amet."
        },
        {
            title: "Foresta",
            image: "https://plus.unsplash.com/premium_photo-1664300792059-863ccfe55932?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Un sentiero immerso nella natura." },
        {
            title: "Città",
            image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=3044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "Una metropoli piena di vita."
        }
    ];

    return(
        <>
            <div style={{ backgroundColor: "#a5b6b8",
                        borderTopRightRadius: "50px",
                        borderTopLeftRadius: "50px",
                        paddingTop: "40px",
                        paddingBottom: "100px" }}>
                <h1 className="text-center text-4xl font-bold"
                    style={{ paddingTop: "10px", paddingBottom: "10px"}}>{title}</h1>
                <div

                    className={`flex flex-wrap gap-4 justify-center p-6 w-100%`}>
                    {cardsData.map((card, index) => (
                        <Card key={index} title={card.title} image={card.image} description={card.description}/>
                    ))}
                </div>
            </div>
        </>
    )

};
export default Carosello;
