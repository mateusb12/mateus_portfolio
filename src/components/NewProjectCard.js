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


const renderSkillsRows = (skills, category) => {
    const categoryClass = `${category}-panel`; // Used for the row
    const borderClass = `${category}-border`; // Correct border class for each icon based on the category
    const rows = [];
    for (let i = 0; i < skills.length; i += 3) {
        const rowSkills = skills.slice(i, i + 3);
        const row = (
            <div className="section-card">
                <div className={`skills-row ${categoryClass}`} key={`row-${i}`}>
                    {rowSkills.map(skill => (
                        <span className="project-single-skill" key={skill.label}>
                        <img className={`project-skill-icon ${borderClass}`} src={skillsIcons[skill.icon]}
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

const SkillFooter = ({ icon, title, description }) => (
    <div className="hidden-footer">
        <img src={icon} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
    </div>
);


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

const skillDetails = {
    'backend': {
        'title': 'Backend',
        'description': 'Focuses on server-side logic, database management, and application integration, ensuring data is processed efficiently and securely for application functionality.',
        'icon': server
    },
    'api': {
        'title': 'APIs',
        'description': 'Focuses on API design and implementation, providing a robust and efficient way to access and interact with data in a web application.',
        'icon': api
    },
    'nlp': {
        'title': 'NLP',
        'description': 'Focuses on natural language processing, leveraging advanced machine learning algorithms to extract meaningful insights from text data.',
        'icon': nlp
    }
}

const NewProjectCard = (
    {
        title = 'Witcher Network',
        description = 'Transform .txt book files into social media style graphs, similar to Instagram',
        imageUrl = witcher,
        coreSkills = [
            {icon: 'server', label: 'Backend'},
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
                <div className={`project-card-skills-panel core-skills-border`} style={{ borderColor: 'var(--core-skills-color)' }}>
                    <h3 style={{ color: 'var(--core-skills-color)' }}>Core Skills</h3>
                    {renderSkillsRows(coreSkills, 'core-skills')}
                    <SkillFooter {...skillDetails['backend']} />
                </div>
                <div className={`project-card-skills-panel frameworks-border`} style={{ borderColor: 'var(--frameworks-color)' }}>
                    <h3 style={{ color: 'var(--frameworks-color)' }}>Frameworks</h3>
                    {renderSkillsRows(frameworks, 'frameworks')}
                </div>
                <div className={`project-card-skills-panel libraries-border`} style={{ borderColor: 'var(--libraries-color)' }}>
                    <h3 style={{ color: 'var(--libraries-color)' }}>Libraries</h3>
                    {renderSkillsRows(libraries, 'libraries')}
                </div>
            </div>
            <button>
                Open Project
            </button>
        </div>
    );
}

export default NewProjectCard;