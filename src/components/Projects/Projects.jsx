import React, {useState, useContext} from 'react';
import {motion} from 'framer-motion';
import {ArrowRight} from 'lucide-react';
import LanguageContext from '../LanguageContext';
import {projectsFadeIn, staggerContainer} from "../../utils/componentUtils.jsx";
import {iconMap, projectsData, projectTextContent} from "./ProjectData.jsx";

// map each tag to its icon

// fadeIn animation helper


// textVariant animation helper
const textVariant = (delay = 0) => ({
    hidden: {y: -50, opacity: 0},
    show: {y: 0, opacity: 1, transition: {type: 'spring', duration: 1.25, delay}}
});

// original project entrie

// glow theme
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

const styles = {
    padding: 'sm:px-16 px-6 sm:py-16 py-10',
};

export const ProjectCard = ({proj, index, text}) => {
    const [expanded, setExpanded] = useState(false);
    return (
        <motion.div
            key={`project-${index}`}
            variants={projectsFadeIn('up', 'spring', 0.2 * index)}
            className={`relative w-full sm:w-[360px] rounded-2xl overflow-hidden
        bg-[#091011] border-2 transition-all duration-300 ease-in-out
        ${violetTheme.borderColor} ${violetTheme.borderHover}
        ${violetTheme.outerGlow} ${violetTheme.outerGlowHover}`}
        >
            <div
                className={`absolute inset-0 ${violetTheme.innerGlowColor}
          ${violetTheme.innerGlowOpacity} ${violetTheme.innerGlowHover}
          blur-2xl transition-opacity duration-300`}
            />

            <div className="relative z-10 w-full h-[200px] overflow-hidden">
                <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-full object-cover z-20 relative"
                />
            </div>

            <div className="relative z-10 p-4 pb-12">
                <div className="flex flex-wrap gap-2 mb-3">
                    {proj.tags.map((name) => (
                        <div key={name} className="relative group w-10 h-10">
                            {iconMap[name] ? (
                                <img
                                    src={iconMap[name]}
                                    alt={name}
                                    className="w-full h-full object-contain transition-transform duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                                />
                            ) : (
                                <span
                                    className="inline-block w-full h-full px-2 py-1 bg-gray-600 text-white rounded text-[10px] flex items-center justify-center">
                  {name}
                </span>
                            )}
                            <span
                                className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {name}
              </span>
                        </div>
                    ))}
                </div>

                <h3 className="text-white font-bold text-[24px]">{proj.name}</h3>

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

                <div className="mt-1">
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="text-green-400 text-sm hover:underline focus:outline-none"
                    >
                        {expanded ? text.showLess : text.readMore}
                    </button>
                </div>
            </div>

            <a
                href={proj.projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 flex items-center gap-1 text-green-400 text-sm hover:underline"
            >
                {text.viewAll} <ArrowRight size={14}/>
            </a>
        </motion.div>
    );
};

const ProjectsSection = () => {
    const {selectedFlag} = useContext(LanguageContext);
    const lang = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const text = projectTextContent[lang];
    const merged = projectsData.map((p, i) => ({
        ...p,
        name: text.items[i].name,
        description: text.items[i].description,
    }));

    return (
        <section id="projects">
            <motion.div variants={textVariant()} className="text-center mb-12">
                <h2 className="text-white font-black md:text-[40px] sm:text-[30px] text-[24px]">
                    {text.sectionTitle}
                </h2>
                <p className="text-secondary text-[16px] mt-2">
                    {text.sectionSubtitle}
                </p>
            </motion.div>

            <div className="mt-20 flex flex-wrap gap-8 justify-center">
                {merged.map((proj, i) => (
                    <ProjectCard key={i} proj={proj} index={i} text={text}/>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <a
                    href="/projects"
                    className="bg-green-700 hover:bg-green-600 text-white py-4 px-10 rounded-full font-medium inline-flex items-center gap-2"
                >
                    {text.viewAll} <ArrowRight size={16}/>
                </a>
            </div>
        </section>
    );
};

export default (props) => (
    <motion.section
        variants={staggerContainer()} initial="hidden" whileInView="show"
        viewport={{once: true, amount: 0.25}}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`} {...props}
    >
        <ProjectsSection/>
    </motion.section>
);
