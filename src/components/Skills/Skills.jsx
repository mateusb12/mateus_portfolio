// src/components/Skills/KeySkills.jsx
import React, {useRef} from 'react'
import server from "../../assets/img/skills_icons/server.png"
import api from "../../assets/img/skills_icons/api.png"
import database from "../../assets/img/skills_icons/database.png"
import cloud from "../../assets/img/skills_icons/cloud.png"
import deploy from "../../assets/img/skills_icons/deploy.png"
import lock from "../../assets/img/skills_icons/lock.png"
import python from "../../assets/img/skills_icons/python.png"
import javascript from "../../assets/img/skills_icons/javascript.png"
import csharp from "../../assets/img/skills_icons/csharp.png"
import java from "../../assets/img/skills_icons/java.png"
import html from "../../assets/img/skills_icons/html.png"
import css from "../../assets/img/skills_icons/css.png"
import sql from "../../assets/img/skills_icons/sql.png"
import git from "../../assets/img/skills_icons/git.png"
import flask from "../../assets/img/skills_icons/flask.png"
import _react from "../../assets/img/skills_icons/react.png"
import jwt from "../../assets/img/skills_icons/jwt.png"
import postgres from "../../assets/img/skills_icons/postgres.png"
import docker from "../../assets/img/skills_icons/docker.png"
import aws from "../../assets/img/skills_icons/aws.png"
import google from "../../assets/img/skills_icons/google-cloud-small.png"
import frontend from "../../assets/img/skills_icons/frontend_dev.png"
import design from "../../assets/img/skills_icons/design.png"

const skillIcons = {
    "backend": server,
    "api": api,
    "database": database,
    "cloud": cloud,
    "deploy": deploy,
    "lock": lock,
    "python": python,
    "javascript": javascript,
    "csharp": csharp,
    "java": java,
    "html": html,
    "css": css,
    "sql": sql,
    "git": git,
    "flask": flask,
    "react": _react,
    "jwt": jwt,
    "postgres": postgres,
    "docker": docker,
    "aws": aws,
    "google-cloud": google,
    "website": frontend,
    "design": design
};

const keySkills = [{id: "design", title: "UI/UX Design"}, {id: "website", title: "Website creation"}, {
    id: "backend",
    title: "Backend Development"
}, {id: "api", title: "APIs"}, {id: "database", title: "Databases"}, {id: "cloud", title: "Cloud"}, {
    id: "deploy",
    title: "DevOps and CI/CD Pipelines"
}, {id: "lock", title: "Security"}]

const SkillCarousel = () => {
    const carouselRef = useRef(null)

    const getGap = (el) => {
        const style = window.getComputedStyle(el);
        // Tailwind’s `gap-x-8` → 2rem → 32px, but we read it dynamically:
        return parseInt(style.getPropertyValue('column-gap'), 10) || 0;
    };

    const scroll = (direction) => {
        const container = carouselRef.current;
        if (!container) return;

        // Grab the first card
        const firstCard = container.querySelector('.flex-shrink-0');
        if (!firstCard) return;

        const cardWidth = firstCard.offsetWidth;
        const gap = getGap(container);
        const amount = cardWidth + gap;

        container.scrollBy({
            left: direction === 'right' ? amount : -amount, behavior: 'smooth',
        });
    };

    return (
        <section className="relative py-20 border w-full border-yellow-500">
            <div className="flex justify-center w-full">
                <div className="relative w-[70%] bg-black/50 backdrop-blur-2xl rounded-3xl py-12 border border-green-500">
                    <div className="mx-auto">
                        <h2 className="text-5xl leading-[54px] font-bold text-white text-center mb-4 font-[Centra,sans-serif]">
                            Key Skills
                        </h2>
                        <p className="text-center text-gray-400 text-lg font-normal leading-7 tracking-wide mb-12 font-[Centra,sans-serif]">
                            Core competencies in software development
                        </p>

                        <div className="relative w-full">
                            {/* Previous arrow */}
                            <button
                                onClick={() => scroll("left")}
                                aria-label="Previous"
                                className="absolute z-20 top-1/2 -translate-y-1/2 left-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full p-2 focus:outline-none border border-yellow-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
                            </button>

                            {/* Carousel mask */}
                            <div className="overflow-hidden w-full px-4">
                                <div
                                    ref={carouselRef}
                                    className="flex gap-x-8 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar border-2 border-red-500 rounded-xl py-6 bg-black/30 w-[70%] mx-auto"
                                >
                                    {keySkills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="flex-shrink-0 w-1/3 snap-center flex flex-col items-center justify-center"
                                        >
                                            <img
                                                src={skillIcons[skill.id]}
                                                alt={skill.title}
                                                className="w-32 h-32 object-contain mb-4"
                                            />
                                            <h5 className="text-white font-bold text-xl text-center leading-tight font-[Centra,sans-serif]">
                                                {skill.title}
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Next arrow */}
                            <button
                                onClick={() => scroll("right")}
                                aria-label="Next"
                                className="absolute z-20 top-1/2 -translate-y-1/2 right-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full p-2 focus:outline-none border border-yellow-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SkillCarousel
