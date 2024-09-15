import '../css/SkillPanel.css';
import skillsData from '../data/project_skills.json';
import React, { useContext, useEffect, useState } from "react";
import LanguageContext from "./LanguageContext";

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        const iconName = item.replace('./', '').replace('.png', '');
        images[iconName] = r(item);
    });
    return images;
};

const skillsIcons = importAll(require.context('../assets/img/skills_icons', false, /\.png$/));

const defaultSkills = [
    { icon: 'backend', label: 'Backend' },
    { icon: 'api', label: 'APIs' },
    { icon: 'nlp', label: 'NLP' },
    { icon: 'django', label: 'Django' },
    { icon: 'networkx', label: 'NetworkX' },
    { icon: 'numpy', label: 'Numpy' },
    { icon: 'pandas', label: 'Pandas' },
    { icon: 'graphviz', label: 'Graphviz' },
    { icon: 'spacy', label: 'Spacy' }
];

export const SkillPanel = ({
                               skills = defaultSkills,
                               title = "Default Skills",
                               color = "core-skills",
                               isExpanded: isActiveProp, // External control
                           }) => {
    const { selectedFlag } = useContext(LanguageContext);
    const [activeSkill, setActiveSkill] = useState(null);
    const [translatedTitle, setTranslatedTitle] = useState(title);

    const isExpanded = isActiveProp;

    const translationMap = { "usa": "english", "brazil": "portuguese" };
    const currentLanguage = translationMap[selectedFlag];

    function showSkillContent(skillKey) {
        const skillData = skillsData.skills[skillKey];
        if (!skillData) {
            console.warn(`Skill data not found for key: ${skillKey}`);
            return;
        }
        const skillContent = skillData[currentLanguage];
        if (!skillContent) {
            console.warn(`Skill content not found for language: ${currentLanguage}`);
            return;
        }
        skillContent.imageUrl = skillsIcons[skillKey];
        setActiveSkill({ ...skillContent, key: skillKey, active: skillKey });
    }

    const handleSkillClick = (skillKey) => {
        if (activeSkill && activeSkill.key === skillKey) {
            setActiveSkill(null);
        } else {
            showSkillContent(skillKey);
        }
    };

    const renderSkills = () => {
        const skillChunks = chunkArray(skills, 3);
        return skillChunks.map((chunk, rowIndex) => (
            <div key={rowIndex} className="skills-row">
                {chunk.map(skill => (
                    <span
                        key={skill.label}
                        className="project-single-skill"
                        onClick={() => handleSkillClick(skill.icon)}
                    >
                        <img
                            src={skillsIcons[skill.icon]}
                            alt={`${skill.label} Icon`}
                            onError={() => console.error(`Failed to load image for ${skill.label}`)}
                            className={`project-skill-icon ${skill.icon === activeSkill?.active ? 'selected' : ''} ${color}-border`}
                        />
                        <div className="project-skill-label">{skill.label}</div>
                    </span>
                ))}
            </div>
        ));
    };

    function translateTitle(currentTitle, currentLanguage) {
        const skillTitleTranslationMap = {
            'Core Skills': 'Habilidades chave',
            'Frameworks': 'Frameworks',
            'Libraries': 'Bibliotecas'
        };

        if (currentLanguage === "english") {
            const reverseMap = Object.entries(skillTitleTranslationMap).reduce((acc, [key, value]) => {
                acc[value] = key;
                return acc;
            }, {});
            return reverseMap[currentTitle] || currentTitle;
        } else {
            return skillTitleTranslationMap[currentTitle] || currentTitle;
        }
    }

    useEffect(() => {
        const newTitle = translateTitle(title, currentLanguage);
        setTranslatedTitle(newTitle);
        if (activeSkill) {
            showSkillContent(activeSkill.key);
        }
    }, [selectedFlag, title]);

    // Clear activeSkill when isExpanded becomes false
    useEffect(() => {
        if (!isExpanded && activeSkill) {
            setActiveSkill(null);
        }
    }, [isExpanded, activeSkill]);

    return (
        <div className={`project-card-skills-panel ${color}-border`}>
            <h3 className={`${color}-title`}>{translatedTitle}</h3>
            {isExpanded && (
                <>
                    {renderSkills()}
                    {activeSkill && (
                        <div className="hidden-footer">
                            <img src={activeSkill.imageUrl} alt={activeSkill.title} />
                            <h3>{activeSkill.title}</h3>
                            <p>{activeSkill.description}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const chunkArray = (arr, chunkSize) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};
