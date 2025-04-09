import "react";
import CardUser from "../ui/CardUser/CardUser";

function About() {
    return (
        <>
            <div className="flex flex-col items-center justify-center " style={{paddingTop: "100px", paddingBottom: "100px"}}>
                <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "30px" }}>
                    About Us
                </h1>
                <div className="flex justify-center mb-8">
                    <img src={"/logo.svg"} alt={"About us"} className="rounded-xl h-32 object-cover" />
                </div>
                <p className="text-center text-lg text-gray-600 px-80 custom-font2">
                    Siamo un team di giovani programmatori, web-developer e sistemisti che amano il proprio lavoro. Il nostro obiettivo è rendere piacevoli e facili i viaggi abbattendo ogni difficoltà per tutti, con le foche come guida.
                </p>
            </div>
            <div className="flex flex-col items-center justify-center  ">
                <h2 className="text-center text-3xl font-bold"> Scopri il nostro Team</h2>
                <div className="flex flex-wrap gap-6 justify-center p-6 w-full max-w-6xl mx-auto px-4">
                    <CardUser title="Nava" image={"https://i.pinimg.com/736x/1f/1e/46/1f1e469dd34c5849532dd229dc0fb720.jpg"} description={"CEO"} />
                    <CardUser title="Bellota" image={"https://i.pinimg.com/736x/2f/12/45/2f1245ed34c195472927fe29fce77503.jpg"} description={"Backend"} />
                    <CardUser title="Molteni" image={"https://i.pinimg.com/736x/eb/24/8a/eb248aa7ee4c517e820729bf2a0a526b.jpg"} description={"Frontend"} />
                    <CardUser title="Molteni" image={"https://i.pinimg.com/736x/cc/83/b6/cc83b6c4f3808a0af7741092e7dfa194.jpg"} description={"Backend"} />
                    <CardUser title="Bertoldini" image={"https://i.pinimg.com/736x/6b/56/11/6b5611a98cd8787de790ec9dfacc54bc.jpg"} description={"Frontend"} />
                    <CardUser title="Sormani" image={"https://i.pinimg.com/736x/4a/cc/d1/4accd1dba303212da1dc2648af86a78b.jpg"} description={"Backend"} />
                    <CardUser title="Vassena" image={"https://i.pinimg.com/736x/9a/fa/d7/9afad7093e2fc88105c6655646fb55ae.jpg"} description={"Backend"} />
                </div>
            </div>
        </>
    );
}
export default About;