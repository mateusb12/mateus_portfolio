import React, { useEffect, useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Works.css';
import { projectsData } from "./ProjectData.jsx";
import { ProjectCard } from "./Projects.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import LanguageContext from '../LanguageContext';

// Footer component (restored)
const Footer = () => (
    <footer className="w-full py-5 px-8 bg-[#0C1517] mt-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">2025 - Nothing Reserved</p>
            <p className="text-gray-600 text-sm">
                Built with&nbsp;
                <a href="https://react.dev/" className="font-medium text-[#23B5B5] hover:text-[#8ddfdf]" target="_blank" rel="noopener noreferrer">React</a>,&nbsp;
                <a href="https://threejs.org/" className="font-medium text-[#23B5B5] hover:text-[#8ddfdf]" target="_blank" rel="noopener noreferrer">Three.js</a>&nbsp;and&nbsp;
                <a href="https://tailwindcss.com/" className="font-medium text-[#23B5B5] hover:text-[#8ddfdf]" target="_blank" rel="noopener noreferrer">Tailwind CSS</a>.
            </p>
        </div>
    </footer>
);

// Translation content for Projects
const textContent = {
    english: {
        heading: 'All Projects',
        subText: 'Browse through my complete collection of projects, showcasing my skills and experience across various technologies and domains.',
        backToHome: 'Back to Home',
        returnToHome: 'Return to Home',
        noProjects: 'No projects found for this category.',
        viewAllProjects: 'View all projects',
        filters: 'All Projects',
        cardText: {
            viewAll: 'View all',
            readMore: 'Read More',
            showLess: 'Show Less'
        }
    },
    portuguese: {
        heading: 'Todos os Projetos',
        subText: 'Confira minha coleção completa de projetos, demonstrando minhas habilidades e experiências em diversas tecnologias e domínios.',
        backToHome: 'Voltar para Início',
        returnToHome: 'Retornar ao Início',
        noProjects: 'Nenhum projeto encontrado para esta categoria.',
        viewAllProjects: 'Ver todos os projetos',
        filters: 'Todos os Projetos',
        cardText: {
            viewAll: 'Ver tudo',
            readMore: 'Leia Mais',
            showLess: 'Mostrar Menos'
        }
    }
};

const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",
    sectionHeadText: "text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[24px]"
};

// Main frameworks/technologies to filter by
const mainFilters = [
    'All', 'Python', 'Django', 'Flask', 'Firebase',
    'Machine Learning', 'NLP', 'Pandas', 'Selenium',
    'Scikit Learn', 'Optuna', 'Matplotlib', 'Graphviz'
];

const ProjectsPage = () => {
    const { selectedFlag } = useContext(LanguageContext);
    const lang = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const t = textContent[lang];
    const navigate = useNavigate();
    const [category, setCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projectsData);
    const filterSliderRef = useRef(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    useEffect(() => {
        const slugify = str => str.replace(/\W+/g, '').toLowerCase();
        const normalized = slugify(category);
        if (normalized === slugify('All')) {
            setFilteredProjects(projectsData);
        } else {
            setFilteredProjects(
                projectsData.filter(p => p.tags.some(tag => tag.toLowerCase() === normalized))
            );
        }
    }, [category]);

    const handleGoBack = () => {
        navigate('/');
        setTimeout(() => { window.location.hash = '#work'; }, 0);
    };

    const scrollFilter = dir => {
        if (!filterSliderRef.current) return;
        filterSliderRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
    };

    return (
        <div className="relative z-0 bg-[#091011] min-h-screen">
            <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center"><NavBar/></div>
            <div className="container mx-auto px-4 py-10 mt-10">

                <motion.button
                    onClick={handleGoBack}
                    className="text-[#23B5B5] text-lg cursor-pointer hover:text-[#84ffff] flex items-center gap-2 mb-10"
                    whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}
                >
                    {t.backToHome}
                </motion.button>

                <div className="text-center mb-10">
                    <h2 className={`${styles.sectionHeadText} text-center`}>{t.heading}</h2>
                    <p className="mt-4 text-gray-300 text-center max-w-2xl mx-auto">{t.subText}</p>
                </div>

                {/* Filters */}
                <div className="relative mb-10">
                    <button onClick={() => scrollFilter('left')} className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 z-10 md:hidden">◀</button>
                    <div className="overflow-x-auto hide-scrollbar py-2" ref={filterSliderRef}>
                        <div className="flex gap-3 min-w-min px-2 justify-center">
                            {mainFilters.map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setCategory(filter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 whitespace-nowrap ${
                                        category === filter ? 'bg-[#23B5B5] text-white' : 'bg-[#152e33] text-gray-300 hover:bg-[#1a4047]'
                                    }`}
                                >
                                    {filter === 'All' ? t.filters : filter}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button onClick={() => scrollFilter('right')} className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2 z-10 md:hidden">▶</button>
                </div>

                {/* Project Cards */}
                <motion.div className="mt-10 flex flex-wrap gap-7 justify-center" layout transition={{ type: 'spring', damping: 20, stiffness: 100 }}>
                    {filteredProjects.length > 0 ? (
                        filteredProjects.map((project, idx) => (
                            <ProjectCard key={project.name} proj={project} index={idx} text={t.cardText} {...project} />
                        ))
                    ) : (
                        <div className="text-center py-20 w-full">
                            <p className="text-white text-xl">{t.noProjects}</p>
                            <button onClick={() => setCategory('All')} className="mt-4 text-[#23B5B5] hover:text-[#84ffff]">{t.viewAllProjects}</button>
                        </div>
                    )}
                </motion.div>

                <div className="mt-16 flex justify-center">
                    <motion.button onClick={handleGoBack} className="bg-gradient-to-r from-[#152e33] to-[#0b191b] text-white px-8 py-3 rounded-full flex items-center gap-2 border border-[#23B5B5] hover:shadow-lg transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {t.returnToHome}
                    </motion.button>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ProjectsPage;