import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useSwipeable } from 'react-swipeable'; // 1. Import the swipe hook

// useWindowWidth and getItemsPerSlide hooks remain the same...
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


const SkillCarousel = React.memo(({ sectionTitle, sectionSubtitle, skillContent, iconsMap }) => {
    const width = useWindowWidth();
    const itemsPerSlide = useMemo(() => getItemsPerSlide(width), [width]);
    const totalItems = skillContent.length;
    const [currentIndex, setCurrentIndex] = useState(0);

    const maxIndex = totalItems > itemsPerSlide ? totalItems - itemsPerSlide : 0;

    useEffect(() => {
        if (currentIndex > maxIndex) {
            setCurrentIndex(maxIndex);
        }
    }, [itemsPerSlide, currentIndex, maxIndex]);

    const goPrev = useCallback(() => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }, []);

    const goNext = useCallback(() => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
    }, [maxIndex]);

    // 2. Configure swipe handlers
    const handlers = useSwipeable({
        onSwipedLeft: () => goNext(),
        onSwipedRight: () => goPrev(),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true
    });

    const trackStyle = useMemo(() => ({
        display: 'flex',
        transition: 'transform 0.5s ease-in-out',
        willChange: 'transform',
        transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
    }), [currentIndex, itemsPerSlide]);

    const itemStyle = useMemo(() => ({
        flex: `0 0 ${100 / itemsPerSlide}%`,
        padding: '0 1rem',
    }), [itemsPerSlide]);

    return (
        <section className="relative py-12 md:py-20 w-full">
            <div className="flex justify-center">
                <div className="relative w-full md:max-w-[70%] px-4 bg-black/50 backdrop-blur-2xl rounded-3xl py-14">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">{sectionTitle}</h2>
                        <p className="text-base md:text-lg text-white/75">{sectionSubtitle}</p>
                    </div>

                    {/* 3. Apply swipe handlers to the carousel container */}
                    <div {...handlers} className="relative overflow-hidden">
                        <div style={trackStyle}>
                            {skillContent.map((skill) => (
                                <div key={skill.id} className="flex-shrink-0" style={itemStyle}>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={iconsMap?.[skill.id] || ''}
                                            alt={skill.title}
                                            className="object-contain h-40 w-40"
                                            loading="lazy"
                                            draggable={false}
                                        />
                                        <span className="mt-5 text-lg md:text-xl font-semibold text-white">
                                            {skill.title}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons -- ARROW FIX */}
                        {maxIndex > 0 && (
                            <>
                                <button
                                    onClick={goPrev}
                                    disabled={currentIndex === 0}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 disabled:opacity-30 transition-opacity z-10"
                                >
                                    <FaChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    disabled={currentIndex === maxIndex}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 disabled:opacity-30 transition-opacity z-10"
                                >
                                    <FaChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* Pills */}
                        {maxIndex > 0 && (
                            <div className="flex justify-center flex-wrap space-x-3 mt-10">
                                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        aria-label={`Go to item ${idx + 1}`}
                                        className={`w-8 h-2.5 rounded-full transition-all my-1 ${
                                            idx === currentIndex
                                                ? 'bg-green-400 shadow-lg shadow-green-400/50'
                                                : 'bg-gray-500/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
});

SkillCarousel.displayName = 'SkillCarousel';

SkillCarousel.propTypes = {
    sectionTitle: PropTypes.string.isRequired,
    sectionSubtitle: PropTypes.string.isRequired,
    skillContent: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
    })).isRequired,
    iconsMap: PropTypes.object,
};

export default SkillCarousel;