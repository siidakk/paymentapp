import Image1 from "../../assets/webpage.png"
import Image2 from "../../assets/wbpage2.png"
import Image3 from "../../assets/webpage3.png"
import UpiChalegaImage from "../../assets/image.png"

export function Slideshow(){
    return (
        <>
        <div className="slideshow-container">
                <div className="slide fade">
                    <img className="photo" src={Image1} alt="Image 1" />
                </div>
                <div className="slide fade">
                    <img className="photo" src={Image2} alt="Image 2" />
                </div>
                <div className="slide fade">
                    <img className="photo" src={Image3} alt="Image 3" />
                </div>
        </div>
            
            <a href="https://www.upichalega.com/" target="_blank">
                <img src={UpiChalegaImage} alt="image" className="upichalega"/>
            </a>
        </>
    )
}