import "./Link"
import CardUser from "./CardUser.jsx";

const Feedback = ({title}) => {
    const feedbackData = [
        {
            title: "Alexander",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "lorem ipsum dolor sit amet."
        },
        {
            title: "Christina",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "lorem ipsum dolor sit amet."
        },
        {
            title: "Annah",
            image: "https://images.unsplash.com/photo-1534180477871-5d6cc81f3920?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "lorem ipsum dolor sit amet." },
        {
            title: "John",
            image: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            description: "lorem ipsum dolor sit amet."
        }
    ];

    return(
        <>


            <div style={{ backgroundColor: "#81979A",
                        borderTopRightRadius: "50px",
                        borderTopLeftRadius: "50px",
                        paddingTop: "40px",
                        paddingBottom: "80px",
                        position: "relative",
                        top: "-50px"}}>
                <h1 className="text-center text-4xl font-bold"
                    style={{ paddingTop: "10px", paddingBottom: "10px"}}>{title}</h1>
                <div className={`flex flex-wrap gap-4 justify-center p-6 w-100%`}>
                    {feedbackData.map((card, index) => (
                        <CardUser key={index} title={card.title} image={card.image} description={card.description}/>
                    ))}                </div>
            </div>
        </>
    )

};
export default Feedback;