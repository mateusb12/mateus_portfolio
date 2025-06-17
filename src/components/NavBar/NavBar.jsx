import {useState, useEffect, useContext} from 'react';
import {HashLink} from 'react-router-hash-link';
import usaFlag from '../../assets/img/usa.svg';
import brazilFlag from '../../assets/img/brazil.svg';
import linkedinIcon from '../../assets/img/nav-icon1.svg';
import facebookIcon from '../../assets/img/nav-icon2.svg';
import instagramIcon from '../../assets/img/nav-icon3.svg';
import githubIcon from '../../assets/img/nav-icon4.svg';
import LanguageContext from '../LanguageContext';

const linkedinURL = 'https://www.linkedin.com/in/mateus-bessa-a89b07247/';
const instagramURL = 'https://www.instagram.com/matbessa/';
const githubURL = 'https://github.com/mateusb12';

const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {selectedFlag, setSelectedFlag} = useContext(LanguageContext);
    const languageContent = {
        english: ['Home', 'Skills', 'Projects', 'Connect'],
        portuguese: ['Início', 'Habilidades', 'Projetos', 'Conectar'],
    };
    const buttonTexts =
        selectedFlag === 'brazil' ? languageContent.portuguese : languageContent.english;

    useEffect(() => {
        setSelectedFlag('usa');
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleFlag = (flag) => {
        setSelectedFlag(flag);
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
        setMenuOpen(false);
    };

    return (
        <nav
            className={`
        fixed top-0 w-full z-50
        transition-all duration-300
        ${scrolled
                ? 'bg-gray-900 py-[19px]'
                : 'bg-black bg-opacity-50 py-[19px]'}
      `}
        >
            {/* 1. Centered “container” */}
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* ‣ Flags */}
                <div className="flex items-center space-x-2">
                    <button onClick={() => toggleFlag('usa')}>
                        <img
                            src={usaFlag} alt="USA"
                            className={`flag ${selectedFlag==='usa'?'selected-flag':''}`}
                        />
                    </button>
                    <button onClick={() => toggleFlag('brazil')}>
                        <img
                            src={brazilFlag} alt="Brazil"
                            className={`flag ${selectedFlag==='brazil'?'selected-flag':''}`}
                        />
                    </button>
                </div>

                {/* ‣ Desktop menu (hidden on mobile) */}
                <div className="hidden md:flex items-center space-x-6">
                    {['home','skills','projects'].map((link, idx) => (
                        <HashLink
                            key={link}
                            to={`#${link}`} smooth
                            className={`
                text-white text-lg font-medium tracking-wide
                px-4 py-2 border border-transparent
                hover:border-white
                transition-colors duration-300
                ${activeLink===link?'opacity-100':'opacity-75'}
              `}
                            onClick={() => handleLinkClick(link)}
                        >
                            {buttonTexts[idx]}
                        </HashLink>
                    ))}

                    <div className="flex items-center space-x-3">
                        {[
                            { icon: linkedinIcon, url: linkedinURL,  alt: 'LinkedIn' },
                            { icon: githubIcon,   url: githubURL,    alt: 'GitHub'   },
                            { icon: instagramIcon,url: instagramURL, alt: 'Instagram'},
                        ].map(({icon,url,alt})=>(
                            <a
                                key={url}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                  relative w-10 h-10 bg-gray-800 bg-opacity-50
                  rounded-full flex items-center justify-center
                  border border-white transition-all
                  before:absolute before:w-0 before:h-full
                  before:bg-white before:rounded-full
                  before:transition-transform before:duration-300
                  hover:before:w-full
                "
                            >
                                <img
                                    src={icon} alt={alt}
                                    className="w-5 z-10 transition-filter hover:filter-none"
                                />
                            </a>
                        ))}

                        <HashLink to="#connect" smooth>
                            <button
                                onClick={() => handleLinkClick('connect')}
                                className="
                  relative font-bold text-lg text-white
                  border border-white px-6 py-2
                  overflow-hidden transition-all
                  hover:text-gray-900
                "
                            >
                <span className="relative z-10">
                  {buttonTexts[3]}
                </span>
                                <span className="
                  absolute left-0 top-0 w-0 h-full bg-white
                  transition-all hover:w-full
                "/>
                            </button>
                        </HashLink>
                    </div>
                </div>

                {/* ‣ Mobile burger (hidden on md+) */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(o => !o)}
                >
                    <div className="space-y-1">
            <span className={`
              block h-1 w-6 bg-white
              transition-transform
              ${menuOpen?'rotate-45 translate-y-2':''}
            `}/>
                        <span className={`
              block h-1 w-6 bg-white
              transition-opacity
              ${menuOpen?'opacity-0':'opacity-100'}
            `}/>
                        <span className={`
              block h-1 w-6 bg-white
              transition-transform
              ${menuOpen?'-rotate-45 -translate-y-2':''}
            `}/>
                    </div>
                </button>
            </div>

            {/* 2. Mobile menu items */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 bg-opacity-90 py-4">
                    <div className="flex flex-col items-center space-y-4">
                        {['home','skills','projects'].map((link, idx) => (
                            <HashLink
                                key={link}
                                to={`#${link}`} smooth
                                className={`
                  text-white text-xl font-medium tracking-wide
                  transition-opacity
                  ${activeLink===link?'opacity-100':'opacity-75'}
                `}
                                onClick={() => handleLinkClick(link)}
                            >
                                {buttonTexts[idx]}
                            </HashLink>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
};

export default NavBar;
