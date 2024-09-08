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
        'description': 'Django is a high-level Python web framework. I use it to build scalable, database-driven applications with clean architecture and efficient development practices.',
        'icon': django
    },
    'numpy': {
        'title': 'Numpy',
        'description': 'I am familiar with the NumPy library. It is a tool for scientific computing and linear algebra.',
        'icon': numpy
    },
    'pandas': {
        'title': 'Pandas',
        'description': 'I am familiar with the Pandas library. It is a tool for sheet manipulation and data organization.',
        'icon': pandas
    },
    'networkx': {
        'title': 'NetworkX',
        'description': 'I am familiar with the NetworkX library. It is a tool for creating and manipulating graphs.',
        'icon': networkx
    },
    'graphviz': {
        'title': 'Graphviz',
        'description': 'I am familiar with the Graphviz library. It is a tool for graph visualization.',
        'icon': graphviz
    },
    'spacy': {
        'title': 'Spacy',
        'description': 'I am familiar with the Spacy library. It is a tool for natural language processing.',
        'icon': spacy
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
        console.log('Clicked skill:', skillKey); // Log which skill was clicked
        console.log('Current activeSkill:', activeSkill); // Log current state of activeSkill
        console.log('Skill icon from click:', skillsIcons[skillKey]); // Log the icon clicked
        console.log('Active Skill Icon:', activeSkill?.icon); // Log the active skill icon

        if (activeSkill && activeSkill.icon === skillsIcons[skillKey]) {
            console.log('Unselecting:', skillDetails[skillKey].title); // Log unselect action
            setActiveSkill(null);
        } else {
            console.log('Selecting:', skillDetails[skillKey].title); // Log select action
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
                          className="project-single-skill"
                          onClick={() => handleSkillClick(skill.icon)}>
            <img
                src={skillsIcons[skill.icon]}
                alt={`${skill.label} Icon`}
                className={`project-skill-icon ${skill.icon === activeSkill?.icon ? 'selected' : ''} ${color}-border`} // Apply 'selected' to the img element
            />
            <div className="project-skill-label">{skill.label}</div>
            </span>
                ))}
            </div>
        ));
    };

    return (
        <div key={activeSkill?.icon} className={`project-card-skills-panel ${color}-border`}>
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
