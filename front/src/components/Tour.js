import { Container, Row, Col, Tab } from "react-bootstrap";
import { TourCard } from "./TourCard";
import projImg1 from "../assets/img/tour1.jpg";
import projImg2 from "../assets/img/tour2.jpg";
import projImg3 from "../assets/img/tour3.JPG";


import TrackVisibility from 'react-on-screen';

export const Tour = () => {

  const tours = [
    {
      title: "Río Tenorio Rafting Class III-IV",
      description: "El Tour de Rafting en el poderoso Río Tenorio es un emocionante viaje de rafting en aguas clase III-IV.",
      imgUrl: projImg1,
    },
    {
      title: "Sport Fishing Experience",
      description: "Tour de Pesca deportiva es el viaje ideal para relajarse y escuchar la naturaleza que nos rodea.",
      imgUrl: projImg2,
    },
    {
      title: "Safari Río Corobici Floating",
      description: "El Tour Flotante del Río Corobicí es una experiencia ideal para familias, amantes de la naturaleza, observadores de aves e incluso científicos.",
      imgUrl: projImg3,
    },

  ];

  return (
    <section className="tour" id="tours">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Tours</h2>
                  <p></p>
                  <Tab.Container id="tours-tabs" defaultActiveKey="first">

                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          {
                            tours.map((tour, index) => {
                              return (
                                <TourCard
                                  key={index}
                                  {...tour}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

    </section>
  )
}