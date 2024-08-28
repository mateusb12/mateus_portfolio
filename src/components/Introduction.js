import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import LanguageContext from './LanguageContext';

export const Introduction = () => {
  const languageContent = {
    english: {
      header: "Welcome to my Portfolio!",
      title: "Hello! I am Mateus",
      body: "I am a software developer with extensive experience in backend development, machine learning, and game dev. My diverse background allows me to tackle many challenges in the technology scene, and you can be sure that I am a very valuable resource on any software development team. Today I have an amazing portfolio with incredible projects like Book Analyzer, Flight Price Scrapper, Valorant Impact, among others. These projects have helped me to enhance my skills in API development, DevOps practices, and CI/CD pipelines. I am very proud of them.",
      footer: "Let's connect!"
    },
    portuguese: {
      header: "Bem-vindo ao meu Portfólio",
      title: "Olá! Eu sou o Mateus",
      body: "Sou um desenvolvedor de software com uma rica experiência no desenvolvimento backend, machine learning e game dev. Meu background diverso permite com que eu consiga enfrentar muitos desafios no cenário da tecnologia, e pode ter certeza que eu sou um recurso muito valioso em qualquer equipe de desenvolvimento de software. Hoje eu tenho um portfólio muito massa com projetos incríveis como o Book Analyzer, Flight Price Scrapper, Valorant Impact, entre outros. Esses projetos me ajudaram a aprimorar minhas habilidades em desenvolvimento de APIs, práticas DevOps e pipelines CI/CD. Eu sou muito orgulhoso deles.",
      footer: "Vamos conectar!"
    }
  };

  const { selectedFlag } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [introductionTexts, setIntroductionTexts] = useState(languageContent[selectedLanguage]);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Web Developer", "Web Designer", "UI/UX Designer"];
  const period = 2000;

  useEffect(() => {
    const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
    setIntroductionTexts(languageContent[languageKey]);
  }, [selectedFlag]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [text]);

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
  };

  return (
      <section className="banner" id="home">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7} className="mx-auto">
              <TrackVisibility>
                {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                      <span className="tagline">{introductionTexts.header}</span>
                      <h1>{introductionTexts.title}</h1>
                      <p>{introductionTexts.body}</p>
                      <button onClick={() => console.log('connect')}>{introductionTexts.footer} <ArrowRightCircle size={25}/>
                      </button>
                    </div>}
              </TrackVisibility>
            </Col>
          </Row>
        </Container>
      </section>
  );
};
