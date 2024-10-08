import './ProjectCard.css';
import React, {useContext, useEffect, useState} from 'react';
import {SkillPanel} from '../Skills/SkillPanel';
import LanguageContext from '../LanguageContext';
import projectJsonData from '../../data/projects.json';
import {Link} from "react-router-dom";

const ProjectCard = ({projectId = 'witcher', isActive = false, startExpanded = 'backend'}) => {
    const {selectedFlag} = useContext(LanguageContext);
    const [currentProjectData, setCurrentProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isExpanded, setIsExpanded] = useState(true);
    const [active, setActive] = useState(isActive);

    useEffect(() => {
        setActive(isActive); // Sync state with prop changes
    }, [isActive]);

    useEffect(() => {
        const languageMap = {usa: 'english', brazil: 'portuguese'};
        const language = languageMap[selectedFlag];

        if (!language) {
            console.error(`selectedFlag "${selectedFlag}" does not map to any valid language in languageMap.`);
            setIsLoading(false);
            return;
        }

        const project = projectJsonData.projects[projectId];
        if (!project) {
            console.error(`Project data for ID "${projectId}" is missing.`);
            setIsLoading(false);
            return;
        }

        // Merge project data with language-specific translations
        const currentProject = {
            ...project,
            ...project.translations[language],
        };

        setCurrentProjectData(currentProject);
        setIsLoading(false);
    }, [selectedFlag, projectId]);

    useEffect(() => {
        setIsExpanded(isExpanded);
    }, [isActive]);

    const handleSelect = () => {
        setIsExpanded((prev) => !prev);
    };

    if (isLoading) {
        return <div>Loading project data...</div>;
    }

    return (
        <div className={`project-card ${isExpanded ? 'expanded' : 'collapsed'} ${isActive ? 'active' : 'inactive'}`}>
            <div className="project-card-header">
                <h2>{currentProjectData.title}</h2>
                <a
                    href={currentProjectData.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{textDecoration: 'none'}} // Optional: Removes underline from the link
                >
                    <img src={require(`../../assets/img/${currentProjectData.image}`)}
                         alt="Project thumbnail"/>
                </a>
                <p>{currentProjectData.description}</p>
            </div>
            <div className="project-card-footer">
                <SkillPanel
                    title="Core Skills"
                    color="core-skills"
                    skills={currentProjectData.coreSkills}
                    isExpanded={isExpanded}
                    selectRandomSkill={true}
                />
                <SkillPanel
                    title="Frameworks"
                    color="frameworks"
                    skills={currentProjectData.frameworks}
                    isExpanded={isExpanded}
                />
                <SkillPanel
                    title="Libraries"
                    color="libraries"
                    skills={currentProjectData.libraries}
                    isExpanded={isExpanded}
                />
                <button className="project-card-button" onClick={handleSelect}>
                    {isExpanded ? 'Collapse' : 'Expand'}
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
