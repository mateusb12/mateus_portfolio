import '../css/SkillPanel.css';
import React, {useState} from "react";

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

const skillsIcons = {backend, api, nlp, django, networkx, numpy, pandas, graphviz, spacy};

const skillDetails = {
    'backend': {
        'title': 'Backend',
        'description': 'I am able to build and manage the server-side architecture of web applications, by implementing complex server logic, managing database interactions, and ensuring seamless integration of components.',
        'icon': backend
    },
    'api': {
        'title': 'APIs',
        'description': 'I specialize in creating scalable APIs that support extensive data exchange and expand functionality while maintaining high security and performance standards.',
        'icon': api
    },
    'nlp': {
        'title': 'NLP',
        'description': 'I am proficient in natural language processing, leveraging advanced machine learning algorithms to extract meaningful insights from text data.',
        'icon': nlp
    },
    'django': {
        'title': 'Django',
        'description': 'I excel at using Django, a high-level Python web framework, to craft robust web applications swiftly. My expertise includes harnessing Django’s model-view-template architecture to efficiently design, implement, and manage interactive, database-driven websites. This expertise extends to utilizing Django’s comprehensive ecosystem, such as its ORM, authentication support, and seamless third-party plugin integrations.',
        'icon': django
    }
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
    const [activeSkill, setActiveSkill] = useState(null);

    const handleSkillClick = (skillKey) => {
        if (activeSkill && activeSkill.title === skillDetails[skillKey].title) {
            setActiveSkill(null);
        } else {
            setActiveSkill(skillDetails[skillKey]);
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
        const skillChunks = chunkArray(skills, 3); // Split skills into chunks of 3
        return skillChunks.map((chunk, rowIndex) => (
            <div key={rowIndex} className="skills-row">
                {chunk.map(skill => (
                    <span key={skill.label}
                          className={`project-single-skill ${skill.icon === activeSkill?.icon ? 'selected' : ''}`}
                          onClick={() => handleSkillClick(skill.icon)}>
                        <img
                            src={skillsIcons[skill.icon]}
                            alt={`${skill.label} Icon`}
                            className={`project-skill-icon ${color}-border`} // Dynamically adding a border color class
                        />
                        <div className="project-skill-label">{skill.label}</div>
                    </span>
                ))}
            </div>
        ));
    };

    return (
        <div className={`project-card-skills-panel ${color}-border`}>
            <h3 className={`${color}-title`}>{title}</h3>
            {renderSkills()}
            {activeSkill && (
                <div className="hidden-footer">
                    <img src={activeSkill.icon} alt={activeSkill.title}/>
                    <h3>{activeSkill.title}</h3>
                    <p>{activeSkill.description}</p>
                </div>
            )}
        </div>
    );
};
