// ServiceCard.js
import React from 'react'
import { ReactComponent as WhatsappIcon } from '../../assets/img/zap.svg'
import './ServiceCard.css'

const ServiceCard = ({
                         Icon = WhatsappIcon,
                         title = 'Serviço',
                         size = 48,
                         width = 220,
                         height = 220,
                     }) => (
    <div
        className="gradient-card"
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

        <div className="title mt-4">{title}</div>
    </div>
)

export default ServiceCard