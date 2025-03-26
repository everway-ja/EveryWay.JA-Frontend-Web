import "./Link"
import './Mappa.css'

const Mappa = ({title}) => {
    return(
        <div className="container-mappa">
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}></h1>
            <div className="blocco-ordina">
                <div className="blocco-a">
                    <div className="image-1">
                        <img src={"https://plus.unsplash.com/premium_photo-1661962830760-1e0a679eba23?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>
                    </div>
                    <div className="image-4">
                        <img src={"https://images.unsplash.com/photo-1608022989714-e1fd968552c5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                    <div className="image-2">
                        <img src={"https://plus.unsplash.com/premium_photo-1690552155363-7d6a2ed5d645?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                    <div className="box-title">
                        <h2 className="text-style">Mappa</h2>
                    </div>
                </div>
                <div className="blocco-b1">
                    <div className="image-3">
                        <img src={"https://plus.unsplash.com/premium_photo-1690474614774-a7d16ee9f2dd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                </div>
            </div>
            <div className="blocco-ordina">
                <div className="blocco-c">
                    <div className="image-5">
                        <img src={"https://images.unsplash.com/photo-1706631519116-6607d09107b2?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                    <div className="image-6">
                        <img src={"https://images.unsplash.com/photo-1563309480-5aca14189417?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                </div>
            </div>
        </div>
    )

};
export default Mappa;