// src/components/ServiceCard/ServiceCard.js
import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import zap from '../../assets/img/zap.svg';

const tiltOptions = {
    max: 45,
    scale: 1,
    speed: 450,
};

const defaults = {
    cardWidth: '220px',
    cardMinH: '220px',
    iconSize: '80px',
};

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
        style={{ width: cardWidth }}
        className="shrink-0"
    >
        <motion.div
            variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
            className="p-[2px] rounded-[20px] bg-gradient-to-br from-[#09F7A5] to-[#00c2a1]"
        >
            <div
                className="bg-[#031010] w-full h-full rounded-[20px] py-5 px-8 flex flex-col justify-evenly items-center"
                style={{ minHeight: cardMinH }}
            >
                <div
                    className="flex items-center justify-center rounded-full bg-[#0B0F10] shadow-[0_0_15px_#09F7A540] overflow-hidden mx-auto"
                    style={{
                        width: iconSize,
                        height: iconSize,
                    }}
                >
                    <img
                        src={icon}
                        alt={`${title} icon`}
                        className="object-contain w-[70%] h-[70%] filter brightness-0 invert"
                    />
                </div>
                <h3 className="text-white text-[20px] font-bold text-center mt-4">{title}</h3>
            </div>
        </motion.div>
    </Tilt>
);

export default ServiceCard;
