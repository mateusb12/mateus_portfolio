import React, { useRef, useState, useEffect } from 'react'

// ─── HELPERS ────────────────────────────────────────────────────────────────────
const getGap = (el) => {
    const style = window.getComputedStyle(el)
    return parseInt(style.getPropertyValue('column-gap'), 10) || 0
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────────
const SkillCarousel = ({ sectionTitle, sectionSubtitle, skillContent, iconsMap }) => {
    // element refs
    const carouselRef     = useRef(null)
    const pointerStartX   = useRef(0)
    const scrollStartX    = useRef(0)
    const isDragging      = useRef(false)

    // ui constants
    const arrowSize     = 35
    const arrowPadding  = arrowSize / 4

    // state hooks
    const [canScrollLeft,  setCanScrollLeft]  = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [scrollIndex,    setScrollIndex]    = useState(0)     // how many “steps” we have already scrolled
    const [pageCount,      setPageCount]      = useState(0)     // number of beans ( = elements - 2 )

    const totalCount = skillContent.length

    // ─── CORE: UPDATE SCROLL STATE ────────────────────────────────────────────────
    const updateScrollState = () => {
        const container = carouselRef.current
        if (!container) return

        const { scrollLeft, scrollWidth, clientWidth } = container
        const maxScrollLeft = scrollWidth - clientWidth

        // enable / disable arrows
        setCanScrollLeft(scrollLeft > 1)
        setCanScrollRight(scrollLeft < maxScrollLeft - 1)

        // calculate sizes only once cards are rendered
        const cards = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return

        const cardWidth   = cards[0].offsetWidth
        const gap         = getGap(container)
        const step        = cardWidth + gap
        const visibleCnt  = Math.max(1, Math.floor(clientWidth / step))
        const maxIndex    = Math.max(totalCount - visibleCnt, 0)  // last valid scroll index

        // beans = array length - 2 ( user‑defined rule )
        const beans = Math.max(totalCount - 2, 0)
        setPageCount(beans)

        // where are we now?
        const reachedEnd = maxScrollLeft - scrollLeft <= 1
        const idx        = reachedEnd ? maxIndex : Math.min(Math.round(scrollLeft / step), maxIndex)
        setScrollIndex(idx)
    }

    // attach listeners once
    useEffect(() => {
        const container = carouselRef.current
        if (!container) return

        container.addEventListener('scroll', updateScrollState, { passive: true })
        window.addEventListener('resize', updateScrollState)

        // initial calculation
        updateScrollState()

        return () => {
            container.removeEventListener('scroll', updateScrollState)
            window.removeEventListener('resize', updateScrollState)
        }
    }, [])

    // ─── SCROLL BY STEP ───────────────────────────────────────────────────────────
    const scrollByStep = (direction) => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return

        const cardWidth  = cards[0].offsetWidth
        const gap        = getGap(container)
        const step       = cardWidth + gap
        const visibleCnt = Math.max(1, Math.floor(container.clientWidth / step))
        const maxIndex   = Math.max(totalCount - visibleCnt, 0)

        const newIndex = direction === 'right'
            ? Math.min(scrollIndex + 1, maxIndex)
            : Math.max(scrollIndex - 1, 0)

        container.scrollTo({ left: newIndex * step, behavior: 'smooth' })
    }

    // ─── DRAG HANDLERS ────────────────────────────────────────────────────────────
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
        if (!cards.length) return

        const cardWidth  = cards[0].offsetWidth
        const gap        = getGap(container)
        const step       = cardWidth + gap
        const targetIdx  = Math.round(container.scrollLeft / step)
        container.scrollTo({ left: targetIdx * step, behavior: 'smooth' })
    }

    // how many beans should be green right now?
    //   • when not at the end:   beansFilled = scrollIndex
    //   • when at the end:       beansFilled = pageCount  (all green)
    const beansFilled = canScrollRight ? scrollIndex : pageCount

    // ─── RENDER ───────────────────────────────────────────────────────────────────
    return (
        <section className="relative py-8 md:py-15 w-full">
            <div className="flex justify-center w-full">
                <div className="relative w-[90%] md:w-[70%] bg-black/50 backdrop-blur-2xl rounded-3xl py-12">
                    <div className="mx-auto text-center">
                        <h2 className="text-5xl font-bold text-white mb-4">{sectionTitle}</h2>
                        <p className="text-gray-400 text-lg mb-2">{sectionSubtitle}</p>

                        {/* ─── CAROUSEL WRAPPER ─────────────────────────────────────────────── */}
                        <div className="relative w-full">
                            {canScrollLeft && (
                                <button
                                    onClick={() => scrollByStep('left')}
                                    aria-label="Previous"
                                    className="absolute z-20 top-1/2 -translate-y-1/2 left-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full"
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
                                    className="flex gap-x-8 overflow-x-auto hide-scrollbar rounded-xl py-6 w-full md:w-[70%] mx-auto cursor-grab"
                                >
                                    {skillContent.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="carousel-card flex-shrink-0 basis-full md:basis-[calc((100%-4rem)/3)] flex flex-col items-center"
                                        >
                                            <img
                                                src={iconsMap[skill.id]}
                                                alt={skill.title}
                                                draggable={false}
                                                className="w-32 h-32 mb-4"
                                            />
                                            <h5 className="text-white font-bold text-xl text-center">{skill.title}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {canScrollRight && (
                                <button
                                    onClick={() => scrollByStep('right')}
                                    aria-label="Next"
                                    className="absolute z-20 top-1/2 -translate-y-1/2 right-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full"
                                    style={{ padding: `${arrowPadding}px` }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {/* ─── BEANS (SCROLL PROGRESS) ──────────────────────────────────────── */}
                        {pageCount > 0 && (
                            <div className="flex justify-center items-center mt-6 space-x-2">
                                {Array.from({ length: pageCount }).map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-8 h-2 rounded transition-all ${idx < beansFilled ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-400'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkillCarousel
