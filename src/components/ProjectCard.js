import '../css/ProjectCard.css';
import React, {useContext, useEffect, useState} from 'react';

// Asset imports
import witcher from "../assets/img/witcher_reading_book.png";
import {SkillPanel} from "./SkillPanel";
import LanguageContext from "./LanguageContext";
import projectJsonData from '../data/projects.json';


const ProjectCard = (
    {
        title = 'Witcher Network',
        description = 'Transform .txt book files into social media style graphs, similar to Instagram',
        imageUrl = witcher,
        coreSkills = [
            {icon: 'backend', label: 'Backend'},
            {icon: 'api', label: 'APIs' },
            { icon: 'nlp', label: 'NLP' }
        ],
        frameworks = [
            { icon: 'django', label: 'Django' }
        ],
        libraries = [
            { icon: 'numpy', label: 'Numpy' },
            { icon: 'pandas', label: 'Pandas' },
            { icon: 'networkx', label: 'Networkx' },
            { icon: 'graphviz', label: 'GraphViz' },
            { icon: 'spacy', label: 'Spacy' }
        ]
    }
) => {
    const { selectedFlag } = useContext(LanguageContext);
    const [currentProjectData, setCurrentProjectData] = useState([]);

    useEffect(() => {
        const languageMap = {"usa": "english", "brazil": "portuguese"};
        const language = languageMap[selectedFlag];

        // Log selectedFlag value when it doesn't match
        if (!language) {
            console.error(`selectedFlag "${selectedFlag}" does not map to any valid language in languageMap.`);
            setCurrentProjectData([]); // Set empty data to avoid crashing the app
            return;
        }

        // Check if the mapped language exists in projectJsonData
        if (!projectJsonData[language]) {
            console.error(`Language data for "${language}" (selectedFlag: "${selectedFlag}") not found in projectJsonData.`);
            setCurrentProjectData([]); // Set empty data to avoid crashing the app
            return;
        }

        const projectContent = projectJsonData[language].projectList;

        if (!projectContent) {
            console.error(`Project list for "${language}" (selectedFlag: "${selectedFlag}") is missing.`);
            setCurrentProjectData([]); // Set empty data to avoid crashing the app
            return;
        }

        console.log('Project content is:', projectContent);
        setCurrentProjectData(projectContent);
        adjustSkillLabelFontSize();
        handleHoverEffects();
    }, [selectedFlag]);


    return (
        <div className="project-card">
            <div className="project-card-header">
                {currentProjectData.length > 0 ? (
                    <>
                        <h2>{currentProjectData[0].title}</h2>
                        <img src={imageUrl} alt="Project thumbnail" />
                        <p>{currentProjectData[0].description}</p>
                    </>
                ) : (
                    <p>Loading project data...</p> // Placeholder while the data is being loaded
                )}
            </div>
            <div className="project-card-footer">
                <SkillPanel title="Core Skills" color="core-skills" skills={coreSkills} />
                <SkillPanel title="Frameworks" color="frameworks" skills={frameworks} />
                <SkillPanel title="Libraries" color="libraries" skills={libraries} />
            </div>
            <button>Open Project</button>
        </div>
    );
}

const adjustSkillLabelFontSize = () => {
    const skillLabels = document.querySelectorAll('.project-skill-label');
    skillLabels.forEach(label => {
        const length = label.textContent.length;
        label.style.fontSize = length >= 7 ? '0.8rem' : '1rem';
    });
};


const handleHoverEffects = () => {
    const images = document.querySelectorAll('.project-card-header img');
    images.forEach(img => {
        img.addEventListener('mouseover', () => {
            img.classList.add('hovered');
        });

        img.addEventListener('mouseout', () => {
            img.classList.remove('hovered');
        });
    });
};

export default ProjectCard;