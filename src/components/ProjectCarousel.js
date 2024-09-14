import React, { useState } from "react";
import { AiFillHtml5 } from "react-icons/ai";
import { IoLogoCss3 } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io";
import { BsWordpress } from "react-icons/bs";
import { FiFigma } from "react-icons/fi";
import { FaReact, FaSass, FaBootstrap, FaGit } from "react-icons/fa";
import {
    SiTypescript,
    SiMui,
    SiNextdotjs,
    SiVite,
    SiStyledcomponents,
    SiStorybook,
} from "react-icons/si";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "../css/ProjectCarousel.css";
import ProjectCard from "./ProjectCard";

const ProjectCarousel = () => {
    const projects = [
        <ProjectCard projectId="witcher" />,
        <ProjectCard projectId="flight-scraper" />,
    ];

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 3,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
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
                            <Carousel responsive={responsive} infinite={true}>
                                <div className="item">
                                    <ProjectCard projectId="witcher" />
                                </div>
                                <div className="item">
                                    <ProjectCard projectId="flight-scraper" />
                                </div>
                                <div className="item">
                                    <ProjectCard projectId="witcher" />
                                </div>
                                <div className="item">
                                    <ProjectCard projectId="flight-scraper" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCarousel;