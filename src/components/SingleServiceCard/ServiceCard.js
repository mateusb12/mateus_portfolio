// ServiceCard.js
import React from 'react'
import { ReactComponent as Robotic } from '../../assets/img/robotic.svg'
import './ServiceCard.css'

const ServiceCard = ({
                         Icon = Robotic,
                         title = 'Automação de websites',
                         size = 48,
                         width = 180,
                         height = 220,
                     }) => (
    <div
        className="gradient-card flex-col items-center justify-center"
        style={{ width: `${width}px`, height: `${height}px` }}
    >
        <div className="icon-circle">
            <div className="drop-shadow-[0_0_10px_rgba(35,181,181,0.7)]">
                <Icon
                    width={size}
                    height={size}
                    style={{ fill: 'rgba(255, 255, 255, 0.7)' }}
                />
            </div>
        </div>
        <div className="title mt-4 text-[#09F7A5]">{title}</div>
    </div>
)

export default ServiceCard