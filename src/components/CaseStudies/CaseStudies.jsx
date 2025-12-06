import React, {useContext, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import LanguageContext from '../LanguageContext';
import {caseStudiesData, caseStudyTextContent} from "./CaseStudyData.jsx";
import {staggerContainer, textVariant} from "../../utils/componentUtils.jsx";
import { X, ChevronRight, ExternalLink } from 'lucide-react';

const cyanTheme = {
    borderColor: 'border-cyan-400/10',
    borderHover: 'hover:border-cyan-300',
    outerGlow: 'shadow-[0_0_15px_5px_rgba(34,211,238,0.10)]',
    outerGlowHover: 'hover:shadow-[0_0_25px_8px_rgba(34,211,238,0.15)] hover:bg-cyan-950/20',
};

export const CaseStudyCard = ({caseStudy, index, text, lang, isExpanded, onToggle}) => {
    const hasFullStory = !!caseStudy.fullStory;

    const contentLabels = lang === 'english' ? {
        challenge: "The Challenge",
        solution: "The Solution",
        impact: "The Impact",
        visit: "Visit Project Online"
    } : {
        challenge: "O Desafio",
        solution: "A Solução",
        impact: "O Impacto",
        visit: "Visitar Projeto Online"
    };

    // Helper: Centered Tile Card
    const renderFeatureCard = (feature) => (
        <div className="h-full w-full max-w-[280px] mx-auto bg-black/40 border border-white/10 rounded-xl p-5 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/5 transition-colors">
            <div className="bg-green-900/20 p-3 rounded-xl mb-1 inline-flex items-center justify-center">
                <img src={feature.icon} alt="" className="w-9 h-9 object-contain" />
            </div>
            <div>
                <h5 className="text-green-400 font-bold text-sm leading-tight mb-2">{feature.title}</h5>
                <p className="text-gray-400 text-xs leading-tight opacity-90">{feature.desc}</p>
            </div>
        </div>
    );

    return (
        <motion.div
            layout
            transition={{ layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 } }}
            className={`
                case-study-card relative rounded-2xl overflow-hidden
                bg-[#091011] border-2 transition-colors duration-300 ease-in-out p-5 flex-shrink-0
                ${cyanTheme.borderColor} ${isExpanded ? 'border-cyan-400' : cyanTheme.borderHover}
                ${cyanTheme.outerGlow} ${isExpanded ? 'shadow-[0_0_30px_10px_rgba(34,211,238,0.2)] bg-cyan-950/30' : cyanTheme.outerGlowHover}
                ${isExpanded ? 'w-full md:w-[1000px] z-20' : 'w-[350px] z-0'}
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

            {/* === HEADER === */}
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full mb-6 border-b border-white/10 pb-4 pr-12"
                >
                    <h3 className="text-white font-bold text-[28px] leading-tight mb-1">{caseStudy.title}</h3>
                    <p className="text-green-400 font-medium text-base">{caseStudy.category}</p>
                </motion.div>
            )}

            {/* === EXPANDED CONTENT === */}
            {isExpanded ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col gap-6"
                >
                    {/* GRID LAYOUT MAGIC:
                        Mobile: Uses 'order-x' to group cards (1-3) then text (4-6).
                        Desktop (lg): Uses 'order-none' to revert to grid source order for 50/50 split.
                    */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-3 items-stretch">

                        {/* Headers - Hidden on mobile to save space, shown on desktop */}
                        <div className="hidden lg:block pb-1 text-center lg:order-none">
                            <h4 className="text-white font-semibold text-xs uppercase tracking-wide opacity-60">
                                {text.keyFeatures}
                            </h4>
                        </div>
                        <div className="hidden lg:block lg:order-none"></div>

                        {/* --- ROW 1 --- */}
                        {/* Mobile: Order 1 (First) | Desktop: Auto */}
                        <div className="h-full w-full order-1 lg:order-none">
                            {renderFeatureCard(caseStudy.keyFeatures[0])}
                        </div>
                        {/* Mobile: Order 4 (After cards) | Desktop: Auto */}
                        <div className="flex flex-col justify-center lg:border-l border-white/5 lg:pl-6 py-2 order-4 lg:order-none mt-4 lg:mt-0">
                            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-1 h-4 bg-red-500 rounded-full inline-block"></span>
                                {contentLabels.challenge}
                            </h4>
                            <p className="text-gray-300 leading-snug text-sm">
                                {caseStudy.fullStory?.challenge}
                            </p>
                        </div>

                        {/* --- ROW 2 --- */}
                        {/* Mobile: Order 2 (Second) */}
                        <div className="h-full w-full order-2 lg:order-none">
                            {renderFeatureCard(caseStudy.keyFeatures[1])}
                        </div>
                        {/* Mobile: Order 5 */}
                        <div className="flex flex-col justify-center lg:border-l border-white/5 lg:pl-6 py-2 order-5 lg:order-none">
                            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-1 h-4 bg-blue-500 rounded-full inline-block"></span>
                                {contentLabels.solution}
                            </h4>
                            <p className="text-gray-300 leading-snug text-sm">
                                {caseStudy.fullStory?.solution}
                            </p>
                        </div>

                        {/* --- ROW 3 --- */}
                        {/* Mobile: Order 3 (Third) */}
                        <div className="h-full w-full order-3 lg:order-none">
                            {renderFeatureCard(caseStudy.keyFeatures[2])}
                        </div>
                        {/* Mobile: Order 6 (Last text) */}
                        <div className="flex flex-col justify-center lg:border-l border-white/5 lg:pl-6 py-2 order-6 lg:order-none">
                            <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                                <span className="w-1 h-4 bg-green-500 rounded-full inline-block"></span>
                                {contentLabels.impact}
                            </h4>
                            <p className="text-white font-medium leading-snug text-sm">
                                {caseStudy.fullStory?.impact}
                            </p>
                        </div>
                    </div>

                    {/* --- FULL WIDTH IMAGE --- */}
                    <div className="w-full border-2 border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/50 bg-gray-900 mt-2">
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-auto max-h-[450px] object-cover object-top"
                        />
                    </div>

                    {/* --- CTA BUTTON --- */}
                    <div className="w-full">
                        <a
                            href={caseStudy.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:-translate-y-1"
                        >
                            {contentLabels.visit}
                            <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform"/>
                        </a>
                    </div>
                </motion.div>

            ) : (
                /* === PREVIEW CARD (Unchanged) === */
                <div className="flex flex-col h-full">
                    <motion.div layout className="w-full h-[180px] rounded-lg overflow-hidden mb-4 bg-gray-900">
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </motion.div>
                    <motion.div layout>
                        <h3 className="text-white font-bold text-[24px] leading-tight">{caseStudy.title}</h3>
                        <p className="text-green-400 font-medium text-sm mt-1">{caseStudy.category}</p>
                        <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-secondary text-[13px] leading-[20px] mt-3"
                        >
                            {caseStudy.description}
                        </motion.p>
                    </motion.div>
                    <motion.div layout className="mt-4 mb-auto">
                        <h4 className="text-white font-semibold mb-2 text-xs uppercase tracking-wide opacity-80">
                            {text.keyFeatures}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {typeof caseStudy.keyFeatures[0] === 'object' ?
                                caseStudy.keyFeatures.map((f, i) => (
                                    <span key={i} className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-100 text-[11px] font-medium px-2 py-1 rounded-full">
                                        {f.title}
                                    </span>
                                ))
                                :
                                caseStudy.keyFeatures.map((f, i) => (
                                    <span key={i} className="bg-cyan-900/40 border border-cyan-500/30 text-cyan-100 text-[11px] font-medium px-2 py-1 rounded-full">
                                        {f}
                                    </span>
                                ))
                            }
                        </div>
                    </motion.div>
                    <motion.div className="mt-4 pt-3 border-t border-white/5">
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

const CaseStudiesSection = () => {
    const {selectedFlag} = useContext(LanguageContext);
    const lang = selectedFlag === 'usa' ? 'english' : 'portuguese';
    const text = caseStudyTextContent[lang];

    // Initialize with 0 to start expanded
    const [expandedIndex, setExpandedIndex] = useState(0);

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
                            lang={lang}
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