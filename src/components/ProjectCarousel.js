import React, { useState, useEffect } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "../css/ProjectCarousel.css";
import ProjectCard from "./ProjectCard";

const ProjectCarousel = () => {
    const projectIds = ["witcher", "flight-scraper", "valorant-impact"];
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(1); // Track only the current visible index

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    useEffect(() => {
        // Initially set to the first item as visible
        setCurrentVisibleIndex(1);
    }, []);

    const afterChangeHandler = (newSlide) => {
        console.log(`Carousel changed: currentSlide = ${newSlide}`);
        let newIndex = (newSlide % projectIds.length) - 1;
        setCurrentVisibleIndex(newIndex);
    };

    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx">
                            <h2>Skills</h2>
                            <p className="skill-bx-p" style={{ color: "#FFFFFF" }}>
                                Take a look at some tools I've worked with.
                            </p>
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                afterChange={afterChangeHandler}
                                // Optionally, add other props like arrows, swipe, etc.
                            >
                                {projectIds.map((projectId, index) => (
                                    <div className="item" key={index}>
                                        <ProjectCard
                                            projectId={projectId}
                                            isActive={index === currentVisibleIndex} // Set active based on current index
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCarousel;
