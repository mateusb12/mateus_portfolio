export const projectsFadeIn = (direction, type = 'tween', duration = 0.5) => {
    const axis = ['left', 'right'].includes(direction)
        ? { x: direction === 'left' ? 100 : -100 }
        : ['up', 'down'].includes(direction)
            ? { y: direction === 'up' ? 100 : -100 }
            : {};
    return {
        hidden: { ...axis, opacity: 0 },
        show: {
            x: 0, y: 0, opacity: 1,
            transition: { type, duration, ...(type === 'tween' ? { ease: 'easeOut' } : { stiffness: 100, damping: 20 }) }
        }
    };
};

export const servicesFadeIn = (direction, type = 'tween', duration = 0.5) => {
    const axis = ['left', 'right'].includes(direction)
        ? { x: direction === 'left' ? 100 : -100 }
        : ['up', 'down'].includes(direction)
            ? { y: direction === 'up' ? 100 : -100 }
            : {};

    return {
        hidden: {
            ...axis,
            opacity: 0,
        },
        show: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                duration,
                ...(type === 'tween'
                        ? { ease: 'easeOut' }
                        : { stiffness: 100, damping: 20 }
                ),
            },
        },
    };
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