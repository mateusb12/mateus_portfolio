import './NavBar.css';
import { useState, useEffect, useContext } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import usa from '../../assets/img/usa.png';
import brazil from '../../assets/img/brazil.png';
import linkedinIcon from '../../assets/img/nav-icon1.svg';
import facebookIcon from '../../assets/img/nav-icon2.svg';
import instagramIcon from '../../assets/img/nav-icon3.svg';
import githubIcon from '../../assets/img/nav-icon4.svg';
import { HashLink } from 'react-router-hash-link';
import LanguageContext from '../LanguageContext';

const linkedinURL = "https://www.linkedin.com/in/mateus-bessa-a89b07247/";
const instagramURL = "https://www.instagram.com/matbessa/"
const githubURL = "https://github.com/mateusb12";

export const NavBar = () => {
  // Embedded language content
  const languageContent = {
    english: {
      buttons: ["Home", "Skills", "Projects", "Connect"]
    },
    portuguese: {
      buttons: ["Início", "Habilidades", "Projetos", "Conectar"]
    }
  };

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { selectedFlag, setSelectedFlag } = useContext(LanguageContext);
  const [buttonTexts, setButtonTexts] = useState(languageContent.english.buttons);  // Default to English

  useEffect(() => {
    setSelectedFlag('usa');
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
    setButtonTexts(languageContent[languageKey].buttons);
  }, [selectedFlag]);

  const selectFlag = (flag) => {
    setSelectedFlag(flag);
  };

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#/" onClick={(e) => {
            e.preventDefault();
            selectFlag('usa');
          }}>
            <img src={usa} alt="USA Flag" className={`flag usa ${selectedFlag === 'usa' ? 'selected-flag' : ''}`} />
          </Navbar.Brand>
          <Navbar.Brand href="#/" onClick={(e) => {
            e.preventDefault();
            selectFlag('brazil');
          }}>
            <img src={brazil} alt="Brazil Flag" className={`flag ${selectedFlag === 'brazil' ? 'selected-flag' : ''}`} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{buttonTexts[0]}</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>{buttonTexts[1]}</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>{buttonTexts[2]}</Nav.Link>
            </Nav>
            <span className="navbar-text">
  <div className="social-icon">
    <a href={linkedinURL} target="_blank" rel="noopener noreferrer">
      <img src={linkedinIcon} alt="LinkedIn"/>
    </a>
    <a href={githubURL} target="_blank" rel="noopener noreferrer">
      <img src={githubIcon} alt="Github"/>
    </a>
    <a href={instagramURL} target="_blank" rel="noopener noreferrer">
      <img src={instagramIcon} alt="Instagram"/>
    </a>
  </div>
  <HashLink to='#connect'>
    <button className="vvd"><span>{buttonTexts[3]}</span></button>
  </HashLink>
</span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
};