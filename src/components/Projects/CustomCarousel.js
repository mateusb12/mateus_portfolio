import './CustomCarousel.css';
import database from "../../assets/img/skills_icons/database.png";
import flask from "../../assets/img/skills_icons/old-flask.png";
import pandas from "../../assets/img/skills_icons/pandas.png";
import java from "../../assets/img/skills_icons/java.png";
import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProjectCard from "./ProjectCard";

const CustomCarousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [touchPosition, setTouchPosition] = useState(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const totalSlides = React.Children.count(children);

    const getMaximumOffset = (windowWidth, totalSlides) => {
        if (windowWidth > 700) {
            if (totalSlides === 5) {
                return 100;
            } else if (totalSlides === 4) {
                return 75;
            } else if (totalSlides === 3) {
                return 55;
            }
        } else {
            if (totalSlides === 5) {
                return 97;
            } else if (totalSlides === 4) {
                return 145;
            } else if (totalSlides === 3) {
                return 95;
            }
        }
        return 100; // Default value
    };

    const translationMap = React.useMemo(() => {
        const centerIndex = (totalSlides - 1) / 2;
        const maximumOffset = getMaximumOffset(windowWidth, totalSlides);
        const step = maximumOffset / centerIndex;
        const map = {};
        for (let i = 0; i < totalSlides; i++) {
            map[i] = `${(centerIndex - i) * step}%`;
        }
        return map;
    }, [totalSlides, windowWidth]);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getStyleForCarouselInner = () => {
        if (windowWidth <= 700) {
            return { width: '100%' };
        } else if (windowWidth === 375) {
            return { width: '75%' };
        } else if (windowWidth <= 1521) {
            return { width: '50%' };
        } else {
            return { width: '47%' };
        }
    };

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
            nextSlide();
        }

        if (diff < -5) {
            prevSlide();
        }

        setTouchPosition(null);
    };

    return (
        <section className="projects" id="projects">
            <div className="custom-carousel">
                <div className="carousel-wrapper">
                    <div
                        className="carousel-inner"
                        style={getStyleForCarouselInner()}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <div className="carousel-navigation">
                            <button onClick={prevSlide} className="carousel-nav-button">
                                <FaArrowLeft />
                            </button>
                            <button onClick={nextSlide} className="carousel-nav-button">
                                <FaArrowRight />
                            </button>
                        </div>
                        <div className="carousel-progress-bar">
                            {Array.from({ length: totalSlides }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                                ></button>
                            ))}
                        </div>
                        <div
                            className="carousel-track"
                            style={{ transform: `translateX(${translationMap[currentIndex]})` }}
                        >
                            {React.Children.map(children, (child, index) => (
                                <div className="carousel-slide" key={index}>
                                    {React.cloneElement(child, { isActive: index === currentIndex })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Card Component Logic
const Card = ({ item }) => (
    <div className="carousel-content">
        <div className="carousel-image-container">
            <img src={item.img} alt={item.name} className="carousel-image" />
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
    const cards = data.map((item, index) => <Card key={index} item={item} />);

    return (
        <CustomCarousel>
            <ProjectCard projectId="witcher" isActive={false} />
            <ProjectCard projectId="flight-scraper" isActive={false} />
            <ProjectCard projectId="valorant-impact" isActive={false} />
            <ProjectCard projectId="linkedin-tracker" isActive={false} />
            {/*<ProjectCard projectId="linkedin-tracker" isActive={false} />*/}
        </CustomCarousel>
    );
};

export default CarouselWithCards;
