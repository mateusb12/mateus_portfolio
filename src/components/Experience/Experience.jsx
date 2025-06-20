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

const experiences = [
    //COPY PASTE FOR NEW EXPERIENCE - AFTER {},
    /*
    {
        title: "TITLE HERE",
        company_name: "COMPANY NAME HERE",
        icon: icon_name_here,
        iconBg: "#383E56",
        date: "Month YearStart - Month YearEnd",
        points: [
            "Bulletpoint 1",
            "Bulletpoint 2",
            "Bulletpoint 3",
            "Bulletpoint 4",
        ],
    },
    */
    {
        title: "Desenvolvedor Backend",
        company_name: "Pontotel",
        icon: pontotel,
        iconBg: "#000000",
        date: "Mar 2025 - Jun 2025",
        spanStyle: "font-semibold text-[15px]",
        points: [
            "Implementei scripts via Google Cloud para atender demandas urgentes de clientes, <span>garantindo que o cliente não precisasse aguardar por funcionalidades ainda indisponíveis no sistema principal</span>",
            "Refatorei validações críticas de código legado para a nova arquitetura, utilizando DTOs, classes de validação e integração de domínio, <span>sempre seguindo o Domain Driven Development (DDD) e melhorando a integridade dos dados na base de código</span>",
            "Desenvolvi importadores com processos de pré-validação a partir de planilhas Excel, conversores de tipo e testes de integração, <span>evitando o registro de dados inconsistentes no banco de dados</span>",
            "Criei uma API restful interna para monitoramento de calendário com métricas extraídas do MongoDB, utilizando unidade de trabalho e cobertura de testes, <span>garantindo a observabilidade e confiabilidade do componente</span>",
        ],
        skills: [
            {icon: python, name: "Python"},
            {icon: flask, name: "Flask"},
            {icon: fastapi, name: "FastAPI"},
            {icon: celery, name: "Celery"},
            {icon: pytest, name: "Pytest"},
            {icon: linux, name: "Linux"},
            {icon: docker, name: "Docker"},
            {icon: kubernetes, name: "Kubernetes"},
            {icon: tilt, name: "Tilt"},
            {icon: postgres, name: "PostgreSQL"},
            {icon: mongo, name: "MongoDB"},
            {icon: redis, name: "Redis"},
            {icon: google_cloud, name: "Google Cloud"},
        ]
    },
    {
        title: "Backend Lead",
        company_name: "Omnichat Startup",
        icon: startup,
        iconBg: "#000000",
        date: "Feb 2024 - Jun 2024",
        spanStyle: "font-semibold text-[15px]",
        points: [
            "Coordenei os sprints da equipe de backend e distribuí as tarefas utilizando Scrum. Fiz mentoria e code review dos membros da equipe, <span>resultando em entregas mais rápidas e eficientes</span>",
            "Desenvolvi APIs RESTful em Flask com arquitetura de microsserviços e autenticação via tokens JWT, <span>aumentando a resiliência e segurança da aplicação como um todo</span>",
            "Fiz a gestão e a otimização do banco de dados PostgreSQL, incluindo modelagem via ORM, <span>garantindo a integridade dos dados</span>",
            "Configurei webhooks e integração contínua com o frontend em React, <span>melhorando a sincronização em tempo real do chatbot</span>"
        ],
        skills: [
            {icon: python, name: "Python"},
            {icon: flask, name: "Flask"},
            {icon: websocket, name: "Webhook"},
            {icon: swagger, name: "Swagger"},
            {icon: dialogflow, name: "Dialog Flow"},
            {icon: react, name: "React"},
            {icon: docker, name: "Docker"},
            {icon: postgres, name: "PostgreSQL"},
            {icon: aws, name: "AWS"},
        ]
    },
    {
        title: "Desenvolvedor Freelancer",
        company_name: "Projetos Independentes",
        icon: freelancer,
        iconBg: "#000000",
        date: "Ago 2024 - Atualmente",
        spanStyle: "font-semibold text-[15px]",
        points: [
            "Automatizei o fluxo de qualificação de leads entre HubSpot e IA Social com scripts Python, <span>eliminando tarefas manuais e acelerando a comunicação via WhatsApp</span>",
            "Implementei login automatizado e integração entre plataformas, <span>reduzindo o tempo de resposta e os erros operacionais no processo comercial</span>",
            "Desenvolvi um sistema de ordens de serviço com formulário web validado e geração automática de PDF, <span>padronizando o atendimento e profissionalizando a comunicação com o cliente</span>",
            "Criei um script para cruzamento de tabelas Excel com scraping automatizado de CPF no site da Claro, <span>permitindo identificar clientes ativos e gerar leads qualificados</span>"
        ],
        skills: [
            {icon: python, name: "Python"},
            {icon: selenium, name: "Selenium"},
            {icon: pandas, name: "Pandas"},
        ]
    },
    {
        title: "Estagiário",
        company_name: "Insane Games",
        icon: insane,
        iconBg: "#000000",
        date: "Jul 2021 - Fev 2022",
        points: [
            "Desenvolvi sistemas backend para jogos em Unity utilizando C#",
            "Colaborei com as equipes de Game Design e Áudio em projetos multidisciplinares",
            "Fiz a gestão do processo de produção de assets na área de Tech Art usando Blender, desde a criação até a importação final no Unity",
            "Fui responsável por etapas intermediárias como mapeamento UV e shaders, garantindo a qualidade do produto"
        ],
        skills: [
            {icon: csharp, name: "C#"},
            {icon: unity, name: "Unity"},
            {icon: blender, name: "Blender"}
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

const ExperienceCard = ({experience}) => {
    // Split skills into two rows if more than 8
    const renderSkillRows = () => {
        if (!Array.isArray(experience.skills) || experience.skills.length === 0) return null;
        const skills = experience.skills;
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
                            <span
                                className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {skill.name}
              </span>
                        </div>
                    ))}
                </div>
            ));
        }
        // For 8 or fewer skills, render a single row
        return (
            <div className="mt-7 flex flex-wrap justify-center w-full gap-2">
                {skills.map((skill, idx) => (
                    <div key={idx} className="relative group">
                        <img
                            src={skill.icon}
                            alt={`${skill.name} icon`}
                            className="h-11 w-11 object-contain transition-transform duration-200 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                        />
                        <span
                            className="pointer-events-none absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {skill.name}
            </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <VerticalTimelineElement
            contentStyle={{
                backgroundColor: '#071a1a',
                backdropFilter: 'blur(1rem)',
                WebkitBackdropFilter: 'blur(1rem)',
                color: '#fff',
                borderRadius: '0.75rem',
                boxShadow: 'none'
            }}
            contentArrowStyle={{borderRight: '15px solid  #FFFFFF'}}
            // date={experience.date}
            iconStyle={{background: experience.iconBg}}
            icon={
                <div className="relative w-full h-full overflow-hidden rounded-full z-10">
                    <img
                        src={experience.icon}
                        alt={experience.company_name}
                        draggable={false}
                        className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 object-contain pointer-events-none select-none"
                    />
                </div>
            }
        >
            <div>
                <h3 className="text-white text-[24px] font-bold">
                    {experience.title}
                </h3>
                <p className="text-secondary text-[22px] font-semibold underline" style={{margin: 0}}>
                    {experience.company_name}
                </p>
                <span className="block text-[13px] text-gray-300 font-semibold mt-1">
        {experience.date}
    </span>
            </div>

            <ul className="mt-5 list-disc ml-5 space-y-2">
                {experience.points.map((point, index) => {
                    const [before, highlight, after] = point.split(/<span>|<\/span>/);
                    return (
                        <li
                            key={`experience-point-${index}`}
                            className="text-white-100 font-thin text-[14px] pl-1 tracking-wider"
                        >
                            {before}
                            {highlight && (
                                <span className={experience.spanStyle}>{highlight}</span>
                            )}
                            {after}
                        </li>
                    );
                })}
            </ul>

            {renderSkillRows()}
        </VerticalTimelineElement>
    );
};

const Experience = () => {
    return (
        <>
            <motion.div>
                <h2 className={styles.sectionHeadText}>Experiências</h2>
            </motion.div>
            <div className="mt-20 flex flex-col">
                <VerticalTimeline>
                    {experiences.map((experience, index) => (
                        <ExperienceCard key={index} experience={experience}/>
                    ))}
                </VerticalTimeline>
            </div>
        </>
    )
}

export default SectionWrapper(Experience, "experience")