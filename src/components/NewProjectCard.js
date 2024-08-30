import '../css/ProjectCard.css';
import React from 'react';
import witcher from "../assets/img/witcher_reading_book.png";

const NewProjectCard = (
    {
        title = 'Witcher Network',
        description = 'Transform .txt book files into social media style graphs, similar to Instagram',
        imageUrl = witcher
    }
) => {
    return (
        <div className="project-card">
            <div className="project-card-header">
                <h2 className="portfolio-title">{title}</h2>
                <img src={imageUrl} alt="Project thumbnail"/>
                <p>{description}</p>
            </div>
            <div className="project-card-footer">
                <div className="project-card-skills-panel">
                    <h3>Core Skills</h3>
                    <span>Backend</span>
                    <span>APIs</span>
                    <span>NLP</span>
                </div>
                <div className="project-card-skills-panel">
                    <h3>Frameworks</h3>
                    <span>Django</span>
                </div>
                <div className="project-card-skills-panel">
                    <h3>Libraries</h3>
                    <span>Networkx</span>
                    <span>Numpy</span>
                    <span>Pandas</span>
                    <span>GraphViz</span>
                    <span>Spacy</span>
                </div>
            </div>
            <button>
                Open Project
            </button>
        </div>
    );
}

export default NewProjectCard;