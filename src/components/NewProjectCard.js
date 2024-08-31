import '../css/ProjectCard.css';
import React, {useEffect} from 'react';
import witcher from "../assets/img/witcher_reading_book.png";
import server from "../assets/img/skills_icons/server.png";
import api from "../assets/img/skills_icons/api.png";
import nlp from "../assets/img/skills_icons/nlp.png";
import django from "../assets/img/skills_icons/django.png";
import networkx from "../assets/img/skills_icons/networkx.png";
import numpy from "../assets/img/skills_icons/numpy.png";
import pandas from "../assets/img/skills_icons/pandas.png";
import graphviz from "../assets/img/skills_icons/graphviz.png";
import spacy from "../assets/img/skills_icons/spacy.png";


const adjustSkillLabelFontSize = () => {
    const skillLabels = document.querySelectorAll('.project-skill-label');
    skillLabels.forEach(label => {
        const length = label.textContent.length;
        label.style.fontSize = length >= 7 ? '0.8rem' : '1rem';
    });
};

const renderSkillsRows = (skills) => {
    const rows = [];
    for (let i = 0; i < skills.length; i += 3) {
        const rowSkills = skills.slice(i, i + 3);
        const row = (
            <div className="skills-row" key={`row-${i}`}>
                {rowSkills.map(skill => (
                    <span className="project-single-skill" key={skill.label}>
                        <img className="project-skill-icon" src={skillsIcons[skill.icon]} alt={`${skill.label} Icon`} />
                        <div className="project-skill-label">{skill.label}</div>
                    </span>
                ))}
            </div>
        );
        rows.push(row);
    }
    return rows;
};

const skillsIcons = {
    server,
    api,
    nlp,
    django,
    networkx,
    numpy,
    pandas,
    graphviz,
    spacy
};

const NewProjectCard = (
    {
        title = 'Witcher Network',
        description = 'Transform .txt book files into social media style graphs, similar to Instagram',
        imageUrl = witcher,
        coreSkills = [
            { icon: 'server', label: 'Backend' },
            { icon: 'api', label: 'APIs' },
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
    useEffect(() => {
        adjustSkillLabelFontSize();
    }, []);

    return (
        <div className="project-card">
            <div className="project-card-header">
                <h2>{title}</h2>
                <img src={imageUrl} alt="Project thumbnail"/>
                <p>{description}</p>
            </div>
            <div className="project-card-footer">
                <div className="project-card-skills-panel">
                    <h3>Core Skills</h3>
                    {renderSkillsRows(coreSkills)}
                </div>
                <div className="project-card-skills-panel">
                    <h3>Frameworks</h3>
                    {renderSkillsRows(frameworks)}
                </div>
                <div className="project-card-skills-panel">
                    <h3>Libraries</h3>
                    {renderSkillsRows(libraries)}
                </div>
            </div>
            <button>
                Open Project
            </button>
        </div>
    );
}

export default NewProjectCard;