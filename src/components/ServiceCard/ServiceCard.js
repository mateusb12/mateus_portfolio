import React from 'react'
import { FaReact } from 'react-icons/fa'
import whatsapp from '../../assets/img/zap.svg'
import './ServiceCard.css'

const ServiceCard = ({
                         Icon = FaReact,
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
            <Icon
                size={size}
                className="text-[#23B5B5] drop-shadow-lg drop-shadow-[#23B5B5]/50"
            />
        </div>
        <div className="title">{title}</div>
    </div>
)

export default ServiceCard
