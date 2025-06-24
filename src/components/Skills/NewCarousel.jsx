import React, { useState, useEffect } from "react";
import python from "../../assets/img/skills_icons/python.svg";
import flask from "../../assets/img/skills_icons/flask.png";
import django from "../../assets/img/skills_icons/django.png";
import nodejs from "../../assets/img/skills_icons/nodejs.png";

function useWindowWidth() {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);
    return width;
}

const skills = [
    { src: python, label: "Python" },
    { src: flask, label: "Flask" },
    { src: django, label: "Django" },
    { src: nodejs, label: "Node.js" },
];

export default function ResponsiveCarousel() {
    const width = useWindowWidth();

    let itemsPerPage;
    if (width < 400) itemsPerPage = 1;
    else if (width < 768) itemsPerPage = 2;
    else itemsPerPage = 3;

    const totalPages = Math.ceil(skills.length / itemsPerPage);
    // Use a single icon size
    const iconSize = 40;
    const iconSizeClass = `w-${iconSize} h-${iconSize}`;

    const [page, setPage] = useState(0);

    const handlePrev = () => setPage((p) => (p - 1 + totalPages) % totalPages);
    const handleNext = () => setPage((p) => (p + 1) % totalPages);

    const startIndex = page * itemsPerPage;
    const visibleItems = skills.slice(startIndex, startIndex + itemsPerPage);

    return (
        <section className="relative py-12 md:py-20 w-full">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative w-full px-4 bg-black/50 backdrop-blur-2xl rounded-3xl py-14 border border-blue-500">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">Backend Stack</h2>
                        <p className="text-base md:text-lg text-white/75">APIs, databases, and communication between systems</p>
                    </div>

                    <div className="relative w-full mx-auto overflow-hidden">
                        <div className="flex overflow-hidden w-full">
                            {visibleItems.map(({ src, label }) => (
                                <div
                                    key={label}
                                    className={`flex-shrink-0 flex flex-col items-center px-4 border border-amber-400
                    ${itemsPerPage === 1 ? 'w-full' : itemsPerPage === 2 ? 'w-1/2' : 'w-1/3'}`}
                                >
                                    <img src={src} alt={label} className={`${iconSizeClass} object-contain border border-pink-500`} />
                                    <span className="mt-5 text-white text-lg md:text-xl font-semibold">{label}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={handlePrev}
                            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <button
                            onClick={handleNext}
                            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-center flex-wrap space-x-3 mt-10">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPage(idx)}
                                aria-label={`Go to page ${idx + 1}`}
                                className={`w-8 h-2.5 rounded-full transition-all my-1 ${idx === page ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-500/50'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
