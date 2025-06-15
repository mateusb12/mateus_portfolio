import { useContext } from "react";
import 'animate.css';
import './Introduction.css';
import { HashLink } from 'react-router-hash-link';
import TrackVisibility from 'react-on-screen';
import LanguageContext from '../LanguageContext';
import {Whatsapp, WindowStack} from "react-bootstrap-icons";
import ServiceCard from "../ServiceCard/ServiceCard";

export const Introduction = () => {
  const { selectedFlag } = useContext(LanguageContext);

  const languageContent = {
    english: {
      header: "Welcome to my Portfolio!",
      title: "Hello! I am Mateus",
      body: "\\pI'm a software developer with rich experience in backend development, machine learning, and game development. My diverse background allows me to tackle many challenges in the technology landscape. Today, I have an impressive portfolio with amazing projects like the Book Analyzer, Flight Price Scraper, Valorant Impact, among others. \\n\\n\\pThese projects have helped me refine my skills in API development, DevOps practices, and CI/CD pipelines, and I am very proud of them. You can be sure that I am a valuable asset to any software development team.",
      footer: "Let's connect!"
    },
    portuguese: {
      header: "Bem-vindo ao meu Portfólio",
      title: "Olá! Me chamo Mateus",
      body: "\\pSou um desenvolvedor de software com uma experiência rica no desenvolvimento backend. Meu background diversificado me permite enfrentar muitos desafios no cenário da tecnologia. Hoje eu tenho um portfólio muito massa com projetos incríveis como o Book Analyzer, Flight Price Scrapper, Valorant Impact, entre outros. \\n\\n\\pEsses projetos me ajudaram a aprimorar minhas habilidades em desenvolvimento de APIs, práticas DevOps e pipelines CI/CD, e eu sou muito orgulhoso deles. Pode ter certeza que eu sou um recurso muito valioso em qualquer equipe de desenvolvimento de software",
      footer: "Entre em contato"
    }
  };

  // Mapping flag to language key
  const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
  const introductionTexts = languageContent[languageKey];

  // Replace \p with four non-breaking spaces and \n with <br />
  const formattedBody = introductionTexts.body
      .replace(/\\p/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;') // Replace \p with four &nbsp;
      .replace(/\\n/g, '<br />');                  // Replace \n with <br />

  return (
      <section className="introduction-banner debug" id="home">
        <TrackVisibility partialVisibility>
          {({ isVisible }) => (
              <div className="main-container">
                <span className="vertical-index"></span>
                <div className={isVisible ? "animate__animated animate__fadeIn main-body" : ""}>
                  <h1>{introductionTexts.title}</h1>
                  <p dangerouslySetInnerHTML={{ __html: formattedBody }}></p>
                  <div className="button-group">
                    <HashLink to="#projects">
                      <button className="custom-button">
                        {languageKey === 'english' ? 'MY WORK' : 'MEU TRABALHO'}
                        <WindowStack size={32} />
                      </button>
                    </HashLink>
                    <HashLink smooth to="#connect">
                      <button className="custom-button">
                        {languageKey === 'english' ? 'CONTACT ME' : 'FALE COMIGO'}
                        <Whatsapp size={32} />
                      </button>
                    </HashLink>
                    <ServiceCard />
                  </div>
                </div>
              </div>
          )}
        </TrackVisibility>
      </section>
  );
};
