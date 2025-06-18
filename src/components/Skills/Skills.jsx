import React, { useRef, useState } from 'react'

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

const keySkills = [
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
const SkillCarousel = () => {
    const carouselRef      = useRef(null)
    const pointerStartX    = useRef(0)
    const scrollStartX     = useRef(0)
    const isDragging       = useRef(false)
    const showDebugText = false;
    const [debugX, setDebugX] = useState(null)

    // Centralised sizing
    const arrowSize    = 35
    const arrowPadding = arrowSize / 4

    const containerBg     = "bg-black/50 backdrop-blur-2xl"
    const carouselLaneBg = ""

    // Scroll one card left/right (arrow buttons)
    const scrollByStep = (direction) => {
        const container    = carouselRef.current
        const cards        = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return

        const cardWidth    = cards[0].offsetWidth
        const gap          = getGap(container)
        const step         = cardWidth + gap
        const currentIndex = Math.round(container.scrollLeft / step)
        const maxIndex     = cards.length - 1
        const newIndex     = direction === 'right'
            ? Math.min(currentIndex + 1, maxIndex)
            : Math.max(currentIndex - 1, 0)

        container.scrollTo({ left: newIndex * step, behavior: 'smooth' })
    }

    // ─── POINTER / SWIPE LOGIC ───────────────────────────────────────────────────
    const handlePointerDown = (e) => {
        isDragging.current    = true
        pointerStartX.current = e.clientX
        scrollStartX.current  = carouselRef.current.scrollLeft
        setDebugX(e.clientX)
        e.currentTarget.setPointerCapture(e.pointerId)
        carouselRef.current.classList.add('cursor-grabbing', 'select-none')
    }

    const handlePointerMove = (e) => {
        if (!isDragging.current) return
        const delta = e.clientX - pointerStartX.current
        carouselRef.current.scrollLeft = scrollStartX.current - delta
        setDebugX(e.clientX)
    }

    // ─── POINTER RELEASE ──────────────────────────────────────────────────────────
    const endDrag = (e) => {
        if (!isDragging.current) return
        isDragging.current = false
        e.currentTarget.releasePointerCapture(e.pointerId)
        carouselRef.current.classList.remove('cursor-grabbing', 'select-none')

        // ── SNAP TO NEAREST CARD ON RELEASE ──────────────────────────────
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (cards.length) {
            const cardWidth    = cards[0].offsetWidth
            const gap          = getGap(container)
            const step         = cardWidth + gap
            const scrollLeft   = container.scrollLeft
            const nearestIndex = Math.round(scrollLeft / step)
            const maxIndex     = cards.length - 1
            const targetIndex  = Math.min(Math.max(nearestIndex, 0), maxIndex)
            container.scrollTo({ left: targetIndex * step, behavior: 'smooth' })
        }

        setDebugX(null)
    }

    // ─── RENDER ──────────────────────────────────────────────────────────────────
    return (
        <section className="relative md:py-20 w-full">
            <div className="flex justify-center w-full">
                <div className={`relative w-[90%] md:w-[70%] ${containerBg} rounded-3xl py-12`}>
                    <div className="mx-auto">
                        <h2 className="text-5xl leading-[54px] font-bold text-white text-center mb-4 font-[Centra,sans-serif]">
                            Key Skills
                        </h2>
                        <p className="text-center text-gray-400 text-lg font-normal leading-7 tracking-wide mb-2 font-[Centra,sans-serif]">
                            Core competencies in software development
                        </p>
                        {/* Debugging position display below description */}
                        {showDebugText && debugX !== null && (
                            <div className="text-center text-sm text-gray-300 mb-4">
                                Drag X: {debugX}px
                            </div>
                        )}

                        <div className="relative w-full">
                            {/* ─── PREV ARROW ──────────────────────────────────────────────── */}
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

                            {/* ─── CAROUSEL ───────────────────────────────────────────────── */}
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
                                    {keySkills.map((skill) => (
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

                            {/* ─── NEXT ARROW ──────────────────────────────────────────────── */}
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkillCarousel
