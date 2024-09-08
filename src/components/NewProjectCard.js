import '../css/ProjectCard.css';
import React, {useEffect, useState} from 'react';

// Asset imports
import witcher from "../assets/img/witcher_reading_book.png";
import backend from "../assets/img/skills_icons/server.png";
import api from "../assets/img/skills_icons/api.png";
import nlp from "../assets/img/skills_icons/nlp.png";
import django from "../assets/img/skills_icons/django.png";
import networkx from "../assets/img/skills_icons/networkx.png";
import numpy from "../assets/img/skills_icons/numpy.png";
import pandas from "../assets/img/skills_icons/pandas.png";
import graphviz from "../assets/img/skills_icons/graphviz.png";
import spacy from "../assets/img/skills_icons/spacy.png";
import {SkillPanel} from "./SkillPanel";

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

const SkillFooter = ({ icon, title, description }) => {
    return (
        <div className="hidden-footer">
            <img src={icon} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
};

const NewProjectCard = (
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
    const [activeCoreSkill, setActiveCoreSkill] = useState(null);
    const [activeFramework, setActiveFramework] = useState(null);
    const [activeLibrary, setActiveLibrary] = useState(null);
    const [selectedSkill, setSelectedSkill] = useState(null);

    const handleSkillClick = (skillKey, category) => {
        if (selectedSkill === skillKey) {
            setSelectedSkill(null);
        } else {
            setSelectedSkill(skillKey);
        }

        const setActive = {
            'core-skills': setActiveCoreSkill,
            'frameworks': setActiveFramework,
            'libraries': setActiveLibrary
        };

        const currentActive = {
            'core-skills': activeCoreSkill,
            'frameworks': activeFramework,
            'libraries': activeLibrary
        };

        if (currentActive[category]?.title === skillDetails[skillKey].title) {
            setActive[category](null);
        } else {
            setActive[category](skillDetails[skillKey]);
        }
    };

    const renderSkillsRows = (skills, category) => {
        const categoryClass = `${category}-panel`;
        const borderClass = `${category}-border`;
        const rows = [];
        for (let i = 0; i < skills.length; i += 3) {
            const rowSkills = skills.slice(i, i + 3);
            const row = (
                <div className="section-card">
                    <div className={`skills-row ${categoryClass}`} key={`row-${i}`}>
                        {rowSkills.map(skill => (
                            <span className="project-single-skill" key={skill.label} onClick={() => handleSkillClick(skill.icon, category)}>
                            <img className={`project-skill-icon ${borderClass} ${skill.icon === selectedSkill ? 'selected' : ''}`} src={skillsIcons[skill.icon]}
                                 alt={`${skill.label} Icon`}/>
                            <div className="project-skill-label">{skill.label}</div>
                        </span>
                        ))}
                    </div>
                </div>
            );
            rows.push(row);
        }
        return rows;
    };


    useEffect(() => {
        adjustSkillLabelFontSize();
        handleHoverEffects();
    }, []);

    return (
        <div className="project-card">
            <div className="project-card-header">
                <h2>{title}</h2>
                <img src={imageUrl} alt="Project thumbnail"/>
                <p>{description}</p>
            </div>
            <div className="project-card-footer">
                {<SkillPanel title='Core Skills' color='core-skills' skills={coreSkills}/>}
                {<SkillPanel title='Frameworks' color='frameworks' skills={frameworks}/>}
                {<SkillPanel title='Libraries' color='libraries' skills={libraries}/>}
            </div>
            <button>
                Open Project
            </button>
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

export default NewProjectCard;