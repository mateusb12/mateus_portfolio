import '../css/NavBar.css';
import {useState, useEffect, useContext} from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import usa from '../assets/img/usa.png';
import brazil from '../assets/img/brazil.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';
import LanguageContext from './LanguageContext';

export const NavBar = () => {

  const languageFile = require('../data/navbar.json');
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const { selectedFlag, setSelectedFlag } = useContext(LanguageContext);
  const [buttonTexts, setButtonTexts] = useState(['Home', 'Skills', 'Projects', "Let's Connect"])

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectFlag = (flag) => {
    setSelectedFlag(flag);
  }

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  useEffect(() => {
    const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const buttonLabels = languageFile[languageKey].buttons;
    setButtonTexts(buttonLabels);
  }, [selectedFlag, languageFile]);

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#/" onClick={(e) => { e.preventDefault(); selectFlag('usa'); }}>
            <img src={usa} alt="USA Flag" className={`flag ${selectedFlag === 'usa' ? 'selected-flag' : ''}`}/>
          </Navbar.Brand>
          <Navbar.Brand href="#/" onClick={(e) => { e.preventDefault(); selectFlag('brazil'); }}>
            <img src={brazil} alt="Brazil Flag" className={`flag ${selectedFlag === 'brazil' ? 'selected-flag' : ''}`}/>
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
              <a href="#"><img src={navIcon1} alt="" /></a>
              <a href="#"><img src={navIcon2} alt="" /></a>
              <a href="#"><img src={navIcon3} alt="" /></a>
            </div>
            <HashLink to='#connect'>
              <button className="vvd"><span>{buttonTexts[3]}</span></button>
            </HashLink>
          </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}