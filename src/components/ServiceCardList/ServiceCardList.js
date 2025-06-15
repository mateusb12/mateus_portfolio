// ServiceCardList.js
import React from 'react';
import { ReactComponent as Robotic } from '../../assets/img/robotic.svg';
import { ReactComponent as Chisel } from '../../assets/img/chisel.svg';
import ServiceCard from "../SingleServiceCard/ServiceCard";

const services = [
    {
        Icon: Robotic,
        title: 'Automação de websites',
    },
    {
        Icon: Chisel,
        title: 'Lançamento de produtos',
    },
    // {
    //     Icon: Shield,
    //     title: 'Segurança digital',
    // },
    // {
    //     Icon: Zap,
    //     title: 'Integração com APIs',
    // },
];

const ServiceCardList = () => {
    return (
        <div className="w-full px-4 mb-5">
            <div className="grid w-full max-w-6xl mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
                {services.map((service, index) => (
                    <ServiceCard
                        key={index}
                        Icon={service.Icon}
                        title={service.title}
                        width={180}
                        height={220}
                    />
                ))}
            </div>
        </div>
    );
};

export default ServiceCardList;

