import React, {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';

// --- A more robust useWindowSize hook ---
const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', updateSize);
        updateSize(); // Initial size
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
};

// --- A utility class for hiding the scrollbar ---
const scrollbarHide = {
    msOverflowStyle: 'none',  /* IE and Edge */
    scrollbarWidth: 'none',  /* Firefox */
};
// For Webkit browsers, we can use a CSS class
// Add this to your global CSS file:
// .hide-scrollbar::-webkit-scrollbar {
//   display: none;
// }


// --- MAIN CAROUSEL COMPONENT ---
const SkillCarousel = ({sectionTitle, sectionSubtitle, skillContent, iconsMap}) => {
    const carouselRef = useRef(null);
    const [width] = useWindowSize();
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isMobile, setIsMobile] = useState(false);

    // 1. Determine the number of items to show and if we're on mobile
    useEffect(() => {
        setIsMobile(width < 768); // md breakpoint
        if (width < 640) setItemsPerPage(3);      // sm
        else if (width < 768) setItemsPerPage(4); // md
        else if (width < 1024) setItemsPerPage(5);// lg
        else setItemsPerPage(6);                  // xl
    }, [width]);

    // 2. Arrow handler to scroll by the container's width
    const handleArrowClick = (direction) => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        container.scrollBy({
            left: direction === 'next' ? container.offsetWidth : -container.offsetWidth,
            behavior: 'smooth',
        });
    };

    // 3. Calculate the width of each item dynamically
    const cardWidthStyle = {
        /*  grow | shrink | basis  */
        flex: `1 1 calc(${100 / itemsPerPage}% - 0.75rem)`, // or 0 1 … if you never want them to grow
        maxWidth: `calc(${100 / itemsPerPage}% - 0.75rem)`,
        minWidth: 0,     // lets long titles truncate instead of stretching the card
    };

    return (
        <div className="w-full max-w-6xl mx-auto my-8 px-0">
            <div className="p-6 bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-white">{sectionTitle}</h2>
                    <p className="text-gray-300 mt-1">{sectionSubtitle}</p>
                </div>

                {/* Carousel */}
                <div className="relative overflow-visible">
                    {/* Left Arrow - Hidden on mobile via state */}
                    {(
                        <button
                            onClick={() => handleArrowClick('prev')}
                            className="
              absolute top-1/2
              -left-4 sm:left-2 md:left-4
              transform -translate-y-1/2
              z-10 w-10 h-10
              bg-black/30 hover:bg-white/20
              text-white rounded-full
              flex items-center justify-center
              transition-all duration-300
            "
                            aria-label="Previous"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                            </svg>
                        </button>
                    )}

                    <div
                        ref={carouselRef}
                        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-4"
                        style={scrollbarHide}
                    >
                        {skillContent.map(skill => {
                            const iconSrc = iconsMap[skill.id];
                            return (
                                <div
                                    key={skill.id}
                                    className="snap-start text-center p-2 flex flex-col items-center"
                                    style={cardWidthStyle}
                                >
                                    {/* Responsive Icon Size */}
                                    <div className="h-12 w-12 md:h-16 md:w-16 flex items-center justify-center mb-2">
                                        {iconSrc ? (
                                            <img src={iconSrc} alt={skill.title}
                                                 className="h-full w-full object-contain"/>
                                        ) : (
                                            <span className="text-white text-xl">?</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-white font-medium truncate w-full">{skill.title}</p>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right Arrow - Hidden on mobile via state */}
                    {(
                        <button
                            onClick={() => handleArrowClick('next')}
                            className="
              absolute top-1/2
              -right-4 sm:right-2 md:right-4
              transform -translate-y-1/2
              z-10 w-10 h-10
              bg-black/30 hover:bg-white/20
              text-white rounded-full
              flex items-center justify-center
              transition-all duration-300
            "
                            aria-label="Next"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SkillCarousel;