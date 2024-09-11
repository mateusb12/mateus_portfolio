import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProjectCard from './ProjectCard';
import '../css/ProjectCarousel.css';

const ProjectCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    // Generate an array with three "witcher" entries
    const witcherCards = ["witcher", "witcher", "witcher", "witcher", "witcher", "witcher"];

    return (
        <Carousel
            swipeable={true}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true} // Means to render carousel on server-side.
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={30000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding" // Make sure this class is defined or update with the correct class
            partialVisible={false} // Added based on the screenshot logic
        >
            {witcherCards.map((projectId, index) => (
                <ProjectCard key={index} projectId={projectId} />
            ))}
        </Carousel>
    );
};

export default ProjectCarousel;
