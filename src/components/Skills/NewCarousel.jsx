import React, {useState, useEffect, useRef, useContext} from "react";
import LanguageContext from "../LanguageContext.jsx";

// --- Existing Imports ---
import flask from "../../assets/img/skills_icons/flask.svg"
import django from "../../assets/img/skills_icons/django.svg"
import alembic from "../../assets/img/skills_icons/alembic.png"
import tilt from "../../assets/img/skills_icons/tilt.png"
import aws from "../../assets/img/skills_icons/aws.png"
import react_native from "../../assets/img/skills_icons/react-native.png"
import design from "../../assets/img/skills_icons/design.png"

import fastapi from "../../assets/img/skills_icons/fastapi.svg"
import rabbitmq from "../../assets/img/skills_icons/rabbit.svg"
import celery from "../../assets/img/skills_icons/celery.png"
import kubernetes from "../../assets/img/skills_icons/kubernetes.svg"
import sqlite from "../../assets/img/skills_icons/sqlite.svg"
import selenium from "../../assets/img/skills_icons/selenium.svg"
import pandas from "../../assets/img/skills_icons/pandas.png"
import csharp from "../../assets/img/skills_icons/csharp.svg"
import unity from "../../assets/img/skills_icons/unity.svg"
import blender from "../../assets/img/skills_icons/blender.svg"
import pm2 from "../../assets/img/skills_icons/pm2.svg"
import javascript from "../../assets/img/skills_icons/javascript.png"


/**
 * A custom hook to get the current window width.
 * @returns {number} The current inner width of the window.
 */
function useWindowWidth() {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
}

/**
 * A highly configurable and responsive carousel component.
 * @param {object} props - The component props.
 * @param {Array<object>} props.items - The array of items to display in the carousel.
 * @param {object} [props.itemsPerScreen={ large: 3, medium: 2, small: 1 }] - Configuration for items per screen size.
 * @param {object} [props.itemSizePerScreen] - Optional configuration for item width percentage per screen size.
 * @param {object} [props.breakpoints={ large: 1024, medium: 768 }] - The width breakpoints for screen sizes.
 */
function ConfigurableCarousel({
                                  items,
                                  title = "Full Stack Expertise",
                                  subtitle = "From APIs and databases to modern frontend frameworks.",
                                  itemsPerScreen: itemsPerScreenConfig = { large: 3, medium: 2, small: 1 },
                                  itemSizePerScreen: itemSizePerScreenConfig,
                                  breakpoints = { large: 1024, medium: 768 }
                              }) {
    const width = useWindowWidth();
    const carouselRef = useRef(null);

    const getItemsPerPage = () => {
        if (width >= breakpoints.large) return itemsPerScreenConfig.large;
        if (width >= breakpoints.medium) return itemsPerScreenConfig.medium;
        return itemsPerScreenConfig.small;
    };
    const itemsPerPage = getItemsPerPage();

    const getItemWidthPercentage = () => {
        if (itemSizePerScreenConfig) {
            if (width >= breakpoints.large) return itemSizePerScreenConfig.large;
            if (width >= breakpoints.medium) return itemSizePerScreenConfig.medium;
            return itemSizePerScreenConfig.small;
        }
        return 100 / itemsPerPage;
    };
    const itemWidthPercentage = getItemWidthPercentage();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const maxIndex = Math.max(0, items.length - itemsPerPage);

    const handlePrev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    const goToSlide = (index) => setCurrentIndex(index);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartPos(e.type === 'touchstart' ? e.touches[0].clientX : e.clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentPos = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        setDragOffset(currentPos - startPos);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const swipeThreshold = 50;
        if (dragOffset < -swipeThreshold) {
            handleNext();
        } else if (dragOffset > swipeThreshold) {
            handlePrev();
        }
        setDragOffset(0);
    };

    const getTranslateX = () => {
        if (!carouselRef.current) return 0;
        const containerWidth = carouselRef.current.offsetWidth;
        const itemPixelWidth = (containerWidth * itemWidthPercentage) / 100;
        const baseTranslate = -currentIndex * itemPixelWidth;
        return baseTranslate + dragOffset;
    };

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [width, currentIndex, maxIndex]);

    useEffect(() => {
        const carouselElement = carouselRef.current;
        if (carouselElement) {
            carouselElement.addEventListener('mousedown', handleDragStart);
            carouselElement.addEventListener('touchstart', handleDragStart, { passive: true });
        }
        if (isDragging) {
            window.addEventListener('mousemove', handleDragMove);
            window.addEventListener('mouseup', handleDragEnd);
            window.addEventListener('mouseleave', handleDragEnd);
            window.addEventListener('touchmove', handleDragMove, { passive: true });
            window.addEventListener('touchend', handleDragEnd);
        }
        return () => {
            if (carouselElement) {
                carouselElement.removeEventListener('mousedown', handleDragStart);
                carouselElement.removeEventListener('touchstart', handleDragStart);
            }
            window.removeEventListener('mousemove', handleDragMove);
            window.removeEventListener('mouseup', handleDragEnd);
            window.removeEventListener('mouseleave', handleDragEnd);
            window.removeEventListener('touchmove', handleDragMove);
            window.removeEventListener('touchend', handleDragEnd);
        };
    }, [isDragging, handleDragStart, handleDragMove, handleDragEnd]);


    return (
        <div className="relative w-full bg-black/50 backdrop-blur-2xl rounded-3xl border border-green-500/50 shadow-2xl shadow-emerald-500/30">
            <div className="text-center my-4 md:my-6">
                <h2 className="text-3xl md:text-6xl font-bold text-white">{title}</h2>
                <p className="text-sm md:text-xl text-white/75 mt-2">{subtitle}</p>
            </div>

            <div ref={carouselRef} className="relative w-full mx-auto overflow-hidden cursor-grab active:cursor-grabbing">
                <div
                    className="flex"
                    style={{
                        transform: `translateX(${getTranslateX()}px)`,
                        transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}
                >
                    {items.map(({ src, label }) => (
                        <div
                            key={label}
                            className="flex-shrink-0 flex flex-col items-center justify-center p-2 md:p-6"
                            style={{ width: `${itemWidthPercentage}%` }}
                        >
                            <div className="overflow-hidden w-[20vw] h-[20vw] md:w-30 md:h-30 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 hover:border-2 hover:border-emerald-400 hover:scale-105">
                                <img
                                    src={src}
                                    alt={`${label} icon`}
                                    className="w-full h-full p-2 md:p-3 object-contain"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/1a202c/ffffff?text=${label.charAt(0)}`; }}
                                />
                            </div>
                            <span className="mt-3 md:mt-5 text-base md:text-lg text-white font-semibold tracking-wide">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 md:p-3 transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </button>
            <button
                onClick={handleNext}
                disabled={currentIndex === maxIndex || items.length <= itemsPerPage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 md:p-3 transition-all duration-300 z-10 disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </button>

            {maxIndex > 0 && (
                <div className="flex justify-center items-center space-x-2 md:space-x-3 my-6 md:my-8 mx-3 md:mx-4">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`w-10 h-3 md:w-12 md:h-4 border-2 border-black rounded-full transition-all duration-300 ease-in-out ${idx === currentIndex ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600/50 hover:bg-gray-500'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const devicon = "https://raw.githubusercontent.com/devicons/devicon/master/icons";

const iconSourceMap = {
    python:      `${devicon}/python/python-original.svg`,
    node:        `${devicon}/nodejs/nodejs-original.svg`,
    swagger:     `${devicon}/swagger/swagger-original.svg`,
    linux:       `${devicon}/linux/linux-original.svg`,
    postgres:    `${devicon}/postgresql/postgresql-original.svg`,
    mongodb:     `${devicon}/mongodb/mongodb-original.svg`,
    git:         `${devicon}/git/git-original.svg`,
    poetry:      `${devicon}/poetry/poetry-original.svg`,
    docker:      `${devicon}/docker/docker-original.svg`,
    gcloud:      `${devicon}/googlecloud/googlecloud-original.svg`,
    azure:       `${devicon}/azure/azure-original.svg`,
    redis:       `${devicon}/redis/redis-original.svg`,
    supabase:    `${devicon}/supabase/supabase-original.svg`,
    firebase:    `${devicon}/firebase/firebase-original.svg`,
    githubActions: `${devicon}/githubactions/githubactions-original.svg`,
    react:       `${devicon}/react/react-original.svg`,
    nextjs:      `${devicon}/nextjs/nextjs-original.svg`,
    typescript:  `${devicon}/typescript/typescript-original.svg`,
    html:        `${devicon}/html5/html5-original.svg`,
    css:         `${devicon}/css3/css3-original.svg`,
    figma:       `${devicon}/figma/figma-original.svg`,

    flask,
    django,
    fastapi,
    alembic,
    rabbitmq,
    celery,
    kubernetes,
    sqlite,
    selenium,
    pandas,
    csharp,
    unity,
    blender,
    pm2,
    javascript,
    react_native,
    tilt,
    aws,
    design,
};

const backendPool = [
    { src: iconSourceMap.python, label: "Python" },
    { src: iconSourceMap.fastapi, label: "FastAPI" },
    { src: iconSourceMap.flask, label: "Flask" },
    { src: iconSourceMap.django, label: "Django" },
    { src: iconSourceMap.csharp, label: "C#" },
    { src: iconSourceMap.node, label: "Node.js" },
    { src: iconSourceMap.rabbitmq, label: "RabbitMQ" },
    { src: iconSourceMap.swagger, label: "Swagger" },
    { src: iconSourceMap.linux, label: "Linux" },
    { src: iconSourceMap.postgres, label: "Postgres" },
    { src: iconSourceMap.mongodb, label: "MongoDB" },
    { src: iconSourceMap.sqlite, label: "SQLite" },
    { src: iconSourceMap.git, label: "Git" },
    { src: iconSourceMap.poetry, label: "Poetry" },
    { src: iconSourceMap.alembic, label: "Alembic" },
    { src: iconSourceMap.unity, label: "Unity" },
    { src: iconSourceMap.celery, label: "Celery" },
    { src: iconSourceMap.selenium, label: "Selenium" },
    { src: iconSourceMap.pandas, label: "Pandas" },
];

const cloudPool = [
    { src: iconSourceMap.docker, label: "Docker" },
    { src: iconSourceMap.kubernetes, label: "Kubernetes" },
    { src: iconSourceMap.aws, label: "AWS" },
    { src: iconSourceMap.gcloud, label: "Google Cloud" },
    { src: iconSourceMap.azure, label: "Azure" },
    { src: iconSourceMap.pm2, label: "PM2" },
    { src: iconSourceMap.redis, label: "Redis" },
    { src: iconSourceMap.supabase, label: "Supabase" },
    { src: iconSourceMap.firebase, label: "Firebase" },
    { src: iconSourceMap.githubActions, label: "GitHub Actions" },
    { src: iconSourceMap.tilt, label: "Tilt" },
];


const frontendPool = [
    { src: iconSourceMap.react, label: "React" },
    { src: iconSourceMap.react_native, label: "React Native" },
    { src: iconSourceMap.nextjs, label: "NextJS" },
    { src: iconSourceMap.javascript, label: "JavaScript" },
    { src: iconSourceMap.typescript, label: "Typescript" },
    { src: iconSourceMap.blender, label: "Blender 3D" },
    { src: iconSourceMap.figma, label: "Figma" },
    { src: iconSourceMap.html, label: "HTML5" },
    { src: iconSourceMap.css, label: "CSS3" },
    { src: iconSourceMap.design, label: "UI/UX Design" },
];


export default function CarouselList() {
    const carouselText = {
        english: {
            backend:  { title: 'Backend Stack',    subtitle: 'APIs, databases, and communication between systems' },
            cloud:    { title: 'Cloud & DevOps',     subtitle: 'Automation, deployment, and scaling' },
            frontend: { title: 'Frontend Stack',     subtitle: 'Turning designs into user experiences' },
        },
        portuguese: {
            backend:  { title: 'Habilidades Backend',   subtitle: 'APIs, bancos de dados e comunicação entre sistemas' },
            cloud:    { title: 'Cloud & DevOps',      subtitle: 'Automação, deploy e escalabilidade' },
            frontend: { title: 'Habilidades Frontend',   subtitle: 'Desde o design até a experiência final do usuário' },
        },
    };

    const carousels = [
        { key: 'backend',  pool: backendPool },
        { key: 'cloud',    pool: cloudPool   },
        { key: 'frontend', pool: frontendPool},
    ];

    const { selectedFlag } = useContext(LanguageContext);
    const language = selectedFlag === 'usa' ? 'english' : 'portuguese';

    return (
        <section className="relative py-12 md:py-20 w-full font-sans select-none" id="skills">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                {carousels.map(({ key, pool }) => (
                    <ConfigurableCarousel
                        key={key}
                        title={carouselText[language][key].title}
                        subtitle={carouselText[language][key].subtitle}
                        items={pool}
                        itemsPerScreen={{ large: 5, medium: 3, small: 3 }}
                        itemSizePerScreen={{ large: 20, medium: 30, small: 33 }}
                    />
                ))}
            </div>
        </section>
    );
}