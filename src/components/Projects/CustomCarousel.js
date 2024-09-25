import './CustomCarousel.css';
import database from "../../assets/img/skills_icons/database.png";
import flask from "../../assets/img/skills_icons/old-flask.png";
import pandas from "../../assets/img/skills_icons/pandas.png";
import java from "../../assets/img/skills_icons/java.png";
import React, {useEffect, useState} from 'react';
import ProjectCard from "./ProjectCard";

const CustomCarousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [touchPosition, setTouchPosition] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const totalSlides = React.Children.count(children);

    const [baseOffset, setBaseOffset] = useState(90);
    const translationMap = React.useMemo(() => {
        const map = {};
        for (let i = 0; i < totalSlides; i++) {
            map[i] = `${(1 - i) * baseOffset}%`;
        }
        return map;
    }, [totalSlides, baseOffset]);

    useEffect(() => {
        const currentProject = children[currentIndex]?.props?.projectId || "unknown";
        const translationValue = translationMap[currentIndex];
        console.log('Translation map: ', translationMap);
        console.log(`Current project: ${currentProject}, Current index: ${currentIndex}, Translation value: ${translationValue}`);
    }, [currentIndex, children]);

    const getStyleForCarouselInner = () => {
        if (windowWidth <= 700) {
            return { width: '100%' };
        } else if (windowWidth === 375) {
            return { width: '75%' };
        } else {
            return { width: '80%' };
        }
    };

    useEffect(() => {
        const getBaseOffset = (windowWidth) => {
            const breakpoints = [360, 375, 384, 390, 412, 428, 810, 1440];
            const baseOffsets = [101, 97, 95, 91, 85, 86, 91, 40];

            if (windowWidth <= breakpoints[0]) {
                return baseOffsets[0];
            } else if (windowWidth >= breakpoints[breakpoints.length - 1]) {
                return baseOffsets[baseOffsets.length - 1];
            } else {
                for (let i = 0; i < breakpoints.length - 1; i++) {
                    if (windowWidth >= breakpoints[i] && windowWidth <= breakpoints[i + 1]) {
                        // Perform linear interpolation
                        const x0 = breakpoints[i];
                        const x1 = breakpoints[i + 1];
                        const y0 = baseOffsets[i];
                        const y1 = baseOffsets[i + 1];

                        return y0 + ((y1 - y0) * (windowWidth - x0)) / (x1 - x0);
                    }
                }
            }
        };

        const handleResize = () => {
            const width = window.innerWidth;
            setWindowWidth(width);
            setBaseOffset(getBaseOffset(width));
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % totalSlides;
        setCurrentIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        setCurrentIndex(newIndex);
    };

    const handleTouchStart = (e) => {
        const touchDown = e.touches[0].clientX;
        setTouchPosition(touchDown);
    };

    const handleTouchMove = (e) => {
        const touchDown = touchPosition;

        if (touchDown === null) {
            return;
        }

        const currentTouch = e.touches[0].clientX;
        const diff = touchDown - currentTouch;

        if (diff > 5) {
            // Swiped left
            nextSlide();
        }

        if (diff < -5) {
            // Swiped right
            prevSlide();
        }

        setTouchPosition(null);
    };

    return (
        <div className="custom-carousel">
            <div className="carousel-wrapper">
                <div className="carousel-inner" style={getStyleForCarouselInner()} onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}>
                    <div className="carousel-navigation">
                        <button onClick={prevSlide} className="carousel-nav-button">Previous</button>
                        <button onClick={nextSlide} className="carousel-nav-button">Next</button>
                    </div>
                    <div className="carousel-progress-bar">
                        {Array.from({length: totalSlides}).map((_, index) => (
                            <button key={index} onClick={() => setCurrentIndex(index)} className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}>

                            </button>
                        ))}
                    </div>
                    <div className="carousel-track" style={{transform: `translateX(${translationMap[currentIndex]})`}}>
                        {React.Children.map(children, (child, index) => (
                            <div className="carousel-slide" key={index}>
                                {React.cloneElement(child, {isActive: index === currentIndex})}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Card Component Logic
const Card = ({item}) => (
    <div className="carousel-content">
        <div className="carousel-image-container">
            <img src={item.img} alt={item.name} className="carousel-image"/>
        </div>
        <div className="carousel-text">
            <p className="carousel-title">{item.name}</p>
            <p className="carousel-review">{item.review}</p>
            <button className="carousel-readmore-button">Read more</button>
        </div>
    </div>
);

// Sample data
const data = [
    {
        name: 'Placeholder Database',
        img: database,
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, accusamus?',
    },
    {
        name: 'Placeholder Flask',
        img: flask,
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, accusamus?',
    },
    {
        name: 'Placeholder Pandas',
        img: pandas,
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, accusamus?',
    },
    {
        name: 'Placeholder Java',
        img: java,
        review: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, accusamus?',
    },
];

// Main Component that uses CustomCarousel and Card
const CarouselWithCards = () => {
    const cards = data.map((item, index) => (
        <Card key={index} item={item} />
    ));

    return (
        <CustomCarousel>
            <ProjectCard projectId="witcher" isActive={false}/>
            <ProjectCard projectId="flight-scraper" isActive={false}/>
            <ProjectCard projectId="valorant-impact" isActive={false}/>
        </CustomCarousel>
    );
};

export default CarouselWithCards;