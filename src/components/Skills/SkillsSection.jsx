// src/components/Skills/SkillsSection.jsx
import React from 'react'
import SkillCarousel from './SkillsCarousel.jsx'

// ─── ICON IMPORTS ───────────────────────────────────────────────────────────────
import server        from "../../assets/img/skills_icons/server.png"
import api           from "../../assets/img/skills_icons/api.png"
import database      from "../../assets/img/skills_icons/database.png"
import cloud         from "../../assets/img/skills_icons/cloud.png"
import deploy        from "../../assets/img/skills_icons/deploy.png"
import lock          from "../../assets/img/skills_icons/lock.png"
import python        from "../../assets/img/skills_icons/python.png"
import javascript    from "../../assets/img/skills_icons/javascript.png"
import csharp        from "../../assets/img/skills_icons/csharp.png"
import java          from "../../assets/img/skills_icons/java.png"
import html          from "../../assets/img/skills_icons/html.png"
import css           from "../../assets/img/skills_icons/css.png"
import sql           from "../../assets/img/skills_icons/sql.png"
import git           from "../../assets/img/skills_icons/git.png"
import flask         from "../../assets/img/skills_icons/flask.png"
import reactIcon     from "../../assets/img/skills_icons/react.png"
import jwt           from "../../assets/img/skills_icons/jwt.png"
import postgres      from "../../assets/img/skills_icons/postgres.png"
import docker        from "../../assets/img/skills_icons/docker.png"
import aws           from "../../assets/img/skills_icons/aws.png"
import googleCloud   from "../../assets/img/skills_icons/google-cloud-small.png"
import frontend      from "../../assets/img/skills_icons/frontend_dev.png"
import design        from "../../assets/img/skills_icons/design.png"

// ─── ICON MAP ──────────────────────────────────────────────────────────────────
const iconsMap = {
    backend:   server,
    api:       api,
    database:  database,
    cloud:     cloud,
    deploy:    deploy,
    lock:      lock,
    python:    python,
    javascript:javascript,
    csharp:    csharp,
    java:      java,
    html:      html,
    css:       css,
    sql:       sql,
    git:       git,
    flask:     flask,
    react:     reactIcon,
    jwt:       jwt,
    postgres:  postgres,
    docker:    docker,
    aws:       aws,
    googleCloud: googleCloud,
    website:   frontend,
    design:    design
}

// ─── CONTENT ARRAYS ────────────────────────────────────────────────────────────
const keySkills = [
    { id: "design",   title: "UI/UX Design" },
    { id: "website",  title: "Website Creation" },
    { id: "backend",  title: "Backend Development" },
    { id: "api",      title: "APIs" },
    { id: "database", title: "Databases" },
    { id: "cloud",    title: "Cloud" },
    { id: "deploy",   title: "DevOps & CI/CD" },
    { id: "lock",     title: "Security" }
]

const SkillsSection = () => (
    <>
        <SkillCarousel
            sectionTitle="Key Skills"
            sectionSubtitle="Core competencies in software development"
            skillContent={keySkills}
            iconsMap={iconsMap}
        />

        {/* Add more <SkillCarousel> instances here by passing other skillContent arrays and the same iconsMap */}
    </>
)

export default SkillsSection
