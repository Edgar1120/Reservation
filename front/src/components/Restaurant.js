import meter1 from "../assets/img/salon1.jpg";
import meter2 from "../assets/img/salon2.JPG";
import meter3 from "../assets/img/Souvenir.JPG";
import meter4 from "../assets/img/Vista.jpg";
import meter5 from "../assets/img/Bebida.png";
import meter6 from "../assets/img/Desayuno 2.png";
import meter7 from "../assets/img/Desayuno 3.png";
import meter8 from "../assets/img/almuerzo.png";
import meter9 from "../assets/img/casado.png";
import meter10 from "../assets/img/boca.png";
import meter11 from "../assets/img/Postre.png";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/rojo.png"

export const Restaurant = () => {
    const responsive = {
        superLargeDesktop: {

            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <section className="skill" id="restaurants">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                            <h2>Fotos del Restaurante</h2>
                            <p>Situado en un entorno natural con vista al hermoso Río Corobici</p>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                <div className="item">
                                    <img src={meter1} alt="Image" />
                                    <h5>Chimenea</h5>
                                </div>
                                <div className="item">
                                    <img src={meter2} alt="Image" />
                                    <h5>Salón</h5>
                                </div>
                                <div className="item">
                                    <img src={meter3} alt="Image" />
                                    <h5>Souvenir</h5>
                                </div>
                                <div className="item">
                                    <img src={meter4} alt="Image" />
                                    <h5>Terraza vista al río</h5>
                                </div>
                            </Carousel>

                            <h2>Fotos de Platillos</h2>
                            <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                                <div className="item">
                                    <img src={meter5} alt="Image" />
                                    <h5>Bebida</h5>
                                </div>
                                <div className="item">
                                    <img src={meter6} alt="Image" />
                                    <h5>Desayuno</h5>
                                </div>
                                <div className="item">
                                    <img src={meter7} alt="Image" />
                                    <h5>Desayuno</h5>
                                </div>
                                <div className="item">
                                    <img src={meter8} alt="Image" />
                                    <h5>Almuerzo</h5>
                                </div>
                                <div className="item">
                                    <img src={meter9} alt="Image" />
                                    <h5>Casado</h5>
                                </div>
                                <div className="item">
                                    <img src={meter10} alt="Image" />
                                    <h5>Bocas</h5>
                                </div>
                                <div className="item">
                                    <img src={meter11} alt="Image" />
                                    <h5>Postre</h5>
                                </div>

                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>


            <img className="background-image-left" src={colorSharp} alt="Image" />
        </section>
    )
}