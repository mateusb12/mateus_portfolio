import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import {motion} from 'framer-motion';

import 'react-vertical-timeline-component/style.min.css';

import pontotel from "../../assets/img/experience_icons/pontotel.png"
import python from "../../assets/img/skills_icons/python.png"
import flask from "../../assets/img/skills_icons/flask.png"
import celery from "../../assets/img/skills_icons/celery.png"
import fastapi from "../../assets/img/skills_icons/fastapi.svg"
import pytest from "../../assets/img/skills_icons/pytest.svg"
import linux from "../../assets/img/skills_icons/linux.png"
import docker from "../../assets/img/skills_icons/docker.png"
import kubernetes from "../../assets/img/skills_icons/kubernetes.svg"
import postgres from "../../assets/img/skills_icons/postgres.png"
import mongo from "../../assets/img/skills_icons/mongo.svg"
import tilt from "../../assets/img/skills_icons/tilt.png"
import blender from "../../assets/img/skills_icons/blender.svg"
import csharp from "../../assets/img/skills_icons/csharp.svg"
import unity from "../../assets/img/skills_icons/unity.svg"
import freelancer from "../../assets/img/experience_icons/freelancer.png"
import react from "../../assets/img/skills_icons/react.png"
import websocket from "../../assets/img/skills_icons/websocket.svg"
import startup from "../../assets/img/experience_icons/startup.svg"
import swagger from "../../assets/img/skills_icons/swagger.svg"
import google_cloud from "../../assets/img/skills_icons/google-cloud.png"
import aws from "../../assets/img/skills_icons/aws.png"
import dialogflow from "../../assets/img/skills_icons/dialogflow.svg"
import redis from "../../assets/img/skills_icons/redis.svg";
import insane from "../../assets/img/experience_icons/insane.png";
import selenium from "../../assets/img/skills_icons/selenium.svg";
import pandas from "../../assets/img/skills_icons/pandas.png";
import React, {forwardRef, useContext, useEffect, useRef, useState} from "react";
import LanguageContext from "../LanguageContext.jsx";

const textContent = {
    english: {
        sectionTitle: 'Experiences',
        experiences: {
            pontotel: {
                title: 'Backend Developer',
                company: 'Pontotel',
                date: 'Mar 2025 - Jun 2025',
                points: [
                    'Built Google Cloud scripts to handle urgent client demands, ensuring no wait on unavailable main system features',
                    'Refactored critical legacy validations into DDD-driven DTOs and domain classes, improving codebase data integrity',
                    'Developed Excel importers with pre-validation, type conversion, and integration tests, preventing inconsistent data entries',
                    'Created internal REST API for calendar monitoring with MongoDB metrics, enhancing observability and reliability'
                ]
            },
            startup: {
                title: 'Backend Lead',
                company: 'Omnichat Startup',
                date: 'Feb 2024 - Jun 2024',
                points: [
                    'Led backend sprints and task distribution with Scrum, mentoring team members and speeding up efficient deliveries',
                    'Built Flask microservices REST APIs with JWT auth, increasing application resilience and security',
                    'Managed and optimized PostgreSQL via ORM modeling, ensuring data integrity',
                    'Configured webhooks and CI with React frontend, improving real-time chatbot sync'
                ]
            },
            freelancer: {
                title: 'Freelancer Developer',
                company: 'Independent Projects',
                date: 'Aug 2024 - Present',
                points: [
                    'Automated lead qualification between HubSpot and IA Social with Python scripts, eliminating manual tasks',
                    'Implemented automated login and platform integrations, reducing response time and operational errors',
                    'Developed validated web forms with automatic PDF generation for service orders, standardizing client communication',
                    'Created Excel table cross-check scripts with automated CPF scraping on Claro site, generating qualified leads'
                ]
            },
            insane: {
                title: 'Intern',
                company: 'Insane Games',
                date: 'Jul 2021 - Feb 2022',
                points: [
                    'Developed backend systems for Unity games using C#',
                    'Collaborated with Game Design and Audio teams on multidisciplinary projects',
                    'Managed Tech Art asset pipeline in Blender from creation to Unity import',
                    'Handled intermediate steps like UV mapping and shader creation, ensuring product quality'
                ]
            }
        }
    },
    portuguese: {
        sectionTitle: 'Experiências',
        experiences: {
            pontotel: {
                title: 'Desenvolvedor Backend',
                company: 'Pontotel',
                date: 'Mar 2025 - Jun 2025',
                points: [
                    'Implementei scripts via Google Cloud para atender demandas urgentes de clientes, garantindo que o cliente não precisasse aguardar por funcionalidades indisponíveis',
                    'Refatorei validações críticas de código legado usando DTOs e DDD, melhorando a integridade dos dados',
                    'Desenvolvi importadores Excel com pré-validação, conversão de tipo e testes de integração, evitando dados inconsistentes',
                    'Criei API REST interna para monitoramento de calendário com métricas do MongoDB, garantindo observabilidade e confiabilidade'
                ]
            },
            startup: {
                title: 'Backend Lead',
                company: 'Omnichat Startup',
                date: 'Fev 2024 - Jun 2024',
                points: [
                    'Coordenei sprints backend e tarefas com Scrum, mentorando a equipe e otimizando entregas',
                    'Desenvolvi APIs RESTful em Flask com microsserviços e JWT, aumentando resiliência e segurança',
                    'Gerenciei e otimizei PostgreSQL via ORM, garantindo integridade dos dados',
                    'Configurei webhooks e CI com React, melhorando sincronização em tempo real do chatbot'
                ]
            },
            freelancer: {
                title: 'Desenvolvedor Freelancer',
                company: 'Projetos Independentes',
                date: 'Ago 2024 - Atualmente',
                points: [
                    'Automatizei qualificação de leads entre HubSpot e IA Social com scripts Python, eliminando tarefas manuais',
                    'Implementei login automatizado e integrações entre plataformas, reduzindo tempo de resposta e erros',
                    'Desenvolvi formulário web validado e geração automática de PDF para ordens de serviço, padronizando atendimento',
                    'Criei script de cruzamento de tabelas Excel com scraping de CPF no site da Claro, gerando leads qualificados'
                ]
            },
            insane: {
                title: 'Estagiário',
                company: 'Insane Games',
                date: 'Jul 2021 - Fev 2022',
                points: [
                    'Desenvolvi sistemas backend para jogos em Unity com C#',
                    'Colaborei com Game Design e Áudio em projetos multidisciplinares',
                    'Gerenciei pipeline de assets Tech Art no Blender até import no Unity',
                    'Responsável por mapeamento UV e criação de shaders, garantindo qualidade'
                ]
            }
        }
    }
};

const baseExperiences = [
    {
        key: 'pontotel', icon: pontotel, iconBg: '#000000', skills: [
            {icon: python, name: 'Python'}, {icon: flask, name: 'Flask'}, {
                icon: fastapi,
                name: 'FastAPI'
            }, {icon: celery, name: 'Celery'},
            {icon: pytest, name: 'Pytest'}, {icon: linux, name: 'Linux'}, {
                icon: docker,
                name: 'Docker'
            }, {icon: kubernetes, name: 'Kubernetes'},
            {icon: tilt, name: 'Tilt'}, {icon: postgres, name: 'PostgreSQL'}, {
                icon: mongo,
                name: 'MongoDB'
            }, {icon: redis, name: 'Redis'},
            {icon: google_cloud, name: 'Google Cloud'}
        ]
    },
    {
        key: 'startup', icon: startup, iconBg: '#000000', skills: [
            {icon: python, name: 'Python'}, {icon: flask, name: 'Flask'}, {
                icon: websocket,
                name: 'Webhook'
            }, {icon: swagger, name: 'Swagger'},
            {icon: dialogflow, name: 'Dialog Flow'}, {icon: react, name: 'React'}, {
                icon: docker,
                name: 'Docker'
            }, {icon: postgres, name: 'PostgreSQL'},
            {icon: aws, name: 'AWS'}
        ]
    },
    {
        key: 'freelancer', icon: freelancer, iconBg: '#000000', skills: [
            {icon: python, name: 'Python'}, {icon: selenium, name: 'Selenium'}, {icon: pandas, name: 'Pandas'}
        ]
    },
    {
        key: 'insane', icon: insane, iconBg: '#000000', skills: [
            {icon: csharp, name: 'C#'}, {icon: unity, name: 'Unity'}, {icon: blender, name: 'Blender'}
        ]
    }
];

const styles = {
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-16 py-10",

    heroHeadText: "font-black text-white lg:text-[72px] sm:text-[48px] xs:text-[36px] text-[28px] lg:leading-[80px] sm:leading-[56px] xs:leading-[44px] leading-[36px] mt-2",

    heroSubText: "text-gray-100 font-medium italic lg:text-[28px] sm:text-[22px] xs:text-[18px] text-[16px] lg:leading-[40px] sm:leading-[28px] xs:leading-[24px] leading-[22px]",

    heroDescriptionText: "text-gray-200 font-normal lg:text-[20px] sm:text-[18px] xs:text-[16px] text-[16px] lg:leading-[32px] sm:leading-[28px] xs:leading-[26px] leading-[24px]",

    sectionHeadText: "text-white font-black md:text-[50px] sm:text-[40px] xs:text-[30px] text-[24px]",
    sectionSubText: "sm:text-[16px] text-[12px] text-secondary uppercase tracking-wider",

    transformDown: "transform translate-y-16",
};

export const staggerContainer = (staggerChildren, delayChildren) => {
    return {
        hidden: {},
        show: {
            transition: {
                staggerChildren: staggerChildren,
                delayChildren: delayChildren || 0,
            },
        },
    };
};

const SectionWrapper = (Component, idName) =>
    function HOC() {
        return (
            <motion.section
                variants={staggerContainer()}
                initial="hidden"
                whileInView="show"
                viewport={{once: true, amount: 0.25}}
                className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
            >
            <span className="hash-span" id={idName}>
                &nbsp;
            </span>
                <Component/>
            </motion.section>
        )
    }

const ExperienceCard = forwardRef(({ experience, active }, ref) => {
    /* ─ renderSkillRows unchanged ─ */
    const renderSkillRows = () => {
        const skills = experience.skills || [];
        if (!skills.length) return null;

        if (skills.length > 8) {
            const half = Math.ceil(skills.length / 2);
            const rows = [skills.slice(0, half), skills.slice(half)];
            return rows.map((row, rowIndex) => (
                <div key={rowIndex} className="mt-3 flex justify-center w-full gap-2">
                    {row.map((skill, idx) => (
                        <div key={idx} className="relative group">
                            <img
                                src={skill.icon}
                                alt={`${skill.name} icon`}
                                className="h-11 w-11 object-contain transition-transform duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                            />
                            <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {skill.name}
              </span>
                        </div>
                    ))}
                </div>
            ));
        }

        return (
            <div className="mt-7 flex flex-wrap justify-center w-full gap-2">
                {skills.map((skill, idx) => (
                    <div key={idx} className="relative group">
                        <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            className="h-11 w-11 object-contain transition-transform duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                        />
                        <span className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {skill.name}
            </span>
                    </div>
                ))}
            </div>
        );
    };

    /* ───────────────────────── main render ───────────────────────── */
    return (
        <VerticalTimelineElement
            ref={ref}
            date={
                <span className="hidden md:block mx-2 text-[17px] text-gray-300 font-semibold">
        {experience.date}
      </span>
            }
            contentStyle={{
                backgroundColor: "#071a1a",
                backdropFilter: "blur(1rem)",
                WebkitBackdropFilter: "blur(1rem)",
                color: "#fff",
                borderRadius: "0.75rem",
                border: active ? "3px solid #22c55e" : "3px solid transparent",
                boxShadow: "none",
            }}
            contentArrowStyle={{ borderRight: "15px solid  #FFFFFF" }}
            iconStyle={{
                background: experience.iconBg,
                border: active ? "3px solid #22c55e" : "3px solid transparent",
                transition: "border 200ms ease",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            icon={
                <div className="relative w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full overflow-hidden -translate-x-1/2 left-1/2 absolute top-0">
                    <img
                        src={experience.icon}
                        alt={experience.company_name}
                        draggable={false}
                        className="absolute top-1/2 left-1/2 w-[130%] h-[130%] md:w-[160%] md:h-[160%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                    />
                </div>
            }
        >
            <div ref={ref} className="mt-[-12px]">
                <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
                <p
                    className="text-secondary text-[22px] font-semibold underline"
                    style={{ margin: 0 }}
                >
                    {experience.company_name}
                </p>
                <span className="block md:hidden text-[14px] text-gray-300 font-semibold">
        {experience.date}
      </span>
            </div>

            <ul className="mt-5 list-disc ml-5 space-y-2">
                {experience.points.map((point, index) => (
                    <li
                        key={`experience-point-${index}`}
                        className="text-white-100 font-thin text-[14px] pl-1 tracking-wider"
                    >
                        {point}
                    </li>
                ))}
            </ul>

            {renderSkillRows()}
        </VerticalTimelineElement>
    );
});


const Experience = () => {
    const { selectedFlag } = useContext(LanguageContext);
    const lang = selectedFlag === "usa" ? "english" : "portuguese";
    const { sectionTitle, experiences } = textContent[lang];

    const items = baseExperiences.map((base) => ({
        ...base,
        ...experiences[base.key],
    }));

    const [activeIdx, setActiveIdx] = useState(0); // Start with the first card active

    const cardRefs = useRef([]);
    if (cardRefs.current.length !== items.length) {
        cardRefs.current = items.map(() => React.createRef());
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                let mostVisibleEntry = null;
                let maxRatio = 0;

                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisibleEntry = entry;
                    }
                });

                if (mostVisibleEntry) {
                    const idx = cardRefs.current.findIndex(
                        (ref) => ref.current === mostVisibleEntry.target
                    );
                    if (idx !== -1) {
                        setActiveIdx(idx);
                    }
                }
            },
            {
                threshold: Array.from({ length: 101 }, (_, i) => i / 100), // More granular threshold
                rootMargin: '0px 0px -30% 0px' // Activate when the card is in the top half of the viewport
            }
        );

        cardRefs.current.forEach((ref) => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
            cardRefs.current.forEach((ref) => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, [items]);

    return (
        <>
            <motion.div>
                <h2 className={styles.sectionHeadText}>{sectionTitle}</h2>
            </motion.div>

            <VerticalTimeline layout="2-columns" className="mt-20 flex flex-col">
                {items.map((exp, idx) => (
                    <ExperienceCard
                        key={exp.key}
                        ref={cardRefs.current[idx]}
                        experience={exp}
                        active={idx === activeIdx}
                    />
                ))}
            </VerticalTimeline>
        </>
    );
};

export default SectionWrapper(Experience, "experience")