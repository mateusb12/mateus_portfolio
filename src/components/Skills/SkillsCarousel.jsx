import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const frame = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            if (frame.current !== null) return;
            frame.current = window.requestAnimationFrame(() => {
                setWidth(window.innerWidth);
                frame.current = null;
            });
        };
        window.addEventListener('resize', handleResize);
        return () => {
            if (frame.current) window.cancelAnimationFrame(frame.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return width;
};

const getItemsPerSlide = (width) => {
    if (width >= 1200) return 5;
    if (width >= 992) return 4;
    if (width >= 768) return 3;
    if (width >= 576) return 2;
    return 1;
};

const SkillCarousel = ({ sectionTitle, sectionSubtitle, skillContent, iconsMap }) => {
    const width = useWindowWidth();
    const maxPerSlide = useMemo(() => getItemsPerSlide(width), [width]);
    const totalItems = skillContent.length;
    const pagesCount = Math.ceil(totalItems / maxPerSlide);
    const pageSize = Math.ceil(totalItems / pagesCount);

    const pages = useMemo(() => {
        return Array.from({ length: pagesCount }, (_, i) =>
            skillContent.slice(i * pageSize, i * pageSize + pageSize)
        );
    }, [skillContent, pageSize, pagesCount]);

    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => setCurrentSlide(0), [pageSize, totalItems]);

    const trackStyle = useMemo(() => ({
        width: `${pagesCount * 100}%`,
        transform: `translate3d(-${(100 / pagesCount) * currentSlide}%, 0, 0)`,
        willChange: 'transform',
    }), [pagesCount, currentSlide]);

    const slideStyle = useMemo(() => ({
        width: `${100 / pagesCount}%`,
    }), [pagesCount]);

    const goPrev = useCallback(() => {
        setCurrentSlide((i) => Math.max(i - 1, 0));
    }, []);

    const goNext = useCallback(() => {
        setCurrentSlide((i) => Math.min(i + 1, pagesCount - 1));
    }, [pagesCount]);

    return (
        <section className="relative py-12 md:py-20 w-full">
            <div className="flex justify-center">
                <div className="relative w-full md:max-w-[70%] px-4 bg-black/50 backdrop-blur-2xl rounded-3xl py-14">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">{sectionTitle}</h2>
                        <p className="text-base md:text-lg text-white/75">{sectionSubtitle}</p>
                    </div>

                    {/* Carousel */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={trackStyle}
                        >
                            {pages.map((items, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-shrink-0 gap-x-8 justify-center items-center"
                                    style={slideStyle}
                                >
                                    {items.map((skill) => (
                                        <div key={skill.id} className="flex flex-col items-center">
                                            <img
                                                src={iconsMap[skill.id]}
                                                alt={skill.title}
                                                className="object-contain h-40 w-40"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                            <span className="mt-5 text-lg md:text-xl font-semibold text-white">
                        {skill.title}
                      </span>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Nav */}
                        {pagesCount > 1 && (
                            <>
                                <button
                                    onClick={goPrev}
                                    disabled={currentSlide === 0}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 disabled:opacity-30"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={currentSlide === pagesCount - 1}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 disabled:opacity-30"
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Pills */}
                        <div className="flex justify-center space-x-3 mt-10">
                            {pages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-8 h-2.5 rounded-full transition-all ${
                                        idx === currentSlide
                                            ? 'bg-green-400 shadow-lg shadow-green-400/50'
                                            : 'bg-gray-500/50'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SkillCarousel;
