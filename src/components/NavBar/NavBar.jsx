import { useState, useEffect, useContext } from "react";
import { HashLink } from "react-router-hash-link";
import usa from "../../assets/img/usa.svg";
import brazil from "../../assets/img/brazil.svg";
import linkedinIcon from "../../assets/img/nav-icon1.svg";
import facebookIcon from "../../assets/img/nav-icon2.svg";
import instagramIcon from "../../assets/img/nav-icon3.svg";
import githubIcon from "../../assets/img/nav-icon4.svg";

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
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-black bg-opacity-100 py-2"
                    : "bg-black bg-opacity-50 py-4"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center px-4 md:px-8">
                {/* Flags */}
                {[["usa", usa], ["brazil", brazil]].map(([flag, src]) => (
                    <button
                        key={flag}
                        onClick={() => selectFlag(flag)}
                        className={`relative mr-2 w-10 h-6 rounded overflow-hidden transition-transform transform hover:scale-105 ${
                            selectedFlag === flag ? "ring-2 ring-white" : ""
                        }`}
                    >
                        <img src={src} alt={`${flag} flag`} className="w-full h-full object-cover" />
                    </button>
                ))}

                {/* Hamburger for mobile */}
                <input id="nav-toggle" type="checkbox" className="hidden" />
                <label
                    htmlFor="nav-toggle"
                    className="cursor-pointer ml-auto md:hidden block relative w-6 h-5"
                >
                    <span className="block absolute h-0.5 w-full bg-white top-0 transition-all"></span>
                    <span className="block absolute h-0.5 w-full bg-white top-2 transition-all"></span>
                    <span className="block absolute h-0.5 w-full bg-white top-4 transition-all"></span>
                </label>

                {/* Links & Social */}
                <div className="hidden md:flex md:items-center md:ml-auto w-full md:w-auto" id="nav-content">
                    {/* Nav links */}
                    <ul className="flex flex-col md:flex-row md:space-x-4">
                        {["home", "skills", "projects"].map((section, idx) => (
                            <li key={section}>
                                <a
                                    href={`#${section}`}
                                    onClick={() => updateActive(section)}
                                    className={`block text-white text-lg font-medium px-4 py-2 transition-opacity ${
                                        activeLink === section ? "opacity-100 border-b-2 border-white" : "opacity-75 hover:opacity-100"
                                    }`}
                                >
                                    {buttonTexts[idx]}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Social icons */}
                    <div className="flex items-center ml-6">
                        {[ [linkedinURL, linkedinIcon], [githubURL, githubIcon], [instagramURL, instagramIcon] ].map(
                            ([url, icon], i) => (
                                <a
                                    key={i}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative w-10 h-10 mr-2 rounded-full border border-white border-opacity-50 overflow-hidden"
                                >
                                    {/* hover background */}
                                    <div className="absolute inset-0 bg-white scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                                    <img
                                        src={icon}
                                        alt=""
                                        className="relative z-10 w-1/2 h-1/2 m-auto transition-filter duration-300 group-hover:filter group-hover:invert-0 group-hover:sepia group-hover:hue-rotate-330 group-hover:brightness-95 group-hover:contrast-90"
                                    />
                                </a>
                            )
                        )}
                    </div>

                    {/* Connect button */}
                    <HashLink to="#connect" className="ml-4">
                        <button className="group relative font-bold text-lg border border-white px-8 py-2 overflow-hidden">
                            <span className="relative z-10">{buttonTexts[3]}</span>
                            <div className="absolute inset-y-0 left-0 w-0 bg-white group-hover:w-full transition-all duration-300"></div>
                        </button>
                    </HashLink>
                </div>
            </div>
        </nav>
    );
};

const linkedinURL = "https://www.linkedin.com/in/mateus-bessa-a89b07247/";
const instagramURL = "https://www.instagram.com/matbessa/";
const githubURL = "https://github.com/mateusb12";

export default NavBar;
