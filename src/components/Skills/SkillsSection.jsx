// src/components/Skills/SkillsSection.jsx
import React, { useContext } from 'react'
// import SkillCarousel from './SkillsCarousel.jsx'
import server from "../../assets/img/skills_icons/server.png"
import api from "../../assets/img/skills_icons/api.png"
import database from "../../assets/img/skills_icons/database.png"
import cloud from "../../assets/img/skills_icons/cloud.png"
import deploy from "../../assets/img/skills_icons/deploy.png"
import lock from "../../assets/img/skills_icons/lock.png"
import python from "../../assets/img/skills_icons/python.svg"
import javascript from "../../assets/img/skills_icons/javascript.png"
import csharp from "../../assets/img/skills_icons/csharp.png"
import java from "../../assets/img/skills_icons/java.png"
import html from "../../assets/img/skills_icons/html.png"
import css from "../../assets/img/skills_icons/css.png"
import sql from "../../assets/img/skills_icons/sql.png"
import git from "../../assets/img/skills_icons/git.png"
import flask from "../../assets/img/skills_icons/flask.png"
import reactIcon from "../../assets/img/skills_icons/react.png"
import jwt from "../../assets/img/skills_icons/jwt.png"
import postgres from "../../assets/img/skills_icons/postgres.png"
import docker from "../../assets/img/skills_icons/docker.png"
import aws from "../../assets/img/skills_icons/aws.png"
import googleCloud from "../../assets/img/skills_icons/google-cloud-small.png"
import frontend from "../../assets/img/skills_icons/frontend_dev.png"
import design from "../../assets/img/skills_icons/design.png"
import machine_learning from "../../assets/img/skills_icons/machine-learning.png"
import data_analysis from "../../assets/img/skills_icons/data-analysis.png"
import web_scrapping from "../../assets/img/skills_icons/web-scrapping.png"
import typescript from "../../assets/img/skills_icons/typescript.png"
import linux from "../../assets/img/skills_icons/linux.png"
import nodejs from "../../assets/img/skills_icons/nodejs.png"
import django from "../../assets/img/skills_icons/django.png"
import mongo from "../../assets/img/skills_icons/mongo.svg"
import supabase from "../../assets/img/skills_icons/supabase.png"
import firebase from "../../assets/img/skills_icons/firebase.png"
import tilt from "../../assets/img/skills_icons/tilt.png"
import poetry from "../../assets/img/skills_icons/poetry.png"
import alembic from "../../assets/img/skills_icons/alembic.png"
import azure from "../../assets/img/skills_icons/azure.svg"
import figma from "../../assets/img/skills_icons/figma.svg"
import github_actions from "../../assets/img/skills_icons/github-actions.svg"
import next_js from "../../assets/img/skills_icons/nextjs.svg"
import redis from "../../assets/img/skills_icons/redis.svg"
import swagger from "../../assets/img/skills_icons/swagger.svg"
import react_native from "../../assets/img/skills_icons/react-native.png"
import LanguageContext from "../LanguageContext.jsx"

// ─── ICON MAP ──────────────────────────────────────────────────────────────────
const iconsMap = {
    backend: server,
    api,
    flask,
    django,
    nodejs,
    swagger,
    website: frontend,
    react: reactIcon,
    html,
    css,
    figma,
    javascript,
    typescript,
    design,
    nextJs: next_js,
    reactNative: react_native,
    python,
    csharp,
    java,
    sql,
    cloud,
    redis,
    deploy,
    docker,
    aws,
    googleCloud,
    azure,
    githubActions: github_actions,
    tilt,
    database,
    postgres,
    mongo,
    supabase,
    firebase,
    lock,
    jwt,
    machineLearning: machine_learning,
    dataAnalysis: data_analysis,
    webScrapping: web_scrapping,
    git,
    linux,
    poetry,
    alembic
}

// ─── CONTENT ARRAYS ────────────────────────────────────────────────────────────
const backendExpertise = [
    { id: "python", title: "Python" },
    { id: "flask", title: "Flask" },
    { id: "django", title: "Django" },
    { id: "nodejs", title: "Node.js" },
    { id: "swagger", title: "Swagger" },
    { id: "linux", title: "Linux" },
    { id: "postgres", title: "PostgreSQL" },
    { id: "mongo", title: "MongoDB" },
    { id: "git", title: "Git" },
    { id: "poetry", title: "Poetry" },
    { id: "alembic", title: "Alembic" },
]

const cloudExpertise = [
    { id: "docker", title: "Docker" },
    { id: "redis", title: "Redis" },
    { id: "aws", title: "AWS" },
    { id: "googleCloud", title: "Google Cloud" },
    { id: "azure", title: "Azure" },
    { id: "supabase", title: "Supabase" },
    { id: "firebase", title: "Firebase" },
    { id: "githubActions", title: "GitHub Actions" },
    { id: "tilt", title: "Tilt" },
]

const frontendExpertise = [
    { id: "react", title: "React" },
    { id: "nextJs", title: "Next.js" },
    { id: "reactNative", title: "React Native" },
    { id: "figma", title: "Figma" },
    { id: "typescript", title: "TypeScript" },
    { id: "html", title: "HTML" },
    { id: "css", title: "CSS" },
    { id: "javascript", title: "JavaScript" },
    { id: "design", title: "UI/UX Design" },
]

const languageContent = {
    english: {
        backend: {
            title: "Backend Stack",
            subtitle: "APIs, databases, and communication between systems",
        },
        cloud: {
            title: "Cloud & DevOps",
            subtitle: "Automation, deployment, and scaling",
        },
        frontend: {
            title: "Frontend Stack",
            subtitle: "Turning designs into user experiences",
        },
    },
    portuguese: {
        backend: {
            title: "Habilidades Backend",
            subtitle: "APIs, bancos de dados e comunicação entre sistemas",
        },
        cloud: {
            title: "Cloud & DevOps",
            subtitle: "Automação, deploy e escalabilidade",
        },
        frontend: {
            title: "Habilidades Frontend",
            subtitle: "Desde o design até a experiência final do usuário",
        },
    },
}

const SkillsSection = () => {
    const { selectedFlag } = useContext(LanguageContext)
    const key = selectedFlag === 'usa' ? 'english' : 'portuguese'
    const lang = languageContent[key]

    return (
        <section id="skills">
            <SkillCarousel
                sectionTitle={lang.backend.title}
                sectionSubtitle={lang.backend.subtitle}
                skillContent={backendExpertise}
                iconsMap={iconsMap}
            />

            <SkillCarousel
                sectionTitle={lang.cloud.title}
                sectionSubtitle={lang.cloud.subtitle}
                skillContent={cloudExpertise}
                iconsMap={iconsMap}
            />

            <SkillCarousel
                sectionTitle={lang.frontend.title}
                sectionSubtitle={lang.frontend.subtitle}
                skillContent={frontendExpertise}
                iconsMap={iconsMap}
            />
        </section>
    )
}

export default SkillsSection
