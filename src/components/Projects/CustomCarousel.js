import './CustomCarousel.css';
import database from "../../assets/img/skills_icons/database.png";
import flask from "../../assets/img/skills_icons/old-flask.png";
import pandas from "../../assets/img/skills_icons/pandas.png";
import java from "../../assets/img/skills_icons/java.png";
import React, { useState } from 'react';

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

const CustomCarousel = () => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? data.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === data.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="custom-carousel">
            <div className="carousel-wrapper">
                <div className="carousel-inner">
                    <div className="carousel-content">
                        <div className="carousel-image-container">
                            <img
                                src={data[currentIndex].img}
                                alt={data[currentIndex].name}
                                className="carousel-image"
                            />
                        </div>

                        <div className="carousel-text">
                            <p className="carousel-title">{data[currentIndex].name}</p>
                            <p className="carousel-review">{data[currentIndex].review}</p>
                            <button className="carousel-readmore-button">
                                Read more
                            </button>
                        </div>
                    </div>
                    <div className="carousel-navigation">
                        <button
                            onClick={prevSlide}
                            className="carousel-nav-button"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextSlide}
                            className="carousel-nav-button"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomCarousel;
