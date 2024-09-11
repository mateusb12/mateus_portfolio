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
    'spacy': spacy
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
        const allSkills = skillsData[language].skillsList;
        if (!allSkills) {
            console.warn(`No skills found for language: ${language}`);
            return;
        }
        const skillContent = allSkills.find(entry => entry.key === skillKey);
        if (!skillContent) {
            console.warn(`Skill not found for key: ${skillKey}`);
            return;
        }
        skillContent.imageUrl = skillsIcons[skillKey]; // maintain image URL separately
        setActiveSkill({...skillContent, active: skillKey}); // Use a new `active` property to determine selected state
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
                {chunk.map(skill => (
                    <span key={skill.label}
                          className="project-single-skill"
                          onClick={() => handleSkillClick(skill.icon)}>
                    <img
                        src={skillsIcons[skill.icon]}
                        alt={`${skill.label} Icon`}
                        className={`project-skill-icon ${skill.icon === activeSkill?.active ? 'selected' : ''} ${color}-border`}
                    />
                    <div className="project-skill-label">{skill.label}</div>
                </span>
                ))}
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
        console.log("Translating title to:", newTitle);
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


