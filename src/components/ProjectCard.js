import '../css/ProjectCard.css';
import React, {useContext, useEffect, useState} from 'react';

// Asset imports
import {SkillPanel} from "./SkillPanel";
import LanguageContext from "./LanguageContext";
import projectJsonData from '../data/projects.json';

const ProjectCard = (
    {
        projectId = "witcher"
    }
) => {
    const { selectedFlag } = useContext(LanguageContext);
    const [currentProjectData, setCurrentProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        const languageMap = { "usa": "english", "brazil": "portuguese" };
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
            ...project.translations[language]
        };

        setCurrentProjectData(currentProject);
        setIsLoading(false);
    }, [selectedFlag, projectId]);

    if (isLoading) {
        // Render a loading message or spinner while data is loading
        return <div>Loading project data...</div>;
    }

    return (
        <div className="project-card">
            <div className="project-card-header">
                <h2>{currentProjectData.title}</h2>
                <img src={require(`../assets/img/${currentProjectData.image}`)} alt="Project thumbnail" />
                <p>{currentProjectData.description}</p>
            </div>
            <div className="project-card-footer">
                <SkillPanel title="Core Skills" color="core-skills" skills={currentProjectData.coreSkills} />
                <SkillPanel title="Frameworks" color="frameworks" skills={currentProjectData.frameworks} />
                <SkillPanel title="Libraries" color="libraries" skills={currentProjectData.libraries} />
            </div>
        </div>
    );
}

export default ProjectCard;
