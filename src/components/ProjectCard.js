import '../css/ProjectCard.css';
import React, {useEffect, useState} from 'react';

// Asset imports
import witcher from "../assets/img/witcher_reading_book.png";
import {SkillPanel} from "./SkillPanel";

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

export default ProjectCard;