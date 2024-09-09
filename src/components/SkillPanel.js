import '../css/SkillPanel.css';
import skillsData from '../data/project_skills.json';
import React, {useContext, useState} from "react";

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

const skillsIcons = {backend, api, nlp, django, networkx, numpy, pandas, graphviz, spacy};

const skillIconRetriever = {
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
    const { selectedFlag } = useContext(LanguageContext);
    const [activeSkill, setActiveSkill] = useState(null);

    const handleSkillClick = (skillKey) => {
        const translationMap = {"usa": "english", "brazil": "portuguese"};
        const language = translationMap[selectedFlag];

        if (activeSkill && activeSkill.key === skillKey) {
            setActiveSkill(null); // Toggle off if the same skill is clicked again
        } else {
            const allSkills = skillsData[language].skillsList;
            const skillContent = allSkills.find(entry => entry.key === skillKey);
            skillContent.imageUrl = skillIconRetriever[skillKey]; // maintain image URL separately
            setActiveSkill({...skillContent, active: skillKey}); // Use a new `active` property to determine selected state
        }
    };

    const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const renderSkills = () => {
        const skillChunks = chunkArray(skills, 3);
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

    return (
        <div key={activeSkill?.key} className={`project-card-skills-panel ${color}-border`}>
            <h3 className={`${color}-title`}>{title}</h3>
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


function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}


