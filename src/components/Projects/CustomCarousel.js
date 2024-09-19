import './CustomCarousel.css';
import database from "../../assets/img/skills_icons/database.png";
import flask from "../../assets/img/skills_icons/old-flask.png";
import pandas from "../../assets/img/skills_icons/pandas.png";
import java from "../../assets/img/skills_icons/java.png";
import React, { useState } from 'react';

const CustomCarousel = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchPosition, setTouchPosition] = useState(null);

    const totalSlides = React.Children.count(children);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? totalSlides - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === totalSlides - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
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
                <div
                    className="carousel-inner"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div
                        className="carousel-track"
                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                    >
                        {React.Children.map(children, (child, index) => (
                            <div className="carousel-slide" key={index}>
                                {child}
                            </div>
                        ))}
                    </div>
                    <div className="carousel-navigation">
                        <button onClick={prevSlide} className="carousel-nav-button">
                            Previous
                        </button>
                        <button onClick={nextSlide} className="carousel-nav-button">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
    return (
        <CustomCarousel>
            {data.map((item, index) => (
                <Card key={index} item={item} />
            ))}
        </CustomCarousel>
    );
};

export default CarouselWithCards;
