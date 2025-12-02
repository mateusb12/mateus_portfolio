import React, {useContext, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import LanguageContext from '../LanguageContext';
import {caseStudiesData, caseStudyTextContent} from "./CaseStudyData.jsx";
import {projectsFadeIn, staggerContainer, textVariant} from "../../utils/componentUtils.jsx";
import { X, ChevronRight } from 'lucide-react';

const cyanTheme = {
    borderColor: 'border-cyan-400/10',
    borderHover: 'hover:border-cyan-300',
    outerGlow: 'shadow-[0_0_15px_5px_rgba(34,211,238,0.10)]',
    outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(34,211,238,0.15)] hover:bg-cyan-950/20',
};

export const CaseStudyCard = ({caseStudy, index, text, isExpanded, onToggle}) => {
    const hasFullStory = !!caseStudy.fullStory;

    return (
        <motion.div
            layout
            transition={{ layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 } }}
            className={`
                case-study-card relative rounded-2xl overflow-hidden
                bg-[#091011] border-2 transition-colors duration-300 ease-in-out p-6 flex-shrink-0
                ${cyanTheme.borderColor} ${isExpanded ? 'border-cyan-400' : cyanTheme.borderHover}
                ${cyanTheme.outerGlow} ${isExpanded ? 'shadow-[0_0_30px_10px_rgba(34,211,238,0.2)] bg-cyan-950/30' : cyanTheme.outerGlowHover}
                ${isExpanded ? 'w-full md:w-[900px] z-20' : 'w-[350px] z-0'}
            `}
        >
            <motion.div layout className={`flex ${isExpanded ? 'flex-col md:flex-row gap-8' : 'flex-col h-full'}`}>

                {/* === LEFT COLUMN / TOP === */}
                <div className={`${isExpanded ? 'w-full md:w-1/3' : 'w-full'}`}>
                    <motion.div layout className="w-full h-[180px] rounded-lg overflow-hidden mb-5 bg-gray-900">
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </motion.div>

                    <motion.div layout>
                        <h3 className="text-white font-bold text-[24px] leading-tight">{caseStudy.title}</h3>
                        <p className="text-green-400 font-medium text-md mt-1">{caseStudy.category}</p>
                    </motion.div>

                    {!isExpanded && (
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-secondary text-[14px] leading-[22px] mt-4"
                        >
                            {caseStudy.description}
                        </motion.p>
                    )}

                    {/* === CONDITIONAL FEATURES RENDERING === */}
                    <motion.div layout className="mt-5">
                        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide opacity-80">
                            {text.keyFeatures}
                        </h4>

                        {/* Check if the features are complex Objects (New Style) or simple Strings (Old Style) */}
                        {typeof caseStudy.keyFeatures[0] === 'object' ? (
                            // NEW STYLE: Vertical Stack of Cards (Matches your Screenshot)
                            <div className="flex flex-col gap-3">
                                {caseStudy.keyFeatures.map((feature, idx) => (
                                    <div key={idx} className="bg-black/40 border border-green-500/30 rounded-lg p-3 flex flex-col items-center text-center">
                                        <img src={feature.icon} alt="" className="w-10 h-10 mb-2 object-contain" />
                                        <h5 className="text-green-400 font-bold text-sm leading-tight mb-1">{feature.title}</h5>
                                        <p className="text-gray-400 text-xs leading-tight">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // OLD STYLE: Simple Chips (For projects without icons yet)
                            <div className="flex flex-wrap gap-2">
                                {caseStudy.keyFeatures.map((feature, idx) => (
                                    <span key={idx}
                                          className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-100 text-xs font-medium px-3 py-1.5 rounded-full">
                                    {feature}
                                </span>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {!isExpanded && (
                        <motion.div className="mt-6 pt-4 border-t border-white/5">
                            <button
                                onClick={onToggle}
                                disabled={!hasFullStory}
                                className={`text-sm font-bold flex items-center gap-2 transition-colors ${
                                    hasFullStory ? 'text-white hover:text-cyan-400 cursor-pointer' : 'text-gray-600 cursor-not-allowed'
                                }`}
                            >
                                {text.readStory} <ChevronRight size={16} />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* === EXPANDED CONTENT === */}
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="w-full md:w-2/3 flex flex-col border-l border-white/10 md:pl-8 pl-0 md:pt-0 pt-6 border-t md:border-t-0"
                    >
                        <div className="flex justify-end mb-2">
                            <button
                                onClick={onToggle}
                                className="text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition"
                                title={text.closeStory}
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            {/* Short Description in Expanded view */}
                            <p className="text-gray-400 italic border-l-2 border-cyan-500 pl-4">
                                {caseStudy.description}
                            </p>

                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-red-500 rounded-full inline-block"></span>
                                    {caseStudyTextContent[text === caseStudyTextContent.english ? 'english' : 'portuguese'].items[0].fullStory?.challenge ? "O Desafio" : "The Challenge"}
                                    {/* Note: In production, better to use text labels passed from prop */}
                                </h4>
                                <p className="leading-relaxed">{caseStudy.fullStory?.challenge}</p>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-blue-500 rounded-full inline-block"></span>
                                    {caseStudyTextContent[text === caseStudyTextContent.english ? 'english' : 'portuguese'].items[0].fullStory?.solution ? "A Solução" : "The Solution"}
                                </h4>
                                <p className="leading-relaxed">{caseStudy.fullStory?.solution}</p>
                            </div>

                            <div>
                                <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                    <span className="w-2 h-8 bg-green-500 rounded-full inline-block"></span>
                                    {caseStudyTextContent[text === caseStudyTextContent.english ? 'english' : 'portuguese'].items[0].fullStory?.impact ? "O Impacto" : "The Impact"}
                                </h4>
                                <p className="leading-relaxed text-white font-medium bg-green-900/20 p-4 rounded-lg border border-green-500/30">
                                    {caseStudy.fullStory?.impact}
                                </p>
                            </div>
                        </div>

                        <div className="mt-auto pt-8 flex justify-end">
                            <a
                                href={caseStudy.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-bold transition shadow-lg shadow-cyan-500/20"
                            >
                                Visitar Projeto Online
                            </a>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

// ... CaseStudiesSection and export remain the same as your original file
const CaseStudiesSection = () => {
    const {selectedFlag} = useContext(LanguageContext);
    const lang = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const text = caseStudyTextContent[lang];

    const [expandedIndex, setExpandedIndex] = useState(null);

    const mergedData = caseStudiesData.map((caseStudy, index) => ({
        ...caseStudy,
        ...text.items[index],
    }));

    const handleToggle = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

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

            <div className="mt-12 flex flex-wrap justify-center gap-6 pb-8 px-4">
                <AnimatePresence>
                    {mergedData.map((cs, i) => (
                        <CaseStudyCard
                            key={i}
                            caseStudy={cs}
                            index={i}
                            text={text}
                            isExpanded={expandedIndex === i}
                            onToggle={() => handleToggle(i)}
                        />
                    ))}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default (props) => (
    <motion.section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{once: true, amount: 0.1}}
        className={`max-w-7xl mx-auto relative z-0 py-10`}
        {...props}
    >
        <CaseStudiesSection/>
    </motion.section>
);