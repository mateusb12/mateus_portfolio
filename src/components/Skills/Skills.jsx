// src/components/Skills/KeySkills.jsx
import React from 'react'
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

const keySkills = [
    { id: "website", title: "Website creation" },
    { id: "backend", title: "Backend Development" },
    { id: "api", title: "APIs" },
]

const KeySkills = () => (
    <section className="relative py-20">
        <div className="w-full bg-black/50 backdrop-blur-2xl rounded-3xl py-12 border border-green-500">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-5xl font-bold text-white text-center mb-4">
                    Key Skills
                </h2>
                <p className="text-center text-gray-100 text-lg font-medium mb-12">
                    Core competencies in software development
                </p>

                {/* Row with arrows and content inside */}
                <div className="flex items-center justify-center gap-x-6 w-full">
                    {/* Left arrow */}
                    <button
                        aria-label="Previous"
                        className="bg-black/50 hover:bg-black/60 text-white rounded-full p-2 z-20 focus:outline-none border border-yellow-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    {/* Skills */}
                    <div className="flex justify-between items-center gap-x-30 border border-red-500">
                        {keySkills.map((skill) => (
                            <div key={skill.id} className="flex flex-col items-center">
                                <img
                                    src={skillIcons[skill.id]}
                                    alt={skill.title}
                                    className="w-40 h-40 object-contain"
                                />
                                <h5 className="mt-4 text-white font-bold text-lg">
                                    {skill.title}
                                </h5>
                            </div>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button
                        aria-label="Next"
                        className="bg-black/50 hover:bg-black/60 text-white rounded-full p-2 z-20 focus:outline-none border border-yellow-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </section>
);

export default KeySkills
