import "./Link"
import Card from "./Card.jsx";

const Feedback = ({title}) => {
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
                <div

                    className={`flex flex-wrap gap-4 justify-center p-6 w-100%`}>
                    <Card key={"1"} title={"ciao"} image={"https://plus.unsplash.com/premium_photo-1669411190978-364ef7401014?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description={"Descrizione"}/>
                    <Card key={"1"} title={"ciao"} image={"https://plus.unsplash.com/premium_photo-1669411190978-364ef7401014?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description={"Descrizione"}/>
                    <Card key={"1"} title={"ciao"} image={"https://plus.unsplash.com/premium_photo-1669411190978-364ef7401014?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} description={"Descrizione"}/>
                </div>
            </div>
        </>
    )

};
export default Feedback;