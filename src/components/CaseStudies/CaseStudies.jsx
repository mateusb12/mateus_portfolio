// src/components/CaseStudies/CaseStudies.jsx

import React, {useContext} from 'react';
import {motion} from 'framer-motion';
import LanguageContext from '../LanguageContext';
import {caseStudiesData, caseStudyTextContent} from "./CaseStudyData.jsx";
import './CaseStudies.css';
import {projectsFadeIn, staggerContainer, textVariant} from "../../utils/componentUtils.jsx"; // We will create this file for specific styles

// Blue/Cyan glow theme to match the screenshot
const cyanTheme = {
    borderColor: 'border-cyan-400/10',
    borderHover: 'hover:border-cyan-300',
    outerGlow: 'shadow-[0_0_15px_5px_rgba(34,211,238,0.10)]',
    outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(34,211,238,0.15)] hover:bg-cyan-950/20',
};

const styles = {
    padding: 'sm:px-16 px-6 sm:py-16 py-10',
};


export const CaseStudyCard = ({caseStudy, index, text}) => {
    return (
        <motion.div
            variants={projectsFadeIn('up', 'spring', 0.2 * index)}
            className={`
                case-study-card flex-shrink-0 w-[350px] rounded-2xl overflow-hidden
                bg-[#091011] border-2 transition-all duration-300 ease-in-out p-6
                ${cyanTheme.borderColor} ${cyanTheme.borderHover}
                ${cyanTheme.outerGlow} ${cyanTheme.outerGlowHover}
            `}
        >
            {/* Image */}
            <div className="w-full h-[180px] rounded-lg overflow-hidden mb-5">
                <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
                <h3 className="text-white font-bold text-[24px]">{caseStudy.title}</h3>
                <p className="text-green-400 font-medium text-md mt-1">{caseStudy.category}</p>
                <p className="text-secondary text-[14px] leading-[22px] mt-4">{caseStudy.description}</p>

                <div className="mt-5">
                    <h4 className="text-white font-semibold mb-3">{text.keyFeatures}</h4>
                    <div className="flex flex-wrap gap-2">
                        {caseStudy.keyFeatures.map((feature) => (
                            <span key={feature}
                                  className="bg-gray-800/60 text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full">
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-auto pt-6">
                    <a
                        href={caseStudy.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="read-story-btn"
                    >
                        {text.readStory}
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

const CaseStudiesSection = () => {
    const {selectedFlag} = useContext(LanguageContext);
    const lang = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const text = caseStudyTextContent[lang];

    const mergedData = caseStudiesData.map((caseStudy, index) => ({
        ...caseStudy,
        ...text.items[index],
    }));

    return (
        <section id="case-studies">
            <motion.div variants={textVariant()} className="text-center mb-12">
                <h2 className="text-white font-black md:text-[40px] sm:text-[30px] text-[24px]">
                    {text.sectionTitle}
                </h2>
                <p className="text-secondary text-[16px] mt-2">
                    {text.sectionSubtitle}
                </p>
            </motion.div>

            {/* Carousel Container */}
            <div className="mt-12 flex justify-center overflow-x-auto gap-8 pb-8 hide-scrollbar">
                {mergedData.map((cs, i) => (
                    <CaseStudyCard key={i} caseStudy={cs} index={i} text={text} />
                ))}
            </div>
        </section>
    );
};

// HOC wrapper for animations
export default (props) => (
    <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{once: true, amount: 0.25}}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        {...props}
    >
        <CaseStudiesSection/>
    </motion.section>
);