import React, { useRef, useState, useEffect } from 'react'

// ─── HELPERS ────────────────────────────────────────────────────────────────────
const getGap = (el) => {
    const style = window.getComputedStyle(el)
    return parseInt(style.getPropertyValue('column-gap'), 10) || 0
}

// ─── COMPONENT ──────────────────────────────────────────────────────────────────
const SkillCarousel = ({ sectionTitle, sectionSubtitle, skillContent, iconsMap }) => {
    const carouselRef   = useRef(null)
    const pointerStartX = useRef(0)
    const scrollStartX  = useRef(0)
    const isDragging    = useRef(false)

    const arrowSize    = 35
    const arrowPadding = arrowSize / 4
    const pixelTol     = 4

    const [carouselSize, setCarouselSize] = useState(
        window.matchMedia('(min-width: 768px)').matches ? 3 : 1
    )

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)')
        const handler = (e) => setCarouselSize(e.matches ? 3 : 1)
        handler(mq)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    const totalCount = skillContent.length
    const maxIndex   = Math.max(totalCount - carouselSize, 0)

    const [canScrollLeft,  setCanScrollLeft]  = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(totalCount > carouselSize)
    const [scrollIndex,    setScrollIndex]    = useState(0)

    // Scroll to a given index (bean click)
    const handleBeanClick = (index) => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const cardWidth = cards[0].offsetWidth
        const gap       = getGap(container)
        const step      = cardWidth + gap
        const clamped   = Math.max(0, Math.min(index, maxIndex))
        container.scrollTo({ left: clamped * step, behavior: 'smooth' })
    }

    const snapToNearest = () => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const cardWidth = cards[0].offsetWidth
        const gap       = getGap(container)
        const step      = cardWidth + gap
        const nearest   = Math.round(container.scrollLeft / step)
        const newIndex  = Math.max(0, Math.min(nearest, maxIndex))
        container.scrollTo({ left: newIndex * step, behavior: 'smooth' })
    }

    const updateScrollState = () => {
        const container = carouselRef.current
        if (!container) return

        const { scrollLeft, scrollWidth, clientWidth } = container
        const maxScrollLeft = scrollWidth - clientWidth
        setCanScrollLeft(scrollLeft > pixelTol)
        setCanScrollRight(maxScrollLeft - scrollLeft > pixelTol)

        const cards    = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const cardWidth = cards[0].offsetWidth
        const gap       = getGap(container)
        const step      = cardWidth + gap

        const reachedEnd = maxScrollLeft - scrollLeft <= pixelTol
        const idx        = reachedEnd ? maxIndex : Math.min(Math.round(scrollLeft / step), maxIndex)
        setScrollIndex(idx)
    }

    useEffect(() => {
        const container = carouselRef.current
        if (!container) return
        container.addEventListener('scroll', updateScrollState, { passive: true })
        window.addEventListener('resize', updateScrollState)
        updateScrollState()
        return () => {
            container.removeEventListener('scroll', updateScrollState)
            window.removeEventListener('resize', updateScrollState)
        }
    }, [carouselSize])

    const scrollByOneStepAtTime = (direction) => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const cardWidth = cards[0].offsetWidth
        const gap       = getGap(container)
        const step      = cardWidth + gap

        const newIndex = direction === 'right'
            ? Math.min(scrollIndex + 1, maxIndex)
            : Math.max(scrollIndex - 1, 0)

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
        carouselRef.current.scrollLeft = scrollStartX.current - (e.clientX - pointerStartX.current)
    }

    const endDrag = (e) => {
        if (!isDragging.current) return
        isDragging.current = false
        e.currentTarget.releasePointerCapture(e.pointerId)
        carouselRef.current.classList.remove('cursor-grabbing', 'select-none')
        snapToNearest()
    }

    const beansFilled = scrollIndex + 1

    return (
        <section className="relative py-8 md:py-15 w-full">
            <div className="flex justify-center w-full">
                <div className="relative w-[90%] md:w-[70%] bg-black/50 backdrop-blur-2xl rounded-3xl py-12">
                    <div className="mx-auto text-center">
                        <h2 className="text-5xl font-bold text-white mb-4">{sectionTitle}</h2>
                        <p className="text-gray-400 text-lg mb-2">{sectionSubtitle}</p>

                        <div className="relative w-full">
                            {canScrollLeft && (
                                <button onClick={() => scrollByOneStepAtTime('left')} aria-label="Previous" className="absolute z-20 top-1/2 -translate-y-1/2 left-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full" style={{ padding: `${arrowPadding}px` }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
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
                                    {skillContent.map(skill => (
                                        <div
                                            key={skill.id}
                                            className="carousel-card flex-shrink-0 basis-full md:basis-[calc((100%-4rem)/3)] flex flex-col items-center"
                                        >
                                            <img src={iconsMap[skill.id]} alt={skill.title} draggable={false} className="w-32 h-32 mb-4" />
                                            <h5 className="text-white font-bold text-xl text-center">{skill.title}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {canScrollRight && (
                                <button onClick={() => scrollByOneStepAtTime('right')} aria-label="Next" className="absolute z-20 top-1/2 -translate-y-1/2 right-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full" style={{ padding: `${arrowPadding}px` }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            )}
                        </div>

                        {maxIndex > 0 && (
                            <div
                                className={`flex justify-center items-center mt-6 gap-x-2 ${
                                    maxIndex + 1 > 8 && carouselSize === 1 ? 'flex-wrap' : ''
                                }`}
                                style={{
                                    maxWidth: '90%',
                                    margin: '0 auto',
                                    rowGap: '1rem'
                                }}
                            >
                                {(function () {
                                    const totalBeans = maxIndex + 1;
                                    const shouldSplit = totalBeans > 8 && carouselSize === 1;
                                    const beansPerLine = shouldSplit ? Math.ceil(totalBeans / 2) : totalBeans;

                                    const lines = shouldSplit ? 2 : 1;

                                    const allBeans = Array.from({ length: totalBeans }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleBeanClick(idx)}
                                            className={`w-12 h-5 rounded-full border-4 box-border border-black transition-all cursor-pointer ${
                                                idx < beansFilled
                                                    ? 'bg-green-400 shadow-lg shadow-green-400/50'
                                                    : 'bg-gray-400'
                                            }`}
                                        />
                                    ));

                                    if (!shouldSplit) return allBeans;

                                    return (
                                        <>
                                            <div className="flex gap-x-2 justify-center w-full mb-2">
                                                {allBeans.slice(0, beansPerLine)}
                                            </div>
                                            <div className="flex gap-x-2 justify-center w-full">
                                                {allBeans.slice(beansPerLine)}
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SkillCarousel
