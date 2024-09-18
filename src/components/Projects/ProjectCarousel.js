import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./ProjectCarousel.css";
import ProjectCard from "./ProjectCard";

const ProjectCarousel = () => {
    const projectIds = ["witcher", "flight-scraper", "valorant-impact", "witcher"];
    const [currentVisibleIndex, setCurrentVisibleIndex] = useState(1); // Track the center index

    const responsive = {
        superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
        desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
        tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
        mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
    };

    useEffect(() => {
        setCurrentVisibleIndex(1);
        // console.log("=== Initial State ===");
        // console.log(`Initial Current Visible Index: 1`);
        // console.log(`Initial Current Visible Project: ${projectIds[1]}`);
        // console.log("======================");
    }, []);

    useEffect(() => {
        // console.log("=== State Update ===");
        // console.log(`Updated Current Visible Index: ${currentVisibleIndex}`);
        // console.log(`Updated Current Visible Project: ${projectIds[currentVisibleIndex]}`);
        // console.log("=====================");
    }, [currentVisibleIndex]);

    const afterChangeHandler = (currentSlide) => {
        const itemsToShow = 3; // Adjust based on your responsive setting
        const centerOffset = Math.floor(itemsToShow / 2);

        // Calculate the center index based on the current slide
        const centerIndex = (currentSlide + centerOffset) % projectIds.length;

        // Enhanced logging for debugging
        // console.log("=== Carousel Slide Change ===");
        // console.log(`Current Slide: ${currentSlide}`);
        // console.log(`Items to Show: ${itemsToShow}`);
        // console.log(`Center Offset: ${centerOffset}`);
        // console.log(`Calculated Center Index: ${centerIndex}`);
        // console.log(`Current Visible Project: ${projectIds[centerIndex]}`);
        // console.log(`Total Projects: ${projectIds.length}`);
        // console.log(`Project IDs Array: ${JSON.stringify(projectIds)}`);
        // console.log("==============================");

        setCurrentVisibleIndex(centerIndex+1);
    };


    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx" id="carousel-container">
                            <h2>Skills</h2>
                            <p className="skill-bx-p" style={{ color: "#FFFFFF" }}>
                                Take a look at some tools I've worked with.
                            </p>
                            <div style={{ marginBottom: "20px", color: "#FFFFFF", textAlign: "center" }}>
                                Current Project: <strong>{projectIds[currentVisibleIndex]}</strong>
                            </div>
                            <Carousel
                                responsive={responsive}
                                infinite={true}
                                afterChange={afterChangeHandler}
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
