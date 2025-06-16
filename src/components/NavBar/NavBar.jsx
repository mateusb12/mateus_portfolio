import { useState, useEffect, useContext } from "react";
import { HashLink } from "react-router-hash-link";
import usa from "../../assets/img/usa.svg";
import brazil from "../../assets/img/brazil.svg";
import linkedinIcon from "../../assets/img/nav-icon1.svg";
import facebookIcon from "../../assets/img/nav-icon2.svg";
import instagramIcon from "../../assets/img/nav-icon3.svg";
import githubIcon from "../../assets/img/nav-icon4.svg";
import LanguageContext from "../LanguageContext.jsx";

const NavBar = () => {
    const languageContent = {
        english: { buttons: ["Home", "Skills", "Projects", "Connect"] },
        portuguese: { buttons: ["Início", "Habilidades", "Projetos", "Conectar"] },
    };

    const [activeLink, setActiveLink] = useState("home");
    const [scrolled, setScrolled] = useState(false);
    const { selectedFlag, setSelectedFlag } = useContext(LanguageContext);
    const [buttonTexts, setButtonTexts] = useState(languageContent.english.buttons);

    useEffect(() => {
        setSelectedFlag("usa");
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [setSelectedFlag]);

    useEffect(() => {
        const langKey = selectedFlag === "usa" ? "english" : "portuguese";
        setButtonTexts(languageContent[langKey].buttons);
    }, [selectedFlag]);

    const selectFlag = (flag) => setSelectedFlag(flag);
    const updateActive = (value) => setActiveLink(value);

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="text-xl font-bold">MySite</div>
                <ul className="flex space-x-6">
                    <li><a href="#home" className="hover:text-teal-400">Home</a></li>
                    <li><a href="#about" className="hover:text-teal-400">About</a></li>
                    <li><a href="#projects" className="hover:text-teal-400">Projects</a></li>
                    <li><a href="#contact" className="hover:text-teal-400">Contact</a></li>
                </ul>
            </div>
        </nav>
    );
};

const linkedinURL = "https://www.linkedin.com/in/mateus-bessa-a89b07247/";
const instagramURL = "https://www.instagram.com/matbessa/";
const githubURL = "https://github.com/mateusb12";

export default NavBar;
