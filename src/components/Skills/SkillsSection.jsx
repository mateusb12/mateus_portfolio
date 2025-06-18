// src/components/Skills/SkillsSection.jsx
import React from 'react'
import SkillCarousel from './SkillsCarousel.jsx'

// ─── ICON IMPORTS ───────────────────────────────────────────────────────────────
import server from "../../assets/img/skills_icons/server.png"
import api from "../../assets/img/skills_icons/api.png"
import database from "../../assets/img/skills_icons/database.png"
import cloud from "../../assets/img/skills_icons/cloud.png"
import deploy from "../../assets/img/skills_icons/deploy.png"
import lock from "../../assets/img/skills_icons/lock.png"
import python from "../../assets/img/skills_icons/python.png"
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
import mongo from "../../assets/img/skills_icons/mongo.png"
import supabase from "../../assets/img/skills_icons/supabase.png"
import firebase from "../../assets/img/skills_icons/firebase.png"
import tilt from "../../assets/img/skills_icons/tilt.png"
import poetry from "../../assets/img/skills_icons/poetry.png"
import alembic from "../../assets/img/skills_icons/alembic.png"
import azure from "../../assets/img/skills_icons/azure.png"

// ─── ICON MAP ──────────────────────────────────────────────────────────────────
const iconsMap = {
    // ─── Backend Technologies ────────────────────────────────
    backend: server,
    api: api,
    flask: flask,
    django: django,
    nodejs: nodejs,

    // ─── Frontend Technologies ───────────────────────────────
    website: frontend,
    react: reactIcon,
    html: html,
    css: css,
    javascript: javascript,
    typescript: typescript,
    design: design,

    // ─── Programming Languages ───────────────────────────────
    python: python,
    csharp: csharp,
    java: java,
    sql: sql,

    // ─── Cloud & DevOps ──────────────────────────────────────
    cloud: cloud,
    deploy: deploy,
    docker: docker,
    aws: aws,
    googleCloud: googleCloud,
    azure: azure,
    tilt: tilt,

    // ─── Databases ───────────────────────────────────────────
    database: database,
    postgres: postgres,
    mongo: mongo,
    supabase: supabase,
    firebase: firebase,

    // ─── Security & Auth ─────────────────────────────────────
    lock: lock,
    jwt: jwt,

    // ─── Data & AI ───────────────────────────────────────────
    machineLearning: machine_learning,
    dataAnalysis: data_analysis,
    webScrapping: web_scrapping,

    // ─── Tools & Utilities ───────────────────────────────────
    git: git,
    linux: linux,
    poetry: poetry,
    alembic: alembic
};

// ─── CONTENT ARRAYS ────────────────────────────────────────────────────────────
const keySkills = [
    {id: "design", title: "UI/UX Design"},
    {id: "website", title: "Website Creation"},
    {id: "backend", title: "Backend Development"},
    {id: "api", title: "APIs"},
    {id: "database", title: "Databases"},
    {id: "cloud", title: "Cloud"},
    {id: "deploy", title: "DevOps & CI/CD"},
    {id: "lock", title: "Security"}
]

const foundations = [
    {id: "python", title: "Python"},
    {id: "javascript", title: "Javascript"},
    {id: "csharp", title: "C#"},
    {id: "java", title: "Java"},
    {id: "sql", title: "SQL"},
    {id: "html", title: "HTML"},
    {id: "css", title: "CSS"}
]

const frameworks = [
    {id: "git", title: "GIT"},
    {id: "flask", title: "Flask"},
    {id: "react", title: "React"},
    {id: "jwt", title: "JWT"},
    {id: "postgres", title: "PostgreSQL"},
    {id: "docker", title: "Docker"},
    {id: "aws", title: "AWS"},
    {id: "googleCloud", title: "Google Cloud"}
]

const SkillsSection = () => (
    <>
        <SkillCarousel
            sectionTitle="Key Skills"
            sectionSubtitle="Core competencies in software development"
            skillContent={keySkills}
            iconsMap={iconsMap}
        />

        <SkillCarousel
            sectionTitle="Programming Foundations"
            sectionSubtitle="Essential programming languages that serves as foundations for using the frameworks"
            skillContent={foundations}
            iconsMap={iconsMap}
        />

        <SkillCarousel
            sectionTitle="Tech Stack"
            sectionSubtitle="Technologies that I have experience with"
            skillContent={frameworks}
            iconsMap={iconsMap}
        />
    </>
)

export default SkillsSection
