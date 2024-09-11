import '../css/ProjectCard.css';
import React, {useContext, useEffect, useState} from 'react';

// Asset imports
import witcher from "../assets/img/witcher_reading_book.png";
import {SkillPanel} from "./SkillPanel";
import LanguageContext from "./LanguageContext";
import projectJsonData from '../data/projects.json';

const ProjectCard = (
    {
        imageUrl = witcher
    }
) => {
    const { selectedFlag } = useContext(LanguageContext);
    const [currentProjectData, setCurrentProjectData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  // Add a loading state

    useEffect(() => {
        const languageMap = {"usa": "english", "brazil": "portuguese"};
        const language = languageMap[selectedFlag];

        // Early return for invalid language
        if (!language) {
            console.error(`selectedFlag "${selectedFlag}" does not map to any valid language in languageMap.`);
            setIsLoading(false);  // Stop loading even if there's an error
            return;
        }

        // Early return for missing language data
        const projectLanguageData = projectJsonData[language];
        if (!projectLanguageData) {
            console.error(`Language data for "${language}" (selectedFlag: "${selectedFlag}") not found in projectJsonData.`);
            setIsLoading(false);
            return;
        }

        const projectContent = projectLanguageData.projectList;
        if (!projectContent) {
            console.error(`Project list for "${language}" (selectedFlag: "${selectedFlag}") is missing.`);
            setIsLoading(false);
            return;
        }

        // If all checks are valid, set the project data
        setCurrentProjectData(projectContent);
        setIsLoading(false);  // Stop loading once data is fetched
    }, [selectedFlag]);

    if (isLoading) {
        // Render a loading message or spinner while data is loading
        return <div>Loading project data...</div>;
    }

    return (
        <div className="project-card">
            <div className="project-card-header">
                <h2>{currentProjectData[0].title}</h2>
                <img src={require(`../assets/img/${currentProjectData[0].image}`)} alt="Project thumbnail"/>
                <p>{currentProjectData[0].description}</p>
            </div>
            <div className="project-card-footer">
                <SkillPanel title="Core Skills" color="core-skills" skills={currentProjectData[0].coreSkills} />
                <SkillPanel title="Frameworks" color="frameworks" skills={currentProjectData[0].frameworks} />
                <SkillPanel title="Libraries" color="libraries" skills={currentProjectData[0].libraries} />
            </div>
            <button>Open Project</button>
        </div>
    );
}

export default ProjectCard;
