import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import witcher_reading_book from '../../assets/img/witcher_reading_book.png';
import flight from '../../assets/img/flight.jpg';
import data_analysis from '../../assets/img/data_analysis.jpg';
import { staggerContainer } from '../Experience/StaggerContainer.jsx';

// skill icons
import server from '../../assets/img/skills_icons/server.png';
import api from '../../assets/img/skills_icons/api.png';
import database from '../../assets/img/skills_icons/database.png';
import cloud from '../../assets/img/skills_icons/cloud.png';
import deploy from '../../assets/img/skills_icons/deploy.png';
import lock from '../../assets/img/skills_icons/lock.png';
import python from '../../assets/img/skills_icons/python.png';
import javascript from '../../assets/img/skills_icons/javascript.png';
import csharp from '../../assets/img/skills_icons/csharp.png';
import java from '../../assets/img/skills_icons/java.png';
import html from '../../assets/img/skills_icons/html.png';
import css from '../../assets/img/skills_icons/css.png';
import sql from '../../assets/img/skills_icons/sql.png';
import git from '../../assets/img/skills_icons/git.png';
import flask from '../../assets/img/skills_icons/flask.png';
import reactIcon from '../../assets/img/skills_icons/react.png';
import jwt from '../../assets/img/skills_icons/jwt.png';
import postgres from '../../assets/img/skills_icons/postgres.png';
import docker from '../../assets/img/skills_icons/docker.png';
import aws from '../../assets/img/skills_icons/aws.png';
import googleCloud from '../../assets/img/skills_icons/google-cloud-small.png';
import frontend from '../../assets/img/skills_icons/frontend_dev.png';
import design from '../../assets/img/skills_icons/design.png';
import machineLearning from '../../assets/img/skills_icons/machine-learning.png';
import webScrapping from '../../assets/img/skills_icons/web-scrapping.png';
import typescript from '../../assets/img/skills_icons/typescript.png';
import linux from '../../assets/img/skills_icons/linux.png';
import numpy from '../../assets/img/skills_icons/numpy.png';
import graphviz from '../../assets/img/skills_icons/graphviz.png';
import pandas from '../../assets/img/skills_icons/pandas.png';
import networkx from '../../assets/img/skills_icons/networkx.png';
import spacy from '../../assets/img/skills_icons/spacy.png';
import nodejs from '../../assets/img/skills_icons/nodejs.png';
import django from '../../assets/img/skills_icons/django.png';
import mongo from '../../assets/img/skills_icons/mongo.svg';
import supabase from '../../assets/img/skills_icons/supabase.png';
import firebase from '../../assets/img/skills_icons/firebase.png';
import tilt from '../../assets/img/skills_icons/tilt.png';
import poetry from '../../assets/img/skills_icons/poetry.png';
import alembic from '../../assets/img/skills_icons/alembic.png';
import azure from '../../assets/img/skills_icons/azure.svg';
import figma from '../../assets/img/skills_icons/figma.svg';
import githubActions from '../../assets/img/skills_icons/github-actions.svg';
import nextJs from '../../assets/img/skills_icons/nextjs.svg';
import redis from '../../assets/img/skills_icons/redis.svg';
import swagger from '../../assets/img/skills_icons/swagger.svg';
import reactNative from '../../assets/img/skills_icons/react-native.png';
import nlp from '../../assets/img/skills_icons/nlp.png';

// map each tag to its icon
const iconMap = {
    api: api,
    backend: server,
    flask: flask,
    django: django,
    website: frontend,
    html: html,
    css: css,
    javascript: javascript,
    python: python,
    csharp: csharp,
    java: java,
    sql: sql,
    git: git,
    jwt: jwt,
    postgres: postgres,
    docker: docker,
    aws: aws,
    googleCloud: googleCloud,
    cloud: cloud,
    deploy: deploy,
    lock: lock,
    design: design,
    machineLearning: machineLearning,
    webScrapping: webScrapping,
    linux: linux,
    react: reactIcon,
    mongodb: mongo,
    nodejs: nodejs,
    typescript: typescript,
    firebase: firebase,
    supabase: supabase,
    nextjs: nextJs,
    prisma: database,
    tilt: tilt,
    poetry: poetry,
    alembic: alembic,
    azure: azure,
    figma: figma,
    githubActions: githubActions,
    redis: redis,
    reactNative: reactNative,
    swagger: swagger,
    nlp: nlp,
    graphviz: graphviz,
    pandas: pandas,
    numpy: numpy,
    networkx: networkx,
    spacy: spacy
};

// Fade-in animation helper
export const fadeIn = (direction, type = 'tween', duration = 0.5) => {
    const axis = ['left', 'right'].includes(direction)
        ? { x: direction === 'left' ? 100 : -100 }
        : ['up', 'down'].includes(direction)
            ? { y: direction === 'up' ? 100 : -100 }
            : {};

    return {
        hidden: { ...axis, opacity: 0 },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                duration,
                ...(type === 'tween' ? { ease: 'easeOut' } : { stiffness: 100, damping: 20 }),
            },
        },
    };
};

// Text animation helper
export const textVariant = (delay = 0) => ({
    hidden: { y: -50, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', duration: 1.25, delay } },
});

// Violet glow theme
const violetTheme = {
    borderColor: 'border-violet-400/10',
    borderHover: 'hover:border-violet-300',
    outerGlow: 'shadow-[0_0_15px_5px_rgba(192,132,252,0.10)] opacity-70',
    outerGlowHover:
        'hover:shadow-[0_0_25px_8px_rgba(139,92,246,0.15)] hover:opacity-100 hover:bg-violet-950',
    innerGlowColor: 'bg-violet-400',
    innerGlowOpacity: 'opacity-25',
    innerGlowHover: 'group-hover:opacity-30',
};

// Tailwind padding styles
const styles = {
    padding: 'sm:px-16 px-6 sm:py-16 py-10',
};

// Project entries
const projects = [
    {
        name: 'Book Analyzer',
        description: 'Transform .txt book files into social media style graphs, similar to Instagram',
        tags: [
            { name: 'api' },
            { name: 'nlp' },
            { name: 'django' },
            { name: 'python' },
            { name: 'numpy' },
            { name: 'graphviz' },
            { name: 'pandas' },
            { name: 'networkx' },
            { name: 'spacy' },
        ],
        image: witcher_reading_book,
        projectLink: 'https://your-langguesser-app.com',
    },
    {
        name: 'Flight Scraper',
        description:
            'Powered by Kiwi Tequilla API, this project scrapes flight data and alerts users when prices drop.',
        tags: [
            { name: 'react' },
            { name: 'typescript' },
            { name: 'firebase' },
        ],
        image: flight,
        projectLink: 'https://your-roastroom-app.com',
    },
    {
        name: 'Valorant Impact',
        description:
            'Quantifies how player actions shift the odds of winning a Valorant round in real-time.',
        tags: [
            { name: 'nextjs' },
            { name: 'prisma' },
            { name: 'supabase' },
        ],
        image: data_analysis,
        projectLink: 'https://your-porisma-app.com',
    },
];

// Individual project card
const ProjectCard = ({ proj, index }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            key={`project-${index}`}
            variants={fadeIn('up', 'spring', 0.2 * index)}
            className={`relative w-full sm:w-[360px] rounded-2xl overflow-hidden
        bg-[#091011] border-2 transition-all duration-300 ease-in-out
        ${violetTheme.borderColor} ${violetTheme.borderHover}
        ${violetTheme.outerGlow} ${violetTheme.outerGlowHover}`}
        >
            {/* inner glow */}
            <div
                className={`absolute inset-0 ${violetTheme.innerGlowColor}
          ${violetTheme.innerGlowOpacity} ${violetTheme.innerGlowHover}
          blur-2xl transition-opacity duration-300`}
            />

            {/* image */}
            <div className="relative z-10 w-full h-[200px] overflow-hidden">
                <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover z-20 relative"
                />
            </div>

            {/* text + Read More */}
            <div className="relative z-10 p-4 pb-12">
                {/* icons with hover & tooltip */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {proj.tags.map(({ name }) => (
                        <div key={name} className="relative group w-10 h-10">
                            {iconMap[name] ? (
                                <img
                                    src={iconMap[name]}
                                    alt={name}
                                    className="w-full h-full object-contain transition-transform duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                                />
                            ) : (
                                <span className="inline-block w-full h-full px-2 py-1 bg-gray-600 text-white rounded text-[10px] flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]">
                                    {name}
                                </span>
                            )}
                            <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {name}
                            </span>
                        </div>
                    ))}
                </div>

                <h3 className="text-white font-bold text-[24px]">{proj.name}</h3>

                {/* description with fade */}
                <div className="relative mt-2">
                    <p
                        className="text-secondary text-[14px] leading-[20px] overflow-hidden"
                        style={
                            !expanded
                                ? {
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 3,
                                    WebkitMaskImage:
                                        'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                                    maskImage:
                                        'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                                }
                                : {}
                        }
                    >
                        {proj.description}
                    </p>
                </div>

                {/* Read More toggle */}
                <div className="mt-1">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-green-400 text-sm hover:underline focus:outline-none"
                    >
                        {expanded ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            </div>

            {/* View Project link */}
            <a
                href={proj.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 flex items-center gap-1 text-green-400 text-sm hover:underline"
            >
                View Project <ArrowRight size={14} />
            </a>
        </motion.div>
    );
};

// Projects section
const Projects = () => (
    <>
        <motion.div variants={textVariant()} className="text-center mb-12">
            <h2 className="text-white font-black md:text-[40px] sm:text-[30px] text-[24px]">
                Projects
            </h2>
            <p className="text-secondary text-[16px] mt-2">
                Take a closer look at what I’ve been working on.
            </p>
        </motion.div>

        <div className="mt-20 flex flex-wrap gap-8 justify-center">
            {projects.map((proj, i) => (
                <ProjectCard key={i} proj={proj} index={i} />
            ))}
        </div>

        <div className="mt-12 flex justify-center">
            <a
                href="/projects"
                className="bg-green-700 hover:bg-green-600 text-white py-4 px-10 rounded-full font-medium inline-flex items-center gap-2"
            >
                View all <ArrowRight size={16} />
            </a>
        </div>
    </>
);

export default (props) => (
    <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        {...props}
    >
        <Projects />
    </motion.section>
);
