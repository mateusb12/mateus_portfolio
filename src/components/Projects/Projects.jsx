import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import witcher_reading_book from '../../assets/img/witcher_reading_book.png';
import flight from '../../assets/img/flight.jpg';
import data_analysis from '../../assets/img/data_analysis.jpg';
import { staggerContainer } from '../Experience/StaggerContainer.jsx';

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
                ...(type === 'tween'
                    ? { ease: 'easeOut' }
                    : { stiffness: 100, damping: 20 }),
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
    outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(139,92,246,0.15)] hover:opacity-100 hover:bg-violet-950',
    innerGlowColor: 'bg-violet-400',
    innerGlowOpacity: 'opacity-25',
    innerGlowHover: 'group-hover:opacity-30',
};

const styles = {
    padding: 'sm:px-16 px-6 sm:py-16 py-10',
};

// Project entries
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
        projectLink: 'https://your-porisma-app.com',
    },
];

// Individual project card with Read More toggle
const ProjectCard = ({ proj, index }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            key={`project-${index}`}
            variants={fadeIn('up', 'spring', 0.2 * index)}
            className={`
        relative group w-full sm:w-[360px] rounded-2xl overflow-hidden
        bg-[#091011]
        border-2 transition-all duration-300 ease-in-out
        ${violetTheme.borderColor} ${violetTheme.borderHover}
        ${violetTheme.outerGlow} ${violetTheme.outerGlowHover}
      `}
        >
            {/* inner glow */}
            <div
                className={`
          absolute inset-0 ${violetTheme.innerGlowColor}
          ${violetTheme.innerGlowOpacity} ${violetTheme.innerGlowHover}
          blur-2xl transition-opacity duration-300
        `}
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
                <div className="flex flex-wrap gap-2 mb-3">
                    {proj.tags.map((tag) => (
                        <span
                            key={tag.name}
                            className={`
                inline-block text-[12px] font-medium ${tag.color}
                bg-black bg-opacity-30 px-2 py-1 rounded-full
              `}
                        >
              {tag.name}
            </span>
                    ))}
                </div>

                <h3 className="text-white font-bold text-[24px]">{proj.name}</h3>

                {/* description with masked fade on last line */}
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

                {/* Read More / Show Less */}
                <div className="mt-1">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-green-400 text-sm hover:underline focus:outline-none"
                    >
                        {expanded ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            </div>

            {/* View Project anchored */}
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
