import './SkillPanel.css';
import skillsData from '../../data/project_skills.json';
import React, {useContext, useEffect, useRef, useState} from "react";
import LanguageContext from "../LanguageContext";

const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => {
        const iconName = item.replace('./', '').replace('.png', '');
        images[iconName] = r(item);
    });
    return images;
};

const skillsIcons = importAll(require.context('../../assets/img/skills_icons', false, /\.png$/));

const formatLabel = (label) => {
    const words = label.split(' ');
    // Check if there are at least two words
    if (words.length >= 2) {
        // Check if each word has more than 7 characters
        const allWordsLong = words.some(word => word.length >= 7);
        if (allWordsLong) {
            return (
                <span className="formatted-label small-font">
                    {words.map((word, index) => (
                        <React.Fragment key={index}>
                            {index > 0 && <br />}
                            {word}
                        </React.Fragment>
                    ))}
                </span>
            );
        }
    }
    // If conditions not met, return the label with normal font size
    return <span className="formatted-label">{label}</span>;
};

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
                               isExpanded: isActiveProp,
                               selectRandomSkill = false
                           }) => {
    const { selectedFlag } = useContext(LanguageContext);
    const [activeSkill, setActiveSkill] = useState(null);
    const [translatedTitle, setTranslatedTitle] = useState(title);

    const isExpanded = isActiveProp;

    const translationMap = { "usa": "english", "brazil": "portuguese" };
    const currentLanguage = translationMap[selectedFlag];

    const hasInitialized = useRef(false);

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
        // Determine minimumSize based on the title
        const minimumSize = title === 'Libraries' ? 1 : 0;
        const skillChunks = chunkArray(skills, minimumSize);
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
                        <div className="project-skill-label">{formatLabel(skill.label)}</div>
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

    useEffect(() => {
        if (selectRandomSkill && !hasInitialized.current) {
            const randomSkillIndex = Math.floor(Math.random() * skills.length); // Pick a random index
            const randomSkillKey = skills[randomSkillIndex].icon; // Assume your skill key is stored in the icon property
            showSkillContent(randomSkillKey);
            console.log(`Initial selected skill: ${randomSkillKey}`);
            hasInitialized.current = true;
        }
    }, [selectRandomSkill, skills]);

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

const chunkArray = (arr, minimumSize = 0) => {
    // If minimumSize is 0 and the array length is less than or equal to 3, return a single array
    if (minimumSize === 0 && arr.length <= 3) {
        return [arr];  // Return all elements in a single array
    }

    const result = [[], [], []]; // Prepare 3 arrays
    let i = 0;

    // Step 1: Fill each chunk with the minimumSize first, if minimumSize > 0
    for (let j = 0; j < result.length && i < arr.length; j++) {
        result[j] = arr.slice(i, i + minimumSize);
        i += minimumSize;
    }

    // Step 2: Distribute the remaining elements as evenly as possible
    for (let j = 0; i < arr.length; i++, j = (j + 1) % 3) {
        result[j].push(arr[i]);
    }

    // Filter out any empty arrays, only if minimumSize is 0
    if (minimumSize === 0) {
        return result.filter(chunk => chunk.length > 0);
    }

    return result;
};
