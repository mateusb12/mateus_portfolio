import React, {useContext, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import LanguageContext from '../LanguageContext';
import {caseStudiesData, caseStudyTextContent} from "./CaseStudyData.jsx";
import {staggerContainer, textVariant} from "../../utils/componentUtils.jsx";
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
                ${isExpanded ? 'w-full md:w-[1100px] z-20' : 'w-[350px] z-0'}
            `}
        >
            {/* === ABSOLUTE CLOSE BUTTON === */}
            {isExpanded && (
                <button
                    onClick={onToggle}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 hover:bg-white/10 rounded-full transition z-50"
                    title={text.closeStory}
                >
                    <X size={24} />
                </button>
            )}

            {/* === FULL WIDTH HEADER (Title & Category) === */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full mb-6 border-b border-white/10 pb-4 pr-12"
                >
                    <h3 className="text-white font-bold text-[32px] leading-tight mb-1">{caseStudy.title}</h3>
                    <p className="text-green-400 font-medium text-lg">{caseStudy.category}</p>
                </motion.div>
            )}

            {/* === CONTENT BODY === */}
            {isExpanded ? (
                /* === 3-COLUMN EXPANDED LAYOUT === */
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col lg:flex-row gap-8"
                >
                    {/* --- COLUMN 1: FEATURES (Left) --- */}
                    <div className="lg:w-[25%] flex-shrink-0 border-r border-white/5 pr-6">
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide opacity-80">
                            {text.keyFeatures}
                        </h4>
                        <div className="flex flex-col gap-3">
                            {typeof caseStudy.keyFeatures[0] === 'object' ? (
                                caseStudy.keyFeatures.map((feature, idx) => (
                                    <div key={idx} className="bg-black/40 border border-green-500/30 rounded-lg p-3 flex flex-col items-center text-center hover:bg-green-900/10 transition-colors">
                                        <img src={feature.icon} alt="" className="w-10 h-10 mb-2 object-contain" />
                                        <h5 className="text-green-400 font-bold text-sm leading-tight mb-1">{feature.title}</h5>
                                        <p className="text-gray-400 text-xs leading-tight">{feature.desc}</p>
                                    </div>
                                ))
                            ) : (
                                // Fallback for old data structure
                                caseStudy.keyFeatures.map((feature, idx) => (
                                    <span key={idx} className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-100 text-sm font-medium px-3 py-2 rounded-lg text-center">
                                        {feature}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>

                    {/* --- COLUMN 2: STORY (Middle) --- */}
                    <div className="lg:w-[45%] flex flex-col space-y-6 text-gray-300 pr-2">
                        {/* Challenge */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-2 h-6 bg-red-500 rounded-full inline-block"></span>
                                {caseStudyTextContent[text === caseStudyTextContent.english ? 'english' : 'portuguese'].items[0].fullStory?.challenge ? "O Desafio" : "The Challenge"}
                            </h4>
                            <p className="leading-relaxed text-sm lg:text-[15px]">{caseStudy.fullStory?.challenge}</p>
                        </div>

                        {/* Solution */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span>
                                {caseStudyTextContent[text === caseStudyTextContent.english ? 'english' : 'portuguese'].items[0].fullStory?.solution ? "A Solução" : "The Solution"}
                            </h4>
                            <p className="leading-relaxed text-sm lg:text-[15px]">{caseStudy.fullStory?.solution}</p>
                        </div>

                        {/* Impact */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-2 h-6 bg-green-500 rounded-full inline-block"></span>
                                {caseStudyTextContent[text === caseStudyTextContent.english ? 'english' : 'portuguese'].items[0].fullStory?.impact ? "O Impacto" : "The Impact"}
                            </h4>
                            <p className="leading-relaxed text-white font-medium bg-green-900/20 p-4 rounded-lg border border-green-500/30 text-sm lg:text-[15px]">
                                {caseStudy.fullStory?.impact}
                            </p>
                        </div>

                        <div className="pt-4 mt-auto">
                            <a
                                href={caseStudy.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg shadow-cyan-500/20"
                            >
                                Visitar Projeto Online
                            </a>
                        </div>
                    </div>

                    {/* --- COLUMN 3: SCREENSHOT (Right) --- */}
                    <div className="lg:w-[30%] flex flex-col">
                        <div className="sticky top-4 border-2 border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50 bg-gray-900">
                            <img
                                src={caseStudy.image}
                                alt={caseStudy.title}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </motion.div>

            ) : (
                /* === NON-EXPANDED PREVIEW LAYOUT (Single Column) === */
                <div className="flex flex-col h-full">
                    {/* Image */}
                    <motion.div layout className="w-full h-[180px] rounded-lg overflow-hidden mb-5 bg-gray-900">
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </motion.div>

                    {/* Info */}
                    <motion.div layout>
                        <h3 className="text-white font-bold text-[24px] leading-tight">{caseStudy.title}</h3>
                        <p className="text-green-400 font-medium text-md mt-1">{caseStudy.category}</p>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-secondary text-[14px] leading-[22px] mt-4"
                        >
                            {caseStudy.description}
                        </motion.p>
                    </motion.div>

                    {/* Simple Features Chips */}
                    <motion.div layout className="mt-5 mb-auto">
                        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide opacity-80">
                            {text.keyFeatures}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {/* Always render simple chips in preview mode, even if data is complex */}
                            {typeof caseStudy.keyFeatures[0] === 'object' ?
                                caseStudy.keyFeatures.map((f, i) => (
                                    <span key={i} className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-100 text-xs font-medium px-3 py-1.5 rounded-full">
                                        {f.title}
                                    </span>
                                ))
                                :
                                caseStudy.keyFeatures.map((f, i) => (
                                    <span key={i} className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-100 text-xs font-medium px-3 py-1.5 rounded-full">
                                        {f}
                                    </span>
                                ))
                            }
                        </div>
                    </motion.div>

                    {/* Read More Button */}
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
                </div>
            )}
        </motion.div>
    );
};

// ... CaseStudiesSection and export remain unchanged
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