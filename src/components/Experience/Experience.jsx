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
import html from "../../assets/img/skills_icons/html.png"
import css from "../../assets/img/skills_icons/css.png"
import sql from "../../assets/img/skills_icons/sql.png"
import git from "../../assets/img/skills_icons/git.png"

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
    //EXP-VERTEBRA
    {
        title: "Desenvolvedor Backend",
        company_name: "Pontotel",
        icon: pontotel,
        iconBg: "#000000",
        date: "Jan 2023 - Apr 2024",
        spanStyle: "font-semibold text-[15px]",
        points: [
            "Implementei scripts via Google Cloud para atender demandas urgentes de clientes, <span>garantindo que o cliente não precisasse aguardar por funcionalidades ainda indisponíveis no sistema principal</span>",
            "Refatorei validações críticas de código legado para a nova arquitetura, utilizando DTOs, classes de validação e integração de domínio, <span>sempre seguindo o Domain Driven Development (DDD) e melhorando a integridade dos dados na base de código</span>",
            "Desenvolvi importadores com processos de pré-validação a partir de planilhas Excel, conversores de tipo e testes de integração, <span>evitando o registro de dados inconsistentes no banco de dados</span>",
            "Criei uma API restful interna para monitoramento de calendário com métricas extraídas do MongoDB, utilizando unidade de trabalho e cobertura de testes, <span>garantindo a observabilidade e confiabilidade do componente</span>",
        ],
        skills: [
            python,
            flask,
            celery,
            fastapi,
            pytest,
            linux,
            docker,
            kubernetes
        ]
    },
    //EXP-TREMA
    {
        title: "Founder / Webdeveloper",
        company_name: "Trema Labs",
        icon: html,
        iconBg: "#000000",
        date: "Jun 2022 - Apr 2024",
        /*
        points: [
            "Founded Trema Labs with a mission to provide top-notch web development and application creation services.",
            "Developing web and mobile applications that meet the highest standards of quality, functionality, and user experience.",
            "Utilizing HTML, CSS, and React.js, among other technologies, to create interactive, robust, and user-friendly web and mobile applications.",
            "Maintaining a hands-on approach in overseeing all aspects of the business from operations to technical development, ensuring alignment with our mission and goals.",
        ],
        */
        points: [
            "Established Trema Labs to deliver exceptional web and app solutions.",
            "Developed applications prioritizing quality, functionality, and user experience.",
            "Led the entire business spectrum, from operations to technical innovations.",
        ],
    },
    //EXP-RUSESP
    {
        title: "Russian-Spanish Translator",
        company_name: "Freelance",
        icon: css,
        iconBg: "#383E56",
        date: "Jul 2021 - Present",
        /*
        points: [
            "Translating literary works from Russian to Spanish, preserving the authors' voice and narrative style in the translations.",
            "Working extensively with the masterpieces of writers such as Boris Akunin, Vladimir Sorokin, Mikhail Lermontov, and Katya Metelitsa.",
            "Delivering high-quality translations that resonate with the Spanish-speaking audience, fostering cross-cultural understanding and appreciation for Russian literature.",
            "Working independently to manage all aspects of the freelance translation process, including client communication, project management, and deadline adherence.",
            "Thoroughly researching cultural, historical, and linguistic nuances to ensure accurate and contextually appropriate translations.",
            "Continually updating language skills and knowledge of cultural changes, ensuring that translations remain contemporary and engaging for the target audience.",
            "Maintaining confidentiality and professional discretion as per industry standards and client requirements.",
        ],
        */
        points: [
            "Specialized in translating iconic literary works from Russian to Spanish, preserving the essence and style of the original text.",
            "Handled translations for various works, including those of Boris Akunin and Mikhail Lermontov, among others.",
            "Navigated the challenges of freelance work, ensuring accurate translations, timely deliveries, and maintaining client confidentiality.",
        ],
    },
    //EXP-STEAKS
    {
        title: "Content Creator / Social Media Manager",
        company_name: "@SteakSteakSteaks (IG Page)",
        icon: sql,
        iconBg: "#000000",
        date: "Oct 2020 - Present",
        /*
        points: [
            "Creating engaging and appetizing content, focusing on providing my audience with insights into the world's best steaks.",
            "Managing the Instagram profile, curating content in both Portuguese and English to cater to a diverse audience.",
            "Photographing and filming all content independently, ensuring each post accurately represents each individual experience.",
            "Actively sourcing new steaks and restaurants to feature, staying on top of trends and delivering fresh content to followers.",
            "Maintaining a regular posting schedule and ensuring high-quality visual and written content to keep followers engaged and informed.",
        ],
        */
        points: [
            "Produced and curated content, spotlighting global steak restaurants, with a hands-on approach to photography and videography.",
            "Effectively managed the Instagram profile, delivering bilingual (Portuguese and English) content to cater to a broader audience.",
            "Actively sought out and showcased new steak experiences, ensuring content remains fresh and relevant.",
            "Upheld a consistent posting schedule, emphasizing both visual allure and informative value to engage followers.",
        ],
    },
    //EXP-NEURALUME
    {
        title: "Localization Manager",
        company_name: "Neuralume",
        icon: git,
        iconBg: "#11112b",
        date: "Oct 2020 - Sep 2021",
        /*
        points: [
            "Managed the localization process at Neuralume, ensuring our monitoring systems, transmission, and data analytics tools were accessible and effective across various geographical locations and cultures.",
            "Developed and implemented localization strategies and processes to optimize efficiency and ensure consistent messaging across different markets.",
            "Led quality assurance checks for localized content, ensuring consistency, accuracy, and cultural appropriateness.",
        ],
        */
        points: [
            "Ensured Neuralume's tools were globally accessible and culturally apt.",
            "Championed efficient localization strategies for consistent messaging.",
            "Oversaw quality checks for content integrity and relevance.",
        ],
    },
    //EXP-FREONOMA
    {
        title: "Travel Blogger / Content Creator",
        company_name: "freonoma.travel.blog",
        icon: git,
        iconBg: "#233565",
        date: "Jan 2020 - Present",
        /*
        points: [
            "Sharing personal reviews and recommendations of off-the-beaten-path destinations with a Portuguese-speaking audience.",
            "Generating unique and engaging content, including written blog posts and high-quality photos to accompany travel reviews and recommendations, enhancing the visual appeal of the blog.",
            "Handling all aspects of blog operation, from content creation to website management using WordPress.",
            "Exploring unique and lesser-known travel destinations, providing readers with fresh and exciting travel ideas.",
        ],
        */
        points: [
            "Shared unique travel tales and recommendations for a Portuguese audience.",
            "Produced vibrant content, from insightful blogs to captivating photos.",
            "Unveiled hidden travel gems, offering readers novel adventures.",
        ],
    },

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

const ExperienceCard = ({experience}) => (
    <VerticalTimelineElement
        contentStyle={{background: '#071a1a', color: '#fff'}}
        contentArrowStyle={{borderRight: '7px solid  #232631'}}
        date={experience.date}
        iconStyle={{background: experience.iconBg}}
        icon={
            <div className="flex justify-center items-center w-full h-full">
                <img
                    src={experience.icon}
                    alt={experience.company_name}
                    className="w-[60%] h-[60%]
          object-contain"
                />
            </div>
        }
    >
        <div>
            <h3 className="text-white text-[24px] font-bold">
                {experience.title}
            </h3>
            <p className="text-secondary text-[16px] font-semibold" style={{margin: 0}}>
                {experience.company_name}
            </p>
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

        {experience.skills && (
            <div className="mt-4 flex flex-wrap justify-center w-full gap-2">
                {experience.skills.map((skillIcon, idx) => (
                    <img
                        key={idx}
                        src={skillIcon}
                        alt="skill icon"
                        className="h-11 w-11 object-contain"
                    />
                ))}
            </div>
        )}
    </VerticalTimelineElement>
)

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