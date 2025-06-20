import React, { useRef, useState, useEffect, useMemo } from 'react'

// ─── HELPERS ────────────────────────────────────────────────────────────────────
const getGap = (el) => {
    const style = window.getComputedStyle(el)
    return parseInt(style.getPropertyValue('column-gap'), 10) || 0
}

// ─── LAYOUT CONFIGS ─────────────────────────────────────────────────────────────
const desktopLayoutConfigs = {
    1: { iconPx: 190, gapPx: 40, fontClass: 'text-5xl' },
    2: { iconPx: 180, gapPx: 36, fontClass: 'text-5xl' },
    3: { iconPx: 170, gapPx: 32, fontClass: 'text-4xl' },
    4: { iconPx: 160, gapPx: 28, fontClass: 'text-3xl' },
    5: { iconPx: 150, gapPx: 24, fontClass: 'text-2xl' },
    6: { iconPx: 140, gapPx: 20, fontClass: 'text-xl' },
    7: { iconPx: 130, gapPx: 16, fontClass: 'text-lg' },
    8: { iconPx: 120, gapPx: 12, fontClass: 'text-base' },
    9: { iconPx: 110, gapPx: 8,  fontClass: 'text-sm' },
    10:{ iconPx: 100, gapPx: 4,  fontClass: 'text-sm' }
}

// Only allow up to n = 4 on mobile with tighter spacing
const mobileLayoutConfigs = {
    1: { iconPx: 100, gapPx: 12, fontClass: 'text-2xl' },
    2: { iconPx:  80, gapPx:  8, fontClass: 'text-lg'  },
    3: { iconPx:  100, gapPx:  6, fontClass: 'text-base'},
    4: { iconPx:  60, gapPx:  4, fontClass: 'text-sm'  }
}

const SkillCarousel = ({
                           sectionTitle,
                           sectionSubtitle,
                           skillContent,
                           iconsMap,
                           desktopVisible = 3,
                           mobileVisible = 1,
                       }) => {
    const carouselRef   = useRef(null)
    const pointerStartX = useRef(0)
    const scrollStartX  = useRef(0)
    const isDragging    = useRef(false)

    const arrowSize    = 35
    const arrowPadding = 8
    const pixelTol     = 4

    // track current viewport (desktop vs mobile)
    const [isDesktop, setIsDesktop] = useState(
        window.matchMedia('(min-width: 768px)').matches
    )

    useEffect(() => {
        const mq = window.matchMedia('(min-width: 768px)')
        const handler = (e) => setIsDesktop(e.matches)
        handler(mq)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    // determine carousel size based on viewport
    const [carouselSize, setCarouselSize] = useState(
        isDesktop ? desktopVisible : Math.min(mobileVisible, 4)
    )

    useEffect(() => {
        setCarouselSize(
            isDesktop ? desktopVisible : Math.min(mobileVisible, 4)
        )
    }, [isDesktop, desktopVisible, mobileVisible])

    // select config from the appropriate map
    const { iconPx, gapPx, fontClass } = useMemo(() => {
        const configs = isDesktop ? desktopLayoutConfigs : mobileLayoutConfigs
        const keys = Object.keys(configs).map(Number)
        const key = Math.min(Math.max(carouselSize, Math.min(...keys)), Math.max(...keys))
        return configs[key]
    }, [isDesktop, carouselSize])

    // compute flex basis: accounts for reduced gap on mobile
    const cardBasis = useMemo(
        () => `calc((100% - ${gapPx * (carouselSize - 1)}px) / ${carouselSize})`,
        [gapPx, carouselSize]
    )

    const totalCount = skillContent.length
    const maxIndex   = Math.max(totalCount - carouselSize, 0)

    const [canScrollLeft,  setCanScrollLeft]  = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(totalCount > carouselSize)
    const [scrollIndex,    setScrollIndex]    = useState(0)

    // ─── SCROLL FUNCTIONS ─────────────────────────────────────────────────────────
    const scrollByStep = (direction) => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const step      = cards[0].offsetWidth + getGap(container)
        const newIndex  = direction === 'right'
            ? Math.min(scrollIndex + 1, maxIndex)
            : Math.max(scrollIndex - 1, 0)
        container.scrollTo({ left: newIndex * step, behavior: 'smooth' })
    }

    const snapToNearest = () => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const step      = cards[0].offsetWidth + getGap(container)
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

        const cards = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const step  = cards[0].offsetWidth + getGap(container)
        const reachedEnd = maxScrollLeft - scrollLeft <= pixelTol
        const idx = reachedEnd ? maxIndex : Math.min(Math.round(scrollLeft / step), maxIndex)
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

    const handleBeanClick = (index) => {
        const container = carouselRef.current
        const cards     = Array.from(container.querySelectorAll('.carousel-card'))
        if (!cards.length) return
        const step      = cards[0].offsetWidth + getGap(container)
        const clamped   = Math.max(0, Math.min(index, maxIndex))
        container.scrollTo({ left: clamped * step, behavior: 'smooth' })
    }

    const handlePointerDown = (e) => {
        isDragging.current = true
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
                                <button
                                    onClick={() => scrollByStep('left')}
                                    aria-label="Previous"
                                    className="absolute z-20 top-1/2 -translate-y-1/2 left-0 md:left-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full"
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
                                    style={{ touchAction: 'pan-y', gap: `${gapPx}px` }}
                                    className="flex overflow-x-auto hide-scrollbar rounded-xl py-6 w-full md:w-[70%] mx-auto cursor-grab"
                                >
                                    {skillContent.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="carousel-card flex-shrink-0 flex flex-col items-center gap-4"
                                            style={{ flexBasis: `${cardBasis}`}}
                                        >
                                            <img
                                                src={iconsMap[skill.id]}
                                                alt={skill.title}
                                                draggable={false}
                                                style={{ width: `${iconPx}px`, height: `${iconPx}px` }}
                                                className="mb-4"
                                            />
                                            <h5 className={`text-white font-bold ${fontClass} text-center`}>{skill.title}</h5>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {canScrollRight && (
                                <button
                                    onClick={() => scrollByStep('right')}
                                    aria-label="Next"
                                    className="absolute z-20 top-1/2 -translate-y-1/2 right-0 md:right-[7.5%] bg-black/50 hover:bg-black/60 text-white rounded-full"
                                    style={{ padding: `${arrowPadding}px` }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ width: `${arrowSize}px`, height: `${arrowSize}px` }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            )}
                        </div>

                        {maxIndex > 0 && (
                            <div
                                className={`flex justify-center items-center mt-6 gap-x-2 ${
                                    maxIndex + 1 > 8 && carouselSize === 1 ? 'flex-wrap' : ''
                                }`}
                                style={{ maxWidth: '90%', margin: '0 auto', rowGap: '1rem' }}
                            >
                                {(() => {
                                    const totalBeans = maxIndex + 1
                                    const shouldSplit = totalBeans > 8 && carouselSize === 1
                                    const beansPerLine = shouldSplit ? Math.ceil(totalBeans / 2) : totalBeans

                                    const allBeans = Array.from({ length: totalBeans }).map((_, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => handleBeanClick(idx)}
                                            className={`w-12 h-5 rounded-full border-4 box-border border-black transition-all cursor-pointer ${
                                                idx < beansFilled ? 'bg-green-400 shadow-lg shadow-green-400/50' : 'bg-gray-400'
                                            }`}
                                        />
                                    ))

                                    if (!shouldSplit) return allBeans

                                    return (
                                        <>
                                            <div className="flex gap-x-2 justify-center w-full mb-2">
                                                {allBeans.slice(0, beansPerLine)}
                                            </div>
                                            <div className="flex gap-x-2 justify-center w-full">
                                                {allBeans.slice(beansPerLine)}
                                            </div>
                                        </>
                                    )
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
