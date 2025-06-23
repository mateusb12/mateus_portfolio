import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
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
    const itemsPerSlide = getItemsPerSlide(width);
    const totalItems = skillContent.length;

    // Calculate how many slides/pages
    const slidesCount = Math.ceil(totalItems / itemsPerSlide);

    // Build pages array
    const pages = Array.from({ length: slidesCount }).map((_, pageIndex) => {
        const start = pageIndex * itemsPerSlide;
        return skillContent.slice(start, start + itemsPerSlide);
    });

    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => setCurrentSlide(0), [itemsPerSlide, totalItems]);

    // Styles for track and each slide
    const trackStyle = {
        width: `${pages.length * 100}%`,
        transform: `translateX(-${(100 / pages.length) * currentSlide}%)`,
    };
    const slideStyle = {
        width: `${100 / pages.length}%`,
    };

    return (
        <section className="relative py-12 md:py-20 w-full">
            <div className="flex justify-center w-full">
                <div className="relative w-full md:max-w-[70%] px-4 bg-black/50 backdrop-blur-2xl rounded-3xl py-14">

                    {/* Title */}
                    <div className="mx-auto text-center w-full">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {sectionTitle}
                        </h2>
                        <p className="text-base md:text-lg text-white/75 mb-10">
                            {sectionSubtitle}
                        </p>
                    </div>

                    {/* Carousel Container */}
                    <div className="relative overflow-hidden w-full">
                        {/* Sliding Track */}
                        <div className="flex transition-transform duration-500 ease-in-out" style={trackStyle}>
                            {pages.map((items, idx) => (
                                <div
                                    key={idx}
                                    className="flex flex-shrink-0 gap-x-8 justify-center items-center"
                                    style={slideStyle}
                                >
                                    {items.map(skill => (
                                        <div key={skill.id} className="flex flex-col items-center">
                                            <img
                                                src={iconsMap[skill.id]}
                                                alt={skill.title}
                                                className="object-contain h-40 w-40"
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

                        {/* Nav arrows */}
                        {slidesCount > 1 && (
                            <>
                                <button
                                    onClick={() => setCurrentSlide(i => Math.max(i - 1, 0))}
                                    disabled={currentSlide === 0}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 disabled:opacity-30"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setCurrentSlide(i => Math.min(i + 1, slidesCount - 1))}
                                    disabled={currentSlide === slidesCount - 1}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 disabled:opacity-30"
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Pagination pills */}
                        <div className="flex justify-center items-center space-x-3 mt-10">
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