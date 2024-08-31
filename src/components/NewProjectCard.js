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

const NewProjectCard = (
    {
        title = 'Witcher Network',
        description = 'Transform .txt book files into social media style graphs, similar to Instagram',
        imageUrl = witcher
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
                    <div className="skills-row">
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={server} alt="Server Icon"/>
                            <div className="project-skill-label">Backend</div>
                        </span>
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={api} alt="Server Icon"/>
                             <div className="project-skill-label">APIs</div>
                        </span>
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={nlp} alt="Server Icon"/>
                            <div className="project-skill-label">NLP</div>
                        </span>
                    </div>
                </div>
                <div className="project-card-skills-panel">
                    <h3>Frameworks</h3>
                    <div className="skills-row">
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={django} alt="Server Icon"/>
                            <div className="project-skill-label">Django</div>
                        </span>
                    </div>
                </div>
                <div className="project-card-skills-panel">
                    <h3>Libraries</h3>
                    <div className="skills-row">
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={networkx} alt="Server Icon"/>
                            <div className="project-skill-label">Networkx</div>
                        </span>
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={numpy} alt="Server Icon"/>
                            <div className="project-skill-label">Numpy</div>
                        </span>
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={pandas} alt="Server Icon"/>
                            <div className="project-skill-label">Pandas</div>
                        </span>
                    </div>
                    <div className="skills-row">
                            <span className="project-single-skill">
                            <img className="project-skill-icon" src={graphviz} alt="Server Icon"/>
                            <div className="project-skill-label">GraphViz</div>
                        </span>
                        <span className="project-single-skill">
                            <img className="project-skill-icon" src={spacy} alt="Server Icon"/>
                            <div className="project-skill-label">Spacy</div>
                        </span>
                    </div>
                </div>
            </div>
            <button>
                Open Project
            </button>
        </div>
    );
}

export default NewProjectCard;