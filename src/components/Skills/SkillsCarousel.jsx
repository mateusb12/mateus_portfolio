import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Hook: Track viewport width
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
        const onResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return width;
};

// Determine how many icons to show per "page"
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
    const totalSlides = Math.ceil(skillContent.length / itemsPerSlide);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Reset to first slide if layout changes
    useEffect(() => setCurrentSlideIndex(0), [itemsPerSlide]);

    // Compute which icons to display now
    const start = currentSlideIndex * itemsPerSlide;
    const end = start + itemsPerSlide;
    const currentItems = skillContent.slice(start, end);

    return (
        <div className="relative bg-black bg-opacity-50 backdrop-blur-md rounded-2xl shadow-2xl px-6 py-10 max-w-5xl mx-auto">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-2">
                {sectionTitle}
            </h2>
            <p className="text-sm md:text-base text-center text-white/75 mb-8">
                {sectionSubtitle}
            </p>

            {/* Icons Row */}
            <div className="relative">
                <div className="grid grid-flow-col auto-cols-fr gap-x-12 items-center justify-start">
                    {currentItems.map((skill) => (
                        <div key={skill.id} className="flex flex-col items-center">
                            <img
                                src={iconsMap[skill.id]}
                                alt={skill.title}
                                className="w-20 h-20 object-contain"
                            />
                            <span className="mt-4 text-sm md:text-base font-medium text-white">
                {skill.title}
              </span>
                        </div>
                    ))}
                </div>

                {/* Arrows */}
                {totalSlides > 1 && (
                    <>
                        <button
                            onClick={() => setCurrentSlideIndex((i) => Math.max(i - 1, 0))}
                            disabled={currentSlideIndex === 0}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 rounded-full p-3 text-white hover:bg-opacity-80 disabled:opacity-30"
                        >
                            <FaChevronLeft size={18} />
                        </button>

                        <button
                            onClick={() => setCurrentSlideIndex((i) => Math.min(i + 1, totalSlides - 1))}
                            disabled={currentSlideIndex === totalSlides - 1}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 rounded-full p-3 text-white hover:bg-opacity-80 disabled:opacity-30"
                        >
                            <FaChevronRight size={18} />
                        </button>
                    </>
                )}

                {/* Pagination Pills */}
                <div className="flex justify-center items-center space-x-2 mt-6">
                    {Array.from({ length: totalSlides }).map((_, slideIdx) => (
                        <button
                            key={slideIdx}
                            onClick={() => setCurrentSlideIndex(slideIdx)}
                            className={`w-6 h-2 rounded-full transition-all ${
                                slideIdx === currentSlideIndex ? 'bg-green-400' : 'bg-gray-500/50'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SkillCarousel;
