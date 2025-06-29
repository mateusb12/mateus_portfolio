import './NavBar.css';
import {useState, useEffect, useContext} from 'react';
import {HashLink} from 'react-router-hash-link';
import usaFlag from '../../assets/img/usa.svg';
import brazilFlag from '../../assets/img/brazil.svg';
import linkedinIcon from '../../assets/img/nav-icon1.svg';
import instagramIcon from '../../assets/img/nav-icon3.svg';
import githubIcon from '../../assets/img/nav-icon4.svg';
import LanguageContext from '../LanguageContext';

const linkedinURL = 'https://www.linkedin.com/in/mateus-bessa-a89b07247/';
const instagramURL = 'https://www.instagram.com/matbessa/';
const githubURL = 'https://github.com/mateusb12';

export const NavBar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {selectedFlag, setSelectedFlag} = useContext(LanguageContext);

    const languageContent = {
        english: ['Home', 'Skills', 'Experiences', 'Projects', 'Contact'],
        portuguese: ['Início', 'Habilidades', 'Experiências', 'Projetos', 'Contato'],
    };
    const buttonTexts =
        selectedFlag === 'brazil' ? languageContent.portuguese : languageContent.english;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = ['home', 'skills', 'experiences', 'projects', 'contact'];
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50% 0px',  // fire when top of section crosses halfway down viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, observerOptions);

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
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
        ${scrolled ? 'bg-gray-900 py-[19px]' : 'bg-black bg-opacity-50 py-[19px]'}
      `}
        >
            <div className="w-full mx-auto flex items-center justify-between">
                {/* Flags */}
                <div className="flex items-center space-x-2 ml-5 md:ml-[20%]">
                    <button onClick={() => toggleFlag('usa')}>
                        <img
                            src={usaFlag}
                            alt="USA"
                            className={`flag ${selectedFlag === 'usa' ? 'selected-flag' : ''}`}
                        />
                    </button>
                    <button onClick={() => toggleFlag('brazil')}>
                        <img
                            src={brazilFlag}
                            alt="Brazil"
                            className={`flag ${selectedFlag === 'brazil' ? 'selected-flag' : ''}`}
                        />
                    </button>
                </div>

                {/* Desktop menu */}
                <div className="hidden mr-15 md:flex items-center gap-0">
                    {['home', 'skills', 'experiences', 'projects'].map((link, idx) => (
                        <HashLink
                            key={link}
                            to={`#${link}`}
                            smooth
                            className={`
                text-white text-lg font-medium tracking-wide
                border border-transparent hover:border-white
                transition-colors duration-300
                !px-[25px] !py-[18px]
                !m-0 !mx-0 !my-0
                ${activeLink === link ? 'opacity-100' : 'opacity-75'}
              `}
                            onClick={() => handleLinkClick(link)}
                        >
                            {buttonTexts[idx]}
                        </HashLink>
                    ))}

                    <div className="flex items-center space-x-2 ml-3">
                        {[
                            {icon: linkedinIcon, url: linkedinURL, alt: 'LinkedIn'},
                            {icon: githubIcon, url: githubURL, alt: 'GitHub'},
                            {icon: instagramIcon, url: instagramURL, alt: 'Instagram'},
                        ].map(({icon, url, alt}) => (
                            <a
                                key={url}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon"
                            >
                                <img src={icon} alt={alt}/>
                            </a>
                        ))}
                    </div>

                    <HashLink to="#contact" smooth>
                        <button
                            onClick={() => handleLinkClick('contact')}
                            className="connect-btn ml-7"
                        >
              <span className="connect-btn__label">
                {buttonTexts[4]}
              </span>
                        </button>
                    </HashLink>
                </div>

                {/* Mobile burger */}
                <button
                    className="md:hidden text-white focus:outline-none mr-4"
                    onClick={() => setMenuOpen((o) => !o)}
                >
                    <div className="space-y-1">
            <span
                className={`
                block h-1 w-6 bg-white
                transition-transform
                ${menuOpen ? 'rotate-45 translate-y-2' : ''}
              `}
            />
                        <span
                            className={`
                block h-1 w-6 bg-white
                transition-opacity
                ${menuOpen ? 'opacity-0' : 'opacity-100'}
              `}
                        />
                        <span
                            className={`
                block h-1 w-6 bg-white
                transition-transform
                ${menuOpen ? '-rotate-45 -translate-y-2' : ''}
              `}
                        />
                    </div>
                </button>
            </div>

            {/* Mobile menu items */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 bg-opacity-90 py-4">
                    <div className="flex flex-col items-center space-y-4">
                        {['home', 'skills', 'experiences', 'projects', 'connect'].map((link, idx) => (
                            <HashLink
                                key={link}
                                to={`#${link}`}
                                smooth
                                className={`
                  text-white text-lg font-medium tracking-wide
                  border border-transparent hover:border-white
                  transition-colors duration-300
                  ${activeLink === link ? 'opacity-100' : 'opacity-75'}
                  !py-[18px] !px-[25px] !h-[61px]
                  !m-0 !mr-0 !ml-0 !me-0 !ms-0 !my-0 !mx-0
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
    );
};

export default NavBar;