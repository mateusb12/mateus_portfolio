import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import server from "../assets/img//skills_icons/server.png";
import api from "../assets/img//skills_icons/api.png";
import database from "../assets/img//skills_icons/database.png";
import cloud from "../assets/img//skills_icons/cloud.png";
import deploy from "../assets/img//skills_icons/deploy.png";
import lock from "../assets/img//skills_icons/lock.png";
import python from "../assets/img//skills_icons/python.png";
import javascript from "../assets/img//skills_icons/javascript.png";
import csharp from "../assets/img//skills_icons/csharp.png";
import java from "../assets/img//skills_icons/java.png";
import html from "../assets/img//skills_icons/html.png";
import css from "../assets/img//skills_icons/css.png";
import git from "../assets/img//skills_icons/git.png";
import flask from "../assets/img//skills_icons/flask.png";
import _react from "../assets/img//skills_icons/react.png";
import postgres from "../assets/img//skills_icons/postgres.png";
import docker from "../assets/img//skills_icons/docker.png";
import jwt from "../assets/img//skills_icons/jwt.png";
import aws from "../assets/img//skills_icons/aws.png";
import google from "../assets/img//skills_icons/google-cloud-small.png";
import sql from "../assets/img//skills_icons/sql.png";

import LanguageContext from './LanguageContext';
import {useContext, useEffect, useState} from "react";
import languageFile from "../data/skills.json";

export const Skills = () => {
    const languageFile = require('../data/skills.json');
    const { selectedFlag } = useContext(LanguageContext);
    const [selectedLanguage, setSelectedLanguage] = useState('english');

    useEffect(() => {
        const languageKey = selectedFlag === 'usa' ? 'english' : 'portuguese';
        setSelectedLanguage(languageKey);
    }, [selectedFlag]);

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: {max: 4000, min: 3000},
            items: 5
        },
        desktop: {
            breakpoint: {max: 3000, min: 1024},
            items: 3
        },
        tablet: {
            breakpoint: {max: 1024, min: 464},
            items: 2
        },
        mobile: {
            breakpoint: {max: 464, min: 0},
            items: 1
        }
    };

    const skillIcons = {
        "Backend Development": server,
        "APIs": api,
        "Databases": database,
        "Cloud": cloud,
        "DevOps and CI/CD Pipelines": deploy,
        "Security": lock,
        "Python": python,
        "Javascript": javascript,
        "C#": csharp,
        "Java": java,
        "SQL": sql,
        "HTML": html,
        "CSS": css,
        "GIT": git,
        "Flask": flask,
        "React": _react,
        "JWT": jwt,
        "Postgres": postgres,
        "Docker": docker,
        "AWS": aws,
        "Google Cloud": google,
    };

    const skillsDataList = languageFile[selectedLanguage].key.skillList;
    console.log(skillsDataList)
    const skillsData = Object.entries(skillIcons).map(([title, src]) => ({
        title,
        src
    }));

    const skillMap = languageFile.skillMap;
    const translateSkill = (skill) => {
        return skillMap[skill] ? skillMap[skill][selectedLanguage] : skill;
    }

    const basicTechnologiesList = languageFile[selectedLanguage].foundations.skillList;
    const basicTechnologies = basicTechnologiesList.map((tech) => ({
        title: tech,
        src: skillIcons[tech]
    }));

    const frameworksList = languageFile[selectedLanguage].stack.skillList;
    const frameworks = frameworksList.map((framework) => ({
        title: framework,
        src: skillIcons[framework]
    }));

    const keySkillsTitle = languageFile[selectedLanguage].key.title;

    return (
        <section className="skill" id="skills">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="skill-bx wow zoomIn">
                            <h2>{languageFile[selectedLanguage].key.title}</h2>
                            <p>{languageFile[selectedLanguage].key.description}</p>
                            <Carousel responsive={responsive} infinite={false}
                                      className="owl-carousel owl-theme skill-slider">
                                {skillsData.map((skill, index) => {
                                    const translatedTitle = translateSkill(skill.title);
                                    return (
                                        <div className="item" key={index}>
                                            <img src={skill.src} alt={translatedTitle}/>
                                            <h5>{translatedTitle}</h5>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div className="skill-bx wow zoomIn">
                            <h2>{languageFile[selectedLanguage].foundations.title}</h2>
                            <p>{languageFile[selectedLanguage].foundations.description}</p>
                            <Carousel responsive={responsive} infinite={false}
                                      className="owl-carousel owl-theme skill-slider">
                                {basicTechnologies.map((skill, index) => {
                                    const translatedTitle = translateSkill(skill.title);
                                    return (
                                        <div className="item" key={index}>
                                            <img src={skill.src} alt={translatedTitle}/>
                                            <h5>{translatedTitle}</h5>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>
                        <div className="skill-bx wow zoomIn">
                            <h2>{languageFile[selectedLanguage].stack.title}</h2>
                            <p>{languageFile[selectedLanguage].stack.description}</p>
                            <Carousel responsive={responsive} infinite={false}
                                      className="owl-carousel owl-theme skill-slider">
                                {frameworks.map((skill, index) => {
                                    const translatedTitle = translateSkill(skill.title);
                                    return (
                                        <div className="item" key={index}>
                                            <img src={skill.src} alt={translatedTitle}/>
                                            <h5>{translatedTitle}</h5>
                                        </div>
                                    )
                                })}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
