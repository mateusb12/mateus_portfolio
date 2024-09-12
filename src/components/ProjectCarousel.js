import React, { useState } from 'react';
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
import '../css/ProjectCarousel.css';
import ProjectCard from "./ProjectCard";

const ProjectCarousel = () => {
    const projects = [
        <ProjectCard projectId="witcher" />,
        <ProjectCard projectId="flight-scraper" />,
    ];
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
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
                                    <ProjectCard projectId="witcher"/>
                                </div>
                                <div className="item">
                                    <ProjectCard projectId="flight-scraper"/>
                                </div>
                                <div className="item">
                                    <ProjectCard projectId="witcher"/>
                                </div>
                                <div className="item">
                                    <ProjectCard projectId="flight-scraper"/>
                                </div>
                                {/*<div className="item">*/}
                                {/*    <IoLogoJavascript size={100} />*/}
                                {/*    <h5>Javascript</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <SiTypescript size={100} />*/}
                                {/*    <h5>Typescript</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <FaReact size={100} />*/}
                                {/*    <h5>React</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <SiNextdotjs size={100} />*/}
                                {/*    <h5>Next.js</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <SiVite size={100} />*/}
                                {/*    <h5>Vite</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <FaGit size={100} />*/}
                                {/*    <h5>Git</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <SiStyledcomponents size={100} />*/}
                                {/*    <h5>Styled Components</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <FaSass size={100} />*/}
                                {/*    <h5>Sass</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <FaBootstrap size={100} />*/}
                                {/*    <h5>Bootstrap</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <SiMui size={100} />*/}
                                {/*    <h5>Material UI</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <SiStorybook size={100} />*/}
                                {/*    <h5>Storybook</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <BsWordpress size={100} />*/}
                                {/*    <h5>Wordpress</h5>*/}
                                {/*</div>*/}
                                {/*<div className="item">*/}
                                {/*    <FiFigma size={100} />*/}
                                {/*    <h5>Figma</h5>*/}
                                {/*</div>*/}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectCarousel;
