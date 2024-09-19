
import './CustomCarousel.css';
import database from "../../assets/img/skills_icons/database.png";
import flask from "../../assets/img/skills_icons/old-flask.png";
import pandas from "../../assets/img/skills_icons/pandas.png";
import java from "../../assets/img/skills_icons/java.png";
import React, { useState } from 'react';

const CustomCarousel = () => {
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
            <div className="w-3/4 m-auto">
                <div className="mt-20">
                    <div className="bg-white h-[450px] text-black rounded-xl">
                        <div className="rounded-t-xl bg-indigo-500 flex justify-center items-center">
                            <img
                                src={data[currentIndex].img}
                                alt={data[currentIndex].name}
                                className="h-44 w-44 rounded-full border !border-yellow-500"
                            />
                        </div>

                        <div className="flex flex-col justify-center items-center gap-4 p-4">
                            <p className="text-xl font-semibold">{data[currentIndex].name}</p>
                            <p>{data[currentIndex].review}</p>
                            <button className="bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl">
                                Read more
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={prevSlide}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Previous
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomCarousel