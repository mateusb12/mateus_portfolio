import React from 'react'
import SkillCarousel from "./SkillsCarousel.jsx";

const keySkills = [
    { id: "backend", title: "Backend Development" },
    { id: "api", title: "API Development" },
    { id: "database", title: "Databases" },
    { id: "sql", title: "SQL" },
]

const designSkills = [
    { id: "design", title: "UI/UX Design" },
    { id: "frontend", title: "Frontend Design" },
    { id: "html", title: "HTML/CSS" },
]

const devopsSkills = [
    { id: "cloud", title: "Cloud Services" },
    { id: "deploy", title: "DevOps & CI/CD" },
    { id: "docker", title: "Docker" },
    { id: "aws", title: "AWS" },
]

const SkillsSection = () => {
    return (
        <>
            <SkillCarousel
                sectionTitle="Design & Frontend"
                sectionSubtitle="Crafting intuitive user interfaces"
                skillContent={designSkills}
            />

            <SkillCarousel
                sectionTitle="Backend & APIs"
                sectionSubtitle="Robust server-side logic"
                skillContent={keySkills}
            />

            <SkillCarousel
                sectionTitle="Cloud & DevOps"
                sectionSubtitle="Infrastructure & automation"
                skillContent={devopsSkills}
            />
        </>
    )
}

export default SkillsSection
