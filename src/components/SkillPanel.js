import '../css/SkillPanel.css';
import skillsData from '../data/project_skills.json';
import React, {useContext, useEffect, useState} from "react";

// Asset imports
import backend from "../assets/img/skills_icons/server.png";
import api from "../assets/img/skills_icons/api.png";
import nlp from "../assets/img/skills_icons/nlp.png";
import django from "../assets/img/skills_icons/django.png";
import networkx from "../assets/img/skills_icons/networkx.png";
import numpy from "../assets/img/skills_icons/numpy.png";
import pandas from "../assets/img/skills_icons/pandas.png";
import graphviz from "../assets/img/skills_icons/graphviz.png";
import spacy from "../assets/img/skills_icons/spacy.png";
import flask from "../assets/img/skills_icons/flask.png";
import LanguageContext from "./LanguageContext";

const skillsIcons = {
    'backend': backend,
    'api': api,
    'nlp': nlp,
    'django': django,
    'networkx': networkx,
    'numpy': numpy,
    'pandas': pandas,
    'graphviz': graphviz,
    'spacy': spacy,
    'flask': flask
}

const defaultSkills = [
    {icon: 'backend', label: 'Backend'},
    {icon: 'api', label: 'APIs'},
    {icon: 'nlp', label: 'NLP'},
    {icon: 'django', label: 'Django'},
    {icon: 'networkx', label: 'NetworkX'},
    {icon: 'numpy', label: 'Numpy'},
    {icon: 'pandas', label: 'Pandas'},
    {icon: 'graphviz', label: 'Graphviz'},
    {icon: 'spacy', label: 'Spacy'}
];

export const SkillPanel = ({
                               skills = defaultSkills,
                               title = "Default Skills",
                               color = "core-skills"
                           }) => {
    const { selectedFlag, language } = useContext(LanguageContext);
    const [currentSkills, setCurrentSkills] = useState(skills);
    const [activeSkill, setActiveSkill] = useState(null);
    const [translatedTitle, setTranslatedTitle] = useState(title);

    function showSkillContent(language, skillKey) {
        const skillData = skillsData.skills[skillKey];
        if (!skillData) {
            console.warn(`Skill data not found for key: ${skillKey}`);
            return;
        }
        const skillContent = skillData[language];
        if (!skillContent) {
            console.warn(`Skill content not found for language: ${language}`);
            return;
        }
        skillContent.imageUrl = skillsIcons[skillKey]; // Keep image URL handling
        setActiveSkill({...skillContent, key: skillKey, active: skillKey}); // Add `key` property for consistent access
    }

    const handleSkillClick = (skillKey) => {
        const translationMap = {"usa": "english", "brazil": "portuguese"};
        const language = translationMap[selectedFlag];

        if (activeSkill && activeSkill.key === skillKey) {
            setActiveSkill(null); // Toggle off if the same skill is clicked again
        } else {
            showSkillContent(language, skillKey);
        }
    };

    const renderSkills = () => {
        const skillChunks = chunkArray(currentSkills, 3);  // Use `currentSkills` to display updated skills
        return skillChunks.map((chunk, rowIndex) => (
            <div key={rowIndex} className="skills-row">
                {chunk.map(skill => {
                    // Log the source URL of each skill icon
                    // console.log(`Loading icon for ${skill.label}:`, skillsIcons[skill.icon]);
                    return (
                        <span key={skill.label}
                              className="project-single-skill"
                              onClick={() => handleSkillClick(skill.icon)}>
                        <img
                            src={skillsIcons[skill.icon]}
                            alt={`${skill.label} Icon`}
                            onError={() => console.error(`Failed to load image for ${skill.label}, path: ${skillsIcons[skill.icon]}`)}
                            className={`project-skill-icon ${skill.icon === activeSkill?.active ? 'selected' : ''} ${color}-border`}
                        />
                        <div className="project-skill-label">{skill.label}</div>
                    </span>
                    );
                })}
            </div>
        ));
    };


    function translateTitle(currentTitle, currentLanguage) {
        const skillTitleTranslationMap = {
            'Core Skills': 'Habilidades chave',
            'Frameworks': 'Frameworks',
            'Libraries': 'Bibliotecas'
        }

        if (currentLanguage === "english") {
            // Looking for English title, reverse lookup if the current title is in Portuguese
            const reverseMap = Object.entries(skillTitleTranslationMap).reduce((acc, [key, value]) => {
                acc[value] = key; // Reverse the key-value pairs
                return acc;
            }, {});

            return reverseMap[currentTitle] || currentTitle; // Default to the original if no translation is found
        } else {
            // Portuguese translation as before
            return skillTitleTranslationMap[currentTitle] || currentTitle; // Default to the original if no translation is found
        }
    }


    useEffect(() => {
        // Calculate the language mapping outside the effect, but it's used inside.
        const translationMap = {"usa": "english", "brazil": "portuguese"};
        const currentLanguage = translationMap[selectedFlag];
        const newTitle = translateTitle(title, currentLanguage);
        setTranslatedTitle(newTitle);
        if(activeSkill){
            showSkillContent(currentLanguage, activeSkill.key);
        }
    }, [selectedFlag, title]);



    return (
        <div key={activeSkill?.key} className={`project-card-skills-panel ${color}-border`}>
            <h3 className={`${color}-title`}>{translatedTitle}</h3>
            {renderSkills()}
            {activeSkill && (
                <div className="hidden-footer">
                    <img src={activeSkill.imageUrl} alt={activeSkill.title}/>
                    <h3>{activeSkill.title}</h3>
                    <p>{activeSkill.description}</p>
                </div>
            )}
        </div>
    );
};

const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};


