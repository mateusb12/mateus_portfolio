import React, {useEffect, useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {motion} from 'framer-motion';
import './Works.css';
import {projectsData} from "./ProjectData.jsx";
import {ProjectCard} from "./Projects.jsx";
import NavBar from "../NavBar/NavBar.jsx";

const Footer = () => {
    return (
        <footer className="w-full py-5 px-8 bg-[#0C1517] mt-10">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 text-sm">2025 - Nothing Reserved</p>
                <p className="text-gray-600 text-sm">
                    Built with&nbsp;
                    <a href="https://react.dev/" className="font-medium text-[#23B5B5] hover:text-[#8ddfdf]"
                       target="_blank" rel="noopener noreferrer"
                    >
                        React
                    </a>,&nbsp;
                    <a href="https://threejs.org/" className="font-medium text-[#23B5B5] hover:text-[#8ddfdf]"
                       target="_blank" rel="noopener noreferrer"
                    >
                        Three.js
                    </a>&nbsp;and&nbsp;
                    <a href="https://tailwindcss.com/" className="font-medium text-[#23B5B5] hover:text-[#8ddfdf]"
                       target="_blank" rel="noopener noreferrer"
                    >
                        Tailwind CSS
                    </a>.
                </p>
            </div>
        </footer>
    );
};

const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",

    heroHeadText: "font-black text-white lg:text-[72px] sm:text-[48px] xs:text-[36px] text-[28px] lg:leading-[80px] sm:leading-[56px] xs:leading-[44px] leading-[36px] mt-2",

    heroSubText: "text-gray-100 font-medium italic lg:text-[28px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[40px] sm:leading-[28px] xs:leading-[24px] leading-[22px]",

    heroDescriptionText: "text-gray-200 font-normal lg:text-[20px] sm:text-[18px] xs:text-[16px] text-[16px] lg:leading-[32px] sm:leading-[28px] xs:leading-[26px] leading-[24px]",

    sectionHeadText: "text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[24px]",
    sectionSubText: "sm:text-[16px] text-[12px] text-secondary uppercase tracking-wider",

    transformDown: "transform translate-y-16",
};

// Main frameworks/technologies to filter by
const mainFilters = [
    'All',
    'Python',
    'Django',
    'Flask',
    'Firebase',
    'Machine Learning',
    'NLP',
    'Pandas',
    'Selenium',
    'Scikit Learn',
    'Optuna',
    'Matplotlib',
    'Graphviz'
];

const ProjectsPage = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const filterSliderRef = useRef(null);

    // Scroll to top when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const slugify = str => str.replace(/\W+/g, '').toLowerCase();
        const normalizedCategory = slugify(category);
        if (normalizedCategory === 'all') {
            setFilteredProjects(projectsData);
        } else {
            const filtered = projectsData.filter(project =>
                project.tags.some(tag => tag.toLowerCase() === normalizedCategory)
            );
            setFilteredProjects(filtered);
        }
    }, [category]);

    const handleGoBack = () => {
        navigate('/');
        setTimeout(() => {
            window.location.hash = '#work';
        }, 0);
    };

    // Scroll filter slider
    const scrollFilter = (direction) => {
        if (filterSliderRef.current) {
            const scrollAmount = direction === 'left' ? -200 : 200;
            filterSliderRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="relative z-0 bg-[#091011] min-h-screen">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
                <NavBar/>
            </div>

            <div className="container mx-auto px-4 py-10 mt-10">
                <div className="flex justify-between items-center mb-10">
                    <motion.button
                        onClick={handleGoBack}
                        className="text-[#23B5B5] text-lg cursor-pointer hover:text-[#84ffff] flex items-center gap-2 transition-colors duration-300"
                        whileHover={{x: -5}}
                        whileTap={{scale: 0.95}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Back to Home
                    </motion.button>
                </div>

                <motion.div
                    className="text-center mb-10"
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.5}}
                >
                    <h2 className={`${styles.sectionHeadText} text-center`}>All Projects</h2>
                    <p className="mt-4 text-gray-300 text-center max-w-2xl mx-auto">
                        Browse through my complete collection of projects, showcasing my skills and experience across
                        various technologies and domains.
                    </p>
                </motion.div>

                {/* Filter categories with slider */}
                <div className="relative mb-10">
                    {/* Left scroll button */}
                    <button
                        onClick={() => scrollFilter('left')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 bg-[#152e33] p-2 rounded-full shadow-lg hover:bg-[#1a4047] transition-colors md:hidden"
                        aria-label="Scroll filters left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                        </svg>
                    </button>

                    <div className="overflow-x-auto hide-scrollbar py-2" ref={filterSliderRef}>
                        <div className="flex gap-3 min-w-min px-2 md:justify-center">
                            {mainFilters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setCategory(filter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                                        category === filter
                                            ? 'bg-[#23B5B5] text-white'
                                            : 'bg-[#152e33] text-gray-300 hover:bg-[#1a4047]'
                                    }`}
                                >
                                    {filter === 'all' ? 'All Projects' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right scroll button */}
                    <button
                        onClick={() => scrollFilter('right')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 bg-[#152e33] p-2 rounded-full shadow-lg hover:bg-[#1a4047] transition-colors md:hidden"
                        aria-label="Scroll filters right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                        </svg>
                    </button>
                </div>

                <motion.div
                    className="mt-10 flex flex-wrap gap-7 justify-center"
                    layout
                    transition={{type: "spring", damping: 20, stiffness: 100}}
                >
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={`project-${project.name}`}
                                proj={project}
                                index={index}
                                text={{
                                    viewAll: 'View all',
                                    readMore: 'Read More',
                                    showLess: 'Show Less'
                                }}
                                {...project}
                            />
                        ))
                    ) : (
                        <div className="text-center py-20 w-full">
                            <p className="text-white text-xl">No projects found for this category.</p>
                            <button
                                onClick={() => setCategory('all')}
                                className="mt-4 text-[#23B5B5] hover:text-[#84ffff]"
                            >
                                View all projects
                            </button>
                        </div>
                    )}
                </motion.div>

                <div className="mt-16 flex justify-center">
                    <motion.button
                        onClick={handleGoBack}
                        className="bg-gradient-to-r from-[#152e33] to-[#0b191b] text-white px-8 py-3 rounded-full hover:shadow-lg transition duration-300 flex items-center gap-2 border border-[#23B5B5]"
                        whileHover={{scale: 1.05}}
                        whileTap={{scale: 0.95}}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                        </svg>
                        Return to Home
                    </motion.button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ProjectsPage;
