import "../../ui/Link/Link"
import './Mappa.css'

/**
 * Mappa Component (Map Feature)
 * 
 * A featured section displaying map-related content with a decorative layout 
 * and multiple images. Includes a responsive layout for different screen sizes.
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Section title (not currently used in this component)
 * @returns {JSX.Element} Map feature section with images and title
 */
const Mappa = ({title}) => {
    return(
        <div className="container-mappa">
            <h1 className="text-center text-4xl font-bold" style={{ paddingTop: "10px", paddingBottom: "10px" }}></h1>
            <div className="blocco-ordina">
                {/* Left block with main image and title */}
                <div className="blocco-a">
                    <div className="image-1">
                        <img src={"https://plus.unsplash.com/premium_photo-1661962830760-1e0a679eba23?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>
                    </div>
                    {/* Secondary image that disappears on smaller screens */}
                    <div className="image-4 implosion">
                        <img src={"https://images.unsplash.com/photo-1608022989714-e1fd968552c5?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                    {/* Title box */}
                    <div className="box-title">
                        <h2 className="text-style">mappa</h2>
                    </div>
                </div>
                
                {/* Right block with tertiary image */}
                <div className="blocco-b1">
                    <div className="image-3 implosion">
                        <img src={"https://plus.unsplash.com/premium_photo-1690474614774-a7d16ee9f2dd?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>
                </div>
            </div>
            
            {/* Bottom block with wide image */}
            <div className="blocco-ordina">
                <div className="blocco-c">
                    <div className="image-5">
                        <img src={"https://images.unsplash.com/photo-1706631519116-6607d09107b2?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                             alt={"test"} className="img"></img>

                    </div>

                </div>
            </div>
        </div>
    )
};
export default Mappa;
