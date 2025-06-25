import React, {useState, useEffect, useRef, useContext} from "react";
import flask from "../../assets/img/skills_icons/flask.svg"
import django from "../../assets/img/skills_icons/django.svg"
import alembic from "../../assets/img/skills_icons/alembic.png"
import tilt from "../../assets/img/skills_icons/tilt.png"
import aws from "../../assets/img/skills_icons/aws.png"
import react_native from "../../assets/img/skills_icons/react-native.png"
import design from "../../assets/img/skills_icons/design.png"
import LanguageContext from "../LanguageContext.jsx";

// --- Reusable Core Components ---

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
 * @param {object} [props.itemSizePerScreen] - // NEW: Optional configuration for item width percentage per screen size.
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
    // ... (all the existing hooks and logic remain the same)
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
        // MODIFIED: Reduced vertical padding on mobile (py-8), keeps py-14 for medium screens and up.
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
                            // MODIFIED: Reduced padding on mobile (p-2), scales to p-6 on medium screens.
                            className="flex-shrink-0 flex flex-col items-center justify-center p-2 md:p-6"
                            style={{ width: `${itemWidthPercentage}%` }}
                        >
                            {/* MODIFIED: Smaller icon circle on mobile (w-24 h-24), scales to w-30 h-30 on medium screens. */}
                            <div className="overflow-hidden w-[20vw] h-[20vw] md:w-30 md:h-30 bg-gray-800/50 rounded-full flex items-center justify-center border border-gray-700/50 transition-all duration-300 hover:border-2 hover:border-emerald-400 hover:scale-105">
                                <img
                                    src={src}
                                    alt={`${label} icon`}
                                    // MODIFIED: Reduced padding inside the circle for mobile (p-3), scales to p-4 on medium screens.
                                    className="w-full h-full p-2 md:p-3 object-contain"
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/40x40/1a202c/ffffff?text=${label.charAt(0)}`; }}
                                />
                            </div>
                            {/* MODIFIED: Smaller font for labels on mobile (text-base), scales to text-lg on medium screens. Reduced top margin. */}
                            <span className="mt-3 md:mt-5 text-base md:text-lg text-white font-semibold tracking-wide">{label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* MODIFIED: Pushed arrows in slightly on smallest screens to avoid overlap. */}
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

            {/* MODIFIED: Reduced top margin on mobile. */}
            {maxIndex > 0 && (
                <div className="flex justify-center items-center space-x-2 md:space-x-3 my-6 md:my-8 mx-3 md:mx-4">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => goToSlide(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            // MODIFIED: Smaller pagination dots on mobile (w-10 h-3), scales up for medium screens.
                            className={`w-10 h-3 md:w-12 md:h-4 border-2 border-black rounded-full transition-all duration-300 ease-in-out ${idx === currentIndex ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' : 'bg-gray-600/50 hover:bg-gray-500'}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

const backendPool = [
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg", label: "Python" },
    { src: flask, label: "Flask" },
    { src: django, label: "Django" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg", label: "Node.js" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/swagger/swagger-original.svg", label: "Swagger" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg", label: "Linux" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg", label: "Postgres" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg", label: "MongoDB" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg", label: "Git" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/poetry/poetry-original.svg", label: "Poetry"},
    { src: alembic, label: "Alembic"},
]

const cloudPool = [
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original.svg", label: "Docker" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/redis/redis-original.svg", label: "Redis" },
    { src: aws, label: "AWS" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/googlecloud/googlecloud-original.svg", label: "Google Cloud" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/azure/azure-original.svg", label: "Azure" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/supabase/supabase-original.svg", label: "Supabase" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/firebase/firebase-original.svg", label: "Firebase" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/githubactions/githubactions-original.svg", label: "GitHub Actions" },
    { src: tilt, label: "Tilt"},
]

const frontendPool = [
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg", label: "React" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/refs/heads/master/icons/nextjs/nextjs-original.svg", label: "NextJS" },
    { src: react_native, label: "React Native" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/figma/figma-original.svg", label: "Figma" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg", label: "Typescript" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg", label: "HTML5" },
    { src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg", label: "CSS3" },
    { src: design, label: "UI/UX Design" },
]

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