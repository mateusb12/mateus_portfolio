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
import sql from "../assets/img//skills_icons/sql.png";
import git from "../assets/img//skills_icons/git.png";
import flask from "../assets/img//skills_icons/flask.png";
import _react from "../assets/img//skills_icons/react.png";
import jwt from "../assets/img//skills_icons/jwt.png";
import postgres from "../assets/img//skills_icons/postgres.png";
import docker from "../assets/img//skills_icons/docker.png";
import aws from "../assets/img//skills_icons/aws.png";
import google from "../assets/img//skills_icons/google-cloud-small.png";

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

    function mapSkillsToIcons(skillNames, skillMap, skillIcons) {
        const icons = {};
        skillNames.forEach((name) => {
            // Find the key in the skillMap that corresponds to the name
            const skillKey = Object.keys(skillMap).find(key => skillMap[key].toLowerCase() === name.toLowerCase());

            // If a corresponding key is found and an icon exists for that key, map it
            if (skillKey && skillIcons[skillKey]) {
                icons[skillKey] = skillIcons[skillKey];
            } else {
                // Optionally handle the case where no corresponding icon is found
                console.warn(`No icon found for skill: ${name}`);
            }
        });
        return icons;
    }

    const skillIcons = {
        "backend": server,
        "api": api,
        "database": database,
        "cloud": cloud,
        "deploy": deploy,
        "lock": lock,
        "python": python,
        "javascript": javascript,
        "csharp": csharp,
        "java": java,
        "html": html,
        "css": css,
        "sql": sql,
        "git": git,
        "flask": flask,
        "react": _react,
        "jwt": jwt,
        "postgres": postgres,
        "docker": docker,
        "aws": aws,
        "google-cloud": google,
    };

    const selectedLanguageMap = languageFile.skillMap[selectedLanguage];
    const coreSkills = languageFile.skillMap[selectedLanguage].key;
    const foundationSkills = languageFile[selectedLanguage].foundations.skillList;
    const stackSkills = languageFile[selectedLanguage].stack.skillList;

    const coreSkillsIcons = mapSkillsToIcons(languageFile[selectedLanguage].key.skillList, selectedLanguageMap.key, skillIcons);
    const foundationSkillsIcons = mapSkillsToIcons(languageFile[selectedLanguage].foundations.skillList, selectedLanguageMap.foundations, skillIcons);
    const stackSkillsIcons = mapSkillsToIcons(languageFile[selectedLanguage].stack.skillList, selectedLanguageMap.stack, skillIcons);

    console.log(coreSkillsIcons)

    const translateSkill = (skillKey) => {
        return languageFile[selectedLanguage]?.skills[skillKey] || skillKey;
    }

    const convertToRenderArray = (skillsIcons, skillMap) => {
        return Object.keys(skillsIcons).map((skillKey) => ({
            title: skillMap[skillKey],
            src: skillsIcons[skillKey]
        }));
    };

    const keySkills = convertToRenderArray(coreSkillsIcons, selectedLanguageMap.key);
    const basicTechnologies = convertToRenderArray(foundationSkillsIcons, selectedLanguageMap.foundations);
    const frameworks = convertToRenderArray(stackSkillsIcons, selectedLanguageMap.stack);


    const handleImageError = (errorEvent, skillName) => {
        console.error(`Error loading image for skill: ${skillName}`, errorEvent);
    }

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
                                {keySkills.map((skill, index) => {
                                    const translatedTitle = translateSkill(skill.title);
                                    return (
                                        <div className="item" key={index}>
                                            <img src={skill.src} alt={translatedTitle} onError={(e) => handleImageError(e, translatedTitle)}/>
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