// ─── REACT & HOOKS ─────────────────────────────────────────────────────────────
import React, { useRef, useState, useEffect } from 'react'

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
import _react        from "../../assets/img/skills_icons/react.png"
import jwt           from "../../assets/img/skills_icons/jwt.png"
import postgres      from "../../assets/img/skills_icons/postgres.png"
import docker        from "../../assets/img/skills_icons/docker.png"
import aws           from "../../assets/img/skills_icons/aws.png"
import google        from "../../assets/img/skills_icons/google-cloud-small.png"
import frontend      from "../../assets/img/skills_icons/frontend_dev.png"
import design        from "../../assets/img/skills_icons/design.png"

// ─── DATA ───────────────────────────────────────────────────────────────────────
const skillIcons = {
    backend: server, api, database, cloud, deploy, lock, python, javascript,
    csharp, java, html, css, sql, git, flask, react: _react, jwt,
    postgres, docker, aws, "google-cloud": google, website: frontend, design,
}

const defaultTitle = "Key Skills"
const defaultSubtitle = "Core competencies in software development"

const defaultSkills = [
    { id: "design",   title: "UI/UX Design" },
    { id: "website",  title: "Website Creation" },
    { id: "backend",  title: "Backend Development" },
    { id: "api",      title: "APIs" },
    { id: "database", title: "Databases" },
    { id: "cloud",    title: "Cloud" },
    { id: "deploy",   title: "DevOps & CI/CD" },
    { id: "lock",     title: "Security" },
]

// ─── HELPERS ────────────────────────────────────────────────────────────────────
const getGap = (el) => {
    const style = window.getComputedStyle(el)
    return parseInt(style.getPropertyValue('column-gap'), 10) || 0
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────────
const SkillCarousel = ({ sectionTitle = defaultTitle, sectionSubtitle = defaultSubtitle, skillContent = defaultSkills }) => {
    const carouselRef   = useRef(null)
    const pointerStartX = useRef(0)
    const scrollStartX  = useRef(0)
    const isDragging    = useRef(false)

    const arrowSize    = 35
    const arrowPadding = arrowSize / 4

    const containerBg     = "bg-black/50 backdrop-blur-2xl"
    const carouselLaneBg = ""

    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [currentIndex, setCurrentIndex] = useState(0)
    const maxIndex = skillContent.length - 1

    const updateScrollState = () => {
        const container = carouselRef.current
        if (!container) return
        const { scrollLeft, scrollWidth, clientWidth } = container
        setCanScrollLeft(scrollLeft > 1)
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
        const cards = Array.from(container.querySelectorAll('.carousel-card'))
        if (cards.length) {
            const step = cards[0].offsetWidth + getGap(container)
            const idx = Math.round(scrollLeft / step)
            setCurrentIndex(Math.min(Math.max(idx, 0), maxIndex))
        }
    }

    useEffect(() => {
        const container = carouselRef.current
        if (!container) return
        container.addEventListener('scroll', updateScrollState, { passive: true })
        updateScrollState()
        return () => container.removeEventListener('scroll', updateScrollState)
    }, [])

    const scrollByStep = (direction) => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return

        const cardWidth = cards[0].offsetWidth
        const gap       = getGap(container)
        const step      = cardWidth + gap
        const newIndex  = direction === 'right'
            ? Math.min(currentIndex + 1, maxIndex)
            : Math.max(currentIndex - 1, 0)

        container.scrollTo({ left: newIndex * step, behavior: 'smooth' })
    }

    const handlePointerDown = (e) => {
        isDragging.current    = true
        pointerStartX.current = e.clientX
        scrollStartX.current  = carouselRef.current.scrollLeft
        e.currentTarget.setPointerCapture(e.pointerId)
        carouselRef.current.classList.add('cursor-grabbing', 'select-none')
    }

    const handlePointerMove = (e) => {
        if (!isDragging.current) return
        const delta = e.clientX - pointerStartX.current
        carouselRef.current.scrollLeft = scrollStartX.current - delta
    }

    const endDrag = (e) => {
        if (!isDragging.current) return
        isDragging.current = false
        e.currentTarget.releasePointerCapture(e.pointerId)
        carouselRef.current.classList.remove('cursor-grabbing', 'select-none')

        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (cards.length) {
            const step         = cards[0].offsetWidth + getGap(container)
            const targetIndex  = Math.min(Math.max(Math.round(container.scrollLeft / step), 0), maxIndex)
            container.scrollTo({ left: targetIndex * step, behavior: 'smooth' })
        }
    }

    return (
        <section className="relative md:py-20 w-full">
            <div className="flex justify-center w-full">
                <div className={`relative w-[90%] md:w-[70%] ${containerBg} rounded-3xl py-12`}>
                    <div className="mx-auto">
                        <h2 className="text-5xl leading-[54px] font-bold text-white text-center mb-4 font-[Centra,sans-serif]">
                            {sectionTitle}
                        </h2>
                        <p className="text-center text-gray-400 text-lg font-normal leading-7 tracking-wide mb-2 font-[Centra,sans-serif]">
                            {sectionSubtitle}
                        </p>

                        <div className="relative w-full">
                            {canScrollLeft && (
                                <button
                                    onClick={() => scrollByStep('left')}
                                    aria-label="Previous"
                                    className="absolute z-20 top-1/2 -translate-y-1/2 left-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full focus:outline-none"
                                    style={{ padding: `${arrowPadding}px` }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            )}

                            <div className="overflow-hidden w-full px-4">
                                <div
                                    ref={carouselRef}
                                    onPointerDown={handlePointerDown}
                                    onPointerMove={handlePointerMove}
                                    onPointerUp={endDrag}
                                    onPointerCancel={endDrag}
                                    style={{ touchAction: 'pan-y' }}
                                    className={`flex gap-x-8 overflow-x-auto hide-scrollbar rounded-xl py-6 ${carouselLaneBg} w-full md:w-[70%] mx-auto cursor-grab`}
                                >
                                    {skillContent.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="carousel-card flex-shrink-0 basis-full md:basis-[calc((100%-4rem)/3)] flex flex-col items-center justify-center"
                                        >
                                            <img src={skillIcons[skill.id]} alt={skill.title} draggable={false} className="w-32 h-32 object-contain mb-4" />
                                            <h5 className="text-white font-bold text-xl text-center leading-tight font-[Centra,sans-serif]">
                                                {skill.title}
                                            </h5>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {canScrollRight && (
                                <button
                                    onClick={() => scrollByStep('right')}
                                    aria-label="Next"
                                    className="absolute z-20 top-1/2 -translate-y-1/2 right-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full focus:outline-none"
                                    style={{ padding: `${arrowPadding}px` }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkillCarousel
