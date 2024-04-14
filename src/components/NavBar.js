import '../css/NavBar.css';
import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import usa from '../assets/img/usa.png';
import brazil from '../assets/img/brazil.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg';
import navIcon3 from '../assets/img/nav-icon3.svg';
import { HashLink } from 'react-router-hash-link';

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState('english');
  const [homeText, setHomeText] = useState('Home')

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
    console.log("Before setting flag:", selectedFlag);
    setSelectedFlag(flag);
    console.log("After setting flag:", flag);
  }

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  useEffect(() => {
    const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';

    fetch('/data/navbar.json')
        .then(response => {
          return response.json();
        })
        .then(data => {
          const homeButtonText = data[languageKey].buttons[0];
          setHomeText(homeButtonText);
        })
  }, [selectedFlag]);



  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="#/" onClick={(e) => selectFlag('usa', e)}>
            <img src={usa} alt="USA Flag" className={`flag ${selectedFlag === 'usa' ? 'selected-flag' : ''}`}/>
          </Navbar.Brand>
          <Navbar.Brand href="#/" onClick={(e) => selectFlag('brazil', e)}>
            <img src={brazil} alt="Brazil Flag" className={`flag ${selectedFlag === 'brazil' ? 'selected-flag' : ''}`}/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>{homeText}</Nav.Link>
              <Nav.Link href="#skills" className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('skills')}>Skills</Nav.Link>
              <Nav.Link href="#projects" className={activeLink === 'projects' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('projects')}>Projects</Nav.Link>
            </Nav>
            <span className="navbar-text">
            <div className="social-icon">
              <a href="#"><img src={navIcon1} alt="" /></a>
              <a href="#"><img src={navIcon2} alt="" /></a>
              <a href="#"><img src={navIcon3} alt="" /></a>
            </div>
            <HashLink to='#connect'>
              <button className="vvd"><span>Let’s Connect</span></button>
            </HashLink>
          </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
