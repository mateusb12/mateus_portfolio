// src/components/ServiceCard/ServiceCard.js
import React from 'react'
import { Tilt } from 'react-tilt'
import { motion } from 'framer-motion'
import { fadeIn } from '../../utils/motion'
import zap from '../../assets/img/zap.svg'

const tiltOptions = {
    max: 45,
    scale: 1,
    speed: 450,
}

const defaults = {
    cardWidth: '220px',
    cardMinH: '220px',
    iconSize: '80px',
}

const ServiceCard = ({
                         index = 0,
                         title = 'Default Service',
                         icon = zap,
                         cardWidth = defaults.cardWidth,
                         cardMinH = defaults.cardMinH,
                         iconSize = defaults.iconSize,
                     }) => (
    <Tilt
        options={tiltOptions}
        style={{
            width: cardWidth,
            minHeight: cardMinH,
        }}
        className="shrink-0"
    >
        <motion.div
            variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
            className="green-red-gradient p-[2px] rounded-[20px] shadow-card"
        >
            <div
                className="bg-[#031010] w-full rounded-[20px] py-5 px-8 flex flex-col justify-evenly items-center overflow-hidden"
                style={{ minHeight: cardMinH }}
            >
                <div
                    className="flex items-center justify-center rounded-full shadow-lg shadow-green-100/5 overflow-hidden mx-auto"
                    style={{
                        width: iconSize,
                        height: iconSize,
                    }}
                >
                    <img
                        src={icon}
                        alt={`${title} icon`}
                        className="object-contain w-full h-full"
                    />
                </div>
                <h3 className="text-white text-[20px] font-bold text-center mt-4">{title}</h3>
            </div>
        </motion.div>
    </Tilt>
)

export default ServiceCard;