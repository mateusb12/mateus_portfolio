import { useContext } from "react";
import { HashLink } from 'react-router-hash-link';
import TrackVisibility from 'react-on-screen';
import LanguageContext from '../LanguageContext';
import { Whatsapp, WindowStack } from 'react-bootstrap-icons';

export const Introduction = () => {
    const { selectedFlag } = useContext(LanguageContext);

    const languageContent = {
        english: {
            title: "Hello! I am Mateus",
            firstParagraph: "I'm a software developer with rich experience in backend development, machine learning, and game development. My diverse background allows me to tackle many challenges in the technology landscape. Today I have an impressive portfolio with amazing projects like the Book Analyzer, Flight Price Scraper, Valorant Impact, among others.",
            secondParagraph: "These projects have helped me refine my skills in API development, DevOps practices, and CI/CD pipelines, and I am very proud of them.",
            workBtn: 'MY WORK',
            contactBtn: 'CONTACT ME'
        },
        portuguese: {
            title: "Olá! Me chamo Mateus",
            firstParagraph: "Sou um desenvolvedor de software com uma experiência rica no desenvolvimento backend. Meu background diversificado me permite enfrentar muitos desafios no cenário da tecnologia. Hoje eu tenho um portfólio muito massa com projetos incríveis como o Book Analyzer, Flight Price Scrapper, Valorant Impact, entre outros.",
            secondParagraph: "Esses projetos me ajudaram a aprimorar minhas habilidades em desenvolvimento de APIs, práticas DevOps e pipelines CI/CD, e eu sou muito orgulhoso deles.",
            workBtn: 'MEU TRABALHO',
            contactBtn: 'FALE COMIGO'
        }
    };

    const key = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const { title, firstParagraph, secondParagraph, workBtn, contactBtn } = languageContent[key];

    const textShadow = {
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    };

    return (
        <section id="home" className="container mx-auto px-4 py-10 w-full">
            <TrackVisibility rootMargin="0px 0px -1px 0px">
                {({ isVisible }) => (
                    <div className="flex w-full flex-col lg:flex-row items-start lg:items-center justify-center">
                        {/* marker */}
                        <span
                            className={`
              hidden md:flex flex-col items-center justify-center
              z-50 px-4 translate-y-[7%]
              before:content-[''] before:block before:w-5 before:h-5 before:bg-[#09F7A5] before:rounded-full before:mb-[-1px]
              after:content-[''] after:block after:w-[10px] after:h-[390px] after:bg-gradient-to-b after:from-[#09F7A5] after:to-transparent
              transition-opacity duration-300
              ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}
                        />

                        {/* intro content */}
                        <div className={`${isVisible ? 'animate__animated animate__fadeIn' : ''} flex flex-col max-w-3xl w-full`}>
                            <h1 className="text-[32px] sm:text-[40px] md:text-[55px] lg:text-[65px] font-bold tracking-tight leading-tight mb-4 text-white">
                                {title}
                            </h1>
                            <p className="text-white text-base sm:text-lg tracking-wide leading-relaxed mb-4">
                                {firstParagraph}
                            </p>
                            <p className="text-white text-base sm:text-lg tracking-wide leading-relaxed mb-8">
                                {secondParagraph}
                            </p>

                            {/* ← Updated buttons wrapper: */}
                            <div className="w-full max-w-max sm:max-w-none mx-auto grid grid-cols-1 gap-6 sm:flex sm:justify-center sm:gap-10">
                                {[
                                    { to: '#projects', label: workBtn,    Icon: WindowStack },
                                    { to: '#contact',  label: contactBtn, Icon: Whatsapp   }
                                ].map(({ to, label, Icon }) => (
                                    <HashLink key={to} to={to} smooth>
                                        <button
                                            className="
                      w-full sm:w-auto mx-auto
                      px-6 py-3
                      bg-black/50 border-2 border-[#09F7A5] text-[#09F7A5] font-bold
                      text-lg rounded-2xl flex items-center justify-center gap-2 uppercase
                      tracking-wider transition-all duration-300
                      hover:bg-[#09F7A5] hover:text-black
                    "
                                        >
                                            {label}
                                            <Icon className="text-xl" />
                                        </button>
                                    </HashLink>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </TrackVisibility>
        </section>
    );
};
