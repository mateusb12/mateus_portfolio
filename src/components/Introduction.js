import {useState, useEffect, useContext} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';
import LanguageContext from './LanguageContext';

export const Introduction = () => {
  const languageFile = require('../data/banner.json');
  const { selectedFlag } = useContext(LanguageContext);
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [introductionTexts, setIntroductionTexts] = useState(languageFile[selectedLanguage]);
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
  const period = 2000;

  useEffect(() => {
    const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const introductionLabels = languageFile[languageKey];
    setIntroductionTexts(introductionLabels);
  }, [selectedFlag, languageFile]);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

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
            <Col xs={12} md={6} xl={7} className="mx-auto">
              <TrackVisibility>
                {({isVisible}) =>
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
  )
}
