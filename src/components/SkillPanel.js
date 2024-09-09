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


const newSkillDetails = skillsData.english.skillsList['english'];

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
    const { language } = useContext(LanguageContext);
    const [activeSkill, setActiveSkill] = useState(null);

    const handleSkillClick = (skillKey) => {
        if (activeSkill && activeSkill.icon === skillsIcons[skillKey]) {
            setActiveSkill(null);
        } else {
            let test = (JSON.stringify(skillDetails) === JSON.stringify(newSkillDetails));
            if(!test){
                console.log('Not the same thing.')
            }
            let activeSkillByFind = Object.entries(skillDetails).find(([key, value]) => key === skillKey)[1];
            setActiveSkill(activeSkillByFind);
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

function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}
