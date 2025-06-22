// src/components/Projects/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import html from '../../assets/img/skills_icons/html.png';
import css from '../../assets/img/skills_icons/css.png';
import sql from '../../assets/img/skills_icons/sql.png';
import { staggerContainer } from '../Experience/StaggerContainer.jsx';
import witcher_reading_book from '../../assets/img/witcher_reading_book.png';
import flight from '../../assets/img/flight.jpg';
import data_analysis from '../../assets/img/data_analysis.jpg';

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
                ...(type === 'tween'
                    ? { ease: 'easeOut' }
                    : { stiffness: 100, damping: 20 }),
            },
        },
    };
};

export const textVariant = (delay = 0) => ({
    hidden: { y: -50, opacity: 0 },
    show: {
        y: 0,
        opacity: 1,
        transition: { type: 'spring', duration: 1.25, delay },
    },
});

const styles = {
    padding: 'sm:px-16 px-6 sm:py-16 py-10',
};

const projects = [
    {
        name: 'Book Analyzer',
        description:
            'Transform .txt book files into social media style graphs, similar to Instagram',
        tags: [
            { name: 'react', color: 'green-text-gradient' },
            { name: 'mongodb', color: 'blue-text-gradient' },
            { name: 'express.js', color: 'pink-text-gradient' },
            { name: 'nodejs', color: 'orange-text-gradient' },
        ],
        image: witcher_reading_book,
        readMoreLink: '#',
        projectLink: 'https://your-langguesser-app.com',
    },
    {
        name: 'Flight Scraper',
        description:
            'Powered by Kiwi Tequilla API, this project scrapes flight data from the API and displays it in a user-friendly way. The main focus is to create alerts for the user when the price of a flight drops.',
        tags: [
            { name: 'react', color: 'green-text-gradient' },
            { name: 'typescript', color: 'blue-text-gradient' },
            { name: 'tailwindcss', color: 'pink-text-gradient' },
            { name: 'firebase', color: 'orange-text-gradient' },
            { name: 'vite', color: 'purple-text-gradient' },
            { name: 'shadcn/ui', color: 'yellow-text-gradient' },
        ],
        image: flight,
        readMoreLink: '#',
        projectLink: 'https://your-roastroom-app.com',
    },
    {
        name: 'Valorant Impact',
        description:
            'A tool that quantifies how much player actions can shift the odds of winning a Valorant round. By analyzing kills, weapon choices, economy and strategic moves, it reveals the real-time impact on victory chances',
        tags: [
            { name: 'nextjs', color: 'green-text-gradient' },
            { name: 'prisma', color: 'pink-text-gradient' },
            { name: 'supabase', color: 'blue-text-gradient' },
            { name: 'deepseek', color: 'yellow-text-gradient' },
        ],
        image: data_analysis,
        readMoreLink: '#',
        projectLink: 'https://your-porisma-app.com',
    },
];

const Projects = () => {
    return (
        <>
            {/* Section header */}
            <motion.div variants={textVariant()} className="text-center mb-12">
                <h2 className="text-white font-black md:text-[40px] sm:text-[30px] text-[24px]">
                    Projects
                </h2>
                <p className="text-secondary text-[16px] mt-2">
                    Take a closer look at what I’ve been working on.
                </p>
            </motion.div>

            {/* Cards grid */}
            <div className="mt-20 flex flex-wrap gap-8 justify-center">
                {projects.map((proj, i) => (
                    <motion.div
                        key={`project-${i}`}
                        variants={fadeIn('up', 'spring', 0.2 * i, 0.75)}
                        className="w-full sm:w-[360px]"
                    >
                            <div className="w-full h-[200px] overflow-hidden">
                                <img
                                    src={proj.image}
                                    alt={proj.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="p-4 bg-[#1d1d1d]">
                                <h3 className="text-white font-bold text-[24px]">{proj.name}</h3>
                                <p className="mt-2 text-secondary text-[14px] leading-[20px]">
                                    {proj.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {proj.tags.map((tag) => (
                                        <span
                                            key={tag.name}
                                            className={`inline-block text-[12px] font-medium ${tag.color} bg-black bg-opacity-30 px-2 py-1 rounded-full`}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-6 flex justify-between items-center">
                                    <a
                                        href={proj.readMoreLink}
                                        className="text-green-400 text-sm hover:underline"
                                    >
                                        Read More
                                    </a>
                                    <a
                                        href={proj.projectLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-green-400 text-sm hover:underline"
                                    >
                                        View Project <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                    </motion.div>
                ))}
            </div>

            {/* View all button */}
            <div className="mt-12 flex justify-center">
                <a
                    href="/projects"
                    className="bg-green-500 hover:bg-green-600 text-white py-4 px-10 rounded-full font-medium inline-flex items-center gap-2"
                >View all <ArrowRight size={16} />
                </a>
            </div>
        </>
    );
};

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
