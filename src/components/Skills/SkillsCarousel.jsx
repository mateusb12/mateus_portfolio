import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import PropTypes from 'prop-types';

// NOTE: react-icons and react-swipeable were removed to resolve build errors.
// Icons are replaced with inline SVGs, and swipe functionality will be handled by native browser scrolling on touch devices.

// Custom hook to get window width efficiently
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return width;
};

// Determines how many items to show based on screen width
const getItemsPerSlide = width => {
    if (width >= 1200) return 5;
    if (width >= 992) return 4;
    if (width >= 768) return 3;
    if (width >= 576) return 2;
    return 1;
};

const SkillCarousel = React.memo(({sectionTitle, sectionSubtitle, skillContent, iconsMap}) => {
    const width = useWindowWidth();
    const itemsPerSlide = useMemo(() => getItemsPerSlide(width), [width]);
    const totalItems = skillContent.length;

    // Refs & state for native scrolling
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(totalItems > itemsPerSlide);

    const maxIndex = totalItems > itemsPerSlide ? totalItems - itemsPerSlide : 0;

    // Update arrow visibility and dot position
    const updateScrollState = useCallback(() => {
        const el = carouselRef.current;
        if (!el) return;

        const {scrollLeft, scrollWidth, clientWidth} = el;
        const tolerance = 10;

        setCanScrollLeft(scrollLeft > tolerance);
        setCanScrollRight(scrollWidth - scrollLeft - clientWidth > tolerance);

        // Compute current index based on scrollLeft
        const itemWidth = el.scrollWidth / totalItems;
        if (itemWidth > 0) {
            const newIndex = Math.round(scrollLeft / itemWidth);
            setCurrentIndex(Math.min(newIndex, maxIndex));
        }
    }, [totalItems, maxIndex]);

    // Scroll by exactly one item on each click, updating dot immediately
    const scrollBy = direction => {
        const el = carouselRef.current;
        if (!el) return;

        const itemWidth = el.scrollWidth / totalItems;
        const delta = direction === 'left' ? -itemWidth : itemWidth;

        // 1) update dots immediately
        setCurrentIndex(prev => {
            const next = prev + (direction === 'left' ? -1 : 1);
            return Math.min(maxIndex, Math.max(0, next));
        });

        // 2) then smooth-scroll the carousel
        el.scrollBy({left: delta, behavior: 'smooth'});
    };

    // Attach scroll listener
    useEffect(() => {
        const el = carouselRef.current;
        if (!el) return;

        el.addEventListener('scroll', updateScrollState, {passive: true});
        updateScrollState();

        return () => el.removeEventListener('scroll', updateScrollState);
    }, [updateScrollState]);

    // Style for each item
    const itemStyle = useMemo(() => ({
        flex: `0 0 calc(100% / ${itemsPerSlide})`, padding: '0 1rem', scrollSnapAlign: 'start',
    }), [itemsPerSlide]);

    return (
        <section className="relative py-12 md:py-20 w-full">
            <style>
                {`.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}
                {`.hide-scrollbar::-webkit-scrollbar { display: none; }`}
            </style>

            {/*
              [FIX] 1. This new outer div creates a reliable padded area.
              It ensures there's always space on the left and right.
            */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="
                    relative
                    w-full /* This now fills the padded parent above */
                    /* [FIX] 2. Removed fragile max-width classes */
                    /* max-w-[calc(100%-2rem)] */
                    /* sm:max-w-[90%] */
                    /* md:max-w-[70%] */
                    /* mx-auto is inherited by the parent wrapper */
                    px-4      /* [FIX] 3. Keep internal padding for your content */
                    bg-black/50
                    backdrop-blur-2xl
                    rounded-3xl
                    py-14
                    border
                    border-blue-500
                  "
                >
                    {/* Header */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">{sectionTitle}</h2>
                        <p className="text-base md:text-lg text-white/75">{sectionSubtitle}</p>
                    </div>

                    {canScrollLeft && (
                        <button
                            onClick={() => scrollBy('left')}
                            className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
                            </svg>
                        </button>
                    )}

                    {/* Carousel */}
                    {/* This inner structure remains unchanged */}
                    <div className="relative w-full mx-auto overflow-hidden border border-red-500">
                        <div ref={carouselRef} className="flex overflow-x-auto hide-scrollbar"
                             style={{scrollSnapType: 'x mandatory'}}>
                            {skillContent.map(skill => (
                                <div key={skill.id} className="flex-shrink-0" style={itemStyle}>
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={iconsMap?.[skill.id] || ''}
                                            alt={skill.title}
                                            className="object-contain h-40 w-40"
                                            loading="lazy"
                                            draggable={false}
                                        />
                                        <span
                                            className="mt-5 text-lg md:text-xl font-semibold text-white">{skill.title}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {canScrollRight && (
                        <button
                            onClick={() => scrollBy('right')}
                            className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-3 transition-opacity z-10"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                 stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
                            </svg>
                        </button>
                    )}


                    {/* Dots */}
                    {maxIndex > 0 && (
                        <div className="flex justify-center flex-wrap space-x-3 mt-10">
                            {Array.from({length: maxIndex + 1}).map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        const el = carouselRef.current;
                                        if (el) {
                                            const itemWidth = el.scrollWidth / totalItems;
                                            el.scrollTo({left: idx * itemWidth, behavior: 'smooth'});
                                        }
                                    }}
                                    aria-label={`Go to page ${idx + 1}`}
                                    className={`w-8 h-2.5 rounded-full transition-all my-1 ${idx === currentIndex ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-500/50'}`}
                                />
                            ))}
                        </div>
                    )}
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
        id: PropTypes.string.isRequired, title: PropTypes.string.isRequired,
    })).isRequired,
    iconsMap: PropTypes.object,
};

export default SkillCarousel;
