import './CustomCarousel.css';
import database from "../../assets/img/skills_icons/database.png";
import flask from "../../assets/img/skills_icons/old-flask.png";
import pandas from "../../assets/img/skills_icons/pandas.png";
import java from "../../assets/img/skills_icons/java.png";
import React, {useEffect, useRef, useState} from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import ProjectCard from "./ProjectCard";


const CustomCarousel = ({ children }) => {
    const containerRef = useRef(null);
    // Store a ref for every slide so we can measure its offset.
    const slideRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [offset, setOffset] = useState(0);
    const totalSlides = React.Children.count(children);
    const [touchPosition, setTouchPosition] = useState(null);

    // Compute offset to center active slide based on its offsetLeft from the track.
    const computeOffset = () => {
        if (containerRef.current && slideRefs.current[currentIndex]) {
            const containerWidth = containerRef.current.offsetWidth;
            const activeSlide = slideRefs.current[currentIndex];
            // The formula below calculates the translation needed so that:
            // activeSlide.offsetLeft is shifted by (containerWidth/2 - activeSlide.offsetWidth/2)
            // This effectively centers the active slide within the container.
            const newOffset =
                -(activeSlide.offsetLeft - (containerWidth / 2 - activeSlide.offsetWidth / 2));
            setOffset(newOffset);
        }
    };

    useEffect(() => {
        computeOffset();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentIndex, children]);

    useEffect(() => {
        const handleResize = () => {
            computeOffset();
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    const handleTouchStart = (e) => {
        setTouchPosition(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (touchPosition === null) return;
        const diff = touchPosition - e.touches[0].clientX;
        if (diff > 5) {
            nextSlide();
        } else if (diff < -5) {
            prevSlide();
        }
        setTouchPosition(null);
    };

    return (
        <section className="projects" id="projects">
            <div className="custom-carousel" ref={containerRef}>
                <div className="carousel-wrapper">
                    <div
                        className="carousel-inner"
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
                            style={{
                                display: 'flex',
                                transition: 'transform 0.3s ease',
                                transform: `translateX(${offset}px)`,
                            }}
                        >
                            {React.Children.map(children, (child, index) => (
                                <div
                                    className="carousel-slide"
                                    // Save a ref for each slide for measurement.
                                    ref={(el) => (slideRefs.current[index] = el)}
                                    data-index={index}
                                >
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
