import "./Link"
import './Mappa.css'

const Mappa = ({title}) => {
    return(
        <div className="container-mappa">
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}></h1>
            <div className="blocco-ordina">
                <div className="blocco-a">
                    <div className="image-1">

                    </div>
                    <div className="image-4">

                    </div>
                    <div className="image-2">

                    </div>
                </div>
                <div className="blocco-b">
                    <div className="image-3">

                    </div>
                    <div className="">

                    </div>
                </div>
            </div>
            <div className="blocco-ordina">
                <div className="blocco-c">
                    <div className="image-5">

                    </div>
                </div>
            </div>
        </div>
    )

};
export default Mappa;