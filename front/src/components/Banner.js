import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/raft.png";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["RAFTING", "TOURS", "RESTAURANTE"];
  const period = 2000;
  const [activeLink, setActiveLink] = useState('conect');

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }


  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h1>{`RINCON COROBICI`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "RAFTING", "TOURS", "RESTAURANTE" ]'><span className="wrap">{text}</span></span></h1>
                  <p>RCR Rafting es una empresa de turismo de aventura ubicada en Cañas Guanacaste, cantón considerado por muchos como el corazón de toda la provincia y punto neurálgico que comunica diferentes regiones de Costa Rica como Arenal, Monteverde Manuel Antonio entre otras con la provincia Guanacaste.
                    Contamos con más de 15 años de experiencia, organizando tours de rafting inolvidables a miles de turistas...</p>
                  <button href="#connect" className={activeLink === 'connect' ? 'active link' : 'link'} onClick={() => onUpdateActiveLink('connect')}>Contactanos<ArrowRightCircle size={25} /></button >

                </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img" />
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}